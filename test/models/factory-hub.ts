
import {ModelFactoryHub,ModelFactoryConstructors} from "../../src";
import {ProfileTypes,MessageTypes,} from "./types";
import {ProfileFactory,MessageFactory,} from "./factories";

export type ApiModelFactoryTypes = {"profiles":ProfileTypes;"messages":MessageTypes;};
export type ApiModelFactoryHub<Ev> = ModelFactoryHub<Ev,ApiModelFactoryTypes>;
export type ApiModelFactories<Ev> = ModelFactoryConstructors<Ev,ApiModelFactoryTypes>;
const factories:any = {"profiles":ProfileFactory,"messages":MessageFactory};
export const getApiModelFactories = <Ev>() => factories as ApiModelFactories<Ev>;