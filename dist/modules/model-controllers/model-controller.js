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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const model_factories_1 = require("../model-factories");
class ModelController {
    constructor(core) {
        this.core = core;
        this.unauthorized = (s) => { throw this.core.e.unauthorized(s); };
        this.isAuth = (okto, privileges) => {
            switch (true) {
                case !(privileges || this.privileges).includes(okto):
                    this.unauthorized("api privileges");
                    break;
                default: break;
            }
        };
        this.isRole = (role, roles) => {
            switch (true) {
                case !roles.includes(role): return this.unauthorized("api privileges");
                default: break;
            }
        };
        this.isBadStatus = (o) => this.badStatuses.includes(o.status.name);
        this.init$ = (constructors) => __awaiter(this, void 0, void 0, function* () {
            this.factories = yield (0, model_factories_1.modelFactoryHub)(this.core, constructors);
            return this;
        });
        this.privileges = ["use-api"];
        this.badStatuses = ["Deleted"];
    }
}
exports.ModelController = ModelController;
//# sourceMappingURL=model-controller.js.map