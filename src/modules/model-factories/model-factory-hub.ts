import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelFactory} from "./model-factory";

export type ModelFactoryHub<Ev,Sigs> = {[k in Keys<Sigs>]:ModelFactory<Ev,Sigs[k]>;};
export type ModelFactoryConstructors<Ev,Sigs> = {[k in  Keys<Sigs>]:Constructor<ModelFactory<Ev,Sigs[k]>>;};

export const modelFactoryHub = async <Ev,Sigs>(
  core:OBACoreApi<Ev>,
  factory_constructors:ModelFactoryConstructors<Ev,Sigs>) => {
  const factories:Partial<ModelFactoryHub<Ev,Sigs>> = {};
  for(const k in factory_constructors){
    const k1 = k as Keys<ModelFactoryHub<Ev,Sigs>>;
    const k2 = k as Keys<ModelFactoryConstructors<Ev,Sigs>>;
    const ctr = factory_constructors[k2];
    const factory = new ctr(core) as ModelFactoryHub<Ev,Sigs>[typeof k1];
    factories[k1] = await factory.init();
  }
  return factories as ModelFactoryHub<Ev,Sigs>;
};