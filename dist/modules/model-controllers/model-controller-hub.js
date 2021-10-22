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
exports.modelControllerHub = void 0;
const modelControllerHub = (core, controller_constructors, factory_constructors) => __awaiter(void 0, void 0, void 0, function* () {
    const controllers = {};
    for (const k in controller_constructors) {
        const k1 = k;
        const k2 = k;
        const ctr = controller_constructors[k2];
        const controller = new ctr(core);
        controllers[k1] = yield controller.init$(factory_constructors);
    }
    return controllers;
});
exports.modelControllerHub = modelControllerHub;
//# sourceMappingURL=model-controller-hub.js.map