import OB from "@onebro/oba-common";
import {J} from "../../utils";
import {FactoryTestData,FactoryTestFunc,FactoryNetwork} from "./types";

export type profileFactoryTestData = {
  create:FactoryTestData["profiles"]["create"];
  fetch:FactoryTestData["profiles"]["fetch"];
  update:FactoryTestData["profiles"]["update"];
  query:FactoryTestData["profiles"]["query"];
};
export const profileFactoryTestData:profileFactoryTestData = {
  create:O => [
    {
      name:O.users[0],
      role:"ADMIN",
      permissions:{cookies:new Date(),location:new Date()},
    },{
      name:O.users[1],
      role:"USER",
      permissions:{cookies:new Date(),location:new Date()},
    },{
      name:O.users[2],
      role:"USER",
      permissions:{cookies:new Date(),location:new Date()},
    },
  ],
  fetch:O => [O.instances.profiles[0].id,{name:O.instances.profiles[1].name}],
  update:O => [
    {
      $set:{
        name:O.users[3],
        status:{name:"Enabled",time:new Date()},
        "settings.data":{...O.instances.profiles[0].settings.data,timeout:3600},
        "settings.app.withBal":true,
        "settings.app.optionsOnly":true,
        "permissions.video":new Date(),
        "socials.fb":"boopscoop",
        "stats.views":17,
      },
      $push:{
        "followers":O.instances.profiles[1].id,
        "following":[O.instances.profiles[1].id],
        "endorsements":O.instances.profiles[1].id,
      },
      $pull:{"following":{$in:[O.instances.profiles[1].id]},},
    }
  ],
  query:O => [
    {query:{"name":O.users[3]}},
    {query:{"role":"USER"}},
    {query:{following:{$in:[O.instances.profiles[1].id]}}},
  ],
};
export type profileFactoryTests = {
  create:FactoryTestFunc["profiles"]["create"];
  fetch:FactoryTestFunc["profiles"]["fetch"];
  updateSetAndPush:FactoryTestFunc["profiles"]["update"];
  updatePull:FactoryTestFunc["profiles"]["update"];
  fetchFinal:FactoryTestFunc["profiles"]["fetch"];
  query:FactoryTestFunc["profiles"]["query"];
};
export const profileFactoryTests:profileFactoryTests = {
  create:async O => {
    const C = profileFactoryTestData.create(O);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.instances.profiles[i] = await O.factories.profiles.create(C[i]);
      J.is(o);
      J.not(o,null);
      const j = o.json();
      J.is(j.status?.name,"New");
      switch(i){
        case 0:{J.is(j.name,O.users[0]);break;}
        case 1:{J.is(j.name,O.users[1]);break;}
        case 2:{J.is(j.name,O.users[2]);break;}
      }
    }
  },
  fetch:async O => {
    const F = profileFactoryTestData.fetch(O);
    for(let i = 0,l = F.length;i<l;i++){
      const f = F[i];
      const o = await O.factories.profiles.fetch(f);
      J.is(o);
      J.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = profileFactoryTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$pull;
      const q = O.instances.profiles[i].id;
      const o = O.instances.profiles[i] = await O.factories.profiles.update(q,u);
      J.is(o);
      J.not(o,null);
    }
  },
  updatePull:async O => {
    const U = profileFactoryTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$set;
      delete u.$push;
      const q = O.instances.profiles[i].id;
      const o = O.instances.profiles[i] = await O.factories.profiles.update(q,u);
      J.is(o);
      J.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = profileFactoryTestData.fetch(O);
    const o = await O.factories.profiles.fetch(F[0]);
    J.is(o);
    J.not(o,null);
    const j = o.json();
    J.is(j.status?.name,"Enabled");
    J.is(j.name,O.users[3]);
  },
  query:async O => {
    const Q = profileFactoryTestData.query(O);
    for(let i = 0,l = Q.length;i<l;i++){
      const q = Q[i];
      const o = await O.factories.profiles.query(q);
      J.arr(o);
       /*switch(i){
        case 0:{J.gt(o.results.length,3);break;}
        case 1:{J.is(o.results.length,1);break;}
        case 2:{J.is(o.results.length);break;}
      }*/
    }
  },
};
export const ProfileFactoryTests = (O:FactoryNetwork) => J.desc("Profiles",() => {
  it("Create",async () => await profileFactoryTests.create(O),1E9);
  it("Fetch",async () => await profileFactoryTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await profileFactoryTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await profileFactoryTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await profileFactoryTests.fetchFinal(O),1E9);
  it("Query",async () => await profileFactoryTests.query(O),1E9);
});