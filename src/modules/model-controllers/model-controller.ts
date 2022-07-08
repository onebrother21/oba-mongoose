import OBACore from "@onebro/oba-core";
import OB, {Keys,Values} from "@onebro/oba-common";
import {Model} from "../model-types";
import {ModelFactoryHub} from "../model-factories";
import {ModelControllerMethods,ModelControllerQuery,ModelControllerReqUserRole} from "./model-controller-reqs";

export type ModelControllerType<R,T> = ModelControllerMethods<R,T> & {
  core:OBACore;
  privileges:string[];
  badStatuses:Values<Model<T>["statuses"]>[];
  unauthorized:(s:string) => void;
  isAuth:(priv?:string[],okto?:string) => void;
  isRole:(R:ModelControllerReqUserRole<R>[],role?:ModelControllerReqUserRole<R>) => void;
  isBadStatus:(o:Model<T>["instance"]) => boolean;
};
export interface ModelController<R,T> extends ModelControllerType<R,T> {}
export class ModelController<R,T> {
  constructor(public core:OBACore){
    this.privileges = ["use-api"];
    this.badStatuses = ["Deleted" as any];
  }
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
  isAuth = (privileges?:string[],okto?:string) => {
    switch(true){
      case !(privileges||this.privileges).includes(okto):this.unauthorized("api privileges");break;
      default:break;
    }
  };
  isRole = (roles:ModelControllerReqUserRole<R>[],role?:ModelControllerReqUserRole<R>) => {
    switch(true){
      case !roles.includes(role):this.unauthorized("api privileges");break;
      default:break;
    }
  };
  isBadStatus = (o:Model<T>["instance"]) => this.badStatuses.includes(o.status.name as any);
}