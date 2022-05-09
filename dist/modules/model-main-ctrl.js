/*
import OBACore from "@onebro/oba-core";
import {ModelControllerConstructors,ModelControllerHub,modelControllerHub} from "./model-controllers";
import {ModelFactoryConstructors} from "../model-factories";

export type ModelMainCtrlType<T,M,F,R> = {
  core:OBACore<null>;
  ctrl:ModelControllerHub<M>;
};
export interface ModelMainCtrl<T,M,F,R = undefined> extends ModelMainCtrlType<T,M,F,R> {}
export class ModelMainCtrl<T,M,F,R = undefined> {
  constructor(public core:OBACore<null>){}
  init$ = async (constructors:ModelControllerConstructors<M>,factories:ModelFactoryConstructors<F>)  => {
    this.ctrl = await modelControllerHub<M,F>(this.core,constructors,factories);
    return this;
  };
}
*/ 
//# sourceMappingURL=model-main-ctrl.js.map