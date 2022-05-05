import {Document,Model} from "mongoose";
import {ModelL3} from "./model-lvl-3-types";

/** LEVEL FOUR MODEL TYPES */
export type ModelL4<T> = ModelL3<T> & {I:Document;M:Model<ModelL4<T>["I"]>;};