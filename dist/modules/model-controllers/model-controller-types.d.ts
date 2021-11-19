import OBACoreApi from "@onebro/oba-core-api";
import { Keys, Values } from "@onebro/oba-common";
import { Model } from "../model-types";
import { ModelFactoryHub } from "../model-factories";
import { ModelControllerMethods, ModelControllerReqUserRole } from "./model-controller-reqs";
export declare type ModelControllerType<Ev, Sigs, k extends Keys<Sigs>, Roles> = ModelControllerMethods<Sigs[k], Roles> & {
    core: OBACoreApi<Ev>;
    factories: ModelFactoryHub<Ev, Sigs>;
    privileges: string[];
    badStatuses: Values<Model<Sigs[k]>["statuses"]>[];
    unauthorized: (s: string) => void;
    isAuth: (okto: string, priv?: string[]) => void;
    isRole: (role: ModelControllerReqUserRole<Roles>, roles: ModelControllerReqUserRole<Roles>[]) => void;
    isBadStatus: (o: Model<Sigs[k]>["instance"]) => boolean;
};
