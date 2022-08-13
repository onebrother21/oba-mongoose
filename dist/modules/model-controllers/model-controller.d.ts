/// <reference types="mongoose" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import OBACore from "@onebro/oba-core";
import { Values } from "@onebro/oba-common";
import { IsObjectId, Model, ModelFetchObject } from "../model-types";
import { ModelControllerMethods, ModelControllerQuery, ModelControllerReqUserRole } from "./model-controller-reqs";
export declare type ModelControllerType<R, T> = ModelControllerMethods<R, T> & {
    core: OBACore;
    privileges?: string[];
    badStatuses?: Values<Model<T>["statuses"]>[];
    adminRoles?: ModelControllerReqUserRole<R>[];
};
export interface ModelController<R, T> extends ModelControllerType<R, T> {
    unauthorized: (s: string) => never;
    isAuthed: (okto?: string) => void;
    isAdmin: (role?: ModelControllerReqUserRole<R>) => void;
    isBadStatus: (o: Model<T>["instance"]) => boolean;
}
export declare class ModelController<R, T> {
    core: OBACore;
    constructor(core: OBACore);
    serializeFetch: (params: {
        id: IsObjectId;
    } | ModelFetchObject<T>) => any;
    parseQueryObj: (q: ModelControllerQuery<T>) => Model<T>["queries"];
    unauthorized: (s: string) => never;
    isAuthed: (okto?: string) => void;
    isAdmin: (role?: ModelControllerReqUserRole<R>) => void;
    isBadStatus: (o: import("../model-types").IsModelSignature<T>["I"] & import("../model-types").SelfRefs<T, "I"> & {
        json: () => import("../model-types").IsModelSignature<T>["J"] & import("../model-types").SelfRefs<T, "J">;
        preview: import("../model-types").IsModelSignature<T>["P"];
    } & import("mongoose").Document) => boolean;
}
