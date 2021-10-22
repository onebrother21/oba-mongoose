import OBACoreApi from "@onebro/oba-core-api";
import {Keys,Values} from "@onebro/oba-common";
import {ModelInstance,ModelStatuses} from "../model-types";
import {ModelFactoryConstructors,ModelFactoryHub,modelFactoryHub} from "../model-factories";
import {ModelControllerMethods,ModelControllerReqUserRole} from "./model-controller-reqs";

export type ModelControllerType<TT,k extends Keys<TT>,Roles> = ModelControllerMethods<TT[k],Roles> & {
  core:OBACoreApi<null>;
  factories:ModelFactoryHub<TT>;
  privileges:string[];
  badStatuses:Values<ModelStatuses<TT[k]>>[];
  unauthorized:(s:string) => void;
  isAuth:(okto:string,priv?:string[]) => void;
  isRole:(role:ModelControllerReqUserRole<Roles>,roles:ModelControllerReqUserRole<Roles>[]) => void;
  isBadStatus:(o:ModelInstance<TT[k]>) => boolean;
};
export interface ModelController<TT,k extends Keys<TT>,Roles> extends ModelControllerType<TT,k,Roles> {}
export class ModelController<TT,k extends Keys<TT>,Roles> {
  constructor(public core:OBACoreApi<null>){
    this.privileges = ["use-api"];
    this.badStatuses = ["Deleted" as any];
  }
  unauthorized = (s:string) => {throw this.core.e.unauthorized(s);};
  isAuth = (okto:string,privileges?:string[]) => {
    switch(true){
      case !(privileges||this.privileges).includes(okto):this.unauthorized("api privileges");break;
      default:break;
    }
  };
  isRole = (role:ModelControllerReqUserRole<Roles>,roles:ModelControllerReqUserRole<Roles>[]) => {
    switch(true){
      case !roles.includes(role):return this.unauthorized("api privileges");
      default:break;
    }
  };
  isBadStatus = (o:ModelInstance<TT[k]>) => this.badStatuses.includes(o.status.name as any);
  init$ = async (constructors:ModelFactoryConstructors<TT>) => {
    this.factories = await modelFactoryHub<TT>(this.core,constructors);
    return this;
  };
}