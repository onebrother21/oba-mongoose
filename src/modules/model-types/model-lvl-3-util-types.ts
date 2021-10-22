import {Keys,OptionalEnum,DeepPartial} from "@onebro/oba-common";
import {IsPrimitive} from "./model-lvl-0-types";

export type ComparativeQueryNames = "$eq"|"$ne"|"$gt"|"$lt"|"$gte"|"$lte";
export type ComparativeQuery<T> = T extends number|Date?OptionalEnum<T,undefined,ComparativeQueryNames>:T;

export type ArrQueryNames = "$in";
export type ArrQueryGuard<T extends Array<any>> = T[0] extends IsPrimitive?T[]:Partial<T[0]>[];
export type ArrQuery<T> = T extends Array<any>?OptionalEnum<ArrQueryGuard<T>,undefined,ArrQueryNames>:T;

export type LogicQueryNames = "$and"|"$or"|"$where"|"$not";
export type LogicQuery<T> =  OptionalEnum<T[],undefined,LogicQueryNames>;

export type SuperQuery<T> = {[k in Keys<T>]:T[k]|ComparativeQuery<T[k]>|ArrQuery<T[k]>;};
export type MegaQuery<T> = SuperQuery<T> & LogicQuery<SuperQuery<T>>;

export type ModifiedQueries<T> = DeepPartial<SuperQuery<T>>;
export type UltraQueries<T> = DeepPartial<MegaQuery<T>>;