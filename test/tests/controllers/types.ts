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
  jsons:Partial<{[k in Keys<Sigs>]:Model<Sigs[k]>["json"][];}>;
  init:(core:OBACore) => Promise<void>;
}
export class ControllerNetwork {
  users = [OB.slugId("John"),OB.slugId("Jim"),OB.slugId("Jenn"),OB.slugId("Jack")];
  constructor(){this.jsons = {};}
  init = async (core:OBACore) => {
    this.controllers = await new ApiModelControllers().init$(core);
    for(const k in this.controllers) this.jsons[k as Keys<Sigs>] = [];
  };
}
export type ControllerTestData<
k extends Keys<Sigs>,
l extends Keys<ModelControllerReqs<Roles,Sigs[k]>>> = (O:ControllerNetwork) => ModelControllerReqs<Roles,Sigs[k]>[l][];
export type ControllerTestFunc<k,l> = (O:ControllerNetwork) => Promise<void>;