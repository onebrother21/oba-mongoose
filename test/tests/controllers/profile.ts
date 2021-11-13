import {Jest} from "../../utils";
import {ControllerTestData,ControllerTestFunc,ControllerNetwork} from "./types";

export type profileControllerTestData = {
  create:ControllerTestData<null,"profiles","create$",0>;
  fetch:ControllerTestData<null,"profiles","fetch$",0>;
  update:ControllerTestData<null,"profiles","update$",0>;
  query:ControllerTestData<null,"profiles","query$",0>;
};
export const profileControllerTestData:profileControllerTestData = {
  create:jsons => [
    {
      body:{
        name:"",
        role:"ADMIN",
        permissions:{cookies:new Date(),location:new Date()},
      },
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"GUEST" as any}
    },{
      body:{
        name:"",
        role:"USER",
        permissions:{cookies:new Date(),location:new Date()},
      },
      appuser:"Jim",
      authtkn:{okto:"use-api",username:"Jim",next:"123456",role:"GUEST" as any}
    },{
      body:{
        name:"",
        role:"USER",
        permissions:{cookies:new Date(),location:new Date()},
      },
      appuser:"Jenn",
      authtkn:{okto:"use-api",username:"Jenn",next:"123456",role:"GUEST" as any}
    },
  ],
  fetch:jsons => [
    {
      params:{id:jsons.profiles[0].id},
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"GUEST" as any}
    },{
      params:{name:jsons.profiles[1].name},
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"GUEST" as any}
    },
  ],
  update:jsons => [
    {
      params:{id:jsons.profiles[0].id},
      body:{
        $set:{
          name:"Jack",
          status:{name:"Enabled",time:new Date()},
          "settings.data":{...jsons.profiles[0].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{
          "followers":[jsons.profiles[1].id,jsons.profiles[2].id],
          "following":[jsons.profiles[1].id],
          "endorsements":jsons.profiles[1].id,
        },
        $pull:{
          "following":{$in:[jsons.profiles[1].id]},
        }
      },
      appuser:"John",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN"}
    },{
      params:{id:jsons.profiles[1].id},
      body:{
        $set:{
          name:"Jim",
          status:{name:"Enabled" as any,time:new Date()},
          "settings.data":{...jsons.profiles[1].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{"following":[jsons.profiles[0].id],},
      },
      appuser:"Jim",
      authtkn:{okto:"use-api",username:"Jim",next:"123456",role:"USER" as any}
    },{
      params:{id:jsons.profiles[2].id},
      body:{
        $set:{
          name:"Jenn",
          status:{name:"Enabled" as any,time:new Date()},
          "settings.data":{...jsons.profiles[2].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{"following":[jsons.profiles[0].id],},
      },
      appuser:"Jenn",
      authtkn:{okto:"use-api",username:"Jenn",next:"123456",role:"USER" as any}
    },
  ],
  query:jsons => [
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
};
export type profileControllerTests = {
  create:ControllerTestFunc<null,"profiles","create$">;
  fetch:ControllerTestFunc<null,"profiles","fetch$">;
  updateSetAndPush:ControllerTestFunc<null,"profiles","update$">;
  updatePull:ControllerTestFunc<null,"profiles","update$">;
  fetchFinal:ControllerTestFunc<null,"profiles","fetch$">;
  query:ControllerTestFunc<null,"profiles","query$">;
};
export const profileControllerTests:profileControllerTests = {
  create:async O => {
    const C = profileControllerTestData.create(O.jsons);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.jsons.profiles[i] = await O.controllers.profiles.create$(C[i]);
      Jest.is(o);
      Jest.not(o,null);
      Jest.is(o.status.name,"New");
      switch(i){
        case 0:{Jest.is(o.name,"John");break;}
        case 1:{Jest.is(o.name,"Jim");break;}
        case 2:{Jest.is(o.name,"Jenn");break;}
      }
    }
  },
  fetch:async O => {
    const F = profileControllerTestData.fetch(O.jsons);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.controllers.profiles.fetch$(F[i]);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = profileControllerTestData.update(O.jsons);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.jsons.profiles[i] = await O.controllers.profiles.update$(req);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updatePull:async O => {
    const U = profileControllerTestData.update(O.jsons);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.jsons.profiles[i] = await O.controllers.profiles.update$(req);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = profileControllerTestData.fetch(O.jsons);
    const o = await O.controllers.profiles.fetch$(F[0]);
    Jest.is(o);
    Jest.not(o,null);
    Jest.is(o.status.name,"Enabled");
    Jest.is(o.name,"Jack");
    Jest.is(o.role,"ADMIN");
    Jest.instance(o.permissions.cookies,Date);
  },
  query:async O => {
    const Q = profileControllerTestData.query(O.jsons);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.controllers.profiles.query$(Q[i]);
      Jest.is(o);
      Jest.arr(o.results);
      switch(i){
        case 0:{Jest.is(o.results.length,1);break;}
        case 1:{Jest.is(o.results.length,0);break;}
        case 2:{Jest.is(o.results.length,2);break;}
      }
    }
  },
};
export const profileController = (O:ControllerNetwork<null>) => Jest.utils.desc("Profiles",() => {
  it("Create",async () => await profileControllerTests.create(O),1E9);
  it("Fetch",async () => await profileControllerTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await profileControllerTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await profileControllerTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await profileControllerTests.fetchFinal(O),1E9);
  it("Query",async () => await profileControllerTests.query(O),1E9);
});