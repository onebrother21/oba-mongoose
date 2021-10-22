import { Keys } from "../../../src";
import { ApiRouterNetworkType } from "../types";

export type RouterConfigHub = ApiRouterNetworkType["C"];
export type RouterConfigGetter<k extends Keys<RouterConfigHub>> = (J:ApiRouterNetworkType["J"]) => ReturnType<RouterConfigHub[k]>;
export type RouterConfigs = {[k in Keys<RouterConfigHub>]:RouterConfigGetter<k>;};
export const RouterConfigs:RouterConfigs = {
  profiles:J => [
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
  users:J => [
    {
      body:{
        email:"Jack@gmail.com",
        yob:"1980",
        loc:{info:"Houston, TX"},
        device:{make:"HP",model:"Flipbook",app:{name:"TEST",version:"1.0.0"},time:new Date()},
      },
      appuser:null,
      authtkn:null,
    },{
      body:{
        email:"jamesswift@gmail.com",
        yob:"1980",
        loc:{info:"Houston, TX"},
        device:{make:"HP",model:"Flipbook",app:{name:"TEST",version:"1.0.0"},time:new Date()},
      },
      appuser:null,
      authtkn:null,
    },{
      body:{
        email:"jennswift@gmail.com",
        yob:"1980",
        loc:{info:"Dallas, TX"},
        device:{make:"HP",model:"Flipbook",app:{name:"TEST",version:"1.0.0"},time:new Date()},
      },
      appuser:null,
      authtkn:null,
    },
  ],
  auths:J => [
    {
      body:{
        email:"jacob@gmail.com",
        loc:{info:"Houston, TX"},
        yob:"1980",
        device:{make:"HP",model:"Flipbook",app:{name:"TEST",version:"1.0.0"},time:new Date()},
      },
    },
  ],
  uploads:J => [
    {
      body:{
        publisher:J.profiles[0].id,
        loc:"Houston,TX",
        path:"/some/where/out/there",
        type:"jpg",
        name:"file123.jpg",
        size:11111,
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        publisher:J.profiles[1].id,
        loc:"Houston,TX",
        path:"/some/where/out/there",
        type:"jpg",
        name:"file124.jpg",
        size:11111,
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        publisher:J.profiles[2].id,
        loc:"Houston,TX",
        path:"/some/where/out/there",
        type:"jpg",
        name:"file125.jpg",
        size:11111,
        tagged:[J.profiles[0].id],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  messages:J => [
    {
      body:{
        author:J.profiles[0].id,
        recipients:[J.profiles[1].id],
        body:"Jimmy was here",
        loc:"Houston,TX",
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        author:J.profiles[1].id,
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
        author:J.profiles[2].id,
        recipients:[J.profiles[0].id,J.profiles[1].id],
        body:"Jenn was here",
        loc:"Houston,TX",
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  chats:J => [
    {
      body:{
      users:[J.profiles[0].id,J.profiles[1].id],
    },
    appuser:"Jack",
    authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    }
  ],
  trades:J => [
    {
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 1 Jan-04-21 367 Put @ 0.94 Limit to Open",
        symbol:"SPY",
        strike:367,
        type:"put",
        expiry:new Date("2021/01/04 15:15:00"),
        quotes:[
          {
            price:0.87,
            price_und:365,
            time:new Date("2021/01/04 10:07:33"),
            qty:1,
            action:"buy",
            type:"Lmt",
            amt:87.16,
            order:"1335",
          },{
            price:0.53,
            price_und:364,
            time:new Date("2021/01/04 12:26:50"),
            qty:1,
            action:"sell",
            type:"Lmt",
            amt:52.83,
            order:"1336",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 6 Jan-04-21 371 Calls @ 0.11 Limit to Open",
        symbol:"SPY",
        strike:371,
        type:"call",
        expiry:new Date("2021/01/04 15:15:00"),
        quotes:[
          {
            price:0.11,
            price_und:365,
            time:new Date("2021/01/04 12:29:47"),
            qty:6,
            action:"buy",
            type:"Lmt",
            amt:66.98,
            order:"1337",
          },{
            price:0.02,
            price_und:364,
            time:new Date("2021/01/04 13:50:03"),
            qty:6,
            action:"sell",
            type:"Lmt",
            amt:11.00,
            order:"1338",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 4 Jan-04-21 370 Calls @ 0.11 Limit to Open",
        symbol:"SPY",
        strike:370,
        type:"call",
        expiry:new Date("2021/01/04 15:15:00"),
        quotes:[
          {
            price:0.11,
            price_und:365,
            time:new Date("2021/01/04 14:45:12"),
            qty:4,
            action:"buy",
            type:"Lmt",
            amt:44.66,
            order:"1339",
          },{
            price:0.02,
            price_und:364,
            time:new Date("2021/01/04 15:06:13"),
            qty:4,
            action:"sell",
            type:"Lmt",
            amt:7.32,
            order:"1340",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"post-earnings",//shut up//
        desc:"Buy 7 Jan-08-21 8 Calls @ 0.1 Limit to Open",
        symbol:"MRO",
        strike:8,
        type:"call",
        expiry:new Date("2021/01/08 15:00:00"),
        quotes:[
          {
            price:0.10,
            price_und:365,
            time:new Date("2021/01/05 10:19:11"),
            qty:7,
            action:"buy",
            type:"Lmt",
            amt:71.15,
            order:"1341",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 1 Jan-29-21 14 Put @ 0.02 Limit to Open",
        symbol:"GME",
        strike:14,
        type:"put",
        expiry:new Date("2021/01/29 15:00:00"),
        quotes:[
          {
            price:0.02,
            price_und:365,
            time:new Date("2021/01/28 10:00:36"),
            qty:1,
            action:"buy",
            type:"Lmt",
            amt:2.16,
            order:"1346",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 2 Mar-17-21 398 Calls @ 0.55 Limit to Open",
        symbol:"SPY",
        strike:398,
        type:"call",
        expiry:new Date("2021/03/17 15:15:00"),
        quotes:[
          {
            price:0.55,
            price_und:365,
            time:new Date("2021/03/17 13:49:57"),
            qty:2,
            action:"buy",
            type:"Lmt",
            amt:110.33,
            order:"1351",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 4 Mar-19-21 400 Calls @ 0.55 Limit to Open",
        symbol:"SPY",
        strike:400,
        type:"call",
        expiry:new Date("2021/03/19 15:15:00"),
        quotes:[
          {
            price:0.55,
            price_und:365,
            time:new Date("2021/03/17 14:56:55"),
            qty:4,
            action:"buy",
            type:"Lmt",
            amt:220.66,
            order:"1354",
          },{
            price:0.09,
            price_und:365,
            time:new Date("2021/03/18 13:34:23"),
            qty:4,
            action:"sell",
            type:"Lmt",
            amt:220.66,
            order:"1357",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"live-scan-dollar-up",
        desc:"Buy 1 Mar-19-21 55 Call @ 1 Limit to Open",
        symbol:"VCEL",
        strike:55,
        type:"call",
        expiry:new Date("2021/03/19 15:00:00"),
        quotes:[
          {
            price:1.00,
            price_und:365,
            time:new Date("2021/03/18 11:48:32"),
            qty:1,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1356",
          },{
            price:2.10,
            price_und:365,
            time:new Date("2021/03/19 13:47:44"),
            qty:1,
            action:"sell",
            type:"Lmt",
            amt:209.83,
            order:"1358",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 3 Mar-22-21 393 Puts @ 0.3 Limit to Open",
        symbol:"SPY",
        strike:393,
        type:"put",
        expiry:new Date("2021/03/22 15:15:00"),
        quotes:[
          {
            price:0.30,
            price_und:365,
            time:new Date("2021/03/22 13:23:13"),
            qty:3,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1359",
          },{
            price:0.57,
            price_und:365,
            time:new Date("2021/03/22 14:57:13"),
            qty:3,
            action:"sell",
            type:"Lmt",
            amt:209.83,
            order:"1360",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 1 Mar-26-21 50 Put @ 1 Limit to Open",
        symbol:"GRPN",
        strike:50,
        type:"put",
        expiry:new Date("2021/03/26 15:00:00"),
        quotes:[
          {
            price:1.00,
            price_und:365,
            time:new Date("2021/03/23 08:36:46"),
            qty:1,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1359",
          },{
            price:4.00,
            price_und:365,
            time:new Date("2021/03/24 13:40:16"),
            qty:1,
            action:"sell",
            type:"Lmt",
            amt:209.83,
            order:"1360",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 3 Mar-24-21 390 Puts @ 0.3 Limit to Open",
        symbol:"SPY",
        strike:390,
        type:"put",
        expiry:new Date("2021/03/24 15:15:00"),
        quotes:[
          {
            price:0.30,
            price_und:365,
            time:new Date("2021/03/24 14:56:33"),
            qty:3,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1366",
          },{
            price:1.02,
            price_und:365,
            time:new Date("2021/03/24 14:32:08"),
            qty:3,
            action:"sell",
            type:"Lmt",
            amt:209.83,
            order:"1367",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 3 Mar-26-21 385 Puts @ 0.69 Limit to Open",
        symbol:"SPY",
        strike:385,
        type:"put",
        expiry:new Date("2021/03/26 15:15:00"),
        quotes:[
          {
            price:0.68,
            price_und:365,
            time:new Date("2021/03/25 11:52:39"),
            qty:3,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1372",
          },{
            price:0.02,
            price_und:365,
            time:new Date("2021/03/26 12:36:58"),
            qty:3,
            action:"sell",
            type:"Lmt",
            amt:209.83,
            order:"1374",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 9 Mar-26-21 230 Calls @ 0.9 Limit to Open",
        symbol:"SNOW",
        strike:230,
        type:"put",
        expiry:new Date("2021/03/26 15:00:00"),
        quotes:[
          {
            price:0.90,
            price_und:365,
            time:new Date("2021/03/26 10:40:28"),
            qty:2,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1373",
          },{
            price:0.06,
            price_und:365,
            time:new Date("2021/03/26 13:11:35"),
            qty:7,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1375",
          },{
            price:1.08,
            price_und:365,
            time:new Date("2021/03/26 14:25:57"),
            qty:9,
            action:"sell",
            type:"Lmt",
            amt:209.83,
            order:"1377",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 2 Mar-26-21 389 Puts @ 0.5 Limit to Open",
        symbol:"SPY",
        strike:389,
        type:"put",
        expiry:new Date("2021/03/26 15:00:00"),
        quotes:[
          {
            price:0.49,
            price_und:365,
            time:new Date("2021/03/26 13:50:42"),
            qty:2,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1376",
          },{
            price:0.04,
            price_und:365,
            time:new Date("2021/03/26 14:31:42"),
            qty:7,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1378",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 3 Apr-01-21 137 Puts @ 1.25 Limit to Open",
        symbol:"CTRX",
        strike:137,
        type:"put",
        expiry:new Date("2021/03/26 15:00:00"),
        quotes:[
          {
            price:1.25,
            price_und:365,
            time:new Date("2021/03/29 10:07:47"),
            qty:3,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1379",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 4 Apr-01-21 220 Puts @ 0.75 Limit to Open",
        symbol:"SQ",
        strike:220,
        type:"put",
        expiry:new Date("2021/04/01 15:00:00"),
        quotes:[
          {
            price:0.75,
            price_und:365,
            time:new Date("2021/03/31 12:19:17"),
            qty:4,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1383",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 1 Apr-09-21 217.5 Put @ 2.25 Limit to Open",
        symbol:"SQ",
        strike:220,
        type:"put",
        expiry:new Date("2021/04/09 15:00:00"),
        quotes:[
          {
            price:2.25,
            price_und:365,
            time:new Date("2021/04/05 10:31:31"),
            qty:1,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1391",
          },{
            price:0.70,
            price_und:365,
            time:new Date("2021/04/06 09:56:57"),
            qty:1,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1398",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 11 Mar-31-21 394 Puts @ 0.07 Limit to Open",
        symbol:"SPY",
        strike:394,
        type:"put",
        expiry:new Date("2021/03/31 15:15:00"),
        quotes:[
          {
            price:0.07,
            price_und:365,
            time:new Date("2021/03/31 13:30:19"),
            qty:11,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1384",
          },{
            price:0.03,
            price_und:365,
            time:new Date("2021/03/31 14:59:14"),
            qty:11,
            action:"sell",
            type:"Lmt",
            amt:100.16,
            order:"1386",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 11 Apr-09-21 9 Puts @ 0.09 Limit to Open",
        symbol:"AMC",
        strike:9,
        type:"put",
        expiry:new Date("2021/04/09 15:00:00"),
        quotes:[
          {
            price:0.08,
            price_und:365,
            time:new Date("2021/04/05 13:01:41"),
            qty:11,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1392",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 20 Apr-05-21 404 Puts @ 0.07 Limit to Open",
        symbol:"SPY",
        strike:404,
        type:"put",
        expiry:new Date("2021/04/09 15:00:00"),
        quotes:[
          {
            price:0.07,
            price_und:365,
            time:new Date("2021/04/05 14:04:48"),
            qty:20,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1394",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 20 Apr-05-21 408 Calls @ 0.04 Limit to Open",
        symbol:"SPY",
        strike:408,
        type:"call",
        expiry:new Date("2021/04/05 15:15:00"),
        quotes:[
          {
            price:0.04,
            price_und:365,
            time:new Date("2021/04/05 14:21:26"),
            qty:20,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1395",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 1 Apr-09-21 47.5 Put @ 0.72 Limit to Open",
        symbol:"MARA",
        strike:47.5,
        type:"call",
        expiry:new Date("2021/04/09 15:10:00"),
        quotes:[
          {
            price:0.72,
            price_und:365,
            time:new Date("2021/04/06 10:52:26"),
            qty:1,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1402",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 2 Apr-16-21 75 Puts @ 2 Limit to Open",
        symbol:"IRTC",
        strike:75,
        type:"put",
        expiry:new Date("2021/04/16 15:00:00"),
        quotes:[
          {
            price:2.00,
            price_und:365,
            time:new Date("2021/04/12 09:08:13"),
            qty:2,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1413",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 4 Apr-30-21 330 Calls @ 1 Limit to Open",
        symbol:"FB",
        strike:330,
        type:"call",
        expiry:new Date("2021/04/30 15:00:00"),
        quotes:[
          {
            price:1.00,
            price_und:365,
            time:new Date("2021/04/29 12:01:09"),
            qty:4,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1417",
          },{
            price:2.52,
            price_und:365,
            time:new Date("2021/04/29 14:49:09"),
            qty:4,
            action:"sell",
            type:"TrailingStopLmt",
            amt:100.16,
            order:"1418",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 6 Apr-07-21 404 Puts @ 0.11 Limit to Open",
        symbol:"SPY",
        strike:404,
        type:"put",
        expiry:new Date("2021/04/07 15:15:00"),
        quotes:[
          {
            price:0.11,
            price_und:365,
            time:new Date("2021/04/07 12:18:46"),
            qty:6,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1403",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 8 May-07-21 103 Calls @ 0.5 Limit to Open",
        symbol:"PZZA",
        strike:103,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.45,
            price_und:365,
            time:new Date("2021/05/06 11:05:55"),
            qty:8,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1435",
          },{
            price:0.15,
            price_und:365,
            time:new Date("2021/05/06 14:06:52"),
            qty:8,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1437",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 10 May-05-21 416 Puts @ 0.35 Limit to Open",
        symbol:"SPY",
        strike:416,
        type:"put",
        expiry:new Date("2021/05/05 15:15:00"),
        quotes:[
          {
            price:0.29,
            price_und:365,
            time:new Date("2021/05/05 14:48:28"),
            qty:10,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1431",
          },{
            price:0.69,
            price_und:365,
            time:new Date("2021/05/05 14:52:19"),
            qty:10,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1432",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 15 May-05-21 418 Calls @ 0.11 Limit to Open",
        symbol:"SPY",
        strike:418,
        type:"call",
        expiry:new Date("2021/05/05 15:15:00"),
        quotes:[
          {
            price:0.11,
            price_und:365,
            time:new Date("2021/05/05 12:28:02"),
            qty:15,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1430",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //SPY	10 @ 0.09	Buy 10 May-03-21 420 Calls @ 0.1 Limit to Open	Filled	--	05/03/2021, 1:14:57 PM	54118343	1423
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //SPY	12 @ 0.03	Sell 12 Apr-30-21 418 Calls @ 0.03 Limit to Close	Filled	--	04/30/2021, 4:11:47 PM	54118343	1422
        //SPY	12 @ 0.20	Buy 12 Apr-30-21 418 Calls @ 0.2 Limit to Open	Filled	--	04/30/2021, 3:35:52 PM	54118343	1420
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //FB	4 @ 0.12	Sell 4 Apr-30-21 325/330 Strangle @ 0.12 Limit	Filled	--	04/30/2021, 3:37:04 PM	54118343	1421
        //FB	4 @ 1.28	Buy 4 Apr-30-21 325/330 Strangle @ 1.3 Limit	Filled	--	04/30/2021, 10:30:22 AM	54118343	1419
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //SPY	15 @ 0.03	Sell 15 May-24-21 419 Puts @ 0.03 Limit to Close	Filled	--	05/24/2021, 4:08:52 PM	54118343	1455
        //SPY	15 @ 0.11	Buy 15 May-24-21 419 Puts @ 0.15 Limit to Open	Filled	--	05/24/2021, 3:51:09 PM	54118343	1454
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //BYND	1 @ 1.95	Buy 1 May-28-21 120 Call @ 1.95 Limit to Open	Filled	2.1	05/25/2021, 9:52:45 AM	54118343	1456
        //BYND	3 @ 0.31	Sell 3 May-28-21 110 Puts @ 0.31 Limit to Close	Filled	0.25	05/25/2021, 2:50:06 PM	54118343	1461
        //BYND	1 @ 0.32	Sell 1 May-28-21 110 Puts @ 0.32 Limit to Close	Filled	0.25	05/25/2021, 2:50:06 PM	54118343	1460 //1qty Filled
        //BYND	4 @ 0.75	Buy 4 May-28-21 110 Puts @ 0.75 Limit to Open	Filled	0.4	05/24/2021, 10:26:05 AM	54118343	1453
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //SPY	3 @ 0.60	Sell 3 May-10-21 419 Puts @ Trailing Stop, trail amt = 0.05 to Close	Filled	--	05/10/2021, 3:53:34 PM	54118343	1445
        //SPY	3 @ 0.27	Buy 3 May-10-21 419 Puts @ 0.33 Limit to Open	Filled	--	05/10/2021, 3:40:41 PM	54118343	1444
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //SPY	2 @ 3.41	Sell 2 May-12-21 410 Puts @ Trailing Stop, trail amt = 0.25 to Close	Filled	--	05/12/2021, 2:31:28 PM	54118343	1448
        //SPY	2 @ 1.00	Buy 2 May-12-21 410 Puts @ 1 Limit to Open	Filled	--	05/11/2021, 1:18:39 PM	54118343	1446
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //SPY	20 @ 0.08	Buy 20 May-07-21 424 Calls @ 0.12 Limit to Open	Filled	--	05/07/2021, 10:58:27 AM	54118343	1440
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //MARA	6 @ 0.58	Buy 6 May-14-21 18 Puts @ 0.58 Limit to Open	Filled	--	05/13/2021, 1:04:54 PM	54118343	1449
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },{
      body:{
        //SPY	10 @ 0.80	Buy 10 May-14-21 408 Puts @ 0.8 Limit to Open	Filled	--	05/13/2021, 3:52:52 PM	54118343	1450
        user:J.profiles[0].id,
        loc:"Houston,TX",
        strategy:"index-weekly",
        desc:"Buy 5 May-07-21 127 Puts @ 0.6 Limit to Open",
        symbol:"AAPL",
        strike:127,
        type:"call",
        expiry:new Date("2021/05/07 15:00:00"),
        quotes:[
          {
            price:0.57,
            price_und:365,
            time:new Date("2021/05/04 08:36:42"),
            qty:5,
            action:"buy",
            type:"Lmt",
            amt:100.16,
            order:"1428",
          }, {
            price:1.84,
            price_und:365,
            time:new Date("2021/05/04 12:06:49"),
            qty:5,
            action:"sell",
            type:"TrailingStop",
            amt:100.16,
            order:"1429",
          },
        ],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  plans:J => [
    {
      body:{
        user:J.profiles[0].id,
        loc:"Houston,TX",
        levels:[{"250":1},{"500":.5},{"1000":.3},{"5000":2},{"10000":.1}],
        trades:[...J.trades.map(t => t.id)],
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
  notifications:J => [
    {
      body:{
        audience:[J.profiles[0].id,J.profiles[1].id],
        body:"Jimmy was here",
        type:"welcome",
        method:"text",
        img:J.uploads[0].id,
      },
      appuser:"Jack",
      authtkn:{okto:"use-api",username:"Jack",next:"123456",role:"ADMIN" as any}
    },
  ],
};