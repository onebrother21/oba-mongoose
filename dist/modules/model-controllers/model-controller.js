"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
const oba_common_1 = __importDefault(require("@onebro/oba-common"));
class ModelController {
    constructor(core) {
        this.core = core;
        this.parseQueryObj = (q) => {
            const q_ = {};
            for (const k in q) {
                const K = k;
                const o = q[K];
                q_[K] = oba_common_1.default.str(o) ? oba_common_1.default.parse(o) : o;
            }
            return q_;
        };
        this.unauthorized = (s) => { throw this.core.e._.unauthorized(s); };
        this.isAuth = (privileges, okto) => {
            switch (true) {
                case !(privileges || this.privileges).includes(okto):
                    this.unauthorized("api privileges");
                    break;
                default: break;
            }
        };
        this.isRole = (roles, role) => {
            switch (true) {
                case !roles.includes(role):
                    this.unauthorized("api privileges");
                    break;
                default: break;
            }
        };
        this.isBadStatus = (o) => this.badStatuses.includes(o.status.name);
        this.privileges = ["use-api"];
        this.badStatuses = ["Deleted"];
    }
}
exports.ModelController = ModelController;
//# sourceMappingURL=model-controller.js.map