import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelFactory} from "./model-factory";

export type ModelFactoryHub<H> = {[k in Keys<H>]:ModelFactory<H[k]>;};
export type ModelFactoryConstructors<H> = {[k in  Keys<H>]:Constructor<ModelFactory<H[k]>>;};

export const modelFactoryHub = async <H>(
  core:OBACoreApi<null>,
  factory_constructors:ModelFactoryConstructors<H>) => {
  const factories:Partial<ModelFactoryHub<H>> = {};
  for(const k in factory_constructors){
    const k1 = k as Keys<ModelFactoryHub<H>>;
    const k2 = k as Keys<ModelFactoryConstructors<H>>;
    const ctr = factory_constructors[k2];
    const factory = new ctr(core) as ModelFactoryHub<H>[typeof k1];
    factories[k1] = await factory.init();
  }
  return factories as ModelFactoryHub<H>;
};