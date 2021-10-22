/*
import { Router,Request,Response } from "express";
import { body } from "express-validator";
import { handleReqValidation } from "@onebro/oba-common";
import { AppMasterRouterConstructor } from "../modules";

const Main:AppMasterRouterConstructor = m => {
  const router = Router();
  router.get("/",(req,res,next) => res.json({ready:true}));
  router.get("/sample",(req,res,next) => res.render("index"));
  router.get("/test-only",(req,res,next) => res.json({ready:true}));
  router.post("/test-only",
    handleReqValidation([
      body("admin").exists(),
      body("admin").equals("ObAuth")]),
    (req:Request,res:Response) => res.json({config:m.events.get("config")}));
  router.get("/ob-auth/v1/en/test-only",(req,res,next) => res.json({ready:true}));
  return router;};
export {Main};


import { Request,Response,NextFunction } from "express";
import { GetCustomHandlers } from "../modules";
import { SendReqOpts, sendreq } from "@onebro/oba-common";
import * as ob from "@onebro/oba-common";

export const AMMiddlewares:GetCustomHandlers = m => ({
  apiGuard:{
    after:"cors",
    func:m => async (req:Request,res:Response,next:NextFunction) => {
      const consumers = m.vars.consumers;
      if(consumers){
        const name = req.url.split("/").slice(1)[0];
        const consumer = consumers[name];
        if(consumer){
          const id = req.headers["am-client-id"] as string||null;
          const key = req.headers["am-client-key"] as string||null;
          const valid = consumer && id && key?id === consumer.id && key === consumer.key:false;
          //ob.log(name,consumer,id,key,valid);
          if(!(id && key)) return next(m.e.missing(401,"API credentials not provided"));
          if(!valid) return next(m.e.invalid(401,"API credentials invalid"));}}
      return next();}},
  appShake:{
    after:"session",
    func:() => async (req:Request,res:Response,next:NextFunction) => {
      /*
      if(req.cookies._caOB){
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2,randomNumber.length);
        res.cookie("_baOB",randomNumber,{maxAge:900000,httpOnly:true});}
      else if(req.cookies._aB){
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2,randomNumber.length);
        res.cookie("_bcOB",randomNumber,{maxAge:900000,httpOnly:true});}
      else {
        let randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2,randomNumber.length);
        res.cookie("_bc_0",randomNumber,{maxAge:900000,httpOnly:true});
        return next();}},
    reqCounter:{
      after:"session",
      func:m => async (req:Request,res:Response,next:NextFunction) => {
        const within1Min = req.session.lastReq?((Date.now() - req.session.lastReq)/1000) <= 60:true;
        if(within1Min) req.session.visits = (req.session.visits||0)+1;
        else req.session.visits = 1;
          //req.session.reqsPerMin = (req.session.visits/60);}
        //if(req.session.visits > 12) console.warn("whoa what is going on?");
        req.session.lastReq = Date.now();
        return next();}},
  });
  /*
    showOrigin:{
      before:"cors",
      func:m => async (req:Request,res:Response,next:NextFunction) => {
        ob.log(req.headers["origin"]);
        return next();}},
    ipData:{
      after:"session",
      func:m => async (req:Request,res:Response,next:NextFunction) => {
        if(req.session && !req.session.ipdata){
          const consumerkey = m.vars.providers["ip-data"];
          const ip = /127.0.0/.test(req.ip)?"":req.ip;
          const url = `https://consumer.ipdata.co${ip?"/"+ip:""}?consumer-key=${consumerkey}`;
          const opts:SendReqOpts = {url};
          req.session.ipdata = await sendreq(opts);}
        return next();}},
    addUserToLocals:{
      after:"session",
      func:m => async (req:Request,res:Response,next:NextFunction) => {
        res.locals.user = req.appuser;
        return next();}
*/
/*
import { SocketEvent,SocketUser,SocketUserMsg,SocketUserTyping } from "../modules";

const users = new Set<string>();

export const registeredSockets:SocketEvent[] = [
  {name:"user_connected",action:(io) => (o:SocketUser) => {console.log(o.id);users.add(o.username);io.emit("user_connected",[...users]);}},
  {name:"user_disconnected",action:(io) => (o:SocketUser) => {users.delete(o.username);io.emit("user_disconnected",o.username);}},
  {name:"room",action:(io,s) => (room:string) => s.join(room)},
  {name:"chat_message",action:(io,s) => ({room,...data}:SocketUserMsg) => (room?s.broadcast.to(room):io).emit("chat_message",data)},
  {name:"info_message",action:(io,s) => ({room,...data}:SocketUserMsg) => (room?s.broadcast.to(room):io).emit("info_message",data)},
  {name:"typing",action:(io,s) => (data:SocketUserTyping) => s.broadcast.emit("typing",data)},
];
*/