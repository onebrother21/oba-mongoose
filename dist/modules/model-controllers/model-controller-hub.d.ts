import { Keys, Constructor } from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import { ModelController } from "./model-controller";
import { ModelFactoryConstructors } from "../model-factories";
export declare type ModelControllerHub<H, R> = {
    [k in Keys<H>]: ModelController<H, k, R>;
};
export declare type ModelControllerConstructors<H, R> = {
    [k in Keys<H>]: Constructor<ModelController<H, k, R>>;
};
export declare const modelControllerHub: <H, R>(core: OBACoreApi<null>, controller_constructors: ModelControllerConstructors<H, R>, factory_constructors: ModelFactoryConstructors<H>) => Promise<ModelControllerHub<H, R>>;
