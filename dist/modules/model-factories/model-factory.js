"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelFactory = void 0;
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const mongoose_1 = require("mongoose");
const model_utils_1 = require("../model-utils");
const model_factory_utils_1 = require("./model-factory-utils");
class ModelFactory {
    constructor(core, config) {
        this.core = core;
        this.config = config;
        this.createSchema = () => {
            const { definition, virtuals, methods, statuses, opts, } = this.config;
            const schemaOpts = Object.assign(Object.assign({}, opts), { toObject: { getters: true, virtuals: true }, toJSON: { getters: true, virtuals: true }, timestamps: { createdAt: "created", updatedAt: "updated" } });
            const schema = new mongoose_1.Schema(Object.assign(Object.assign(Object.assign({}, definition), { desc: { type: String }, info: { type: Object } }), (statuses ? { status: (0, model_factory_utils_1.getStatusSchemaDef)(statuses) } : null)), schemaOpts);
            schema.plugin(mongoose_unique_validator_1.default);
            if (statuses)
                schema.virtual("stat").get(function () {
                    return this.status.name + " @ " + this.status.time.toLocaleString("en-us");
                });
            for (const k in virtuals) {
                if (virtuals[k].get)
                    schema.virtual(k).get(virtuals[k].get);
                if (virtuals[k].set)
                    schema.virtual(k).set(virtuals[k].set);
            }
            for (const k in methods)
                schema.methods[k] = methods[k];
            return schema;
        };
        this.init = () => __awaiter(this, void 0, void 0, function* () {
            //const dbName = this.core.vars.name;
            const { modelName, collectionName } = this.config;
            const schema = this.createSchema();
            this.model = yield this.core.db.model(modelName, schema, collectionName);
            yield this.model.init();
            return this;
        });
        this.getSelectedData = (s, R) => {
            return ["json", "j"].includes(s) ? R.map(r => r.json()) :
                ["preview", "p"].includes(s) ? R.map(r => r.preview) :
                    (0, model_utils_1.mapSelectedData)(s, R);
        };
        const { refs, businessName } = config;
        const { core: { e: { _: E } } } = this;
        this.autopopulate = (o, s) => __awaiter(this, void 0, void 0, function* () {
            if (s)
                yield o.save();
            yield Promise.resolve().then(() => o.populate(this.config.refs));
            return o;
        });
        this.create_ = (c) => __awaiter(this, void 0, void 0, function* () { return yield this.autopopulate(new this.m(c), 1); });
        this.create = this.create_;
        this.find = (q) => __awaiter(this, void 0, void 0, function* () { return (0, model_utils_1.isObjectId)(q) ? yield this.m.findById(q) : yield this.m.findOne(this.m.translateAliases(q)); });
        this.fetch = (q) => __awaiter(this, void 0, void 0, function* () {
            if (q == undefined || q == null)
                throw E.badinfo();
            const o = yield this.find(q);
            if (!o)
                throw E.doesNotExist(businessName);
            return yield this.autopopulate(o);
        });
        this.exists = (q) => __awaiter(this, void 0, void 0, function* () { return !!(yield this.find(q)); });
        this.shouldNotExist = (q) => __awaiter(this, void 0, void 0, function* () { if (yield this.exists(q))
            throw E.existing(businessName); });
        this.update_ = (q, u) => __awaiter(this, void 0, void 0, function* () {
            const o = (0, model_utils_1.isObjectId)(q) ?
                yield this.m.findByIdAndUpdate(q, u, { new: true }) :
                yield this.m.findOneAndUpdate(q, u, { new: true });
            return yield this.autopopulate(o);
        });
        this.update = this.update_;
        this.remove_ = (q) => __awaiter(this, void 0, void 0, function* () { return (0, model_utils_1.isObjectId)(q) ? yield this.m.findByIdAndRemove(q) : yield this.m.findOneAndRemove(q); });
        this.remove = this.remove_;
        this.query = (q) => __awaiter(this, void 0, void 0, function* () {
            const { query, opts: { limit, skip, sort } = { limit: 25, skip: 0, sort: "asc" }, select } = q;
            const R = yield this.m.find(this.m.translateAliases(query))
                .populate(refs)
                //.where(where)
                .limit(limit)
                .skip(skip)
                .sort(sort)
                .exec();
            const results = this.getSelectedData(select, R);
            return results;
        });
        this.search = (q) => __awaiter(this, void 0, void 0, function* () {
            const R = yield this.m.find({ $regex: q, options: "i" });
            const results = this.getSelectedData("json", R);
            return results;
        });
        this.count = () => __awaiter(this, void 0, void 0, function* () { return yield this.m.estimatedDocumentCount(); });
    }
    get m() { return this.model; }
}
exports.ModelFactory = ModelFactory;
//# sourceMappingURL=model-factory.js.map