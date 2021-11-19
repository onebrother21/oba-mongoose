import OBACoreApi from "@onebro/oba-core-api";
import {ModelController} from "../../../src";
import {ApiModelSignatures} from "../factory-hub";
import {ApiUserRoles} from "../dicts";

export interface MessageController<Ev> extends ModelController<Ev,ApiModelSignatures,"messages",ApiUserRoles> {}
export class MessageController<Ev> extends ModelController<Ev,ApiModelSignatures,"messages",ApiUserRoles> {
  constructor(public core:OBACoreApi<Ev>){
    super(core);
    this.create$ = async ({body:newObj,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await this.factories.messages.create(newObj))
      .then(o => o.json());
    };
    this.fetch$ = async ({params,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await this.factories.messages.fetch((params as any).id||params))
      .then(o => o.json());
    };
    this.update$ = async ({params,body:updates,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await this.factories.messages.update((params as any).id||params,updates))
      .then(o => o.json());
    };
    this.remove$ = async ({params:{id},appuser:username,authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await this.factories.messages.update(id,{$set:{
        status:{name:"Deleted",time:new Date(),info:{username,role}}
      }}))
      .then(o => o.json());
    };
    this.remove$$ = async ({params:{id,adminId},authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(() => this.isRole(role,["ADMIN","SUPER","_SA_"]))
      .then(async () => await this.factories.messages.remove(id))
      .then(o => o.json());
    };
    this.query$ = async ({query,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await this.factories.messages.query(query))
      .then(o => ({results:o}));//.map(n => {console.log(n);return n.json()})}));
    };
    this.search$ = async ({query:{text},appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto))
      .then(async () => await this.factories.messages.search(text))
      .then(o => ({results:o}));//.map(n => n.json())}));
    };
  }
}