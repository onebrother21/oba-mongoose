import {J} from "../../utils";
import {FactoryTestData,FactoryTestFunc,FactoryNetwork} from "./types";

export type messageFactoryTestData = {
  create:FactoryTestData<"messages","create">;
  fetch:FactoryTestData<"messages","fetch">;
  update:FactoryTestData<"messages","update">;
  query:FactoryTestData<"messages","query">;
};
export const messageFactoryTestData:messageFactoryTestData = {
  create:O => [
    {
      author:O.instances.profiles[0].id,
      recipients:[O.instances.profiles[1].id],
      body:"Jimmy was here",
      loc:"Houston,TX",
    },{
      author:O.instances.profiles[1].id,
      body:"James was here",
      loc:"Houston,TX",
      info:{public:true,views:17},
    },{
      author:O.instances.profiles[2].id,
      recipients:[O.instances.profiles[0].id,O.instances.profiles[1].id],
      body:"Jenn was here",
      loc:"Houston,TX",
    },
  ],
  fetch:O => [O.instances.messages[0].id],
  update:O => [
    {
      $set:{
        status:{name:"Saved",time:new Date()},
        body:`
          Jimmy was her twice type shit infoifjoiwn ifwifmimwoim ifmwimfimi wmwiwm
          osnfinfinwfinf winfiw if win w fw gwk gw  wgownomowmow w g  wogow gw owmgwo  womgo
          nqfmoqfm fkfoqf fo ufw jk wf wf ifwjw fw w fwnwiifnffwn`,
        title:"oops",
      },
      $push:{notes:O.instances.messages[1].id},
    }
  ],
  query:O => [
    {
      query:{
        $or:[
          {author:O.instances.profiles[0].id},
          {"info.public":true},
          {recipients:{$in:[O.instances.profiles[0].id]}},
        ]
      }
    },{
      query:{
        $and:[
          {author:O.instances.profiles[1].id},
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
    const C = messageFactoryTestData.create(O);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.instances.messages[i] = await O.factories.messages.create(C[i]);
      J.is(o);
      J.not(o,null);
      const j = o.json();
      J.is(j.status.name,"New");
      switch(i){
        case 0:{J.is(j.author.name,O.users[3]);break;}
        case 1:{J.is(j.author.name,O.users[1]);break;}
        case 2:{J.is(j.author.name,O.users[2]);break;}
      }
    }
  },
  fetch:async O => {
    const F = messageFactoryTestData.fetch(O);
    for(let i = 0,l = F.length;i<l;i++){
      const f = F[i];
      const o = await O.factories.messages.fetch(f);
      J.is(o);
      J.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = messageFactoryTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$pull;
      const q = O.instances.messages[i].id;
      const o = O.instances.messages[i] = await O.factories.messages.update(q,u);
      J.is(o);
      J.not(o,null);
    }
  },
  updatePull:async O => {
    const U = messageFactoryTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const u = U[i];
      delete u.$set;
      delete u.$push;
      const q = O.instances.messages[i].id;
      const o = O.instances.messages[i] = await O.factories.messages.update(q,u);
      J.is(o);
      J.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = messageFactoryTestData.fetch(O);
    const o = await O.factories.messages.fetch(F[0]);
    J.is(o);
    J.not(o,null);
    const j = o.json();
    J.is(j.status.name,"Saved");
    J.is(j.author.name,O.users[3]);
  },
  query:async O => {
    const Q = messageFactoryTestData.query(O);
    for(let i = 0,l = Q.length;i<l;i++){
      const q = Q[i];
      const o = await O.factories.messages.query(q);
      J.arr(o);
       /*switch(i){
        case 0:{J.gt(o.results.length,3);break;}
        case 1:{J.is(o.results.length,1);break;}
        case 2:{J.is(o.results.length);break;}
      }*/
    }
  },
};
export const MessageFactoryTests = (O:FactoryNetwork) => J.desc("Messages",() => {
  it("Create",async () => await messageFactoryTests.create(O),1E9);
  it("Fetch",async () => await messageFactoryTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await messageFactoryTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await messageFactoryTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await messageFactoryTests.fetchFinal(O),1E9);
  it("Query",async () => await messageFactoryTests.query(O),1E9);
});