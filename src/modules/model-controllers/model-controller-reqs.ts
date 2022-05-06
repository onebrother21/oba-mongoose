import {Values,Strings, AnyBoolean} from "@onebro/oba-common";
import {IsObjectId,Model,ModelFetchObject} from "../model-types";

export type ModelControllerConfig<T> = Model<T>["config"];
export type ModelControllerUpdates<T> = Model<T>["updates"];
export type ModelControllerQueries<T> = Model<T>["queries"];
export type ModelControllerFetches<T> = ModelFetchObject<T>;
export type ModelControllerJson<T> = Model<T>["json"];
export type ModelControllerFetchByIdParam = {id:IsObjectId;};
export type ModelControllerFetchByIdAdminParam = ModelControllerFetchByIdParam & {adminId:string;};
export type ModelControllerReqUserRole<R> = R extends Strings?Values<R>:never;
export type ModelControllerReqUserCreds<R = undefined> = {
  appuser:string;
  authtkn:{
    username:string;
    next:string;
    role:ModelControllerReqUserRole<R>;
    okto:string;
  };
};
export type ModelControllerReqParams<P> = P extends undefined?{}:{params:P;};
export type ModelControllerReqBody<B> = B extends undefined?{}:{body:B;};
export type ModelControllerReqQuery<Q> = Q extends undefined?{}:{query:Q;};
export type ModelControllerReq<P = undefined,B = undefined,Q = undefined,R = undefined> =
ModelControllerReqUserCreds<R> &
ModelControllerReqParams<P> &
ModelControllerReqBody<B> &
ModelControllerReqQuery<Q>;
export type ModelControllerResp<T> = {user:string;data:T;auth:AnyBoolean;};
export type ModelControllerBaseReqs<R,T> = {
  C:ModelControllerReq<undefined,ModelControllerConfig<T>,undefined,R>;
  F:ModelControllerReq<ModelControllerFetches<T>,undefined,undefined,R>;
  U:ModelControllerReq<ModelControllerFetches<T>,ModelControllerUpdates<T>,undefined,R>;
  R:ModelControllerReq<ModelControllerFetchByIdParam,undefined,undefined,R>;
  X:ModelControllerReq<ModelControllerFetchByIdAdminParam,undefined,undefined,R>;
  Q:ModelControllerReq<undefined,undefined,ModelControllerQueries<T>,R>;
  S:ModelControllerReq<undefined,undefined,{text:string},R>;
};
export type ModelControllerExtReqs<R,T> = {
  create$:ModelControllerBaseReqs<R,T>["C"];
  fetch$:ModelControllerBaseReqs<R,T>["F"];
  update$:ModelControllerBaseReqs<R,T>["U"];
  remove$:ModelControllerBaseReqs<R,T>["R"];
  remove$$:ModelControllerBaseReqs<R,T>["X"];
  query$:ModelControllerBaseReqs<R,T>["Q"];
  search$:ModelControllerBaseReqs<R,T>["S"];
};
export type ModelControllerReqs<R,T> = ModelControllerBaseReqs<R,T> & ModelControllerExtReqs<R,T>;
export type ModelControllerMethods<R,T> = {
  create$:(req:ModelControllerReqs<R,T>["create$"]) => Promise<ModelControllerResp<ModelControllerJson<T>>>;
  fetch$:(req:ModelControllerReqs<R,T>["fetch$"]) => Promise<ModelControllerResp<ModelControllerJson<T>>>;
  update$:(req:ModelControllerReqs<R,T>["update$"]) => Promise<ModelControllerResp<ModelControllerJson<T>>>;
  updateMany$:(req:ModelControllerReqs<R,T>["update$"]) => Promise<ModelControllerResp<{results:(IsObjectId|ModelControllerJson<T>)[]}>>;
  remove$:(req:ModelControllerReqs<R,T>["remove$"]) => Promise<ModelControllerResp<ModelControllerJson<T>>>;
  remove$$:(req:ModelControllerReqs<R,T>["remove$$"]) => Promise<ModelControllerResp<ModelControllerJson<T>>>;
  removeMany$:(req:ModelControllerReqs<R,T>["remove$"]) => Promise<ModelControllerResp<{results:(IsObjectId|ModelControllerJson<T>)[]}>>;
  query$:(req:ModelControllerReqs<R,T>["query$"]) => Promise<ModelControllerResp<{results:(IsObjectId|ModelControllerJson<T>)[]}>>;
  search$:(req:ModelControllerReqs<R,T>["search$"]) => Promise<ModelControllerResp<{results:(IsObjectId|ModelControllerJson<T>)[]}>>;
};