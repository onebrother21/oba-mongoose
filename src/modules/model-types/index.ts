import {Document,Model as MongooseModel} from "mongoose";
import {ModelL3} from "./model-signature-3";

/** LEVEL FOUR MODEL TYPES */
export type ModelType<T> = ModelL3<T> & {I:Document;M:MongooseModel<ModelType<T>["I"]>;};
/** ALL MODEL TYPES */
export type Model<T> = ModelType<T> & {
  config:ModelType<T>["C"];
  instance:ModelType<T>["I"];
  json:ModelType<T>["J"];
  preview:ModelType<T>["P"];
  statuses:ModelType<T>["S"];
  refs:ModelType<T>["R"];
  fetches:ModelType<T>["F"];
  updates:ModelType<T>["U"];
  queries:ModelType<T>["Q"];
  model:ModelType<T>["M"];
  ctr:ModelType<T>["M"];
};
export * from "./model-signature-0";
export * from "./model-signature-1";
export * from "./model-signature-2";
export * from "./model-signature-3";
