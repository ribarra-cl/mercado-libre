"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LENGTH_REQUIRED = 4;
const MATCHES_REQUIRED = 2;
function isMutantAux(dna, required, minimum) {
    if (dna == null || dna.length == 0)
        return false;
    const firstRow = dna[0];
    if (firstRow.length != dna.length)
        return false;
    const allButFirst = dna.filter((value, index) => index > 0);
    const sameLength = allButFirst.every((row) => row.length == firstRow.length);
    if (!sameLength)
        return false;
    const length = firstRow.length;
    let matches = 0;
    for (let v = 0; v < length; v++) {
        let aux = '';
        let count = 0;
        for (let u = 0; u < length; u++) {
            const el = dna[v].charAt(u);
            if (aux != el) {
                aux = el;
                count = 1;
                continue;
            }
            else {
                count++;
                if (count == required) {
                    matches++;
                    break;
                }
            }
        }
    }
    for (let u = 0; u < length; u++) {
        let aux = '';
        let count = 0;
        for (let v = 0; v < length; v++) {
            const el = dna[v].charAt(u);
            if (aux != el) {
                aux = el;
                count = 1;
                continue;
            }
            else {
                count++;
                if (count == required) {
                    matches++;
                    break;
                }
            }
        }
    }
    const limit = length - required;
    const diagonals = 2 * limit + 1;
    for (let d = 0; d < diagonals; d++) {
        let aux = '';
        let count = 0;
        const d1 = d + required;
        const d2 = required - length + d;
        const mirror = Math.max(0, d2);
        const diagLength = d1 - 2 * mirror;
        for (let i = 0; i < diagLength; i++) {
            const v = Math.max(0, limit - d) + i;
            const u = Math.max(0, d - limit) + i;
            const el = dna[v].charAt(u);
            if (aux != el) {
                aux = el;
                count = 1;
                continue;
            }
            else {
                count++;
                if (count == required) {
                    matches++;
                }
            }
        }
    }
    return matches >= minimum;
}
function isMutant(dna) {
    return isMutantAux(dna, LENGTH_REQUIRED, MATCHES_REQUIRED);
}
exports.isMutant = isMutant;
//# sourceMappingURL=mutants.js.map