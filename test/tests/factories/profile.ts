import {Jest} from "../../utils";
import {FactoryTestData,FactoryTestFunc,FactoryNetwork} from "./types";

export type profileFactoryTestData = {
  create:FactoryTestData<"profiles","create",0>;
  fetch:FactoryTestData<"profiles","fetch",0>;
  update:FactoryTestData<"profiles","update",1>;
  query:FactoryTestData<"profiles","query",0>;
};
export const profileFactoryTestData:profileFactoryTestData = {
  create:instances => [
    {
      name:"John",
      role:"ADMIN",
      permissions:{cookies:new Date(),location:new Date()},
    },{
      name:"Jim",
      role:"USER",
      permissions:{cookies:new Date(),location:new Date()},
    },{
      name:"Jenn",
      role:"USER",
      permissions:{cookies:new Date(),location:new Date()},
    },
  ],
  fetch:instances => [instances.profiles[0].id,{name:instances.profiles[1].name}],
  update:instances => [
    {
      $set:{
        name:"Jack",
        status:{name:"Enabled"} as any,
        "settings.data":{...instances.profiles[0].settings.data,timeout:3600},
        "settings.app.withBal":true,
        "settings.app.optionsOnly":true,
        "permissions.video":new Date(),
        "socials.fb":"boopscoop",
        "stats.views":17,
      },
      $push:{
        "followers":instances.profiles[1].id,
        "following":[instances.profiles[1].id],
        "endorsements":instances.profiles[1].id,
      },
      $pull:{"following":{$in:[instances.profiles[1].id]},},
    }
  ],
  query:instances => [
    {query:{"name":"Jack"}},
    {query:{"role":"USER"}},
    {query:{following:{$in:[instances.profiles[1].id]}}},
  ],
};
export type profileFactoryTests = {
  create:FactoryTestFunc<"profiles","create">;
  fetch:FactoryTestFunc<"profiles","fetch">;
  updateSetAndPush:FactoryTestFunc<"profiles","update">;
  updatePull:FactoryTestFunc<"profiles","update">;
  fetchFinal:FactoryTestFunc<"profiles","fetch">;
  query:FactoryTestFunc<"profiles","query">;
};
export const profileFactoryTests:profileFactoryTests = {
  create:async O => {
    const C = profileFactoryTestData.create(O.instances);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.instances.profiles[i] = await O.factories.profiles.create(C[i]);
      Jest.is(o);
      Jest.not(o,null);
      const j = o.json();
      Jest.is(j.status.name,"New");
      switch(i){
        case 0:{Jest.is(j.name,"John");break;}
        case 1:{Jest.is(j.name,"Jim");break;}
        case 2:{Jest.is(j.name,"Jenn");break;}
      }
    }
  },
  fetch:async O => {
    const F = profileFactoryTestData.fetch(O.instances);
    for(let i = 0,l = F.length;i<l;i++){
      const f = F[i];
      const o = await O.factories.profiles.fetch(f);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = profileFactoryTestData.update(O.instances);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$pull;
      const q = O.instances.profiles[i].id;
      const o = O.instances.profiles[i] = await O.factories.profiles.update(q,u);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updatePull:async O => {
    const U = profileFactoryTestData.update(O.instances);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$set;
      delete u.$push;
      const q = O.instances.profiles[i].id;
      const o = O.instances.profiles[i] = await O.factories.profiles.update(q,u);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = profileFactoryTestData.fetch(O.instances);
    const o = await O.factories.profiles.fetch(F[0]);
    Jest.is(o);
    Jest.not(o,null);
    const j = o.json();
    Jest.is(j.status.name,"Enabled");
    Jest.is(j.name,"Jack");
  },
  query:async O => {
    const Q = profileFactoryTestData.query(O.instances);
    for(let i = 0,l = Q.length;i<l;i++){
      const q = Q[i];
      const o = await O.factories.profiles.query(q);
      Jest.arr(o);
      switch(i){
        case 0:{Jest.is(o.length,1);break;}
        case 1:{Jest.is(o.length,2);break;}
        case 2:{Jest.is(o.length,0);break;}
        default:break;
      }
    }
  },
};
export const profileFactory = (O:FactoryNetwork) => Jest.utils.desc("Profiles",() => {
  it("Create",async () => await profileFactoryTests.create(O),1E9);
  it("Fetch",async () => await profileFactoryTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await profileFactoryTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await profileFactoryTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await profileFactoryTests.fetchFinal(O),1E9);
  it("Query",async () => await profileFactoryTests.query(O),1E9);
});