import OBACore from "@onebro/oba-core";
import OB, {Keys} from "@onebro/oba-common";
import {Model} from "../../../src";
import {
  ApiModelSignatures as Sigs,
  ApiModelFactories,
} from "../../models";

export type FactoryCRUDMethods = {
  "create":"config";
  "update":"updates";
  "fetch":"fetches";
  "query":"queries";
  "remove":"fetches";
};
export interface FactoryNetwork {
  users:string[];
  factories:ApiModelFactories;
  instances:{[k in Keys<Sigs>]:Model<Sigs[k]>["instance"][];};
  init:(core:OBACore) => Promise<void>;
}
export class FactoryNetwork {
  users = [OB.slugId("John"),OB.slugId("Jim"),OB.slugId("Jenn"),OB.slugId("Jack")];
  init = async (core:OBACore) => {
    this.factories = await new ApiModelFactories().init(core);
    const instances:any = {};
    for(const k in this.factories) instances[k as Keys<Sigs>] = [];
    this.instances = instances as FactoryNetwork["instances"];
  };
}
export type FactoryTestData = {[k in Keys<Sigs>]:{[l in Keys<FactoryCRUDMethods>]:(O:FactoryNetwork) => Model<Sigs[k]>[FactoryCRUDMethods[l]][];};};
export type FactoryTestFunc = {[k in Keys<Sigs>]:{[l in Keys<FactoryCRUDMethods>]:(O:FactoryNetwork) => Promise<void>;};};