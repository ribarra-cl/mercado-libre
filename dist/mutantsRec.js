"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const REQUIRED = 4;
var Direction;
(function (Direction) {
    Direction[Direction["None"] = 0] = "None";
    Direction[Direction["Right"] = 1] = "Right";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["RightDown"] = 3] = "RightDown";
    Direction[Direction["LeftDown"] = 4] = "LeftDown";
})(Direction || (Direction = {}));
const isMutantAux = (dna, base, length, direction, u, v, required) => {
    console.log("");
    console.log(`-- checking ${base} at ${u}, ${v}, required ${required}, direction ${direction}`);
    if (u < 0 || v < 0)
        return 0;
    const cell = dna[v].charAt(u);
    if (cell != base) {
        const isRight = length - u >= REQUIRED;
        const isLeft = u > 0;
        const isDown = length - v >= REQUIRED;
        console.log(`---- isRight: ${isRight} isLeft: ${isLeft}, isDown: ${isDown}`);
        const right = isRight ? isMutantAux(dna, cell, length, Direction.Right, u + 1, v, REQUIRED) : 0;
        const down = isDown ? isMutantAux(dna, cell, length, Direction.Down, u, v + 1, REQUIRED) : 0;
        const rightDown = isRight && isDown ? isMutantAux(dna, cell, length, Direction.RightDown, u + 1, v + 1, REQUIRED) : 0;
        return right + down + rightDown;
    }
    if (required == 1) {
        console.log(`---- FOUND ${base} at ${u}, ${v}, direction ${direction}`);
        return 1;
    }
    let u1;
    let v1;
    switch (direction) {
        case Direction.Right:
            u1 = u + 1;
            v1 = v;
            break;
        case Direction.Down:
            u1 = u;
            v1 = v + 1;
            break;
        case Direction.RightDown:
            u1 = u + 1;
            v1 = v + 1;
            break;
        case Direction.LeftDown:
            u1 = u - 1;
            v1 = v + 1;
            break;
    }
    console.log(`---- will check at ${u1}, ${v1}`);
    return isMutantAux(dna, base, length, direction, u1, v1, required - 1);
};
function isMutant(dna) {
    if (dna == null || dna.length == 0)
        return false;
    const firstRow = dna[0];
    const sameLength = dna
        .filter((value, index) => index > 0)
        .every((row) => row.length == firstRow.length);
    if (!sameLength)
        return false;
    const length = firstRow.length;
    const base = dna[0].charAt(0);
    const right = isMutantAux(dna, base, length, Direction.Right, 1, 0, REQUIRED - 1);
    const down = isMutantAux(dna, base, length, Direction.Down, 0, 1, REQUIRED - 1);
    const rightDown = isMutantAux(dna, base, length, Direction.RightDown, 1, 1, REQUIRED - 1);
    console.log(right, down, rightDown);
    return (right + down + rightDown) > 1;
}
exports.isMutant = isMutant;
//# sourceMappingURL=mutantsRec.js.map