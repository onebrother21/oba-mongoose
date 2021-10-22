import { Keys } from "../../../src";
import { ApiRouterNetworkType } from "../types";

export type RouterFetchHub = ApiRouterNetworkType["F"];
export type RouterFetchGetter<k extends Keys<RouterFetchHub>> = (J:ApiRouterNetworkType["J"]) => ReturnType<RouterFetchHub[k]>;
export type RouterFetches = {[k in Keys<RouterFetchHub>]:RouterFetchGetter<k>;};
export const RouterFetches:RouterFetches = {
  profiles:J => [
    {
      params:{id:J.profiles[0].id},
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"GUEST" as any}
    },{
      params:{name:J.profiles[1].name},
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"GUEST" as any}
    },
  ],
  users:J => [
    {
      params:{id:J.users[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any},
    },{
      params:{email:J.users[1].email},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    }
  ],
  auths:J => [],
  uploads:J => [
    {
      params:{id:J.uploads[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    }
  ],
  messages:J => [
    {
      params:{id:J.messages[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    }
  ],
  trades:J => [
    {
      params:{id:J.trades[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    }
  ],
  plans:J => [
    {
      params:{id:J.plans[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    }
  ],
  chats:J => [
    {
      params:{id:J.chats[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    }
  ],
  notifications:J => [
    {
      params:{id:J.notifications[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    }
  ],
};