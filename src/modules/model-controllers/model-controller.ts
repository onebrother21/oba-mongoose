import OBACore from "@onebro/oba-core";
import {Keys,Values} from "@onebro/oba-common";
import {Model} from "../model-types";
import {ModelFactoryHub} from "../model-factories";
import {ModelControllerMethods,ModelControllerReqUserRole} from "./model-controller-reqs";

export type ModelControllerBaseType<R,T> = {
  core:OBACore;
  privileges:string[];
  badStatuses:Values<Model<T>["statuses"]>[];
  unauthorized:(s:string) => void;
  isAuth:(okto:string,priv?:string[]) => void;
  isRole:(role:ModelControllerReqUserRole<R>,R:ModelControllerReqUserRole<R>[]) => void;
  isBadStatus:(o:Model<T>["instance"]) => boolean;
};
export type ModelControllerType<R,T> = ModelControllerBaseType<R,T> & ModelControllerMethods<R,T>;
export interface ModelController<R,T> extends ModelControllerType<R,T> {}
export class ModelController<R,T> {
  constructor(public core:OBACore){
    this.privileges = ["use-api"];
    this.badStatuses = ["Deleted" as any];
  }
  unauthorized = (s:string) => {throw this.core.e._.unauthorized(s);};
  isAuth = (okto:string,privileges?:string[]) => {
    switch(true){
      case !(privileges||this.privileges).includes(okto):this.unauthorized("api privileges");break;
      default:break;
    }
  };
  isRole = (role:ModelControllerReqUserRole<R>,R:ModelControllerReqUserRole<R>[]) => {
    switch(true){
      case !R.includes(role):return this.unauthorized("api privileges");
      default:break;
    }
  };
  isBadStatus = (o:Model<T>["instance"]) => this.badStatuses.includes(o.status.name as any);
}