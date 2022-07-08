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
    this.create$ = async ({body,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await messages.create(body))
      .then(o => ({data:o.json()}));
    };
    this.fetchID$ = async ({params:{id},appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await messages.fetch(id))
      .then(o => ({data:o.json()}));
    };
    this.fetch$ = async ({params,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await messages.fetch((params as any).id||params))
      .then(o => ({data:o.json()}));
    };
    this.update$ = async ({params:{id},body:updates,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await messages.update(id,updates))
      .then(o => ({data:o.json()}));
    };
    this.remove$ = async ({params:{id},appuser:{name,okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await messages.update(id,{$set:{
        status:{name:"Deleted",time:new Date(),info:{user:name,role}}
      }}))
      .then(o => ({data:o.json()}));
    };
    this.remove$$ = async ({params:{id,admin},appuser:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(() => this.isRole(["ADMIN","SUPER","_SA_"],role))
      .then(async () => await messages.remove(id))
      .then(o => ({data:o.json()}));
    };
    this.query$ = async ({query,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await messages.query(this.parseQueryObj(query)))
      .then(o => ({data:{results:o}}));
    };
    this.search$ = async ({query:{text},appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await messages.search(text))
      .then(o => ({data:{results:o}}));
    };
  }
}