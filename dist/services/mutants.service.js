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
const mutants_1 = require("../mutants");
const mutants_contants_1 = require("../constants/mutants.contants");
const mutant_model_1 = require("../models/mutant.model");
const cache_model_1 = require("../models/cache.model");
class MutantsService {
    constructor() {
        this.send = this.send.bind(this);
        this.post = this.post.bind(this);
    }
    root(req, res) {
        res.status(200).send(mutants_contants_1.APP_NAME);
    }
    get(req, res) {
        res.status(405).send('');
    }
    send(res, mutant) {
        if (mutant.isMutant) {
            return res.status(200).json(mutant);
        }
        else {
            return res.status(403).send();
        }
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isMutantDNA = false;
                let dna;
                if (req.body.dna) {
                    dna = req.body.dna;
                    isMutantDNA = mutants_1.isMutant(dna);
                    const data = {
                        dna: req.body.dna,
                        isMutant: isMutantDNA
                    };
                    const register = yield mutant_model_1.MutantModel.findOne({ dna });
                    if (register)
                        return this.send(res, register);
                    const mutant = yield new mutant_model_1.MutantModel(data).save();
                    const stats = yield mutant_model_1.calculateStats();
                    let cache = yield cache_model_1.CacheModel.findOne({});
                    if (cache == null) {
                        yield new cache_model_1.CacheModel(stats).save();
                    }
                    else {
                        yield cache_model_1.CacheModel.update({
                            _id: cache._id
                        }, stats);
                    }
                    return this.send(res, mutant);
                }
                else {
                    return res.status(403).send();
                }
            }
            catch (err) {
                return res.status(500).send(err);
            }
        });
    }
}
exports.MutantsService = MutantsService;
//# sourceMappingURL=mutants.service.js.map