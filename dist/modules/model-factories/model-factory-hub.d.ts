import { Keys } from "@onebro/oba-common";
import { ModelFactory } from "./model-factory";
export declare type ModelFactoryHub<F> = {
    [k in Keys<F>]: F[k] extends ModelFactory<infer T> ? ModelFactory<T> : never;
};
