import { Document } from "mongoose";
import { Strings } from "@onebro/oba-common";

export const mapEnumKey = (S:Strings,k:string) => Object.keys(S).find(k_ => S[k_] == k);
export const fix = (v:number,p:number = 2) => Number(v.toFixed(p));
export const checkIdOrModel = <T extends Document>(id:string,q:string|T) => id !== (ob.str(q)?q:(<T>q)._id);
export const mapSelectedData = <T extends Document & {json:() => any}>(select:string[],results:T[]) => {
  if(select) return results.map(p => select.reduce((o:any,k:string,i:number) => {
    if(k == "json") return p.json();
    o[k] = p.get(k);
    if(i == select.length - 1) o.id = p._id;
    return o;},{}));
  return results.map(p => ({id:p._id}));
};