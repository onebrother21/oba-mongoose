import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelController} from "./model-controller";

export type ModelControllerHub<Sigs,Roles> = {[k in Keys<Sigs>]:ModelController<Roles,Sigs[k]>;};
/*
export const modelControllerHub = async <Sigs,Roles>(
  core:OBACoreApi,
  controller_constructors:ModelControllerConstructors<Sigs,Roles>,
  factory_constructors:ModelFactoryConstructors<Sigs>) => {
  const controllers:Partial<ModelControllerHub<Sigs,Roles>> = {};
  for(const k in controller_constructors){
    const K = k as Keys<Sigs>;
    const ctr = controller_constructors[K];
    const controller = new ctr(core);
    controllers[K] = await controller.init$(factory_constructors);
  }
  return controllers as ModelControllerHub<Sigs,Roles>;
};
*/