import {initAM} from "../utils";
import {modelRouterHub,ApiModelRouters,ApiModelFactories} from "../../src";
import {ApiRouterNetworkType} from "./types";
import {
  RouterConfigs,
  RouterFetches,
  RouterQueries,
  RouterUpdates,
} from "./data";

export interface ApiRouterNetwork extends ApiRouterNetworkType {}
export class ApiRouterNetwork {
  constructor(){
    this.J = {
      profiles:[],
      messages:[],
      uploads:[],
      trades:[],
      plans:[],
      chats:[],
      users:[],
      auths:[],
      notifications:[],
    };
    this.C = RouterConfigs;
    this.F = RouterFetches;
    this.Q = RouterQueries;
    this.U = RouterUpdates;
  }
  init = async () => this.M = await modelRouterHub((await initAM()).master,ApiModelRouters,ApiModelFactories);
}