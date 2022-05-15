import {Keys,Values,Strings, AnyBoolean} from "@onebro/oba-common";
import {IsObjectId,Model} from "../model-types";

export type ModelControllerReqUserRole<R> = R extends Strings?Values<R>:never;
export type ModelControllerQuery<T> = Model<T>["queries"]|Record<Keys<Model<T>["queries"]>,string>;
type ModelControllerReqUserCreds<R = undefined> = {
  appuser:string;
  authtkn:{
    username:string;
    next:string;
    role:ModelControllerReqUserRole<R>;
    okto:string;
  };
};
type ModelControllerReqParams<P> = P extends undefined?{}:{params:P;};
type ModelControllerReqBody<B> = B extends undefined?{}:{body:B;};
type ModelControllerReqQuery<Q> = Q extends undefined?{}:{query:Q;};
export type ModelControllerReq<P = undefined,B = undefined,Q = undefined,R = undefined> =
ModelControllerReqUserCreds<R> &
ModelControllerReqParams<P> &
ModelControllerReqBody<B> &
ModelControllerReqQuery<Q>;
export type ModelControllerResp<T> = {
  user:string;
  data:T;
  auth:AnyBoolean;
};
export type ModelControllerReqs<R,T> = {
  create:ModelControllerReq<undefined,Model<T>["config"],undefined,R>;
  action:ModelControllerReq<undefined,Partial<Model<T>["config"]>,undefined,R>;
  fetchID:ModelControllerReq<{id:IsObjectId;},undefined,undefined,R>;
  fetch:ModelControllerReq<Model<T>["fetches"],undefined,undefined,R>;
  update:ModelControllerReq<{id:IsObjectId;},Model<T>["updates"],undefined,R>;
  remove:ModelControllerReq<{id:IsObjectId;},undefined,undefined,R>;
  remove_:ModelControllerReq<{id:IsObjectId;admin:IsObjectId;},undefined,undefined,R>;
  query:ModelControllerReq<undefined,undefined,ModelControllerQuery<T>,R>;
  search:ModelControllerReq<undefined,undefined,{text:string},R>;
};
export type ModelControllerMethods<R,T> = {
  create$:(req:ModelControllerReqs<R,T>["create"]) => Promise<ModelControllerResp<Model<T>["json"]>>;
  action$:(req:ModelControllerReqs<R,T>["action"]) => Promise<ModelControllerResp<Model<T>["json"]>>;
  fetch$:(req:ModelControllerReqs<R,T>["fetch"]) => Promise<ModelControllerResp<Model<T>["json"]>>;
  fetchID$:(req:ModelControllerReqs<R,T>["fetchID"]) => Promise<ModelControllerResp<Model<T>["json"]>>;
  update$:(req:ModelControllerReqs<R,T>["update"]) => Promise<ModelControllerResp<Model<T>["json"]>>;
  updateMany$:(req:ModelControllerReqs<R,T>["update"]) => Promise<ModelControllerResp<{results:(IsObjectId|Model<T>["json"])[]}>>;
  remove$:(req:ModelControllerReqs<R,T>["remove"]) => Promise<ModelControllerResp<Model<T>["json"]>>;
  remove$$:(req:ModelControllerReqs<R,T>["remove_"]) => Promise<ModelControllerResp<Model<T>["json"]>>;
  removeMany$:(req:ModelControllerReqs<R,T>["remove_"|"remove"]) => Promise<ModelControllerResp<{results:(IsObjectId|Model<T>["json"])[]}>>;
  query$:(req:ModelControllerReqs<R,T>["query"]) => Promise<ModelControllerResp<{results:(IsObjectId|Model<T>["json"])[]}>>;
  search$:(req:ModelControllerReqs<R,T>["search"]) => Promise<ModelControllerResp<{results:(IsObjectId|Model<T>["json"])[]}>>;
};