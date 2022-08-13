import { Keys } from "@onebro/oba-common";
import { IsObjectId } from "./model-signature-0";
import { ModelL1 } from "./model-signature-1";
/** LEVEL TWO MODEL TYPES:P -> PREVIEW,R -> SELF REFS */
export declare type SelfRefArrParam<T, k extends Keys<ModelL1<T>["R"]>> = ModelL1<T>["R"][k]["arr"];
export declare type SelfRefOutParam<T, k extends Keys<ModelL1<T>["R"]>> = ModelL1<T>["R"][k]["out"];
export declare type SelfRefArrGuard<T, k extends Keys<ModelL1<T>["R"]>, U> = SelfRefArrParam<T, k> extends true | 1 ? U[] : U;
export declare type SelfRefStageGuard<t, A, B, C> = t extends "C" ? A : t extends "I" ? B : C;
export declare type SelfRef<T, k extends Keys<ModelL1<T>["R"]>, t> = SelfRefStageGuard<t, SelfRefArrGuard<T, k, IsObjectId>, SelfRefArrGuard<T, k, ModelL2<T>["I"]>, SelfRefArrGuard<T, k, ModelL2<T>[SelfRefOutParam<T, k>]>>;
export declare type SelfRefs<T, t> = ModelL1<T>["R"] extends undefined ? {} : {
    [k in Keys<ModelL1<T>["R"]>]: SelfRef<T, k, t>;
};
export declare type ModelSelfRefs<T, t> = SelfRefs<T, t>;
export declare type ModelL2Type<T> = ModelL1<T> & {
    C: Partial<ModelSelfRefs<T, "C">>;
    I: ModelSelfRefs<T, "I"> & {
        json: () => ModelL2<T>["J"];
        preview: ModelL2<T>["P"];
    };
    J: ModelSelfRefs<T, "J">;
};
export declare type ModelL2<T> = ModelL2Type<T>;
