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
const mutant_model_1 = require("../models/mutant.model");
const cache_model_1 = require("../models/cache.model");
class StatsService {
    constructor() {
        this.index = this.index.bind(this);
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let cache = yield cache_model_1.CacheModel.findOne({});
            if (cache == null) {
                const stats = yield mutant_model_1.calculateStats();
                cache = yield cache_model_1.CacheModel.create(stats);
            }
            res.status(200).json(cache);
        });
    }
}
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map