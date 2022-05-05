import { Keys } from "@onebro/oba-common";
import { ModelController } from "./model-controller";
export declare type ModelControllerHub<Sigs, Roles> = {
    [k in Keys<Sigs>]: ModelController<Roles, Sigs[k]>;
};
