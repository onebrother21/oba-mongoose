import {Keys,Constructor} from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import {ModelFactory} from "./model-factory";

export type ModelFactoryHub<F> = {[k in Keys<F>]:F[k] extends ModelFactory<infer T>?ModelFactory<T>:never;};


/*
export type ModelFactoryConstructors<Sigs> = {[k in  Keys<Sigs>]:Constructor<ModelFactory<Sigs[k]>>;};
export type t<FC> = FC extends ModelFactoryConstructors<infer Sigs>?(core:OBACoreApi,factory_constructors:FC) => Promise<ModelFactoryHub<Sigs>>:never;
export interface ModelFactoryHubConstructor<FC> {init:t<FC>;}
export class ModelFactoryHubConstructor<FC> {
  constructor(){
    this.init = async (core,factory_constructors) => {
      const factories:any = {};
      for(const k in factory_constructors){
        //const K = k as Keys<Sigs>;
        const ctr = factory_constructors[k];
        const factory = new ctr(core);
        factories[k] = await factory.init();
      }
      return factories;
    };
  }
}
*/