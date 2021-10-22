import { Schema } from "mongoose";
import { Strings, Keys, Values, IsConstructor } from "@onebro/oba-common";
import { Status, Settings, InfoHashMap, ModelMiscReference } from "../model-types";
import { AnyBoolean } from "../model-utils";
export declare const getSpecialTypeSchemaDef: <S extends Strings>(S: S) => {
    type: StringConstructor;
    get: (s: Extract<keyof S, string>) => S[Extract<keyof S, string>];
    set: (s: Values<S>) => string;
};
export declare const getInfoHashMapSchemaDef: <S extends Strings, T extends IsConstructor>(S: S, T: T) => {
    type: MapConstructor;
    of: T;
    get: (o: import("../model-types").InfoMapOne<S, InstanceType<T>>) => import("../model-types").InfoMapTwo<S, InstanceType<T>>;
    set: (o: import("../model-types").InfoMapTwo<S, InstanceType<T>>) => import("../model-types").InfoMapOne<S, InstanceType<T>>;
    default: Map<Extract<keyof S, string>, InstanceType<T>>;
};
export declare const getMiscReferenceSchemaDef: (arr?: AnyBoolean) => {
    type: Schema<ModelMiscReference>[];
    default: ModelMiscReference[];
} | {
    type: Schema<ModelMiscReference>;
    default?: undefined;
};
export declare const getStatusSchemaDef: <S extends Strings>(statuses: S) => {
    type: Schema<Status<S, "I">>;
    default: () => {
        name: string;
    };
    get: (s: Status<S, "I">) => {
        info: import("@onebro/oba-common").PrimitiveObj;
        name: Extract<keyof S, string>;
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
