import mongooseUniqueValidator from "mongoose-unique-validator";
import {Schema,SchemaOptions,Types} from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import OB,{Enum,AllOfType} from "@onebro/oba-common";
import {IsObjectId,Model,ModelPopulationRef} from "../model-types";
import {mapSelectedData} from "../model-utils";
import {getStatusSchemaDef} from "./model-factory-utils";

export type SchemaDefinition = any;
export type ModelFactoryConfig<T> = {
  modelName:string;
  businessName:string;
  collectionName:string;
  definition:SchemaDefinition;
  refs:ModelPopulationRef[];
  virtuals:Enum<{get?:(...a:any) => any;set?:(...a:any) => void;}>;
  methods:Partial<AllOfType<Model<T>["instance"],Function>>;
  statuses:Model<T>["statuses"];
  opts:SchemaOptions;
};
export interface ModelFactory<T> {
  core:OBACoreApi;
  model:Model<T>["ctr"];
  config:ModelFactoryConfig<T>;
  autopopulate:(o:Model<T>["instance"],s?:boolean|0|1) => Promise<Model<T>["instance"]>;
  create_:(c:Model<T>["config"]) => Promise<Model<T>["instance"]>;
  create:(c:Model<T>["config"]) => Promise<Model<T>["instance"]>;
  find:(q:Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
  findR:(q:Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
  fetch:(q:Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
  exists:(q:Model<T>["fetches"]) => Promise<boolean>;
  shouldNotExist:(q:Model<T>["fetches"]) => Promise<void>;
  update_:(q:Model<T>["fetches"],u:Model<T>["updates"]) => Promise<Model<T>["instance"]>;
  update:(q:Model<T>["fetches"],u:Model<T>["updates"]) => Promise<Model<T>["instance"]>;
  updateMany:(q:Model<T>["fetches"],u:Model<T>["updates"]) => Promise<Model<T>["instance"][]>;
  remove_:(q:Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
  remove:(q:Model<T>["fetches"]) => Promise<Model<T>["instance"]>;
  removeMany:(q:Model<T>["fetches"]) => Promise<(Model<T>["instance"])[]>;
  query:(q:Model<T>["queries"]) => Promise<Model<T>["json"][]>;
  search:(q:string) => Promise<Model<T>["json"][]>;
  count:(q?:Model<T>["queries"]) => Promise<number|any>;
}
export class ModelFactory<T> {
  constructor(public core:OBACoreApi,public config:ModelFactoryConfig<T>){
    const {refs,businessName} = config;
    const {core:{e:{_:E}}} = this;
    this.autopopulate = async (o,s) => {
      if(s) await o.save();
      await o.populate(this.config.refs);
      return o;
    };
    this.create_ = async c => await this.autopopulate(new this.m(c),1);
    this.create = this.create_;
    this.find = async q => this.isObjectId(q)?await this.m.findById(q):await this.m.findOne(this.m.translateAliases(q));
    this.fetch = async q => {
      if(q == undefined || q == null) throw E.badinfo();
      const o = await this.find(q);
      if(!o) throw E.doesNotExist(businessName);
      return await this.autopopulate(o);
    };
    this.exists = async q => !!(await this.find(q));
    this.shouldNotExist = async q => {if(await this.exists(q)) throw E.existing(businessName);};
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
      const results = this.getSelectedData(select,R as Model<T>["instance"][]);
      return results as Model<T>["json"][];
    };
    this.search = async q => {
      const R = await this.m.find({$regex:q,options:"i"} as any);
      const results = this.getSelectedData("json",R as Model<T>["instance"][]);
      return results as Model<T>["json"][];
    };
    this.count = async () => await this.m.estimatedDocumentCount();
  }
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
  createSchema = () => {
    const datasig = "::" + OB.appvar("_DATA_ID");
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
    const schema = new Schema<Model<T>["instance"]>({
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
    //const dbName = this.core.vars.name;
    const {modelName,collectionName} = this.config;
    const schema = this.createSchema();
    this.model = await this.core.db.model(modelName,schema,collectionName);
    await this.model.init();
    return this;
  };
  getSelectedData = (
    s:Model<T>["queries"]["select"],
    R:Model<T>["instance"][]) => {
    return ["json","j"].includes(s as any)?R.map(r => r.json()):
    ["preview","p"].includes(s as any)?R.map(r => r.preview):
    mapSelectedData(s as string[],R as any[]);
  };
}