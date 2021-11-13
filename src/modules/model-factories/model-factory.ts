import mongooseUniqueValidator from "mongoose-unique-validator";
import {Schema,SchemaOptions,Types} from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import {
  IsObjectId,
  ModelInstance,
  ModelJson,
  ModelQueries,
} from "../model-types";
import {mapSelectedData} from "../model-utils";
import {getStatusSchemaDef} from "./model-factory-utils";
import {ModelFactoryType,ModelFactoryConfig} from "./model-factory-types";

export interface ModelFactory<Ev,T> extends ModelFactoryType<Ev,T> {}
export class ModelFactory<Ev,T> {
  get m(){return this.model;}
  isObjectId = (q:any):q is IsObjectId => {
    try {
      const objectId = Types.ObjectId(q as string);
      const IsValid = objectId instanceof Types.ObjectId;
      const isMatch = objectId.toString() == q;
      return IsValid && isMatch;
    }
    catch(e){return false;}
  };
  constructor(public core:OBACoreApi<Ev>,public config:ModelFactoryConfig<T>){
    const {refs,businessName} = config;
    this.autopopulate = async (o,s) => {
      if(s) await o.save();
      await o.populate(this.config.refs);
      return o;
    };
    this.create_ = async c => await this.autopopulate(new this.m(c),1);
    this.create = this.create_;
    this.find = async q => this.isObjectId(q)?await this.m.findById(q):await this.m.findOne(this.m.translateAliases(q));
    this.fetch = async q => {
      if(q == undefined || q == null) throw this.core.e.badinfo();
      const o = await this.find(q);
      if(!o) throw this.core.e.doesNotExist(businessName);
      return await this.autopopulate(o);
    };
    this.exists = async q => !!(await this.find(q));
    this.shouldNotExist = async q => {if(await this.exists(q)) throw this.core.e.existing(businessName);};
    this.update_ = async (q,u) => {
      const o = this.isObjectId(q)?
      await this.m.findByIdAndUpdate(q,u as any,{new:true}):
      await this.m.findOneAndUpdate(q as any,u as any,{new:true});
      return await this.autopopulate(o);
    };
    this.update = this.update_;
    this.remove_ = async q => this.isObjectId(q)?await this.m.findByIdAndRemove(q):await this.m.findOneAndRemove(q as any);
    this.remove = this.remove_;
    this.query = async q => {
      const {query,opts:{limit,skip,sort} = {limit:25,skip:0,sort:"asc"},select} = q;
      const R = await this.m.find(this.m.translateAliases(query))
      .populate(refs)
      //.where(where)
      .limit(limit||25)
      .skip(skip||0)
      .sort(sort||"asc")
      .exec();
      const results = this.getSelectedData(select,R as ModelInstance<T>[]);
      return results as ModelJson<T>[];
    };
    this.search = async q => {
      const R = await this.m.find({$regex:q,options:"i"} as any);
      const results = this.getSelectedData("json",R as ModelInstance<T>[]);
      return results as ModelJson<T>[];
    };
    this.count = async () => await this.m.estimatedDocumentCount();
  }
  createSchema = () => {
    const appname = this.core.vars.name;
    const datasig = "::" + process.env[appname.toLocaleUpperCase() + "_DATA_ID"];
    const {
      definition,
      virtuals,
      methods,
      statuses,
      opts,
    } = this.config;
    const schemaOpts:SchemaOptions = {
      ...opts,
      toObject:{getters:true,virtuals:true},
      toJSON:{getters:true,virtuals:true},
      timestamps:{createdAt:"created",updatedAt:"updated"},
    };
    const schema = new Schema<ModelInstance<T>>({
      ...definition,
      desc:{type:String},
      info:{type:Object},
      ...(statuses?{status:getStatusSchemaDef(statuses)}:null),
    },schemaOpts);
    schema.plugin(mongooseUniqueValidator);
    if(statuses) schema.virtual("stat").get(function(){
      return this.status.name+" @ "+(this.status.time as Date).toLocaleString("en-us")+" "+datasig;
    });
    for(const k in virtuals){
      if(virtuals[k].get) schema.virtual(k).get(virtuals[k].get);
      if(virtuals[k].set) schema.virtual(k).set(virtuals[k].set);
    }
    for(const k in methods) (schema.methods as any)[k] = (methods as any)[k];
    return schema;
  };
  init = async () => {
    const {modelName,collectionName} = this.config;
    const schema = this.createSchema();
    this.model = await this.core.db.model("onebrother",modelName,schema,collectionName);
    await this.model.init();
    return this;
  };
  getSelectedData = (s:ModelQueries<T>["select"],R:ModelInstance<T>[]) => {
    return ["json","j"].includes(s as any)?R.map(r => r.json()):
    ["preview","p"].includes(s as any)?R.map(r => r.preview):
    mapSelectedData(s as string[],R as any[]);
  };
}