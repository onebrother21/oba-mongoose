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
        this.serializeFetch = (params) => params.id || params;
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
        this.isAuthed = (okto) => {
            if (this.privileges)
                switch (true) {
                    case !(this.privileges).includes(okto):
                        this.unauthorized("api privileges");
                        break;
                    default: break;
                }
        };
        this.isAdmin = (role) => {
            if (this.adminRoles)
                switch (true) {
                    case !this.adminRoles.includes(role):
                        this.unauthorized("api privileges");
                        break;
                    default: break;
                }
        };
        this.isBadStatus = (o) => this.badStatuses ? this.badStatuses.includes(o.status.name) : false;
    }
}
exports.ModelController = ModelController;
//# sourceMappingURL=model-controller.js.map