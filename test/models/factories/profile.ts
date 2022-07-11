import OBACore from "@onebro/oba-core";
import {AnyBoolean} from "@onebro/oba-common";
import {Schema} from "mongoose";
import {
  ModelFactoryConfig,
  ModelFactory,
  getInfoMapSchemaDef,
  getSettingsSchemaDef,
  getSpecialTypeSchemaDef,
} from "../../../src";
import {Profile,ProfileSignature} from "../types";
import {
  ProfileStatuses,
  ProfilePermissions,
  ProfileSocials,
  ProfileStats,
  ProfileRoles,
} from "../dicts";

export type ProfileFactoryConfig = ModelFactoryConfig<ProfileSignature>;

export const getProfileAsPropSchema = (arr?:AnyBoolean,useracct?:AnyBoolean) => {
  switch(true){
    case !!arr:return {
      type:[Schema.Types.ObjectId],
      ref:"Profile",
      default:[] as Profile["instance"][],
      get:(p:Profile["instance"][]) => p.map(o => useracct?o.json():o.preview),
    }
    default:return {
      type:Schema.Types.ObjectId,
      ref:"Profile",
      get:(p:Profile["instance"]) => p?useracct?p.json():p.preview:null,
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
  permissions:getInfoMapSchemaDef(ProfilePermissions,Date),
  socials:getInfoMapSchemaDef(ProfileSocials,String),
  stats:getInfoMapSchemaDef(ProfileStats,Number),
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
      const s = this as Profile["instance"];
      const p = {} as Profile["preview"];
      p.id = s.id;
      p.stat = s.stat;
      p.memberSince = s.created;
      p.name = s.name;
      return p;
    }
  }
};
export const profileMethods:ProfileFactoryConfig["methods"] = {
  json:function(){
    const s = this as Profile["instance"];
    const j = {} as Profile["json"];
    j._type_ = "profile";
    j.id = s.id;
    j.status = s.status as any;
    j.stat = s.stat;
    s.desc?j.desc = s.desc:null;
    s.info?j.info = s.info:null;
    j.bio = s.bio;
    j.motto = s.motto;
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
export class ProfileFactory extends ModelFactory<ProfileSignature> {constructor(core:OBACore){super(core,profileFactoryConfig);}}