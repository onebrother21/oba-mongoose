import OBACore from "@onebro/oba-core";
import {ModelController,Model} from "../../../src";
import {ApiUserRoles} from "../dicts";
import {MessageSignature} from "../types";
import {ApiModelFactories,MessageFactory} from "../factories";

export interface MessageController extends ModelController<ApiUserRoles,MessageSignature> {}
export class MessageController extends ModelController<ApiUserRoles,MessageSignature> {
  constructor(public core:OBACore,public factories:ApiModelFactories){
    super(core);
    const messages = factories["messages"];
    this.create$ = async ({body,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await messages.create(body))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.fetchID$ = async ({params:{id},appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await messages.fetch(id))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.fetch$ = async ({params,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await messages.fetch(params))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.update$ = async ({params:{id},body:updates,appuser:username,authtkn:{okto}}:any) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await messages.update(id,updates))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.remove$ = async ({params:{id},appuser:username,authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await messages.update(id,{$set:{
        status:{name:"Deleted",time:new Date(),info:{username,role}}
      }}))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.remove$$ = async ({params:{id,admin},appuser:username,authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(() => this.isRole(role,["ADMIN","SUPER","_SA_"]))
      .then(async () => await messages.remove(id))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.query$ = async ({query,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await messages.query(this.parseQueryObj(query)))
      .then(o => ({user:username,data:{results:o},auth:true}));
    };
    this.search$ = async ({query:{text},appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await messages.search(text))
      .then(o => ({user:username,data:{results:o},auth:true}));
    };
  }
}