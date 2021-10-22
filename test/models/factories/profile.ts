import OBACoreApi from "@onebro/oba-core-api";
import {Schema} from "mongoose";
import {
  ModelFactoryConfig,
  ModelFactory,
  getInfoHashMapSchemaDef,
  getSettingsSchemaDef,
  getSpecialTypeSchemaDef,
  AnyBoolean,
} from "../../../src";
import {ProfileTypes,Profile} from "../types";
import {
  ProfileStatuses,
  ProfilePermissions,
  ProfileSocials,
  ProfileStats,
  ProfileRoles,
} from "../dicts";

export type ProfileFactoryConfig = ModelFactoryConfig<ProfileTypes>;

export const getProfileAsPropSchema = (arr?:AnyBoolean,useracct?:AnyBoolean) => {
  switch(true){
    case !!arr:return {
      type:[Schema.Types.ObjectId],
      ref:"Profile",
      default:[] as Profile<"instance">[],
      get:(p:Profile<"instance">[]) => p.map(o => useracct?o.json():o.preview),
    }
    default:return {
      type:Schema.Types.ObjectId,
      ref:"Profile",
      get:(p:Profile<"instance">) => p?useracct?p.json():p.preview:null,
    }
  }
};
export const profileSchemaDef:ProfileFactoryConfig["definition"] = {
  name:{type:String,required:true,index:true,unique:true},
  role:{...getSpecialTypeSchemaDef(ProfileRoles),immutable:true},
  bio:{type:String,trim:true},
  motto:{type:String,trim:true},
  rating:{type:Number,default:5},
  settings:getSettingsSchemaDef(),
  permissions:getInfoHashMapSchemaDef(ProfilePermissions,Date),
  socials:getInfoHashMapSchemaDef(ProfileSocials,String),
  stats:getInfoHashMapSchemaDef(ProfileStats,Number),
  following:getProfileAsPropSchema(1),
  followers:getProfileAsPropSchema(1),
  endorsements:getProfileAsPropSchema(1),
};
export const profileRefs_:ProfileFactoryConfig["refs"] = [];
export const profileRefs:ProfileFactoryConfig["refs"] = [
  ...profileRefs_,
  {path:"followers",model:"Profile",populate:profileRefs_},
  {path:"following",model:"Profile",populate:profileRefs_},
  {path:"endorsements",model:"Profile",populate:profileRefs_},
];
export const profileVirtuals:ProfileFactoryConfig["virtuals"] = {
  preview:{
    get:function(){
      const s = this as Profile<"instance">;
      const p:Profile<"preview"> = {};
      p.id = s.id;
      p.name = s.name;
      return p;
    }
  }
};
export const profileMethods:ProfileFactoryConfig["methods"] = {
  json:function(){
    const s = this as Profile<"instance">;
    const j:Profile<"json"> = {};
    j._type_ = "profile";
    j.id = s.id;
    j.status = s.status as any;
    j.stat = s.stat;
    s.desc?j.desc = s.desc:null;
    s.info?j.info = s.info:null;
    s.bio?j.bio = s.bio:null;
    s.motto?j.motto = s.motto:null;
    j.settings = s.settings;
    j.permissions = s.permissions as any;
    j.socials = s.socials as any;
    j.stats = s.stats as any;
    j.name = s.name;
    j.role = s.role as any;
    j.followers = s.followers.map(o => o.preview);
    j.following = s.following.map(o => o.preview);
    j.endorsements = s.endorsements.map(o => o.preview);
    j.memberSince = s.created;
    return j;
  }
};
export const profileFactoryConfig:ProfileFactoryConfig = {
  modelName:"Profile",
  businessName:"user profile",
  collectionName:"profiles",
  statuses:ProfileStatuses,
  definition:profileSchemaDef,
  opts:{},
  refs:profileRefs,
  virtuals:profileVirtuals,
  methods:profileMethods,
};
export class ProfileFactory extends ModelFactory<ProfileTypes> {constructor(core:OBACoreApi<null>){super(core,profileFactoryConfig);}}