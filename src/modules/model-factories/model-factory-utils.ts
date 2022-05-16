import { Schema,Types } from "mongoose";
import { Strings,Keys,Values,Constructor,AnyBoolean,
  TestProps,Status,Settings,InfoMap, } from "@onebro/oba-common";
import { IsObjectId, ModelMiscReference, StageGuard } from "../model-types";
import { mapEnumKey } from "../model-utils";


export const getSpecialTypeSchemaDef = <S extends Strings>(S:S) => {
  const specialType = {
    type:String,
    get:(s:Keys<S>) => S[s],
    set:(s:Values<S>) => mapEnumKey(S,s),
  };
  return specialType;
};
export const getInfoMapSchemaDef = <S extends Strings,T extends Constructor<any>>(S:S,T:T) => {
  const infoMapGetter = (o:InfoMap<S,InstanceType<T>,StageGuard<"I">>,S:S) => {
    const n:any = {};
    for(const s in S){
      const s_ = S[s] as Values<S>;
      o.has(s_)?n[s_] = o.get(s_):null;
    }
    return n as InfoMap<S,InstanceType<T>,StageGuard<"C">>;
  };
  const infoMapSetter = (o:InfoMap<S,InstanceType<T>,StageGuard<"C">>,S:S) => {
    const n = new Map();
    for(const s in S){
      const s_ = S[s] as Values<S>;
      o[s_]?n.set(s_,o[s_]):null;
    }
    return n as InfoMap<S,InstanceType<T>,StageGuard<"I">>;
  };
  const infoMap = {
    type:Map,
    of:T,
    get:(o:InfoMap<S,InstanceType<T>,StageGuard<"I">>) => infoMapGetter(o,S),
    set:(o:InfoMap<S,InstanceType<T>,StageGuard<"C">>) => infoMapSetter(o,S),
    default:new Map<Keys<S>,InstanceType<T>>(),
  };
  return infoMap;
};
export const getMiscReferenceSchemaDef = (arr?:AnyBoolean) => {
  let miscRefOrRefs;
  const miscRefSchema = new Schema<ModelMiscReference>({
    model:{type:String,required:true},
    oid:{type:String,required:true},
  },{_id:false});
  switch(true){
    case arr == true:
    case arr == 1:miscRefOrRefs = {type:[miscRefSchema],default:[] as ModelMiscReference[]};break;
    default:miscRefOrRefs = {type:miscRefSchema};break;
  }
  return miscRefOrRefs;
};
export const getStatusSchemaDef = <S extends Strings>(statuses:S) => {
  const statusSchema = new Schema<Status<S,StageGuard<"I">>>({
    name:{
      type:String,
      required:true,
      enum:Object.keys(statuses),
      get:(k:Keys<S>) => statuses[k],
      set:(k:Values<S>) => mapEnumKey(statuses,k)},
    time:{type:Date,default:Date.now},
    info:{type:Object}
  },{_id:false});
  const status = {
    type:statusSchema,
    default:() => ({name:"New"}),
    get:(s:Status<S,StageGuard<"I">>) => ({name:s.name,time:s.time,...s.info?{info:s.info}:null})
  };
  return status;
};
export const getSettingsSchemaDef = <S>() => {
  const settingsSchema = new Schema<Settings<S>>({
    lang:{type:String,default:"en"},
    version:{type:String,required:true,trim:true},
    data:{type:Object},
    app:{type:Object},
  },{_id:false});
  const settings = {
    type:settingsSchema,
    default:() => ({lang:"en",version:"1.0.0"}),
  };
  return settings;
};
export const getTestPropsSchemaDef = () => {
  const propsSchema = new Schema<TestProps>({
    str:{type:String},
    num:{type:Number},
    bool:{type:Boolean},
    date:{type:Date},
  },{_id:false});
  const props = {
    type:propsSchema,
    default:() => ({str:"Created by OBA"}),
  };
  return props;
};