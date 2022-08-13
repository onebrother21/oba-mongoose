import {Keys,Values,Strings,AnyBoolean} from "@onebro/oba-common";
import {IsObjectId,Model,ModelFetchObject} from "../model-types";

export type ModelControllerReqUserRole<R> = R extends Strings?Values<R>:never;
export type ModelControllerQuery<T> = Model<T>["queries"]|Record<Keys<Model<T>["queries"]>,string>;
export type ModelControllerReqUserData<R = undefined> = Partial<{
  role:ModelControllerReqUserRole<R>;
  name:string;
  device:string;
  next:string;
  okto:string;
}>;
type ModelControllerReqParams<P> = P extends undefined?{}:{params:P;};
type ModelControllerReqBody<B> = B extends undefined?{}:{body:B;};
type ModelControllerReqQuery<Q> = Q extends undefined?{}:{query:Q;};
type ModelControllerReqUser<R> = R extends undefined?{}:{appuser:ModelControllerReqUserData<R>;};
export type ModelControllerReq<P = undefined,B = undefined,Q = undefined,R = undefined> =
ModelControllerReqParams<P> &
ModelControllerReqBody<B> &
ModelControllerReqQuery<Q> &
ModelControllerReqUser<R>;
export type ModelControllerResp<R,T> = {data:T;auth?:AnyBoolean;} & Partial<ModelControllerReqUserData<R>>;
export type ModelControllerReqs<R,T> = {
  create:ModelControllerReq<undefined,Model<T>["config"],undefined,R>;
  action:ModelControllerReq<undefined,Partial<Model<T>["config"]>,undefined,R>;
  fetch:ModelControllerReq<{id:IsObjectId;}|ModelFetchObject<T>,undefined,undefined,R>;
  update:ModelControllerReq<{id:IsObjectId;},Model<T>["updates"],undefined,R>;
  remove:ModelControllerReq<{id:IsObjectId;},undefined,undefined,R>;
  remove_:ModelControllerReq<{id:IsObjectId;admin:IsObjectId;},undefined,undefined,R>;
  query:ModelControllerReq<undefined,undefined,ModelControllerQuery<T>,R>;
  search:ModelControllerReq<undefined,undefined,{text:string},R>;
};
export type ModelControllerMethods<R,T> = {
  create$:(req:ModelControllerReqs<R,T>["create"]) => Promise<ModelControllerResp<R,Model<T>["json"]>>;
  action$:(req:ModelControllerReqs<R,T>["action"]) => Promise<ModelControllerResp<R,Model<T>["json"]>>;
  fetch$:(req:ModelControllerReqs<R,T>["fetch"]) => Promise<ModelControllerResp<R,Model<T>["json"]>>;
  update$:(req:ModelControllerReqs<R,T>["update"]) => Promise<ModelControllerResp<R,Model<T>["json"]>>;
  updateMany$:(req:ModelControllerReqs<R,T>["update"]) => Promise<ModelControllerResp<R,{results:(IsObjectId|Model<T>["json"])[]}>>;
  remove$:(req:ModelControllerReqs<R,T>["remove"]) => Promise<ModelControllerResp<R,Model<T>["json"]>>;
  remove$$:(req:ModelControllerReqs<R,T>["remove_"]) => Promise<ModelControllerResp<R,Model<T>["json"]>>;
  removeMany$:(req:ModelControllerReqs<R,T>["remove_"|"remove"]) => Promise<ModelControllerResp<R,{results:(IsObjectId|Model<T>["json"])[]}>>;
  query$:(req:ModelControllerReqs<R,T>["query"]) => Promise<ModelControllerResp<R,{results:(IsObjectId|Model<T>["json"])[]}>>;
  search$:(req:ModelControllerReqs<R,T>["search"]) => Promise<ModelControllerResp<R,{results:(IsObjectId|Model<T>["json"])[]}>>;
};