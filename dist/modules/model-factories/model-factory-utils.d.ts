import { Schema } from "mongoose";
import { Strings, Keys, Values, Constructor, AnyBoolean, Status, Settings, InfoMap } from "@onebro/oba-common";
import { StageGuard } from "../model-types";
export declare const getSpecialTypeSchemaDef: <S extends Strings<undefined>>(S: S) => {
    type: StringConstructor;
    get: (s: Keys<S>) => S[Keys<S>];
    set: (s: Values<S>) => string;
};
export declare const getInfoMapSchemaDef: <S extends Strings<undefined>, T extends Constructor<any>>(S: S, T: T) => {
    type: MapConstructor;
    of: T;
    get: (o: import("@onebro/oba-common").InfoMapOne<S, InstanceType<T>>) => import("@onebro/oba-common").InfoMapTwo<S, InstanceType<T>>;
    set: (o: import("@onebro/oba-common").InfoMapTwo<S, InstanceType<T>>) => import("@onebro/oba-common").InfoMapOne<S, InstanceType<T>>;
    default: Map<Keys<S>, InstanceType<T>>;
};
export declare const getMiscReferenceSchemaDef: (arr?: AnyBoolean) => {
    type: Schema<import("../model-types").ModelName>[];
    default: import("../model-types").ModelName[];
} | {
    type: Schema<import("../model-types").ModelName>;
    default?: undefined;
};
export declare const getStatusSchemaDef: <S extends Strings<undefined>>(statuses: S) => {
    type: Schema<Status<S, true>>;
    default: () => {
        name: string;
    };
    get: (s: Status<S, true>) => {
        info: import("@onebro/oba-common").Primitives;
        name: Keys<S>;
        time: Date;
    };
};
export declare const getSettingsSchemaDef: <S>() => {
    type: Schema<Settings<S>>;
    default: () => {
        lang: string;
        version: string;
    };
};
export declare const getTestPropsSchemaDef: () => {
    type: Schema<Partial<{
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
    }>>;
    default: () => {
        str: string;
    };
};
