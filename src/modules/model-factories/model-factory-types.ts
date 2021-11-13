import {SchemaOptions} from "mongoose";
import OBACoreApi from "@onebro/oba-core-api";
import {Enum,AllOfType} from "@onebro/oba-common";
import {
  ModelConfig,
  ModelInstance,
  ModelJson,
  ModelStatuses,
  ModelFetches,
  ModelUpdates,
  ModelQueries,
  ModelDBModel,
  ModelPopulationRef,
} from "../model-types";

export type SchemaDefinition<T> = any;
export type ModelFactoryConfig<T> = {
  modelName:string;
  businessName:string;
  collectionName:string;
  definition:SchemaDefinition<T>;
  refs:ModelPopulationRef[];
  virtuals:Enum<{get?:(...a:any) => any;set?:(...a:any) => void;}>;
  methods:Partial<AllOfType<ModelInstance<T>,Function>>;
  statuses:ModelStatuses<T>;
  opts:SchemaOptions;
};
export type ModelFactoryType<Ev,T> = {
  core:OBACoreApi<Ev>;
  model:ModelDBModel<T>;
  config:ModelFactoryConfig<T>;
  autopopulate:(o:ModelInstance<T>,s?:boolean|0|1) => Promise<ModelInstance<T>>;
  create_:(c:ModelConfig<T>) => Promise<ModelInstance<T>>;
  create:(c:ModelConfig<T>) => Promise<ModelInstance<T>>;
  find:(q:ModelFetches<T>) => Promise<ModelInstance<T>>;
  findR:(q:ModelFetches<T>) => Promise<ModelInstance<T>>;
  fetch:(q:ModelFetches<T>) => Promise<ModelInstance<T>>;
  exists:(q:ModelFetches<T>) => Promise<boolean>;
  shouldNotExist:(q:ModelFetches<T>) => Promise<void>;
  update_:(q:ModelFetches<T>,u:ModelUpdates<T>) => Promise<ModelInstance<T>>;
  update:(q:ModelFetches<T>,u:ModelUpdates<T>) => Promise<ModelInstance<T>>;
  updateMany:(q:ModelFetches<T>,u:ModelUpdates<T>) => Promise<ModelInstance<T>[]>;
  remove_:(q:ModelFetches<T>) => Promise<ModelInstance<T>>;
  remove:(q:ModelFetches<T>) => Promise<ModelInstance<T>>;
  removeMany:(q:ModelFetches<T>) => Promise<(ModelInstance<T>)[]>;
  query:(q:ModelQueries<T>) => Promise<ModelJson<T>[]>;
  search:(q:string) => Promise<ModelJson<T>[]>;
  count:(q?:ModelQueries<T>) => Promise<number|any>;
};