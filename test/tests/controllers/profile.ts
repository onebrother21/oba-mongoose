import OB from "@onebro/oba-common";
import {J} from "../../utils";
import {ControllerTestData,ControllerTestFunc,ControllerNetwork} from "./types";

export type profileControllerTestData = {
  create:ControllerTestData<"profiles","create$">;
  fetch:ControllerTestData<"profiles","fetch$">;
  update:ControllerTestData<"profiles","update$">;
  query:ControllerTestData<"profiles","query$">;
};
export const profileControllerTestData:profileControllerTestData = {
  create:O => [
    {
      body:{
        name:"",
        role:"ADMIN",
        permissions:{cookies:new Date(),location:new Date()},
      },
      appuser:O.users[0],
      authtkn:{okto:"use-api",username:O.users[0],next:"123456",role:"GUEST" as any}
    },{
      body:{
        name:"",
        role:"USER",
        permissions:{cookies:new Date(),location:new Date()},
      },
      appuser:O.users[1],
      authtkn:{okto:"use-api",username:O.users[1],next:"123456",role:"GUEST" as any}
    },{
      body:{
        name:"",
        role:"USER",
        permissions:{cookies:new Date(),location:new Date()},
      },
      appuser:O.users[2],
      authtkn:{okto:"use-api",username:O.users[2],next:"123456",role:"GUEST" as any}
    },
  ],
  fetch:O => [
    {
      params:{id:O.jsons.profiles[0].id},
      appuser:O.users[0],
      authtkn:{okto:"use-api",username:O.users[0],next:"123456",role:"GUEST" as any}
    },{
      params:{name:O.jsons.profiles[1].name},
      appuser:O.users[0],
      authtkn:{okto:"use-api",username:O.users[0],next:"123456",role:"GUEST" as any}
    },
  ],
  update:O => [
    {
      params:{id:O.jsons.profiles[0].id},
      body:{
        $set:{
          name:O.users[3],
          status:{name:"Enabled",time:new Date()},
          "settings.data":{...O.jsons.profiles[0].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{
          "followers":[O.jsons.profiles[1].id,O.jsons.profiles[2].id],
          "following":[O.jsons.profiles[1].id],
          "endorsements":O.jsons.profiles[1].id,
        },
        $pull:{
          "following":{$in:[O.jsons.profiles[1].id]},
        }
      },
      appuser:O.users[0],
      authtkn:{okto:"use-api",username:O.users[0],next:"123456",role:"ADMIN"}
    },{
      params:{id:O.jsons.profiles[1].id},
      body:{
        $set:{
          status:{name:"Enabled" as any,time:new Date()},
          "settings.data":{...O.jsons.profiles[1].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{"following":[O.jsons.profiles[0].id],},
      },
      appuser:O.users[1],
      authtkn:{okto:"use-api",username:O.users[1],next:"123456",role:"USER" as any}
    },{
      params:{id:O.jsons.profiles[2].id},
      body:{
        $set:{
          status:{name:"Enabled" as any,time:new Date()},
          "settings.data":{...O.jsons.profiles[2].settings.data,timeout:3600},
          "settings.app.withBal":true,
          "settings.app.optionsOnly":true,
          "permissions.video":new Date(),
          "socials.fb":"boopscoop",
          "stats.views":17,
        },
        $push:{"following":[O.jsons.profiles[0].id],},
      },
      appuser:O.users[2],
      authtkn:{okto:"use-api",username:O.users[2],next:"123456",role:"USER" as any}
    },
  ],
  query:O => [
    {
      query:{query:{name:O.users[3]},select:"json"},
      appuser:O.users[3],
      authtkn:{okto:"use-api",username:O.users[3],next:"123456",role:"GUEST" as any}
    },{
      query:{query:{name:O.users[0]},select:"json"},
      appuser:O.users[3],
      authtkn:{okto:"use-api",username:O.users[3],next:"123456",role:"GUEST" as any}
    },{
      query:{query:{role:"USER"},select:"json"},
      appuser:O.users[3],
      authtkn:{okto:"use-api",username:O.users[3],next:"123456",role:"GUEST" as any}
    },
  ],
};
export type profileControllerTests = {
  create:ControllerTestFunc<"profiles","create$">;
  fetch:ControllerTestFunc<"profiles","fetch$">;
  updateSetAndPush:ControllerTestFunc<"profiles","update$">;
  updatePull:ControllerTestFunc<"profiles","update$">;
  fetchFinal:ControllerTestFunc<"profiles","fetch$">;
  query:ControllerTestFunc<"profiles","query$">;
};
export const profileControllerTests:profileControllerTests = {
  create:async O => {
    const C = profileControllerTestData.create(O);
    for(let i = 0,l = C.length;i<l;i++){
      const {data:o} = await O.controllers.profiles.create$(C[i]);
      O.jsons.profiles[i] = o;
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      switch(i){
        case 0:{J.is(o.name,O.users[0]);break;}
        case 1:{J.is(o.name,O.users[1]);break;}
        case 2:{J.is(o.name,O.users[2]);break;}
      }
    }
  },
  fetch:async O => {
    const F = profileControllerTestData.fetch(O);
    for(let i = 0,l = F.length;i<l;i++){
      const {data:o} = await O.controllers.profiles.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = profileControllerTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const {data:o} = await O.controllers.profiles.update$(req);
      O.jsons.profiles[i] = o;
      J.is(o);
      J.not(o,null);
    }
  },
  updatePull:async O => {
    const U = profileControllerTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const {data:o} = await O.controllers.profiles.update$(req);
      O.jsons.profiles[i] = o;
      J.is(o);
      J.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = profileControllerTestData.fetch(O);
    const {data:o} = await O.controllers.profiles.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name,"Enabled");
    J.is(o.name,O.users[3]);
    J.is(o.role,"ADMIN");
    J.instance(o.permissions.cookies,Date);
  },
  query:async O => {
    const Q = profileControllerTestData.query(O);
    for(let i = 0,l = Q.length;i<l;i++){
      const {data:o} = await O.controllers.profiles.query$(Q[i]);
      J.is(o);
      J.arr(o.results);
       /*switch(i){
        case 0:{J.gt(o.results.length,3);break;}
        case 1:{J.is(o.results.length,1);break;}
        case 2:{J.is(o.results.length);break;}
      }*/
    }
  },
};
export const profileController = (O:ControllerNetwork) => J.desc("Profiles",() => {
  it("Create",async () => await profileControllerTests.create(O),1E9);
  it("Fetch",async () => await profileControllerTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await profileControllerTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await profileControllerTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await profileControllerTests.fetchFinal(O),1E9);
  it("Query",async () => await profileControllerTests.query(O),1E9);
});