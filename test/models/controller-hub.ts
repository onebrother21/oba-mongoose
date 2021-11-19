
import {ModelControllerHub,ModelControllerConstructors} from "../../src";
import {ProfileController,MessageController,} from "./controllers";
import {ApiUserRoles} from "./dicts";
import {ApiModelSignatures} from "./factory-hub";

export type ApiModelControllerHub<Ev> = ModelControllerHub<Ev,ApiModelSignatures,ApiUserRoles>;
export type ApiModelControllers<Ev> = ModelControllerConstructors<Ev,ApiModelSignatures,ApiUserRoles>;
const controllers:any = {"profiles":ProfileController,"messages":MessageController};
export const getApiModelControllers = <Ev>() => controllers as ApiModelControllers<Ev>;