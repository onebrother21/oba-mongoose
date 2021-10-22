import { Keys } from "../../../src";
import { ApiRouterNetworkType } from "../types";

export type RouterQueryHub = ApiRouterNetworkType["Q"];
export type RouterQueryGetter<k extends Keys<RouterQueryHub>> = (J:ApiRouterNetworkType["J"]) => ReturnType<RouterQueryHub[k]>;
export type RouterQueries = {[k in Keys<RouterQueryHub>]:RouterQueryGetter<k>;};
export const RouterQueries:RouterQueries = {
  profiles:J => [
    {
      query:{query:{name:"Jack"},select:"json"},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{name:"John"},select:"json"},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{role:"USER"},select:"json"},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },
  ],
  users:J => [
    {
      query:{query:{"name.first":"Johnny"}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      query:{query:{$or:[
        {"name.first":"Jack"},
        {"info.public":true} as any,
        {"locs.info":"Dallas, TX"},
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      query:{query:{$and:[
        {hometown:"Houston, TX"},
        {"devices.app.name":"TEST"},
        {"devices.app.version":"1.0.0"},
        {dob:{$gte:new Date("1977/12/12")}},
        {dob:{$lte:new Date()}},
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    }, 
  ],
  auths:J => [],
  uploads:J => [
    {
      query:{query:{$or:[
        {"publisher":J.profiles[0].id},
        {"tagged":{$in:[J.profiles[0].id]}}
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },
  ],
  messages:J => [
    {
      query:{query:{$or:[
        {author:J.profiles[0].id},
        {"info.public":true} as any,
        {recipients:{$in:[J.profiles[0].id]}},
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{$and:[
        {author:J.profiles[1].id},
        {"test.date":{$gte:new Date("2020/12/12")}},
        {"test.date":{$lte:new Date()}}
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },
  ],
  trades:J => [
    {
      query:{query:{"user":J.profiles[0].id,"quotes.action":"sell"},select:"json"},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },
  ],
  plans:J => [
    {
      query:{query:{"user":J.profiles[0].id}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },
  ],
  chats:J => [
    {
      query:{query:{"users":{$in:[J.profiles[0].id]}}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },
  ],
  notifications:J => [
    {
      query:{query:{$or:[
        {sent:{$gte:new Date("2020/12/12")}},
        {audience:{$in:[J.profiles[0].id]}},
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
        query:{query:{$and:[
          {"created":{$gte:new Date("2020/12/12")}},
          {"created":{$lte:new Date()}}
        ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any},
    },
  ],
};