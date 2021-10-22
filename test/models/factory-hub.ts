
import {ModelFactoryHub,ModelFactoryConstructors} from "../../src";
import {ProfileTypes,MessageTypes,} from "./types";
import {ProfileFactory,MessageFactory,} from "./factories";

export type ApiModelFactoryTypes = {"profiles":ProfileTypes;"messages":MessageTypes;};
export type ApiModelFactoryHub = ModelFactoryHub<ApiModelFactoryTypes>;
export type ApiModelFactories = ModelFactoryConstructors<ApiModelFactoryTypes>;
const factories:any = {"profiles":ProfileFactory,"messages":MessageFactory};
export const ApiModelFactories = factories as ApiModelFactories;