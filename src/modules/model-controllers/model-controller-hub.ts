import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelController} from "./model-controller";
import {ModelFactoryConstructors} from "../model-factories";

export type ModelControllerHub<Ev,H,R> = {[k in Keys<H>]:ModelController<Ev,H,k,R>;};
export type ModelControllerConstructors<Ev,H,R> = {[k in  Keys<H>]:Constructor<ModelController<Ev,H,k,R>>;};

export const modelControllerHub = async <Ev,H,R>(
  core:OBACoreApi<Ev>,
  controller_constructors:ModelControllerConstructors<Ev,H,R>,
  factory_constructors:ModelFactoryConstructors<Ev,H>) => {
  const controllers:Partial<ModelControllerHub<Ev,H,R>> = {};
  for(const k in controller_constructors){
    const k1 = k as Keys<ModelControllerHub<Ev,H,R>>;
    const k2 = k as Keys<ModelControllerConstructors<Ev,H,R>>;
    const ctr = controller_constructors[k2];
    const controller = new ctr(core) as ModelControllerHub<Ev,H,R>[typeof k1];
    controllers[k1] = await controller.init$(factory_constructors);
  }
  return controllers as ModelControllerHub<Ev,H,R>;
};