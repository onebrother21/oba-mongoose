import { Keys, Values, Strings, AnyBoolean } from "@onebro/oba-common";
import { IsObjectId, Model } from "../model-types";
export declare type ModelControllerReqUserRole<R> = R extends Strings ? Values<R> : never;
export declare type ModelControllerQuery<T> = Model<T>["queries"] | Record<Keys<Model<T>["queries"]>, string>;
export declare type ModelControllerReqUserData<R = undefined> = Partial<{
    role: ModelControllerReqUserRole<R>;
    name: string;
    device: string;
    next: string;
    okto: string;
}>;
declare type ModelControllerReqParams<P> = P extends undefined ? {} : {
    params: P;
};
declare type ModelControllerReqBody<B> = B extends undefined ? {} : {
    body: B;
};
declare type ModelControllerReqQuery<Q> = Q extends undefined ? {} : {
    query: Q;
};
declare type ModelControllerReqUser<R> = R extends undefined ? {} : {
    appuser: ModelControllerReqUserData<R>;
};
export declare type ModelControllerReq<P = undefined, B = undefined, Q = undefined, R = undefined> = ModelControllerReqParams<P> & ModelControllerReqBody<B> & ModelControllerReqQuery<Q> & ModelControllerReqUser<R>;
export declare type ModelControllerResp<R, T> = {
    data: T;
    auth?: AnyBoolean;
} & Partial<ModelControllerReqUserData<R>>;
export declare type ModelControllerReqs<R, T> = {
    create: ModelControllerReq<undefined, Model<T>["config"], undefined, R>;
    action: ModelControllerReq<undefined, Partial<Model<T>["config"]>, undefined, R>;
    fetchID: ModelControllerReq<{
        id: IsObjectId;
    }, undefined, undefined, R>;
    fetch: ModelControllerReq<Model<T>["fetches"], undefined, undefined, R>;
    update: ModelControllerReq<{
        id: IsObjectId;
    }, Model<T>["updates"], undefined, R>;
    remove: ModelControllerReq<{
        id: IsObjectId;
    }, undefined, undefined, R>;
    remove_: ModelControllerReq<{
        id: IsObjectId;
        admin: IsObjectId;
    }, undefined, undefined, R>;
    query: ModelControllerReq<undefined, undefined, ModelControllerQuery<T>, R>;
    search: ModelControllerReq<undefined, undefined, {
        text: string;
    }, R>;
};
export declare type ModelControllerMethods<R, T> = {
    create$: (req: ModelControllerReqs<R, T>["create"]) => Promise<ModelControllerResp<R, Model<T>["json"]>>;
    action$: (req: ModelControllerReqs<R, T>["action"]) => Promise<ModelControllerResp<R, Model<T>["json"]>>;
    fetch$: (req: ModelControllerReqs<R, T>["fetch"]) => Promise<ModelControllerResp<R, Model<T>["json"]>>;
    fetchID$: (req: ModelControllerReqs<R, T>["fetchID"]) => Promise<ModelControllerResp<R, Model<T>["json"]>>;
    update$: (req: ModelControllerReqs<R, T>["update"]) => Promise<ModelControllerResp<R, Model<T>["json"]>>;
    updateMany$: (req: ModelControllerReqs<R, T>["update"]) => Promise<ModelControllerResp<R, {
        results: (IsObjectId | Model<T>["json"])[];
    }>>;
    remove$: (req: ModelControllerReqs<R, T>["remove"]) => Promise<ModelControllerResp<R, Model<T>["json"]>>;
    remove$$: (req: ModelControllerReqs<R, T>["remove_"]) => Promise<ModelControllerResp<R, Model<T>["json"]>>;
    removeMany$: (req: ModelControllerReqs<R, T>["remove_" | "remove"]) => Promise<ModelControllerResp<R, {
        results: (IsObjectId | Model<T>["json"])[];
    }>>;
    query$: (req: ModelControllerReqs<R, T>["query"]) => Promise<ModelControllerResp<R, {
        results: (IsObjectId | Model<T>["json"])[];
    }>>;
    search$: (req: ModelControllerReqs<R, T>["search"]) => Promise<ModelControllerResp<R, {
        results: (IsObjectId | Model<T>["json"])[];
    }>>;
};
export {};
