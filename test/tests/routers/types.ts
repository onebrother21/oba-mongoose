import { Keys,ModelRouterHub,ApiModelRouters,ApiModelFactories,Await } from "../../src";

type Network = {
  M:ModelRouterHub<ApiModelRouters>;
  J:{[k in Keys<Network["M"]>]:Await<ReturnType<Network["M"][k]["create$"]>>[];};
  C:{[k in Keys<Network["M"]>]:(J:Network["J"]) => Parameters<Network["M"][k]["create$"]>[0][];};
  U:{[k in Keys<Network["M"]>]:(J:Network["J"]) => Parameters<Network["M"][k]["update$"]>[0][];};
  Q:{[k in Keys<Network["M"]>]:(J:Network["J"]) => Parameters<Network["M"][k]["query$"]>[0][];};
  F:{[k in Keys<Network["M"]>]:(J:Network["J"]) => Parameters<Network["M"][k]["fetch$"]>[0][];};
  R:{[k in Keys<Network["M"]>]:(J:Network["J"]) => Parameters<Network["M"][k]["remove$"]>[0][];};
};
export type ApiRouterNetworkType = Network;