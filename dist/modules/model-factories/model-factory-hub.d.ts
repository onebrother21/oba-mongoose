import { Keys, Constructor } from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import { ModelFactory } from "./model-factory";
export declare type ModelFactoryHub<Ev, H> = {
    [k in Keys<H>]: ModelFactory<Ev, H[k]>;
};
export declare type ModelFactoryConstructors<Ev, H> = {
    [k in Keys<H>]: Constructor<ModelFactory<Ev, H[k]>>;
};
export declare const modelFactoryHub: <Ev, H>(core: OBACoreApi<Ev>, factory_constructors: ModelFactoryConstructors<Ev, H>) => Promise<ModelFactoryHub<Ev, H>>;
