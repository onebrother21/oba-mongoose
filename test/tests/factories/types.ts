import OBACoreApi from "@onebro/oba-core-api";
import OB, {Keys} from "@onebro/oba-common";
import {Model} from "../../../src";
import {
  ApiModelSignatures as Sigs,
  ApiModelFactories,
} from "../../models";

export type FactoryCRUDMethodNames = {
  "create":"config";
  "update":"updates";
  "fetch":"fetches";
  "query":"queries";
  "remove":"fetches";
};
export interface FactoryNetwork {
  users:string[];
  factories:ApiModelFactories;
  instances:Partial<{[k in Keys<Sigs>]:Model<Sigs[k]>["instance"][];}>;
  init:(core:OBACoreApi) => Promise<void>;
}
export class FactoryNetwork {
  users = [OB.slugId("John"),OB.slugId("Jim"),OB.slugId("Jenn"),OB.slugId("Jack")];
  constructor(){this.instances = {};}
  init = async (core:OBACoreApi) => {
    this.factories = await new ApiModelFactories().init(core);
    for(const k in this.factories) this.instances[k as Keys<Sigs>] = [];
  };
}
export type FactoryTestData<
k extends Keys<Sigs>,
l extends Keys<FactoryCRUDMethodNames>> = (O:FactoryNetwork) => Model<Sigs[k]>[FactoryCRUDMethodNames[l]][];
export type FactoryTestFunc<k,l> = (O:FactoryNetwork) => Promise<void>;