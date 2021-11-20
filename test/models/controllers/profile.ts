import OBACoreApi from "@onebro/oba-core-api";
import {ModelController} from "../../../src";
import {ApiModelSignatures} from "../types";
import {ApiUserRoles} from "../dicts";

export interface ProfileController<Ev> extends ModelController<Ev,ApiModelSignatures,"profiles",ApiUserRoles> {}
export class ProfileController<Ev> extends ModelController<Ev,ApiModelSignatures,"profiles",ApiUserRoles> {
  constructor(public core:OBACoreApi<Ev>){
    super(core);
    this.create$ = async ({body:newObj,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await this.factories.profiles.shouldNotExist({name:username}))
      .then(async () => await this.factories.profiles.create({...newObj,name:username}))
      .then(o => o.json());
    };
    this.fetch$ = async ({params,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await this.factories.profiles.fetch((params as any).id||params))
      .then(o => o.json());
    };
    this.update$ = async ({params,body:updates,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await this.factories.profiles.update((params as any).id||params,updates))
      .then(o => o.json());
    };
    this.remove$ = async ({params:{id},appuser:username,authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await this.factories.profiles.update(id,{$set:{
        status:{name:"Deleted",time:new Date(),info:{username,role}}
      }}))
      .then(o => o.json());
    };
    this.remove$$ = async ({params:{id,adminId},authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(() => this.isRole(role,["ADMIN","SUPER","_SA_"]))
      .then(async () => await this.factories.profiles.remove(id))//activity line
      .then(o => o.json());
    };
    this.query$ = async ({query,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await this.factories.profiles.query(query))
      .then(o => ({results:o}));//.map(n => n.json())}));
    };
    this.search$ = async ({query:{text},appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await this.factories.profiles.search(text))
      .then(o => ({results:o}));//.map(n => n.json())}));
    };
  }
}
/*async updateMany$ = async ({body:{ids,updates}}:{body:{ids:string[];updates:DeepPartial<OBAuthAcct>}}) => await Promise.resolve()
  //.then(() => {if(okto !== "auth") throw factories.e.unAuth("api privileges");})
  //.then(() => {if(role !== "Admin") throw factories.e.unAuth("api privileges");})
  .then(async () => {
    if(ids.length){
      const arr:OBAuthAcct[] = [];
      for(let i = 0,l = ids.length;i<l;i++){
        const o = await OBAuthAcct._find(ids[i]);
        await OBAuthAcct._populate(o);
        arr.push(o);}
      return arr;}
    return await OBAuthAcct.find();})
  .then(async o => {
    for(let i = 0,l = ids.length;i<l;i++){
      await OBAuthAcct._update(o[i],updates);
      await o[i].save();}
    return o.length;})
  .then(n => ({updated:n} as any)),
async removeMany$ = async ({body:{ids}}:{body:{ids:string[]}}) => await Promise.resolve()
  //.then(() => {if(okto !== "auth") throw factories.e.unAuth("api privileges");})
  //.then(() => {if(role !== "Admin") throw factories.e.unAuth("api privileges");})
  .then(async () => {
    if(ids.length){
      const arr:OBAuthAcct[] = [];
      for(let i = 0,l = ids.length;i<l;i++){
        const o = await OBAuthAcct._find(ids[i]);
        await OBAuthAcct._populate(o);
        arr.push(o);}
      return arr;}
    return await OBAuthAcct.find();})
  .then(async o => {
    for(let i = 0,l = o.length;i<l;i++) await o[i].remove();
    return o.length;})
  .then(n => ({removed:n} as any)),
async search$ = async ({query,appuser:username,authtkn:{next,okto}}) => await Promise.resolve({results:[]}),
*/