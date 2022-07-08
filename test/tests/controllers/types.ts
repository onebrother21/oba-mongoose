import OBACore from "@onebro/oba-core";
import OB, {Keys} from "@onebro/oba-common";
import {Model,ModelControllerReqs} from "../../../src";
import {
  ApiModelSignatures as Sigs,
  ApiModelControllers,
  ApiUserRoles as Roles,
} from "../../models";

export type ControllerCRUDMethodNames =  "create$"|"update$"|"fetch$"|"query$"|"remove$";
export interface ControllerNetwork {
  users:string[];
  controllers:ApiModelControllers;
  jsons:{[k in Keys<Sigs>]:Model<Sigs[k]>["json"][];};
  init:(core:OBACore) => Promise<void>;
}
export class ControllerNetwork {
  users = [OB.slugId("John"),OB.slugId("Jim"),OB.slugId("Jenn"),OB.slugId("Jack")];
  init = async (core:OBACore) => {
    this.controllers = await new ApiModelControllers().init$(core);
    const jsons:any = {};
    for(const k in this.controllers) k !== "init$"?jsons[k as Keys<Sigs>] = []:null;
    this.jsons = jsons as ControllerNetwork["jsons"];
  };
}
export type controllerreq<k extends Keys<Sigs>> = ModelControllerReqs<Roles,Sigs[k]>;
export type ControllerTestData = {[k in Keys<Sigs>]:{[l in Keys<controllerreq<k>>]:(O:ControllerNetwork) => controllerreq<k>[l][];};};
export type ControllerTestFunc = {[k in Keys<Sigs>]:{[l in Keys<controllerreq<k>>]:(O:ControllerNetwork) => Promise<void>;};};