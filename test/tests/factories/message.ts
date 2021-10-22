import {Jest} from "../../utils";
import {FactoryTestData,FactoryTestFunc,FactoryNetwork} from "./types";

export type messageFactoryTestData = {
  create:FactoryTestData<"messages","create",0>;
  fetch:FactoryTestData<"messages","fetch",0>;
  update:FactoryTestData<"messages","update",1>;
  query:FactoryTestData<"messages","query",0>;
};
export const messageFactoryTestData:messageFactoryTestData = {
  create:instances => [
    {
      author:instances.profiles[0].id,
      recipients:[instances.profiles[1].id],
      body:"Jimmy was here",
      loc:"Houston,TX",
    },{
      author:instances.profiles[1].id,
      body:"James was here",
      loc:"Houston,TX",
      info:{public:true,views:17},
    },{
      author:instances.profiles[2].id,
      recipients:[instances.profiles[0].id,instances.profiles[1].id],
      body:"Jenn was here",
      loc:"Houston,TX",
    },
  ],
  fetch:instances => [instances.messages[0].id],
  update:instances => [
    {
      $set:{
        status:{name:"Saved",time:new Date()},
        body:`
          Jimmy was her twice type shit infoifjoiwn ifwifmimwoim ifmwimfimi wmwiwm
          osnfinfinwfinf winfiw if win w fw gwk gw  wgownomowmow w g  wogow gw owmgwo  womgo
          nqfmoqfm fkfoqf fo ufw jk wf wf ifwjw fw w fwnwiifnffwn`,
        title:"oops"},
      $push:{notes:instances.messages[1].id},
    }
  ],
  query:instances => [
    {
      query:{
        $or:[
          {author:instances.profiles[0].id},
          {"info.public":true},
          {recipients:{$in:[instances.profiles[0].id]}},
        ]
      }
    },{
      query:{
        $and:[
          {author:instances.profiles[1].id},
          {"created":{$gte:new Date("2020/12/12")}},
          {"created":{$lte:new Date()}}
        ]
      }
    },{
      query:{"status.name":"Novel" as any}
    }
  ],
};
export type messageFactoryTests = {
  create:FactoryTestFunc<"messages","create">;
  fetch:FactoryTestFunc<"messages","fetch">;
  updateSetAndPush:FactoryTestFunc<"messages","update">;
  updatePull:FactoryTestFunc<"messages","update">;
  fetchFinal:FactoryTestFunc<"messages","fetch">;
  query:FactoryTestFunc<"messages","query">;
};
export const messageFactoryTests:messageFactoryTests = {
  create:async O => {
    const C = messageFactoryTestData.create(O.instances);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.instances.messages[i] = await O.factories.messages.create(C[i]);
      Jest.is(o);
      Jest.not(o,null);
      const j = o.json();
      Jest.is(j.status.name,"New");
      switch(i){
        case 0:{Jest.is(j.author.name,"Jack");break;}
        case 1:{Jest.is(j.author.name,"Jim");break;}
        case 2:{Jest.is(j.author.name,"Jenn");break;}
      }
    }
  },
  fetch:async O => {
    const F = messageFactoryTestData.fetch(O.instances);
    for(let i = 0,l = F.length;i<l;i++){
      const f = F[i];
      const o = await O.factories.messages.fetch(f);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = messageFactoryTestData.update(O.instances);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$pull;
      const q = O.instances.messages[i].id;
      const o = O.instances.messages[i] = await O.factories.messages.update(q,u);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updatePull:async O => {
    const U = messageFactoryTestData.update(O.instances);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$set;
      delete u.$push;
      const q = O.instances.messages[i].id;
      const o = O.instances.messages[i] = await O.factories.messages.update(q,u);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = messageFactoryTestData.fetch(O.instances);
    const o = await O.factories.messages.fetch(F[0]);
    Jest.is(o);
    Jest.not(o,null);
    const j = o.json();
    Jest.is(j.status.name,"Saved");
    Jest.is(j.author.name,"Jack");
  },
  query:async O => {
    const Q = messageFactoryTestData.query(O.instances);
    for(let i = 0,l = Q.length;i<l;i++){
      const q = Q[i];
      const o = await O.factories.messages.query(q);
      Jest.arr(o);
      switch(i){
        case 0:{Jest.is(o.length,3);break;}
        case 1:{Jest.is(o.length,1);break;}
        case 2:{Jest.is(o.length,0);break;}
        default:break;
      }
    }
  },
};
export const messageFactory = (O:FactoryNetwork) => Jest.utils.desc("Messages",() => {
  it("Create",async () => await messageFactoryTests.create(O),1E9);
  it("Fetch",async () => await messageFactoryTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await messageFactoryTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await messageFactoryTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await messageFactoryTests.fetchFinal(O),1E9);
  it("Query",async () => await messageFactoryTests.query(O),1E9);
});