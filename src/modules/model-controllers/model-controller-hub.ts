import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelController} from "./model-controller";
import {ModelFactoryConstructors} from "../model-factories";

export type ModelControllerHub<H,R> = {[k in Keys<H>]:ModelController<H,k,R>;};
export type ModelControllerConstructors<H,R> = {[k in  Keys<H>]:Constructor<ModelController<H,k,R>>;};

export const modelControllerHub = async <H,R>(
  core:OBACoreApi<null>,
  controller_constructors:ModelControllerConstructors<H,R>,
  factory_constructors:ModelFactoryConstructors<H>) => {
  const controllers:Partial<ModelControllerHub<H,R>> = {};
  for(const k in controller_constructors){
    const k1 = k as Keys<ModelControllerHub<H,R>>;
    const k2 = k as Keys<ModelControllerConstructors<H,R>>;
    const ctr = controller_constructors[k2];
    const controller = new ctr(core) as ModelControllerHub<H,R>[typeof k1];
    controllers[k1] = await controller.init$(factory_constructors);
  }
  return controllers as ModelControllerHub<H,R>;
};