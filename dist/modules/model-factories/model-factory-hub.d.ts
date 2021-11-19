import { Keys, Constructor } from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import { ModelFactory } from "./model-factory";
export declare type ModelFactoryHub<Ev, Sigs> = {
    [k in Keys<Sigs>]: ModelFactory<Ev, Sigs[k]>;
};
export declare type ModelFactoryConstructors<Ev, Sigs> = {
    [k in Keys<Sigs>]: Constructor<ModelFactory<Ev, Sigs[k]>>;
};
export declare const modelFactoryHub: <Ev, Sigs>(core: OBACoreApi<Ev>, factory_constructors: ModelFactoryConstructors<Ev, Sigs>) => Promise<ModelFactoryHub<Ev, Sigs>>;
