import OBACoreApi from "@onebro/oba-core-api";
import {Keys} from "@onebro/oba-common";
import {ModelInstance} from "../model-types";
import {ModelFactoryConstructors,modelFactoryHub} from "../model-factories";
import {ModelControllerReqUserRole} from "./model-controller-reqs";
import {ModelControllerType} from "./model-controller-types";

export interface ModelController<Ev,Hub,k extends Keys<Hub>,Roles> extends ModelControllerType<Ev,Hub,k,Roles> {}
export class ModelController<Ev,Hub,k extends Keys<Hub>,Roles> {
  constructor(public core:OBACoreApi<Ev>){
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
  isBadStatus = (o:ModelInstance<Hub[k]>) => this.badStatuses.includes(o.status.name as any);
  init$ = async (constructors:ModelFactoryConstructors<Ev,Hub>) => {
    this.factories = await modelFactoryHub<Ev,Hub>(this.core,constructors);
    return this;
  };
}