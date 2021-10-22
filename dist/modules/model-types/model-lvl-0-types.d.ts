import { Types } from "mongoose";
import { Keys, OptionalEnum, Primitive, MiscInfo, Strings, Values, OPick } from "@onebro/oba-common";
import { AnyBoolean } from "../model-utils";
export declare type IsObjectId = string | Types.ObjectId;
export declare type IsPrimitive = Primitive | Types.ObjectId;
export declare type MiscInfoObj = {
    info?: MiscInfo;
};
export declare type TimeNInfo = {
    time: Date;
} & MiscInfoObj;
export declare type ModelStages = "C" | "I" | "J";
export declare type SpecialType<S extends Strings, t extends ModelStages, K extends string = "type"> = {
    [k in K]: t extends "I" ? Keys<S> : Values<S>;
};
export declare type Status<S extends Strings, t extends ModelStages> = SpecialType<S, t, "name"> & TimeNInfo;
export declare type InfoMapOne<S extends Strings, T> = Map<Values<S>, T>;
export declare type InfoMapTwo<S extends Strings, T> = OptionalEnum<T, undefined, Values<S>>;
export declare type InfoHashMap<S extends Strings, T, t extends ModelStages> = t extends "I" ? InfoMapOne<S, T> : InfoMapTwo<S, T>;
export declare type Settings<S> = Record<"lang" | "version", string> & {
    data: MiscInfo;
} & {
    app: S;
};
export declare type CommonStringProps = "name" | "bio" | "motto" | "body" | "title" | "slug";
export declare type CommonNumberProps = "amt" | "price" | "rating" | "qty";
export declare type CommonBooleanProps = "active" | "open";
export declare type CommonProps = Record<CommonStringProps, string> & Record<CommonNumberProps, number> & Record<CommonBooleanProps, boolean>;
export declare type CommonPropSelector<k extends Keys<CommonProps> = undefined, j extends Keys<CommonProps> = undefined> = OPick<CommonProps, k, j>;
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
export declare type ModelBaseProps = Partial<{
    desc: string;
} & MiscInfoObj> & Record<"created" | "updated", Date> & Record<"stat", string>;
export declare type ModelObject<S extends Strings, t extends ModelStages> = ModelBaseProps & {
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
export declare type ModelSelfRefsConfig = Record<string, ModelSelfRefConfig>;
export declare type ModelAsPropTypes<C, I, J> = {
    C: C;
    I: I;
    J: J;
};
export declare type ModelPropSelector<T, k extends Keys<T> = undefined, j extends Keys<T> = undefined> = OPick<T, k, j>;
