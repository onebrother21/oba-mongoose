import { Values, Strings, NoneOfType } from "@onebro/oba-common";
import { IsObjectId, ModelConfig, ModelJson, ModelFetches, ModelUpdates, ModelQueries } from "../model-types";
export declare type ModelControllerReqUserRole<Roles> = Roles extends Strings ? Values<Roles> : never;
export declare type ModelControllerReqUserTkn<Roles> = {
    username: string;
    next: string;
    role: ModelControllerReqUserRole<Roles>;
    okto: string;
};
export declare type ModelControllerReqUserInfo<Roles> = {
    appuser: string;
    authtkn: ModelControllerReqUserTkn<Roles>;
};
export declare type ModelControllerFetchIdReq<T> = {
    id: IsObjectId;
};
export declare type ModelControllerFetchReq<T> = ModelControllerFetchIdReq<T> | NoneOfType<ModelFetches<T>, IsObjectId>;
export declare type ModelControllerFetchAdminReq<T> = ModelControllerFetchIdReq<T> & {
    adminId: string;
};
export declare type ModelControllerReqParams<Params> = Params extends undefined ? {} : {
    params: Params;
};
export declare type ModelControllerReqBody<Body> = Body extends undefined ? {} : {
    body: Body;
};
export declare type ModelControllerReqQuery<Query> = Query extends undefined ? {} : {
    query: Query;
};
export declare type ModelControllerReq<Params = undefined, Body = undefined, Query = undefined, Roles = undefined> = ModelControllerReqUserInfo<Roles> & ModelControllerReqBody<Body> & ModelControllerReqParams<Params> & ModelControllerReqQuery<Query>;
export declare type ModelControllerBaseReqs<T, Roles> = {
    C: ModelControllerReq<undefined, ModelConfig<T>, undefined, Roles>;
    F: ModelControllerReq<ModelControllerFetchReq<T>, undefined, undefined, Roles>;
    U: ModelControllerReq<ModelControllerFetchReq<T>, ModelUpdates<T>, undefined, Roles>;
    R: ModelControllerReq<ModelControllerFetchIdReq<T>, undefined, undefined, Roles>;
    X: ModelControllerReq<ModelControllerFetchAdminReq<T>, undefined, undefined, Roles>;
    Q: ModelControllerReq<undefined, undefined, ModelQueries<T>, Roles>;
    S: ModelControllerReq<undefined, undefined, {
        text: string;
    }, Roles>;
};
export declare type ModelControllerExtReqs<T, Roles> = {
    create$: ModelControllerBaseReqs<T, Roles>["C"];
    fetch$: ModelControllerBaseReqs<T, Roles>["F"];
    update$: ModelControllerBaseReqs<T, Roles>["U"];
    remove$: ModelControllerBaseReqs<T, Roles>["R"];
    remove$$: ModelControllerBaseReqs<T, Roles>["X"];
    query$: ModelControllerBaseReqs<T, Roles>["Q"];
    search$: ModelControllerBaseReqs<T, Roles>["S"];
};
export declare type ModelControllerReqs<T, Roles> = ModelControllerBaseReqs<T, Roles> & ModelControllerExtReqs<T, Roles>;
export declare type ModelControllerMethods<T, Roles> = {
    create$: (o: ModelControllerReqs<T, Roles>["create$"]) => Promise<ModelJson<T>>;
    fetch$: (o: ModelControllerReqs<T, Roles>["fetch$"]) => Promise<ModelJson<T>>;
    update$: (o: ModelControllerReqs<T, Roles>["update$"]) => Promise<ModelJson<T>>;
    updateMany$: (o: ModelControllerReqs<T, Roles>["update$"]) => Promise<{
        results: (IsObjectId | ModelJson<T>)[];
    }>;
    remove$: (o: ModelControllerReqs<T, Roles>["remove$"]) => Promise<ModelJson<T>>;
    remove$$: (o: ModelControllerReqs<T, Roles>["remove$$"]) => Promise<ModelJson<T>>;
    removeMany$: (q: ModelControllerReqs<T, Roles>["remove$"]) => Promise<{
        results: (IsObjectId | ModelJson<T>)[];
    }>;
    query$: (o: ModelControllerReqs<T, Roles>["query$"]) => Promise<{
        results: (IsObjectId | ModelJson<T>)[];
    }>;
    search$: (o: ModelControllerReqs<T, Roles>["search$"]) => Promise<{
        results: (IsObjectId | ModelJson<T>)[];
    }>;
};
