import {Keys,Primitive,AnyArr,AnyObj,Extends} from "@onebro/oba-common";

export type Delimiter = [never,0,1,2,3,4,...0[]];
export type JoinPath<k,p> = k extends string?p extends string?`${k}${p extends ""?"":"."}${p}`:"":"";
export type DotNotationPathsObj<T,D extends number> = {[k in Keys<T>]-?:`${k}`|JoinPath<k,DotNotationPaths<T[k],Delimiter[D]>>;}[Keys<T>];
export type DotNotationPaths<T,D extends number = 2> =
  [D] extends [never]?never:
  T extends Function?never:
  T extends Primitive?never:
  T extends AnyArr?[D] extends [1]?"length"|DotNotationPaths<T[0],0>:never:/**/
  T extends AnyObj?DotNotationPathsObj<T,D>:never;
export type DotNotationValue<T,k> =
  T extends AnyArr?k extends "length"?number:DotNotationValue<T[0],k>:
  k extends Keys<T>?T[k]:
  k extends `${infer A}.${infer B}`?
  A extends Keys<T>?DotNotationValue<T[A],B>:
  never:never;
export type DotNotation<T> = {[k in DotNotationPaths<T>]:DotNotationValue<T,k>;};

type ok = {
  a:string;
  b:boolean;
  c:{a:string;b:boolean;c:Date;d:{a:true|0;b:string;};};
  d:number[];
};
type okk = DotNotationPaths<ok>;
type okkk = DotNotation<ok>;