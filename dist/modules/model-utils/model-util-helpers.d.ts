import { Document } from "mongoose";
import { Strings } from "@onebro/oba-common";
import { IsObjectId } from "../model-types";
export declare const mapEnumKey: (S: Strings, k: string) => string;
export declare const fix: (v: number, p?: number) => number;
export declare const checkIdOrModel: <T extends Document>(id: string, q: string | T) => boolean;
export declare const mapSelectedData: <T extends Document & {
    json: () => any;
}>(select: string[], results: T[]) => any[];
export declare const isObjectId: (q: any) => q is IsObjectId;
