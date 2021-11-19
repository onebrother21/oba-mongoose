
import {ModelFactoryHub,ModelFactoryConstructors} from "../../src";
import {ProfileSignature,MessageSignature,} from "./types";
import {ProfileFactory,MessageFactory,} from "./factories";

export type ApiModelSignatures = {"profiles":ProfileSignature;"messages":MessageSignature;};
export type ApiModelFactoryHub<Ev> = ModelFactoryHub<Ev,ApiModelSignatures>;
export type ApiModelFactories<Ev> = ModelFactoryConstructors<Ev,ApiModelSignatures>;
const factories:any = {"profiles":ProfileFactory,"messages":MessageFactory};
export const getApiModelFactories = <Ev>() => factories as ApiModelFactories<Ev>;