"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mutants_1 = require("../mutants");
const mutants_contants_1 = require("../constants/mutants.contants");
const mutant_model_1 = require("../models/mutant.model");
class MutantsService {
    root(req, res) {
        res.status(200).send(mutants_contants_1.APP_NAME);
    }
    get(req, res) {
        res.status(405).send('');
    }
    post(req, res) {
        let isMutantDNA = false;
        let dna;
        if (req.body.dna) {
            dna = req.body.dna;
            isMutantDNA = mutants_1.isMutant(dna);
            const data = {
                dna: req.body.dna,
                isMutant: isMutantDNA
            };
            const mutant = new mutant_model_1.MutantModel(data);
            mutant.save((error, mutantDocument) => {
                if (error) {
                    res.status(500).send(error);
                }
                else {
                    if (isMutantDNA) {
                        res.status(200).json(mutantDocument);
                    }
                    else {
                        res.status(403).send();
                    }
                }
            });
        }
        else {
            return res.status(403).send();
        }
    }
}
exports.MutantsService = MutantsService;
//# sourceMappingURL=mutants.service.js.map