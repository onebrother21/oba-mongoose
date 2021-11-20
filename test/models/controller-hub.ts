
import {ModelControllerHub,ModelControllerConstructors} from "../../src";
import {ProfileController,MessageController,} from "./controllers";
import {ApiModelSignatures} from "./types";
import {ApiUserRoles} from "./dicts"

export type ApiModelControllerHub<Ev> = ModelControllerHub<Ev,ApiModelSignatures,ApiUserRoles>;
export type ApiModelControllers<Ev> = ModelControllerConstructors<Ev,ApiModelSignatures,ApiUserRoles>;
const controllers:any = {"profiles":ProfileController,"messages":MessageController};
export const getApiModelControllers = <Ev>() => controllers as ApiModelControllers<Ev>;