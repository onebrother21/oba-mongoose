import OBACoreApi from "@onebro/oba-core-api";
import { Keys } from "@onebro/oba-common";
import { Model } from "../model-types";
import { ModelFactoryConstructors } from "../model-factories";
import { ModelControllerReqUserRole } from "./model-controller-reqs";
import { ModelControllerType } from "./model-controller-types";
export interface ModelController<Ev, Sigs, k extends Keys<Sigs>, Roles> extends ModelControllerType<Ev, Sigs, k, Roles> {
}
export declare class ModelController<Ev, Sigs, k extends Keys<Sigs>, Roles> {
    core: OBACoreApi<Ev>;
    constructor(core: OBACoreApi<Ev>);
    unauthorized: (s: string) => never;
    isAuth: (okto: string, privileges?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<Roles>, roles: ModelControllerReqUserRole<Roles>[]) => never;
    isBadStatus: (o: Model<Sigs[k]>["instance"]) => boolean;
    init$: (constructors: ModelFactoryConstructors<Ev, Sigs>) => Promise<this>;
}
