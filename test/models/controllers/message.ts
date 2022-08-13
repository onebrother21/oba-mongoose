import OBACore from "@onebro/oba-core";
import {ModelController} from "../../../src";
import {MessageSignature} from "../types";
import {ApiUserRoles} from "../dicts";
import {ApiModelFactories} from "../factories";

export interface MessageController extends ModelController<ApiUserRoles,MessageSignature> {}
export class MessageController extends ModelController<ApiUserRoles,MessageSignature> {
  constructor(public core:OBACore,public factories:ApiModelFactories){
    super(core);
    this.badStatuses = ["Deleted"];
    this.privileges = ["use-api"];
    this.adminRoles = ["ADMIN","SUPER","_SA_"];
    const messages = factories["messages"];
    this.create$ = async ({body,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuthed(okto))
      .then(async () => await messages.create(body))
      .then(o => ({data:o.json()}));
    };
    this.fetch$ = async ({params,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuthed(okto))
      .then(async () => await messages.fetch(this.serializeFetch(params)))
      .then(o => ({data:o.json()}));
    };
    this.update$ = async ({params:{id},body:updates,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuthed(okto))
      .then(async () => await messages.update(id,updates))
      .then(o => ({data:o.json()}));
    };
    this.remove$ = async ({params:{id},appuser:{name,okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuthed(okto))
      .then(async () => await messages.update(id,{$set:{
        status:{name:"Deleted",time:new Date(),info:{user:name,role}}
      }}))
      .then(o => ({data:o.json()}));
    };
    this.remove$$ = async ({params:{id,admin},appuser:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuthed(okto))
      .then(() => this.isAdmin(role))
      .then(async () => await messages.remove(id))
      .then(o => ({data:o.json()}));
    };
    this.query$ = async ({query,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuthed(okto))
      .then(async () => await messages.query(this.parseQueryObj(query)))
      .then(o => ({data:{results:o}}));
    };
    this.search$ = async ({query:{text},appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuthed(okto))
      .then(async () => await messages.search(text))
      .then(o => ({data:{results:o}}));
    };
  }
}