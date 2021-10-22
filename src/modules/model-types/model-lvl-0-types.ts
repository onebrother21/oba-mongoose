
import {Types} from "mongoose";
import {Keys,OptionalEnum,Primitive,MiscInfo,Strings,Values,OPick} from "@onebro/oba-common";
import {AnyBoolean} from "../model-utils";


export type IsObjectId = string|Types.ObjectId;
export type IsPrimitive = Primitive|Types.ObjectId;
export type MiscInfoObj = {info?:MiscInfo;};
export type TimeNInfo = {time:Date;} & MiscInfoObj;

export type ModelStages = "C"|"I"|"J";
export type SpecialType<S extends Strings,t extends ModelStages,K extends string = "type"> = {[k in K]:t extends "I"?Keys<S>:Values<S>;};
export type Status<S extends Strings,t extends ModelStages> = SpecialType<S,t,"name"> & TimeNInfo;
export type InfoMapOne<S extends Strings,T> = Map<Values<S>,T>;
export type InfoMapTwo<S extends Strings,T> = OptionalEnum<T,undefined,Values<S>>;

export type InfoHashMap<S extends Strings,T,t extends ModelStages> = t extends "I"?InfoMapOne<S,T>:InfoMapTwo<S,T>;
export type Settings<S> = Record<"lang"|"version",string> & {data:MiscInfo;} & {app:S;};

export type CommonStringProps = "name"|"bio"|"motto"|"body"|"title"|"slug";
export type CommonNumberProps = "amt"|"price"|"rating"|"qty";
export type CommonBooleanProps = "active"|"open";
export type CommonProps =
Record<CommonStringProps,string> &
Record<CommonNumberProps,number> &
Record<CommonBooleanProps,boolean>;
export type CommonPropSelector<k extends Keys<CommonProps> = undefined,j extends Keys<CommonProps> = undefined> = OPick<CommonProps,k,j>;

export type TestProps = Partial<{
  str:string;
  bool:boolean;
  num:number;
  date:Date;
  arr:any[];
  obj:{a:number;b:string;c:boolean;};
  func:(a?:any) => void;
}>;

/** MODEL BASE TYPES:C -> CONFIG,I -> INSTANCE,J -> JSON */
export type ModelBaseProps = Partial<{desc:string;} & MiscInfoObj> & Record<"created"|"updated",Date> & Record<"stat",string>;
export type ModelObject<S extends Strings,t extends ModelStages> = ModelBaseProps & {id:IsObjectId;status:Status<S,t>;};
export type ModelObjectConfig<S extends Strings> = Pick<ModelObject<S,"C">,"info"|"desc">;
export type ModelObjectIdStamp<S extends Strings> = Pick<ModelObject<S,"J">,"id"|"stat">;

export type ModelName = {model:string;};
export type ModelMiscReference = ModelName & {oid:IsObjectId;};
export type ModelPopulationRef = ModelName & {path:string;populate?:ModelPopulationRef[];};
export type ModelSelfRefConfig = {arr:AnyBoolean;out:"J"|"P"|"json"|"preview";};
export type ModelSelfRefsConfig = Record<string,ModelSelfRefConfig>;

export type ModelAsPropTypes<C,I,J> = {C:C;I:I;J:J;};
export type ModelPropSelector<T,k extends Keys<T> = undefined,j extends Keys<T> = undefined> = OPick<T,k,j>;