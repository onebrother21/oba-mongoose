import { Types } from "mongoose";
import { Keys, Values, Enum, EnumPick, Info, TimeNInfo, Primitive, Strings, AnyBoolean, Entity } from "@onebro/oba-common";
export declare type IsObjectId = string | Types.ObjectId;
export declare type IsPrimitive = Primitive | Types.ObjectId;
export declare type ModelStages = "C" | "I" | "J";
export declare type SpecialType<S extends Strings, t extends ModelStages, K extends string = "type"> = {
    [k in K]: t extends "I" ? Keys<S> : Values<S>;
};
export declare type Status<S extends Strings, t extends ModelStages> = SpecialType<S, t, "name"> & TimeNInfo;
export declare type InfoMapOne<S extends Strings, T> = Map<Values<S>, T>;
export declare type InfoMapTwo<S extends Strings, T> = Enum<T, undefined, Values<S>>;
export declare type InfoHashMap<S extends Strings, T, t extends ModelStages> = t extends "I" ? InfoMapOne<S, T> : InfoMapTwo<S, T>;
export declare type Settings<S> = Enum<string, "lang" | "version"> & Info<"data"> & {
    app: S;
};
export declare type CommonStringProps = "name" | "bio" | "motto" | "body" | "title" | "slug";
export declare type CommonNumberProps = "amt" | "price" | "rating" | "qty";
export declare type CommonBooleanProps = "active" | "open";
export declare type CommonProps = Record<CommonStringProps, string> & Record<CommonNumberProps, number> & Record<CommonBooleanProps, boolean>;
export declare type CommonPropSelector<k extends Keys<CommonProps> = undefined, j extends Keys<CommonProps> = undefined> = EnumPick<CommonProps, k, j>;
export declare type TestProps = Partial<{
    str: string;
    bool: boolean;
    num: number;
    date: Date;
    arr: any[];
    obj: {
        a: number;
        b: string;
        c: boolean;
    };
    func: (a?: any) => void;
}>;
/** MODEL BASE TYPES:C -> CONFIG,I -> INSTANCE,J -> JSON */
export declare type ModelObject<S extends Strings, t extends ModelStages> = Omit<Entity, "id"> & {
    id: IsObjectId;
    status: Status<S, t>;
};
export declare type ModelObjectConfig<S extends Strings> = Pick<ModelObject<S, "C">, "info" | "desc">;
export declare type ModelObjectIdStamp<S extends Strings> = Pick<ModelObject<S, "J">, "id" | "stat">;
export declare type ModelName = {
    model: string;
};
export declare type ModelMiscReference = ModelName & {
    oid: IsObjectId;
};
export declare type ModelPopulationRef = ModelName & {
    path: string;
    populate?: ModelPopulationRef[];
};
export declare type ModelSelfRefConfig = {
    arr: AnyBoolean;
    out: "J" | "P" | "json" | "preview";
};
export declare type ModelSelfRefsConfig = Enum<ModelSelfRefConfig, string>;
export declare type ModelAsPropSignature<C, I, J> = {
    C: C;
    I: I;
    J: J;
};
export declare type ModelLvl0Signature<C, I, J> = {
    C: C;
    I: I;
    J: J;
};
export declare type ModelPropSelector<T, k extends Keys<T> = undefined, j extends Keys<T> = undefined> = EnumPick<T, k, j>;
