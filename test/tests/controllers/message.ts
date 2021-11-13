import {Jest} from "../../utils";
import {ControllerTestData,ControllerTestFunc,ControllerNetwork} from "./types";

export type messageControllerTestData = {
  create:ControllerTestData<null,"messages","create$",0>;
  fetch:ControllerTestData<null,"messages","fetch$",0>;
  update:ControllerTestData<null,"messages","update$",0>;
  query:ControllerTestData<null,"messages","query$",0>;
};
export const messageControllerTestData:messageControllerTestData = {
  create:jsons => [
    {
      body:{
        author:jsons.profiles[0].id,
        recipients:[jsons.profiles[1].id],
        body:"Jimmy was here",
        loc:"Houston,TX",
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN"}
    },{
      body:{
        author:jsons.profiles[1].id,
        body:"James was here",
        loc:"Houston,TX",
        info:{public:true,views:17},
        test:{
          str:"oMg",
          bool:false,
          num:3,
          date:new Date("2021/01/01")},
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        author:jsons.profiles[2].id,
        recipients:[jsons.profiles[0].id,jsons.profiles[1].id],
        body:"Jenn was here",
        loc:"Houston,TX",
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  fetch:jsons => [
    {
      params:{id:jsons.messages[0].id},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"John",next:"123456",role:"ADMIN"}
    }
  ],
  update:jsons => [
    {
      params:{id:jsons.messages[0].id},
      body:{
        $set:{
          status:{name:"Seen",time:new Date()},
          body:`
            Jimmy was her twice type shit infoifjoiwn ifwifmimwoim ifmwimfimi wmwiwm
            osnfinfinwfinf winfiw if win w fw gwk gw  wgownomowmow w g  wogow gw owmgwo  womgo
            nqfmoqfm fkfoqf fo ufw jk wf wf ifwjw fw w fwnwiifnffwn`,
          title:"oops"
        },
        $push:{"notes":jsons.messages[1].id},
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN"}
    },
  ],
  query:jsons => [
    {
      query:{query:{$or:[
        {author:jsons.profiles[0].id},
        {"info.public":true} as any,
        {recipients:{$in:[jsons.profiles[0].id]}},
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{$and:[
        {author:jsons.profiles[1].id},
        {"created":{$gte:new Date("2020/12/12")}},
        {"created":{$lte:new Date()}}
      ]}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"GUEST" as any}
    },
  ],
};
export type messageControllerTests = {
  create:ControllerTestFunc<null,"messages","create$">;
  fetch:ControllerTestFunc<null,"messages","fetch$">;
  updateSetAndPush:ControllerTestFunc<null,"messages","update$">;
  updatePull:ControllerTestFunc<null,"messages","update$">;
  fetchFinal:ControllerTestFunc<null,"messages","fetch$">;
  query:ControllerTestFunc<null,"messages","query$">;
};
export const messageControllerTests:messageControllerTests = {
  create:async O => {
    const C = messageControllerTestData.create(O.jsons);
    for(let i = 0,l = C.length;i<l;i++){
      const o = O.jsons.messages[i] = await O.controllers.messages.create$(C[i]);
      Jest.is(o);
      Jest.not(o,null);
      Jest.is(o.status.name,"New");
      switch(i){
        case 0:{Jest.is(o.author.name,"Jack");break;}
        case 1:{Jest.is(o.author.name,"Jim");break;}
        case 2:{Jest.is(o.author.name,"Jenn");break;}
        default:break;
      }
    }
  },
  fetch:async O => {
    const F = messageControllerTestData.fetch(O.jsons);
    for(let i = 0,l = F.length;i<l;i++){
      const o = await O.controllers.messages.fetch$(F[i]);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = messageControllerTestData.update(O.jsons);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const o = O.jsons.messages[i] = await O.controllers.messages.update$(req);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  updatePull:async O => {
    const U = messageControllerTestData.update(O.jsons);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const o = O.jsons.messages[i] = await O.controllers.messages.update$(req);
      Jest.is(o);
      Jest.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = messageControllerTestData.fetch(O.jsons);
    const o = await O.controllers.messages.fetch$(F[0]);
    Jest.is(o);
    Jest.not(o,null);
    Jest.is(o.status.name.toLocaleUpperCase(),"SEEN");
    Jest.is(o.author.name,"Jack");
  },
  query:async O => {
    const Q = messageControllerTestData.query(O.jsons);
    for(let i = 0,l = Q.length;i<l;i++){
      const o = await O.controllers.messages.query$(Q[i]);
      Jest.is(o);
      Jest.arr(o.results);
      switch(i){
        case 0:{Jest.is(o.results.length,3);break;}
        case 1:{Jest.is(o.results.length,1);break;}
        case 2:{Jest.is(o.results.length,0);break;}
      }
    }
  },
};
export const messageController = (O:ControllerNetwork<null>) => Jest.utils.desc("Messages",() => {
  it("Create",async () => await messageControllerTests.create(O),1E9);
  it("Fetch",async () => await messageControllerTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await messageControllerTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await messageControllerTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await messageControllerTests.fetchFinal(O),1E9);
  it("Query",async () => await messageControllerTests.query(O),1E9);
});