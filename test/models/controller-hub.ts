
import {ModelControllerHub,ModelControllerConstructors} from "../../src";
import {ProfileTypes,MessageTypes,} from "./types";
import {ProfileController,MessageController,} from "./controllers";
import {ApiUserRoles} from "./dicts";

export type ApiModelControllerTypes = {"profiles":ProfileTypes;"messages":MessageTypes;};
export type ApiModelControllerHub = ModelControllerHub<ApiModelControllerTypes,ApiUserRoles>;
export type ApiModelControllers = ModelControllerConstructors<ApiModelControllerTypes,ApiUserRoles>;
const controllers:any = {"profiles":ProfileController,"messages":MessageController};
export const ApiModelControllers = controllers as ApiModelControllers;