import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelFactory} from "./model-factory";

export type ModelFactoryHub<Ev,H> = {[k in Keys<H>]:ModelFactory<Ev,H[k]>;};
export type ModelFactoryConstructors<Ev,H> = {[k in  Keys<H>]:Constructor<ModelFactory<Ev,H[k]>>;};

export const modelFactoryHub = async <Ev,H>(
  core:OBACoreApi<Ev>,
  factory_constructors:ModelFactoryConstructors<Ev,H>) => {
  const factories:Partial<ModelFactoryHub<Ev,H>> = {};
  for(const k in factory_constructors){
    const k1 = k as Keys<ModelFactoryHub<Ev,H>>;
    const k2 = k as Keys<ModelFactoryConstructors<Ev,H>>;
    const ctr = factory_constructors[k2];
    const factory = new ctr(core) as ModelFactoryHub<Ev,H>[typeof k1];
    factories[k1] = await factory.init();
  }
  return factories as ModelFactoryHub<Ev,H>;
};