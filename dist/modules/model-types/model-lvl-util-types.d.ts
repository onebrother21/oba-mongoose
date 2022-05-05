import { Keys, Primitive, AnyArr, AnyObj } from "@onebro/oba-common";
export declare type Delimiter = [never, 0, 1, 2, 3, 4, ...0[]];
export declare type JoinPath<k, p> = k extends string ? p extends string ? `${k}${p extends "" ? "" : "."}${p}` : "" : "";
export declare type DotNotationPathsObj<T, D extends number> = {
    [k in Keys<T>]-?: `${k}` | JoinPath<k, DotNotationPaths<T[k], Delimiter[D]>>;
}[Keys<T>];
export declare type DotNotationPaths<T, D extends number = 2> = [
    D
] extends [never] ? never : T extends Function ? never : T extends Primitive ? never : T extends AnyArr ? [D] extends [1] ? "length" | DotNotationPaths<T[0], 0> : never : T extends AnyObj ? DotNotationPathsObj<T, D> : never;
export declare type DotNotationValue<T, k> = T extends AnyArr ? k extends "length" ? number : DotNotationValue<T[0], k> : k extends Keys<T> ? T[k] : k extends `${infer A}.${infer B}` ? A extends Keys<T> ? DotNotationValue<T[A], B> : never : never;
export declare type DotNotation<T> = {
    [k in DotNotationPaths<T>]: DotNotationValue<T, k>;
};
