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
exports.modelFactoryHub = void 0;
const modelFactoryHub = (core, factory_constructors) => __awaiter(void 0, void 0, void 0, function* () {
    const factories = {};
    for (const k in factory_constructors) {
        const k1 = k;
        const k2 = k;
        const ctr = factory_constructors[k2];
        const factory = new ctr(core);
        factories[k1] = yield factory.init();
    }
    return factories;
});
exports.modelFactoryHub = modelFactoryHub;
//# sourceMappingURL=model-factory-hub.js.map