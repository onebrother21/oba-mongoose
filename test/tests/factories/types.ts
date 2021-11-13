import OBACoreApi from "@onebro/oba-core-api";
import {Keys,Await,GetParameterIfFunc} from "@onebro/oba-common";
import {modelFactoryHub} from "../../../src";
import {
  ApiModelFactoryTypes as Types,
  ApiModelFactoryHub as Hub,
  getApiModelFactories as Factories,
} from "../../models";

export type FactoryNames<Ev> = Keys<Hub<Ev>>;
export type FactoryCRUDMethodNames = "create"|"update"|"fetch"|"query"|"remove";
export type FactoryCRUDMethodParam<Ev,
k extends FactoryNames<Ev>,
l extends FactoryCRUDMethodNames,
n extends number> =  GetParameterIfFunc<Hub<Ev>[k][l],n>;
export type FactoryInstance<Ev,k extends FactoryNames<Ev>> = Await<ReturnType<Hub<Ev>[k]["create"]>>;
export type FactoryInstances<Ev> = Partial<{[k in FactoryNames<Ev>]:FactoryInstance<Ev,k>[];}>;
export interface FactoryNetwork<Ev> {
  factories:Hub<Ev>;
  instances:FactoryInstances<Ev>;
  init:(core:OBACoreApi<Ev>) => Promise<void>;
}
export class FactoryNetwork<Ev> {
  constructor(){this.instances = {};}
  init = async (core:OBACoreApi<Ev>) => {
    this.factories = await modelFactoryHub<Ev,Types>(core,Factories<Ev>());
    for(const k in this.factories) this.instances[k as FactoryNames<Ev>] = [];
  };
}
export type FactoryTestData<Ev,
k extends FactoryNames<Ev>,
l extends FactoryCRUDMethodNames,
n extends 0|1> = (I:FactoryNetwork<Ev>["instances"]) => FactoryCRUDMethodParam<Ev,k,l,n>[];
export type FactoryTestFunc<Ev,k,l> = (O:FactoryNetwork<Ev>) => Promise<void>;