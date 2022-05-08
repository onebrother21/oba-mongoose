import { Keys, Enum, Overwrite, Extends, DotNotation } from "@onebro/oba-common";
import { IsObjectId, IsPrimitiveGuard } from "./model-lvl-1-types";
import { ModelL2 } from "./model-lvl-2-types";
/** LEVEL THREE MODEL TYPES */
declare type configurable<T> = ModelL2<T>["C"];
declare type instanceable<T> = Omit<ModelL2<T>["I"], "id" | "preview" | "json"> & {
    id: string;
};
declare type enumerable<T> = Overwrite<configurable<T>, instanceable<T>>;
declare type dotnotationable<T> = DotNotation<T>;
declare type indexablekeys<T> = {
    [k in Keys<T>]: T[k] extends string | number ? k : never;
}[Keys<T>];
declare type indexable<T> = Pick<T, indexablekeys<T>>;
declare type fetchable<T> = indexable<configurable<T>>;
declare type queryable<T> = dotnotationable<enumerable<T>>;
declare type superqueryable<T> = {
    [k in Keys<T>]?: T[k] extends number | Date ? T[k] | Enum<T[k], undefined, "$eq" | "$ne" | "$gt" | "$lt" | "$gte" | "$lte"> : T[k] extends Array<infer S> ? Enum<IsPrimitiveGuard<S>[], undefined, "$in"> : T[k];
};
declare type megaqueryable<T> = superqueryable<queryable<T>>;
declare type logical<T> = Enum<T[], undefined, "$and" | "$or" | "$where" | "$not">;
declare type ultraqueryable<T> = megaqueryable<T> & logical<megaqueryable<T>>;
declare type settable<T> = {
    [j in "$set"]?: {
        [k in Keys<T>]?: T[k] extends Array<any> ? never : T[k];
    };
};
declare type incrementable<T> = {
    [j in "$inc" | "$dec"]?: {
        [k in Keys<T>]?: T[k] extends number | Date ? T[k] : never;
    };
};
declare type ArrayUpdateObj<T> = T | T[] | {
    $in: T[];
};
declare type ArrayUpdateable<T, k, S> = ArrayUpdateObj<Extends<k, Keys<ModelL2<T>["R"]>, IsObjectId, IsPrimitiveGuard<S>>>;
declare type pushpullable<T> = {
    [j in "$push" | "$pull"]?: {
        [k in Keys<T>]?: T[k] extends Array<infer S> ? ArrayUpdateable<T, k, S> : never;
    };
};
declare type updateable<T> = settable<T> & incrementable<T> & pushpullable<T>;
export declare type ModelQueryableProps<T> = queryable<T>;
export declare type ModelQueryObject<T> = {
    query: ultraqueryable<T>;
    opts?: Partial<{
        skip: number;
        limit: number;
        sort: Enum<"asc" | "desc" | 1 | -1, undefined, Keys<queryable<T>>>;
    }>;
    select?: "j" | "p" | "json" | "preview" | Keys<ModelL2<T>["J"]>[];
};
export declare type ModelFetchObject<T> = Partial<fetchable<T>>;
export declare type ModelUpdateObject<T> = updateable<queryable<T>>;
export declare type ModelL3<T> = ModelL2<T> & {
    F: IsObjectId | ModelFetchObject<T>;
    Q: ModelQueryObject<T>;
    U: ModelUpdateObject<T>;
};
export {};
