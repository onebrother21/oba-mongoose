
import {ModelFactoryHub,ModelFactoryConstructors} from "../../src";
import {ProfileFactory,MessageFactory,} from "./factories";
import {ApiModelSignatures} from "./types";

export type ApiModelFactoryHub<Ev> = ModelFactoryHub<Ev,ApiModelSignatures>;
export type ApiModelFactories<Ev> = ModelFactoryConstructors<Ev,ApiModelSignatures>;
const factories:any = {"profiles":ProfileFactory,"messages":MessageFactory};
export const getApiModelFactories = <Ev>() => factories as ApiModelFactories<Ev>;