import {Keys,Enum,Overwrite,Extends} from "@onebro/oba-common";
import {DotNotation} from "./model-lvl-util-types";
import {IsObjectId,IsPrimitiveGuard} from "./model-lvl-1-types";
import {ModelL2} from "./model-lvl-2-types";

/** LEVEL THREE MODEL TYPES */
type configurable<T> = ModelL2<T>["C"];
type instanceable<T> = Omit<ModelL2<T>["I"],"id"|"preview"|"json"> & {id:string;};
type enumerable<T> = Overwrite<configurable<T>,instanceable<T>>;
type dotnotationable<T> = DotNotation<T>;

type indexablekeys<T> = {[k in Keys<T>]:T[k] extends string|number?k:never;}[Keys<T>];
type indexable<T> = Pick<T,indexablekeys<T>>;
type fetchable<T> = indexable<configurable<T>>;

type noncallablekeys<T> = {[k in Keys<T>]:T[k] extends Function?never:k;}[Keys<T>];
type noncallable<T> = Pick<T,noncallablekeys<T>>;
type queryable<T> = dotnotationable<enumerable<T>>;
type superqueryable<T> = {[k in Keys<T>]?:
  T[k] extends number|Date?T[k]|Enum<T[k],undefined,"$eq"|"$ne"|"$gt"|"$lt"|"$gte"|"$lte">:
  T[k] extends Array<infer S>?Enum<IsPrimitiveGuard<S>[],undefined,"$in">:
  T[k];
};
type megaqueryable<T> = superqueryable<queryable<T>>;
type logical<T> = Enum<T[],undefined,"$and"|"$or"|"$where"|"$not">;
type ultraqueryable<T> = megaqueryable<T> & logical<megaqueryable<T>>;
type settable<T> = {[j in "$set"]?:{[k in Keys<T>]?:T[k] extends Array<any>?never:T[k];}};
type incrementable<T> = {[j in "$inc"|"$dec"]?:{[k in Keys<T>]?:T[k] extends number|Date?T[k]:never;}};
type ArrayUpdateObj<T> = T|T[]|{$in:T[]};
type ArrayUpdateable<T,k,S> = ArrayUpdateObj<Extends<k,Keys<ModelL2<T>["R"]>,IsObjectId,IsPrimitiveGuard<S>>>;
type pushpullable<T> = {[j in "$push"|"$pull"]?:{[k in Keys<T>]?:T[k] extends Array<infer S>?ArrayUpdateable<T,k,S>:never;}};
type updateable<T> = settable<T> & incrementable<T> & pushpullable<T>;


export type ModelQueryableProps<T> = queryable<T>;
export type ModelQueryObject<T> = {
  query:ultraqueryable<T>;
  opts?:Partial<{
    skip:number;
    limit:number;
    sort:Enum<"asc"|"desc"|1|-1,undefined,Keys<queryable<T>>>;
  }>;
  select?:"j"|"p"|"json"|"preview"|Keys<ModelL2<T>["J"]>[];
};
export type ModelFetchObject<T> = Partial<fetchable<T>>;
export type ModelUpdateObject<T> = updateable<queryable<T>>;

export type ModelL3<T> = ModelL2<T> & {
  F:IsObjectId|ModelFetchObject<T>;
  Q:ModelQueryObject<T>;
  U:ModelUpdateObject<T>;
};