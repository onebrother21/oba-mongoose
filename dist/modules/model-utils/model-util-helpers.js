"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSelectedData = exports.checkIdOrModel = exports.fix = exports.mapEnumKey = void 0;
const mapEnumKey = (S, k) => Object.keys(S).find(k_ => S[k_] == k);
exports.mapEnumKey = mapEnumKey;
const fix = (v, p = 2) => Number(v.toFixed(p));
exports.fix = fix;
const checkIdOrModel = (id, q) => id !== (ob.str(q) ? q : q._id);
exports.checkIdOrModel = checkIdOrModel;
const mapSelectedData = (select, results) => {
    if (select)
        return results.map(p => select.reduce((o, k, i) => {
            if (k == "json")
                return p.json();
            o[k] = p.get(k);
            if (i == select.length - 1)
                o.id = p._id;
            return o;
        }, {}));
    return results.map(p => ({ id: p._id }));
};
exports.mapSelectedData = mapSelectedData;
//# sourceMappingURL=model-util-helpers.js.map