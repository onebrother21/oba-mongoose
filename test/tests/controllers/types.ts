import OBACoreApi from "@onebro/oba-core-api";
import {Keys,Await,GetParameterIfFunc} from "@onebro/oba-common";
import {modelControllerHub} from "../../../src";
import {
  ApiModelControllerTypes as Types,
  ApiModelControllerHub as Hub,
  getApiModelControllers as Controllers,
  ApiUserRoles as Roles,
  getApiModelFactories as Factories,
} from "../../models";

export type ControllerNames<Ev> = Keys<Hub<Ev>>;
export type ControllerCRUDMethodNames =  "create$"|"update$"|"fetch$"|"query$"|"remove$";
export type ControllerCRUDMethodParam<Ev,
k extends ControllerNames<Ev>,
l extends ControllerCRUDMethodNames,
n extends number> =  GetParameterIfFunc<Hub<Ev>[k][l],n>;
export type ControllerJson<Ev,k extends ControllerNames<Ev>> = Await<ReturnType<Hub<Ev>[k]["create$"]>>;
export type ControllerJsons<Ev> = Partial<{[k in ControllerNames<Ev>]:ControllerJson<Ev,k>[];}>;

export interface ControllerNetwork<Ev> {
  controllers:Hub<Ev>;
  jsons:ControllerJsons<Ev>;
  init:(core:OBACoreApi<Ev>) => Promise<void>;
}
export class ControllerNetwork<Ev> {
  constructor(){this.jsons = {};}
  init = async (core:OBACoreApi<Ev>) => {
    this.controllers = await modelControllerHub<Ev,Types,Roles>(core,Controllers<Ev>(),Factories<Ev>());
    for(const k in this.controllers) this.jsons[k as ControllerNames<Ev>] = [];
  };
}
export type ControllerTestData<Ev,
k extends ControllerNames<Ev>,
l extends ControllerCRUDMethodNames,
n extends 0|1> = (J:ControllerNetwork<Ev>["jsons"]) => ControllerCRUDMethodParam<Ev,k,l,n>[];
export type ControllerTestFunc<Ev,k,l> = (O:ControllerNetwork<Ev>) => Promise<void>;