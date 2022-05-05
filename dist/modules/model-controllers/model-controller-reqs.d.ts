import { Values, Strings } from "@onebro/oba-common";
import { IsObjectId, Model, ModelFetchObject } from "../model-types";
export declare type ModelControllerConfig<T> = Model<T>["config"];
export declare type ModelControllerUpdates<T> = Model<T>["updates"];
export declare type ModelControllerQueries<T> = Model<T>["queries"];
export declare type ModelControllerFetches<T> = ModelFetchObject<T>;
export declare type ModelControllerJson<T> = Model<T>["json"];
export declare type ModelControllerFetchByIdParam = {
    id: IsObjectId;
};
export declare type ModelControllerFetchByIdAdminParam = ModelControllerFetchByIdParam & {
    adminId: string;
};
export declare type ModelControllerReqUserRole<R> = R extends Strings ? Values<R> : never;
export declare type ModelControllerReqUserCreds<R = undefined> = {
    appuser: string;
    authtkn: {
        username: string;
        next: string;
        role: ModelControllerReqUserRole<R>;
        okto: string;
    };
};
export declare type ModelControllerReqParams<P> = P extends undefined ? {} : {
    params: P;
};
export declare type ModelControllerReqBody<B> = B extends undefined ? {} : {
    body: B;
};
export declare type ModelControllerReqQuery<Q> = Q extends undefined ? {} : {
    query: Q;
};
export declare type ModelControllerReq<P = undefined, B = undefined, Q = undefined, R = undefined> = ModelControllerReqUserCreds<R> & ModelControllerReqParams<P> & ModelControllerReqBody<B> & ModelControllerReqQuery<Q>;
export declare type ModelControllerBaseReqs<R, T> = {
    C: ModelControllerReq<undefined, ModelControllerConfig<T>, undefined, R>;
    F: ModelControllerReq<ModelControllerFetches<T>, undefined, undefined, R>;
    U: ModelControllerReq<ModelControllerFetches<T>, ModelControllerUpdates<T>, undefined, R>;
    R: ModelControllerReq<ModelControllerFetchByIdParam, undefined, undefined, R>;
    X: ModelControllerReq<ModelControllerFetchByIdAdminParam, undefined, undefined, R>;
    Q: ModelControllerReq<undefined, undefined, ModelControllerQueries<T>, R>;
    S: ModelControllerReq<undefined, undefined, {
        text: string;
    }, R>;
};
export declare type ModelControllerExtReqs<R, T> = {
    create$: ModelControllerBaseReqs<R, T>["C"];
    fetch$: ModelControllerBaseReqs<R, T>["F"];
    update$: ModelControllerBaseReqs<R, T>["U"];
    remove$: ModelControllerBaseReqs<R, T>["R"];
    remove$$: ModelControllerBaseReqs<R, T>["X"];
    query$: ModelControllerBaseReqs<R, T>["Q"];
    search$: ModelControllerBaseReqs<R, T>["S"];
};
export declare type ModelControllerReqs<R, T> = ModelControllerBaseReqs<R, T> & ModelControllerExtReqs<R, T>;
export declare type ModelControllerMethods<R, T> = {
    create$: (req: ModelControllerReqs<R, T>["create$"]) => Promise<ModelControllerJson<T>>;
    fetch$: (req: ModelControllerReqs<R, T>["fetch$"]) => Promise<ModelControllerJson<T>>;
    update$: (req: ModelControllerReqs<R, T>["update$"]) => Promise<ModelControllerJson<T>>;
    updateMany$: (req: ModelControllerReqs<R, T>["update$"]) => Promise<{
        results: (IsObjectId | ModelControllerJson<T>)[];
    }>;
    remove$: (req: ModelControllerReqs<R, T>["remove$"]) => Promise<ModelControllerJson<T>>;
    remove$$: (req: ModelControllerReqs<R, T>["remove$$"]) => Promise<ModelControllerJson<T>>;
    removeMany$: (req: ModelControllerReqs<R, T>["remove$"]) => Promise<{
        results: (IsObjectId | ModelControllerJson<T>)[];
    }>;
    query$: (req: ModelControllerReqs<R, T>["query$"]) => Promise<{
        results: (IsObjectId | ModelControllerJson<T>)[];
    }>;
    search$: (req: ModelControllerReqs<R, T>["search$"]) => Promise<{
        results: (IsObjectId | ModelControllerJson<T>)[];
    }>;
};
