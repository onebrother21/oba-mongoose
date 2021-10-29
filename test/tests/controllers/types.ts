import OBACoreApi from "@onebro/oba-core-api";
import {Keys,Await,GetParameterIfFunc} from "@onebro/oba-common";
import {modelControllerHub} from "../../../src";
import {
  ApiModelControllerTypes as Types,
  ApiModelControllerHub as Hub,
  ApiModelControllers as Controllers,
  ApiUserRoles as Roles,
  ApiModelFactories as Factories,
} from "../../models";

export type ControllerNames = Keys<Hub>;
export type ControllerCRUDMethodNames =  "create$"|"update$"|"fetch$"|"query$"|"remove$";
export type ControllerCRUDMethodParam<k extends ControllerNames,l extends ControllerCRUDMethodNames,n extends number> =  GetParameterIfFunc<Hub[k][l],n>;
export type ControllerJson<k extends ControllerNames> = Await<ReturnType<Hub[k]["create$"]>>;
export type ControllerJsons = Partial<{[k in ControllerNames]:ControllerJson<k>[];}>;

export interface ControllerNetwork {
  controllers:Hub;
  jsons:ControllerJsons;
  init:(core:OBACoreApi<null>) => Promise<void>;
}
export class ControllerNetwork {
  constructor(){this.jsons = {};}
  init = async (core:OBACoreApi<null>) => {
    this.controllers = await modelControllerHub<Types,Roles>(core,Controllers,Factories);
    for(const k in this.controllers) this.jsons[k as ControllerNames] = [];
  };
}
export type ControllerTestData<k extends ControllerNames,l extends ControllerCRUDMethodNames,n extends 0|1> = (J:ControllerNetwork["jsons"]) => ControllerCRUDMethodParam<k,l,n>[];
export type ControllerTestFunc<k,l> = (O:ControllerNetwork) => Promise<void>;