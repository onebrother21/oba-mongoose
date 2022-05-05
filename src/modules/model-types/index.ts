import {ModelL4} from "./model-lvl-4-types";

/** ALL MODEL TYPES */
export type Model<T> = ModelL4<T> & {
  config:ModelL4<T>["C"];
  instance:ModelL4<T>["I"];
  json:ModelL4<T>["J"];
  preview:ModelL4<T>["P"];
  statuses:ModelL4<T>["S"];
  refs:ModelL4<T>["R"];
  fetches:ModelL4<T>["F"];
  updates:ModelL4<T>["U"];
  queries:ModelL4<T>["Q"];
  model:ModelL4<T>["M"];
  ctr:ModelL4<T>["M"];
};

export * from "./model-lvl-1-types";
export * from "./model-lvl-2-types";
export * from "./model-lvl-3-types";
export * from "./model-lvl-4-types";
