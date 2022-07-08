import OBACore from "@onebro/oba-core";
import {ModelController} from "../../../src";
import {ProfileSignature} from "../types";
import {ApiUserRoles} from "../dicts";
import {ApiModelFactories} from "../factories";
import OB, { AppError } from "@onebro/oba-common";

export interface ProfileController extends ModelController<ApiUserRoles,ProfileSignature> {}
export class ProfileController extends ModelController<ApiUserRoles,ProfileSignature> {
  constructor(public core:OBACore,public factories:ApiModelFactories){
    const profiles = factories["profiles"];
    super(core);
    this.create$ = async ({body:newObj,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await profiles.shouldNotExist({name:newObj.name}))
      .then(async () => await profiles.create({...newObj}))
      .then(o => ({data:o.json()}));
    };
    this.fetchID$ = async ({params:{id},appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await profiles.fetch(id))
      .then(o => ({data:o.json()}));
    };
    this.fetch$ = async ({params,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await profiles.fetch((params as any).id||params))
      .then(o => ({data:o.json()}));
    };
    this.update$ = async ({params,body:updates,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await profiles.update((params as any).id||params,updates))
      .then(o => ({data:o.json()}));
    };
    this.remove$ = async ({params:{id},appuser:{name,okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await profiles.update(id,{$set:{
        status:{name:"Deleted",time:new Date(),info:{user:name,role}}
      }}))
      .then(o => ({data:o.json()}));
    };
    this.remove$$ = async ({params:{id,admin},appuser:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(() => this.isRole(["ADMIN","SUPER","_SA_"],role))
      .then(async () => await profiles.remove(id))//activity line
      .then(o => ({data:o.json()}));
    };
    this.query$ = async ({query,appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await profiles.query(this.parseQueryObj(query)))
      .then(o => ({data:{results:o}}));
    };
    this.search$ = async ({query:{text},appuser:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(["use-api"],okto))
      .then(async () => await profiles.search(text))
      .then(o => ({data:{results:o}}));
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