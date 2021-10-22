import { Keys } from "../../../src";
import { ApiRouterNetworkType } from "../types";

export type RouterUpdateHub = ApiRouterNetworkType["U"];
export type RouterUpdateGetter<k extends Keys<RouterUpdateHub>> = (J:ApiRouterNetworkType["J"]) => ReturnType<RouterUpdateHub[k]>;
export type RouterUpdates = {[k in Keys<RouterUpdateHub>]:RouterUpdateGetter<k>;};
export const RouterUpdates:RouterUpdates = {
  profiles:J => [
    {
      params:{id:J.profiles[0].id},
      body:{
        $set:{
          name:"Jack",
          status:{name:"Enabled" as any},
          "settings.data":{...J.profiles[0].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{
          "followers":[J.profiles[1].id,J.profiles[2].id],
          "following":[J.profiles[1].id],
          "endorsements":J.profiles[1].id,
        },
        $pull:{
          "following":{$in:[J.profiles[1].id]},
        }
      },
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    },{
      params:{id:J.profiles[1].id},
      body:{
        $set:{
          name:"Jim",
          status:{name:"Enabled" as any},
          "settings.data":{...J.profiles[1].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{"following":[J.profiles[0].id],},
      },
      appuser:"Jim",
      authtkn:{okto:"use-api",username:"Jim",next:"123456",role:"USER" as any}
    },{
      params:{id:J.profiles[2].id},
      body:{
        $set:{
          name:"Jenn",
          status:{name:"Enabled" as any},
          "settings.data":{...J.profiles[2].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{"following":[J.profiles[0].id],},
      },
      appuser:"Jenn",
      authtkn:{okto:"use-api",username:"Jenn",next:"123456",role:"USER" as any}
    },
  ],
  users:J => [
    {
      params:{id:J.users[0].id},
      body:{
        $set:{
          name:{first:"Jack",last:"Swift"},
          handle:"Jack",
          dob:new Date("1980/09/27"),
          hometown:"Houston, TX",
          status:{name:"Enabled"},
          contact:"text",
          phn:"1-888-888-8888",
        },
        $push:{profiles:J.profiles[0].id},
      },
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN" as any}
    },{
      params:{id:J.users[1].id},
      body:{
        $set:{
          name:{first:"Jim",last:"Swift"},
          handle:"Jim",
          dob:new Date("1980/09/27"),
          hometown:"Houston, TX",
          status:{name:"Enabled"},
          contact:"text",
          phn:"1-888-888-8888",
        },
        $push:{profiles:J.profiles[1].id}
      },
      appuser:"Jim",
      authtkn:{okto:"use-api",username:"Jim",next:"123456",role:"ADMIN" as any}
    },{
      params:{id:J.users[2].id},
      body:{
        $set:{
          name:{first:"Jenn",last:"Swift"},
          handle:"Jenn",
          dob:new Date("1980/09/27"),
          hometown:"Dallas, TX",
          status:{name:"Enabled"},
          contact:"email",
        },
        $push:{profiles:J.profiles[2].id}
      },
      appuser:"Jenn",
      authtkn:{okto:"use-api",username:"Jenn",next:"123456",role:"ADMIN" as any}
    },
  ],
  auths:J => [],
  uploads:J => [
    {
      params:{id:J.uploads[0].id},
      body:{$set:{title:"oops",status:{name:"Saved"}}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  messages:J => [
    {
      params:{id:J.messages[0].id},
      body:{
        $set:{
          status:{name:"Seen"},
          body:`
            Jimmy was her twice type shit infoifjoiwn ifwifmimwoim ifmwimfimi wmwiwm
            osnfinfinwfinf winfiw if win w fw gwk gw  wgownomowmow w g  wogow gw owmgwo  womgo
            nqfmoqfm fkfoqf fo ufw jk wf wf ifwjw fw w fwnwiifnffwn`,
          title:"oops"},
        $push:{notes:J.messages[1].id},
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  chats:J => [
    {
      params:{id:J.chats[0].id},
      body:{
        $set:{status:{name:"Active"}},
        $push:{msgs:[J.messages[0].id,J.messages[1].id]},
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  trades:J => [
    {
      params:{id:J.trades[0].id},
      body:{
        $set:{status:{name:"Saved"},slug:"SPY-1013jn",desc:"SPY May112021 260 Call @ .08 X 6"},
        $push:{notes:J.messages[1].id}
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  plans:J => [
    {
      params:{id:J.plans[0].id},
      body:{
        $set:{status:{name:"Saved"},slug:"SPY-1013jn",desc:"my bad ass trading plan"},
        $push:{notes:J.messages[1].id}
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  notifications:J => [
    {
      params:{id:J.notifications[0].id},
      body:{$set:{status:{name:"Sent"},job:"yiftdrjs565",sent:new Date()}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
};
