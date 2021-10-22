/*
import jwt from "jsonwebtoken";
import { Handler,encrypt,decrypt,Strings,AppError } from "@onebro/oba-common";
import * as ob from "@onebro/oba-common";

export const generateTkn = (payload:any,secret:string,opts?:any) => jwt.sign(payload,secret,opts);
export const verifyTkn = (header:string,secret:string) => {
  if(!header) throw new AppError({message:"Not Authorized - No Header",status:401});
  const parts = header.split(" "),
  valid = parts[0] = "Bearer" && parts[1],
  token = valid?parts[1]:null;
  if(!token) throw new AppError({message:"Not Authorized - No Tkn",status:401});
  return jwt.verify(token,secret);};
export const validateAPIAuthTkn = (secret:string) => {
  const handler:Handler = async (req,res,next) => {
    try{
      req.authtkn = verifyTkn(req.headers.authorization,secret);
      if(!req.authtkn) return next(new AppError({message:"unauthorized",status:401}));
      return next();}
    catch(e){return next(e);}};
  return handler;};
export const validateAppUser = (cookieName:string,key:string) => {
  const handler:Handler = async (req,res,next) => {
    const cookie = req.cookies[cookieName]  as string;
    if(cookie) req.appuser = decrypt(key,cookie);
    return next();};
  return handler;};
export const refreshAppUser = (cookieName:string,key:string) => {
  const handler:Handler = async (req,res,next) => {
    if(res.locals.actionResult){
      const usernameEnc = encrypt(key,res.locals.actionResult.username||req.appuser);
      res.cookie(cookieName,usernameEnc,{maxAge:900000,httpOnly:true});}
    return next();};
  return handler;};
export const mapUserRole = (K:Strings,k?:string) => !k?"G":Object.keys(K).find(s => K[s] == k);
export const validateUserRole = (roles?:string[]) => {
  const R = roles || ["USER","GUEST"];
  const handler:Handler = async (req,res,next) => {
    if(!R.includes(req.authtkn.role)) return next(new AppError({message:"unauthorized",status:401}));
    return next();};
  return handler;};
export type OBNotificationData = {method:string;type:string;user:string;data:any};
export const notifyUser = async (o:OBNotificationData,doSend?:boolean|number) => doSend?ob.ok(o):null;

import { validationResult } from "express-validator";
import request,{ Response as HttpResponse } from "request";
import { Strings,AppError } from "../core";
import { IAction } from "../models";
import { Handler,SendReqOpts } from "../model-req-types";

export const handleReqValidation = (validators:any[]) => {
  const handler:Handler = async (req,res,next) => {
    const errors = validationResult(req);
    if(errors.isEmpty()) return next();
    const extractedErrors:Strings[] = [];
    errors.array().map(err => extractedErrors.push({[err.param]:err.msg}));
    return next({errors:extractedErrors});};
  return [...validators,handler];};
export const handleAction = (action:IAction,statusOK:number = 200) => {
  const handler:Handler = async (req,res,next) => {
    try {
      res.locals.actionResult = await action(req);
      res.locals.actionStatus = statusOK;
      return next();}
    catch(e){return next(e);}};
  return handler;};
export const handleResponse = () => {
  const handler:Handler = async (req,res,next) => {
    if(!res.locals.actionResult) return next();
    res.status(res.locals.actionStatus).json(res.locals.actionResult);
  };
  return handler;};
export const sendreq = (opts:SendReqOpts) => {
  if(opts.ssl) opts = Object.assign({},opts,{});//SSLCertInfo);
  return new Promise(done => request(opts,(e:AppError,res:HttpResponse,body?:string) => {
    let data;
    if(e){ob.error(e.message,e.code);throw e;}
    else if(res.statusCode > 399 && body && JSON.parse(body)){
      e = JSON.parse(body);
      ob.error(e.message);
      throw e;}
    else if(body && JSON.parse(body)){data = JSON.parse(body);}
    return done(data);}));};
/*
  import fs from "fs";
  import path from "path";
  const certFile = path.resolve(__dirname, "ssl/client.crt");
  const keyFile = path.resolve(__dirname, "ssl/client.key");
  const caFile = path.resolve(__dirname, "ssl/ca.cert.pem");*/
//const SSLCertInfo = {};
/*cert:fs.readFileSync(certFile),
key:fs.readFileSync(keyFile),
passphrase:"password",
ca:fs.readFileSync(caFile)};
*/ 
//# sourceMappingURL=__model-req-helpers.js.map