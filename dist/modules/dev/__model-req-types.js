/*
import { Request,Response,NextFunction } from "express";
import { ErrorType } from "../core";

export type Handler = (req:Request,res:Response,next:NextFunction) => Promise<Response|void>;
export type ErrorHandler = (e:ErrorType,req:Request,res:Response,next:NextFunction) => Response|void;
export type FileReqHandler<U,DB> = (req:Request,res:Response,db:DB) => Promise<U>;
export type GetHandler<T> = (m:T) => Handler|ErrorHandler;
export type CustomHandlers<T> = {[k:string]:{func:GetHandler<T>;before?:string;after?:string;};};
export interface CookieBody {
  value:string;
  path?:string;
  "max-age"?:number;
  expires?:Date;
  httponly?:boolean;
  secure?:boolean;}
export interface SendReqAuthOptions {
  user?:string;
  username?:string;
  pass?:string;
  password?:string;
  sendImmediately?:boolean;
  bearer?:string|(() => string);}
export interface SendReqOpts {
  url:string;
  method?:string;
  headers?:{[key:string]:string;};
  auth?:SendReqAuthOptions;
  ssl?:boolean;
  form?:{[key:string]:any;};}
*/ 
//# sourceMappingURL=__model-req-types.js.map