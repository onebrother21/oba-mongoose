"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelController = void 0;
class ModelController {
    constructor(core) {
        this.core = core;
        this.unauthorized = (s) => { throw this.core.e._.unauthorized(s); };
        this.isAuth = (okto, privileges) => {
            switch (true) {
                case !(privileges || this.privileges).includes(okto):
                    this.unauthorized("api privileges");
                    break;
                default: break;
            }
        };
        this.isRole = (role, R) => {
            switch (true) {
                case !R.includes(role): return this.unauthorized("api privileges");
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