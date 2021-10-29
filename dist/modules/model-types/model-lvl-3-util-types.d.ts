import { Keys, Enum, DeepPartial } from "@onebro/oba-common";
import { IsPrimitive } from "./model-lvl-0-types";
export declare type ComparativeQueryNames = "$eq" | "$ne" | "$gt" | "$lt" | "$gte" | "$lte";
export declare type ComparativeQuery<T> = T extends number | Date ? Enum<T, undefined, ComparativeQueryNames> : T;
export declare type ArrQueryNames = "$in";
export declare type ArrQueryGuard<T extends Array<any>> = T[0] extends IsPrimitive ? T[] : Partial<T[0]>[];
export declare type ArrQuery<T> = T extends Array<any> ? Enum<ArrQueryGuard<T>, undefined, ArrQueryNames> : T;
export declare type LogicQueryNames = "$and" | "$or" | "$where" | "$not";
export declare type LogicQuery<T> = Enum<T[], undefined, LogicQueryNames>;
export declare type SuperQuery<T> = {
    [k in Keys<T>]: T[k] | ComparativeQuery<T[k]> | ArrQuery<T[k]>;
};
export declare type MegaQuery<T> = SuperQuery<T> & LogicQuery<SuperQuery<T>>;
export declare type ModifiedQueries<T> = DeepPartial<SuperQuery<T>>;
export declare type UltraQueries<T> = DeepPartial<MegaQuery<T>>;
