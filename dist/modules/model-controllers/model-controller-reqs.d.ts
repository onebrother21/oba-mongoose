import { Values, Strings, NoneOfType } from "@onebro/oba-common";
import { IsObjectId, Model } from "../model-types";
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
export declare type ModelControllerFetchIdReq<Sig> = {
    id: IsObjectId;
};
export declare type ModelControllerFetchReq<Sig> = ModelControllerFetchIdReq<Sig> | NoneOfType<Model<Sig>["fetches"], IsObjectId>;
export declare type ModelControllerFetchAdminReq<Sig> = ModelControllerFetchIdReq<Sig> & {
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
export declare type ModelControllerBaseReqs<Sig, Roles> = {
    C: ModelControllerReq<undefined, Model<Sig>["config"], undefined, Roles>;
    F: ModelControllerReq<ModelControllerFetchReq<Sig>, undefined, undefined, Roles>;
    U: ModelControllerReq<ModelControllerFetchReq<Sig>, Model<Sig>["updates"], undefined, Roles>;
    R: ModelControllerReq<ModelControllerFetchIdReq<Sig>, undefined, undefined, Roles>;
    X: ModelControllerReq<ModelControllerFetchAdminReq<Sig>, undefined, undefined, Roles>;
    Q: ModelControllerReq<undefined, undefined, Model<Sig>["queries"], Roles>;
    S: ModelControllerReq<undefined, undefined, {
        text: string;
    }, Roles>;
};
export declare type ModelControllerExtReqs<Sig, Roles> = {
    create$: ModelControllerBaseReqs<Sig, Roles>["C"];
    fetch$: ModelControllerBaseReqs<Sig, Roles>["F"];
    update$: ModelControllerBaseReqs<Sig, Roles>["U"];
    remove$: ModelControllerBaseReqs<Sig, Roles>["R"];
    remove$$: ModelControllerBaseReqs<Sig, Roles>["X"];
    query$: ModelControllerBaseReqs<Sig, Roles>["Q"];
    search$: ModelControllerBaseReqs<Sig, Roles>["S"];
};
export declare type ModelControllerReqs<Sig, Roles> = ModelControllerBaseReqs<Sig, Roles> & ModelControllerExtReqs<Sig, Roles>;
export declare type ModelControllerMethods<Sig, Roles> = {
    create$: (o: ModelControllerReqs<Sig, Roles>["create$"]) => Promise<Model<Sig>["json"]>;
    fetch$: (o: ModelControllerReqs<Sig, Roles>["fetch$"]) => Promise<Model<Sig>["json"]>;
    update$: (o: ModelControllerReqs<Sig, Roles>["update$"]) => Promise<Model<Sig>["json"]>;
    updateMany$: (o: ModelControllerReqs<Sig, Roles>["update$"]) => Promise<{
        results: (IsObjectId | Model<Sig>["json"])[];
    }>;
    remove$: (o: ModelControllerReqs<Sig, Roles>["remove$"]) => Promise<Model<Sig>["json"]>;
    remove$$: (o: ModelControllerReqs<Sig, Roles>["remove$$"]) => Promise<Model<Sig>["json"]>;
    removeMany$: (q: ModelControllerReqs<Sig, Roles>["remove$"]) => Promise<{
        results: (IsObjectId | Model<Sig>["json"])[];
    }>;
    query$: (o: ModelControllerReqs<Sig, Roles>["query$"]) => Promise<{
        results: (IsObjectId | Model<Sig>["json"])[];
    }>;
    search$: (o: ModelControllerReqs<Sig, Roles>["search$"]) => Promise<{
        results: (IsObjectId | Model<Sig>["json"])[];
    }>;
};
