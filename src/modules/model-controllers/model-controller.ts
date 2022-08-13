import OBACore from "@onebro/oba-core";
import OB,{Keys,Values} from "@onebro/oba-common";
import {IsObjectId,Model,ModelFetchObject} from "../model-types";
import {
  ModelControllerMethods,
  ModelControllerQuery,
  ModelControllerReqUserRole,
} from "./model-controller-reqs";

export type ModelControllerType<R,T> = ModelControllerMethods<R,T> & {
  core:OBACore;
  privileges?:string[];
  badStatuses?:Values<Model<T>["statuses"]>[];
  adminRoles?:ModelControllerReqUserRole<R>[];
};
export interface ModelController<R,T> extends ModelControllerType<R,T> {
  unauthorized:(s:string) => never;
  isAuthed:(okto?:string) => void;
  isAdmin:(role?:ModelControllerReqUserRole<R>) => void;
  isBadStatus:(o:Model<T>["instance"]) => boolean;
}
export class ModelController<R,T> {
  constructor(public core:OBACore){}
  serializeFetch = (params:{id:IsObjectId}|ModelFetchObject<T>) => (params as any).id||params;
  parseQueryObj = (q:ModelControllerQuery<T>):Model<T>["queries"] => {
    const q_:Partial<Model<T>["queries"]> = {};
    for(const k in q){
      const K = k as Keys<Model<T>["queries"]>;
      const o = q[K];
      q_[K] = OB.str(o)?OB.parse(o):o;
    }
    return q_ as Model<T>["queries"];
  };
  unauthorized = (s:string) => {throw this.core.e._.unauthorized(s);};
  isAuthed = (okto?:string) => {
    if(this.privileges) switch(true){
      case !(this.privileges).includes(okto):this.unauthorized("api privileges");break;
      default:break;
    }
  };
  isAdmin = (role?:ModelControllerReqUserRole<R>) => {
    if(this.adminRoles) switch(true){
      case !this.adminRoles.includes(role):this.unauthorized("api privileges");break;
      default:break;
    }
  };
  isBadStatus = (o:Model<T>["instance"]) => this.badStatuses?this.badStatuses.includes(o.status.name as any):false;
}