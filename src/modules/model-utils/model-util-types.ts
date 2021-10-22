import {Keys,Primitive} from "@onebro/oba-common";

export type AnyBoolean = boolean|1|0|null;
export type AnyArr = any[];
export type AnyObj = Record<string,any>;
export type AnyFunc = (...a:any) => any;
export type NoneOfType<T,A> = Pick<T,{[k in Keys<T>]:T[k] extends A?never:k;}[Keys<T>]>;
export type AllOfType<T,A> = Pick<T,{[k in Keys<T>]:T[k] extends A?k:never;}[Keys<T>]>;
export type ReplaceType<T,A,B> = NoneOfType<T,A> & Record<{[k in Keys<T>]:T[k] extends A?k:never;}[Keys<T>],B>;
export type Extends<X,Y,A,B> = X extends Y?A:B;
export type GetParameterIfFunc<F,n extends number> = F extends AnyFunc?Parameters<F>[n]:never;

export type Delimiter = [never,0,1,2,3,4,...0[]];
export type JoinPath<k,p> = k extends string?p extends string?`${k}${p extends ""?"":"."}${p}`:"":"";
export type GetDotNotationPaths<T,D extends number> = {[k in Keys<T>]-?:`${k}`|JoinPath<k,DotNotationPaths<T[k],Delimiter[D]>>;}[Keys<T>];
export type GetDotNotationValue<T,k> =
  T extends AnyArr?k extends "length"?number:GetDotNotationValue<T[0],k>:
  k extends Keys<T>?T[k]:
  k extends `${infer A}.${infer B}`?
  A extends Keys<T>?GetDotNotationValue<T[A],B>:never:never;
export type DotNotationPaths<T,D extends number = 2> =
  [D] extends [never]?never:
  T extends Primitive?never:
  T extends AnyArr?[D] extends [1]?"length"|GetDotNotationPaths<T[0],0>:never:/**/
  T extends AnyObj?GetDotNotationPaths<T,D>:never;
export type DotNotationObj<T> = {[k in DotNotationPaths<T>]:GetDotNotationValue<T,k>;};