import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelController} from "./model-controller";
import {ModelFactoryConstructors} from "../model-factories";

export type ModelControllerHub<Ev,Sigs,Roles> = {[k in Keys<Sigs>]:ModelController<Ev,Sigs,k,Roles>;};
export type ModelControllerConstructors<Ev,Sigs,Roles> = {[k in  Keys<Sigs>]:Constructor<ModelController<Ev,Sigs,k,Roles>>;};

export const modelControllerHub = async <Ev,Sigs,Roles>(
  core:OBACoreApi<Ev>,
  controller_constructors:ModelControllerConstructors<Ev,Sigs,Roles>,
  factory_constructors:ModelFactoryConstructors<Ev,Sigs>) => {
  const controllers:Partial<ModelControllerHub<Ev,Sigs,Roles>> = {};
  for(const k in controller_constructors){
    const k1 = k as Keys<ModelControllerHub<Ev,Sigs,Roles>>;
    const k2 = k as Keys<ModelControllerConstructors<Ev,Sigs,Roles>>;
    const ctr = controller_constructors[k2];
    const controller = new ctr(core) as ModelControllerHub<Ev,Sigs,Roles>[typeof k1];
    controllers[k1] = await controller.init$(factory_constructors);
  }
  return controllers as ModelControllerHub<Ev,Sigs,Roles>;
};