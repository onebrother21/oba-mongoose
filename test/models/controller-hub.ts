
import {ModelControllerHub,ModelControllerConstructors} from "../../src";
import {ProfileTypes,MessageTypes,} from "./types";
import {ProfileController,MessageController,} from "./controllers";
import {ApiUserRoles} from "./dicts";

export type ApiModelControllerTypes = {"profiles":ProfileTypes;"messages":MessageTypes;};
export type ApiModelControllerHub<Ev> = ModelControllerHub<Ev,ApiModelControllerTypes,ApiUserRoles>;
export type ApiModelControllers<Ev> = ModelControllerConstructors<Ev,ApiModelControllerTypes,ApiUserRoles>;
const controllers:any = {"profiles":ProfileController,"messages":MessageController};
export const getApiModelControllers = <Ev>() => controllers as ApiModelControllers<Ev>;