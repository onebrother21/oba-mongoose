import {SchemaOptions} from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import {Enum,AllOfType} from "@onebro/oba-common";
import {Model,ModelPopulationRef} from "../model-types";

export type SchemaDefinition<Sig> = any;
export type ModelFactoryConfig<Sig> = {
  modelName:string;
  businessName:string;
  collectionName:string;
  definition:SchemaDefinition<Sig>;
  refs:ModelPopulationRef[];
  virtuals:Enum<{get?:(...a:any) => any;set?:(...a:any) => void;}>;
  methods:Partial<AllOfType<Model<Sig>["instance"],Function>>;
  statuses:Model<Sig>["statuses"];
  opts:SchemaOptions;
};
export type ModelFactoryType<Ev,Sig> = {
  core:OBACoreApi<Ev>;
  model:Model<Sig>["ctr"];
  config:ModelFactoryConfig<Sig>;
  autopopulate:(o:Model<Sig>["instance"],s?:boolean|0|1) => Promise<Model<Sig>["instance"]>;
  create_:(c:Model<Sig>["config"]) => Promise<Model<Sig>["instance"]>;
  create:(c:Model<Sig>["config"]) => Promise<Model<Sig>["instance"]>;
  find:(q:Model<Sig>["fetches"]) => Promise<Model<Sig>["instance"]>;
  findR:(q:Model<Sig>["fetches"]) => Promise<Model<Sig>["instance"]>;
  fetch:(q:Model<Sig>["fetches"]) => Promise<Model<Sig>["instance"]>;
  exists:(q:Model<Sig>["fetches"]) => Promise<boolean>;
  shouldNotExist:(q:Model<Sig>["fetches"]) => Promise<void>;
  update_:(q:Model<Sig>["fetches"],u:Model<Sig>["updates"]) => Promise<Model<Sig>["instance"]>;
  update:(q:Model<Sig>["fetches"],u:Model<Sig>["updates"]) => Promise<Model<Sig>["instance"]>;
  updateMany:(q:Model<Sig>["fetches"],u:Model<Sig>["updates"]) => Promise<Model<Sig>["instance"][]>;
  remove_:(q:Model<Sig>["fetches"]) => Promise<Model<Sig>["instance"]>;
  remove:(q:Model<Sig>["fetches"]) => Promise<Model<Sig>["instance"]>;
  removeMany:(q:Model<Sig>["fetches"]) => Promise<(Model<Sig>["instance"])[]>;
  query:(q:Model<Sig>["queries"]) => Promise<Model<Sig>["json"][]>;
  search:(q:string) => Promise<Model<Sig>["json"][]>;
  count:(q?:Model<Sig>["queries"]) => Promise<number|any>;
};