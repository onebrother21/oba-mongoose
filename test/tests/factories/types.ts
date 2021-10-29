import OBACoreApi from "@onebro/oba-core-api";
import {Keys,Await,GetParameterIfFunc} from "@onebro/oba-common";
import {modelFactoryHub} from "../../../src";
import {
  ApiModelFactoryTypes as Types,
  ApiModelFactoryHub as Hub,
  ApiModelFactories as Factories,
} from "../../models";

export type FactoryNames = Keys<Hub>;
export type FactoryCRUDMethodNames = "create"|"update"|"fetch"|"query"|"remove";
export type FactoryCRUDMethodParam<k extends FactoryNames,l extends FactoryCRUDMethodNames,n extends number> =  GetParameterIfFunc<Hub[k][l],n>;
export type FactoryInstance<k extends FactoryNames> = Await<ReturnType<Hub[k]["create"]>>;
export type FactoryInstances = Partial<{[k in FactoryNames]:FactoryInstance<k>[];}>;
export interface FactoryNetwork {
  factories:Hub;
  instances:FactoryInstances;
  init:(core:OBACoreApi<null>) => Promise<void>;
}
export class FactoryNetwork {
  constructor(){this.instances = {};}
  init = async (core:OBACoreApi<null>) => {
    this.factories = await modelFactoryHub<Types>(core,Factories);
    for(const k in this.factories) this.instances[k as FactoryNames] = [];
  };
}
export type FactoryTestData<k extends FactoryNames,l extends FactoryCRUDMethodNames,n extends 0|1> = (I:FactoryNetwork["instances"]) => FactoryCRUDMethodParam<k,l,n>[];
export type FactoryTestFunc<k,l> = (O:FactoryNetwork) => Promise<void>;