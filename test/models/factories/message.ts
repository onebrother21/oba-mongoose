import OBACoreApi from "@onebro/oba-core-api";
import {AnyBoolean} from "@onebro/oba-common";
import {Schema} from "mongoose";
import {ModelFactoryConfig,ModelFactory} from "../../../src";
import {Message,MessageSignature} from "../types";
import {MessageStatuses} from "../dicts";
import {getProfileAsPropSchema,profileRefs} from "./profile";

export type MessageFactoryConfig = ModelFactoryConfig<MessageSignature>;

export const getMessageAsPropSchema = (arr?:AnyBoolean) => {
  switch(true){
    case !!arr:{
      return {
        type:[Schema.Types.ObjectId],
        ref:"Message",
        default:[] as Message["instance"][],
        get:(p:Message["instance"][]) => p.map(o => o.preview),
      };
    }
    default:{
      return {
        type:Schema.Types.ObjectId,
        ref:"Message",
        get:(p:Message["instance"]) => p?p.preview:null,
      };
    }  
  }
};
export const messageSchemaDef:MessageFactoryConfig["definition"] = {
  author:{...getProfileAsPropSchema(0),required:true},
  recipients:getProfileAsPropSchema(1),
  body:{type:String,required:true,trim:true},
  loc:{type:String,required:true,trim:true},
  title:{type:String,trim:true},
  slug:{type:String,trim:true},
  notes:getMessageAsPropSchema(1),
};
export const messageRefs_:MessageFactoryConfig["refs"] = [
  {path:"author",model:"Profile",populate:profileRefs},
  {path:"recipients",model:"Profile",populate:profileRefs},
];
export const messageRefs:MessageFactoryConfig["refs"] = [
  ...messageRefs_,
  {path:"notes",model:"Message",populate:messageRefs_},
];
export const messageVirtuals:MessageFactoryConfig["virtuals"] = {
  preview:{
    get:function(){
      const s = this as Message["instance"];
      const p = {} as Message["preview"];
      p.id = s.id;
      p.stat = s.stat;
      p.author = s.author as any;
      p.body = s.body;
      p.published = s.created;
      return p;
    }
  }
};
export const messageMethods:MessageFactoryConfig["methods"] = {
  json:function(){
    const s = this as Message["instance"];
    const j = {} as Message["json"];
    j._type_ = "message";
    j.id = s.id;
    j.status = s.status as any;
    j.stat = s.stat;
    s.desc?j.desc = s.desc:null;
    s.info?j.info = s.info:null;
    s.title?j.title = s.title:null;
    s.slug?j.slug = s.slug:null;
    j.author = s.author as any;
    j.recipients = s.recipients.map(o => o.preview);
    j.body = s.body;
    j.loc = s.loc;
    j.notes = s.notes.map(o => o.preview);
    j.published = s.created;
    return j;
  }
};
export const messageFactoryConfig:MessageFactoryConfig = {
  modelName:"Message",
  businessName:"user message",
  collectionName:"messages",
  statuses:MessageStatuses,
  definition:messageSchemaDef,
  opts:{},
  refs:messageRefs,
  virtuals:messageVirtuals,
  methods:messageMethods,
};
export class MessageFactory<Ev> extends ModelFactory<Ev,MessageSignature> {constructor(core:OBACoreApi<Ev>){super(core,messageFactoryConfig);}}