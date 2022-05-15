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
    this.create$ = async ({body:newObj,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await profiles.shouldNotExist({name:username}))
      .then(async () => await profiles.create({...newObj,name:username}))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.fetchID$ = async ({params:{id},appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await profiles.fetch(id))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.fetch$ = async ({params,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await profiles.fetch(params))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.update$ = async ({params,body:updates,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await profiles.update((params as any).id||params,updates))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.remove$ = async ({params:{id},appuser:username,authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await profiles.update(id,{$set:{
        status:{name:"Deleted",time:new Date(),info:{username,role}}
      }}))
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.remove$$ = async ({params:{id,admin},appuser:username,authtkn:{okto,role}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(() => this.isRole(role,["ADMIN","SUPER","_SA_"]))
      .then(async () => await profiles.remove(id))//activity line
      .then(o => ({user:username,data:o.json(),auth:true}));
    };
    this.query$ = async ({query,appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await profiles.query(this.parseQueryObj(query)))
      .then(o => ({user:username,data:{results:o},auth:true}));
    };
    this.search$ = async ({query:{text},appuser:username,authtkn:{okto}}) => {
      return await Promise.resolve()
      .then(() => this.isAuth(okto,["use-api"]))
      .then(async () => await profiles.search(text))
      .then(o => ({user:username,data:{results:o},auth:true}));
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