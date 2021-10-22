import { Keys, Constructor } from "@onebro/oba-common";
import OBACoreApi from "@onebro/oba-core-api";
import { ModelFactory } from "./model-factory";
export declare type ModelFactoryHub<H> = {
    [k in Keys<H>]: ModelFactory<H[k]>;
};
export declare type ModelFactoryConstructors<H> = {
    [k in Keys<H>]: Constructor<ModelFactory<H[k]>>;
};
export declare const modelFactoryHub: <H>(core: OBACoreApi<null>, factory_constructors: ModelFactoryConstructors<H>) => Promise<ModelFactoryHub<H>>;
