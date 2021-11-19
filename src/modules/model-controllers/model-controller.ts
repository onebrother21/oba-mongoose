import OBACoreApi from "@onebro/oba-core-api";
import {Keys} from "@onebro/oba-common";
import {Model} from "../model-types";
import {ModelFactoryConstructors,modelFactoryHub} from "../model-factories";
import {ModelControllerReqUserRole} from "./model-controller-reqs";
import {ModelControllerType} from "./model-controller-types";

export interface ModelController<Ev,Sigs,k extends Keys<Sigs>,Roles> extends ModelControllerType<Ev,Sigs,k,Roles> {}
export class ModelController<Ev,Sigs,k extends Keys<Sigs>,Roles> {
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
  isBadStatus = (o:Model<Sigs[k]>["instance"]) => this.badStatuses.includes(o.status.name as any);
  init$ = async (constructors:ModelFactoryConstructors<Ev,Sigs>) => {
    this.factories = await modelFactoryHub<Ev,Sigs>(this.core,constructors);
    return this;
  };
}