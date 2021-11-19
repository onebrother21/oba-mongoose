import { Keys, Constructor } from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import { ModelController } from "./model-controller";
import { ModelFactoryConstructors } from "../model-factories";
export declare type ModelControllerHub<Ev, Sigs, Roles> = {
    [k in Keys<Sigs>]: ModelController<Ev, Sigs, k, Roles>;
};
export declare type ModelControllerConstructors<Ev, Sigs, Roles> = {
    [k in Keys<Sigs>]: Constructor<ModelController<Ev, Sigs, k, Roles>>;
};
export declare const modelControllerHub: <Ev, Sigs, Roles>(core: OBACoreApi<Ev>, controller_constructors: ModelControllerConstructors<Ev, Sigs, Roles>, factory_constructors: ModelFactoryConstructors<Ev, Sigs>) => Promise<ModelControllerHub<Ev, Sigs, Roles>>;
