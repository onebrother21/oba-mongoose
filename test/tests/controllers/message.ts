import {J} from "../../utils";
import {ControllerTestData,ControllerTestFunc,ControllerNetwork} from "./types";

export type messageControllerTestData = {
  create:ControllerTestData["messages"]["create"];
  fetch:ControllerTestData["messages"]["fetch"];
  update:ControllerTestData["messages"]["update"];
  query:ControllerTestData["messages"]["query"];
};
export const messageControllerTestData:messageControllerTestData = {
  create:O => [
    {
      body:{
        author:O.jsons.profiles[0].id,
        recipients:[O.jsons.profiles[1].id],
        body:"Jimmy was here",
        loc:"Houston,TX",
      },
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    },{
      body:{
        author:O.jsons.profiles[1].id,
        body:"James was here",
        loc:"Houston,TX",
        info:{public:true,views:17},
        test:{
          str:"oMg",
          bool:false,
          num:3,
          date:new Date("2021/01/01")},
      },
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    },{
      body:{
        author:O.jsons.profiles[2].id,
        recipients:[O.jsons.profiles[0].id,O.jsons.profiles[1].id],
        body:"Jenn was here",
        loc:"Houston,TX",
      },
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    },
  ],
  fetch:O => [
    {
      params:{id:O.jsons.messages[0].id},
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    }
  ],
  update:O => [
    {
      params:{id:O.jsons.messages[0].id},
      body:{
        $set:{
          status:{name:"Seen",time:new Date()},
          body:`
            Jimmy was her twice type shit infoifjoiwn ifwifmimwoim ifmwimfimi wmwiwm
            osnfinfinwfinf winfiw if win w fw gwk gw  wgownomowmow w g  wogow gw owmgwo  womgo
            nqfmoqfm fkfoqf fo ufw jk wf wf ifwjw fw w fwnwiifnffwn`,
          title:"oops"
        },
        $push:{"notes":O.jsons.messages[1].id},
      },
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    },
  ],
  query:O => [
    {
      query:{query:{$or:[
        {author:O.jsons.profiles[0].id},
        {"info.public":true} as any,
        {recipients:{$in:[O.jsons.profiles[0].id]}},
      ]}},
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    },{
      query:{query:{$and:[
        {author:O.jsons.profiles[1].id},
        {"created":{$gte:new Date("2020/12/12"),$lte:new Date()}}
      ]}},
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    },{
      query:{query:{"status.name":"Novel" as any}},
      appuser:{username:O.users[3],okto:"use-api",next:"123456",role:"ADMIN"}
    },
  ],
};
export type messageControllerTests = {
  create:ControllerTestFunc["messages"]["create"];
  fetch:ControllerTestFunc["messages"]["fetch"];
  updateSetAndPush:ControllerTestFunc["messages"]["update"];
  updatePull:ControllerTestFunc["messages"]["update"];
  fetchFinal:ControllerTestFunc["messages"]["fetch"];
  query:ControllerTestFunc["messages"]["query"];
};
export const messageControllerTests:messageControllerTests = {
  create:async O => {
    const C = messageControllerTestData.create(O);
    for(let i = 0,l = C.length;i<l;i++){
      const {data:o} = await O.controllers.messages.create$(C[i]);
      O.jsons.messages[i] = o;
      J.is(o);
      J.not(o,null);
      J.is(o.status.name,"New");
      switch(i){
        case 0:{J.is(o.author.name,O.users[3]);break;}
        case 1:{J.is(o.author.name,O.users[1]);break;}
        case 2:{J.is(o.author.name,O.users[2]);break;}
        default:break;
      }
    }
  },
  fetch:async O => {
    const F = messageControllerTestData.fetch(O);
    for(let i = 0,l = F.length;i<l;i++){
      const {data:o} = await O.controllers.messages.fetch$(F[i]);
      J.is(o);
      J.not(o,null);
    }
  },
  updateSetAndPush:async O => {
    const U = messageControllerTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$pull;
      const {data:o} = await O.controllers.messages.update$(req);
      O.jsons.messages[i] = o;
      J.is(o);
      J.not(o,null);
    }
  },
  updatePull:async O => {
    const U = messageControllerTestData.update(O);
    for(let i = 0,l = U.length;i<l;i++){
      const req = U[i];
      delete req.body.$set;
      delete req.body.$push;
      const {data:o} = await O.controllers.messages.update$(req);
      O.jsons.messages[i] = o;
      J.is(o);
      J.not(o,null);
    }
  },
  fetchFinal:async O => {
    const F = messageControllerTestData.fetch(O);
    const {data:o} = await O.controllers.messages.fetch$(F[0]);
    J.is(o);
    J.not(o,null);
    J.is(o.status.name.toLocaleUpperCase(),"SEEN");
    J.is(o.author.name,O.users[3]);
  },
  query:async O => {
    const Q = messageControllerTestData.query(O);
    for(let i = 0,l = Q.length;i<l;i++){
      const {data:o} = await O.controllers.messages.query$(Q[i]);
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
export const messageController = (O:ControllerNetwork) => J.desc("Messages",() => {
  it("Create",async () => await messageControllerTests.create(O),1E9);
  it("Fetch",async () => await messageControllerTests.fetch(O),1E9);
  it("Update - Set & Push",async () => await messageControllerTests.updateSetAndPush(O),1E9);
  it("Update - Pull",async () => await messageControllerTests.updatePull(O),1E9);
  it("Fetch - Final Check",async () => await messageControllerTests.fetchFinal(O),1E9);
  it("Query",async () => await messageControllerTests.query(O),1E9);
});