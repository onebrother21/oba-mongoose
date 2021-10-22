"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTestPropsSchemaDef = exports.getSettingsSchemaDef = exports.getStatusSchemaDef = exports.getMiscReferenceSchemaDef = exports.getInfoHashMapSchemaDef = exports.getSpecialTypeSchemaDef = void 0;
const mongoose_1 = require("mongoose");
const model_utils_1 = require("../model-utils");
const getSpecialTypeSchemaDef = (S) => {
    const specialType = {
        type: String,
        get: (s) => S[s],
        set: (s) => model_utils_1.mapEnumKey(S, s),
    };
    return specialType;
};
exports.getSpecialTypeSchemaDef = getSpecialTypeSchemaDef;
const getInfoHashMapSchemaDef = (S, T) => {
    const infoMapGetter = (o, S) => {
        const n = {};
        for (const s in S) {
            const s_ = S[s];
            o.has(s_) ? n[s_] = o.get(s_) : null;
        }
        return n;
    };
    const infoMapSetter = (o, S) => {
        const n = new Map();
        for (const s in S) {
            const s_ = S[s];
            o[s_] ? n.set(s_, o[s_]) : null;
        }
        return n;
    };
    const infoMap = {
        type: Map,
        of: T,
        get: (o) => infoMapGetter(o, S),
        set: (o) => infoMapSetter(o, S),
        default: new Map(),
    };
    return infoMap;
};
exports.getInfoHashMapSchemaDef = getInfoHashMapSchemaDef;
const getMiscReferenceSchemaDef = (arr) => {
    let miscRefOrRefs;
    const miscRefSchema = new mongoose_1.Schema({
        model: { type: String, required: true },
        oid: { type: String, required: true },
    }, { _id: false });
    switch (true) {
        case arr == true:
        case arr == 1:
            miscRefOrRefs = { type: [miscRefSchema], default: [] };
            break;
        default:
            miscRefOrRefs = { type: miscRefSchema };
            break;
    }
    return miscRefOrRefs;
};
exports.getMiscReferenceSchemaDef = getMiscReferenceSchemaDef;
const getStatusSchemaDef = (statuses) => {
    const statusSchema = new mongoose_1.Schema({
        name: {
            type: String,
            required: true,
            enum: Object.keys(statuses),
            get: (k) => statuses[k],
            set: (k) => model_utils_1.mapEnumKey(statuses, k)
        },
        time: { type: Date, default: Date.now },
        info: { type: Object }
    }, { _id: false });
    const status = {
        type: statusSchema,
        default: () => ({ name: "New" }),
        get: (s) => (Object.assign({ name: s.name, time: s.time }, s.info ? { info: s.info } : null))
    };
    return status;
};
exports.getStatusSchemaDef = getStatusSchemaDef;
const getSettingsSchemaDef = () => {
    const settingsSchema = new mongoose_1.Schema({
        lang: { type: String, default: "en" },
        version: { type: String, required: true, trim: true },
        data: { type: Object },
        app: { type: Object },
    }, { _id: false });
    const settings = {
        type: settingsSchema,
        default: () => ({ lang: "en", version: "1.0.0" }),
    };
    return settings;
};
exports.getSettingsSchemaDef = getSettingsSchemaDef;
const getTestPropsSchemaDef = () => {
    const propsSchema = new mongoose_1.Schema({
        str: { type: String },
        num: { type: Number },
        bool: { type: Boolean },
        date: { type: Date },
    }, { _id: false });
    const props = {
        type: propsSchema,
        default: () => ({ str: "Created by OBA" }),
    };
    return props;
};
exports.getTestPropsSchemaDef = getTestPropsSchemaDef;
//# sourceMappingURL=model-factory-utils.js.map