import { Keys, Constructor } from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import { ModelController } from "./model-controller";
import { ModelFactoryConstructors } from "../model-factories";
export declare type ModelControllerHub<Ev, H, R> = {
    [k in Keys<H>]: ModelController<Ev, H, k, R>;
};
export declare type ModelControllerConstructors<Ev, H, R> = {
    [k in Keys<H>]: Constructor<ModelController<Ev, H, k, R>>;
};
export declare const modelControllerHub: <Ev, H, R>(core: OBACoreApi<Ev>, controller_constructors: ModelControllerConstructors<Ev, H, R>, factory_constructors: ModelFactoryConstructors<Ev, H>) => Promise<ModelControllerHub<Ev, H, R>>;
