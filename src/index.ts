const fs = require("fs");
const yargs = require("yargs");

import { findPath } from "./findPath";
import { arrayToMatrix, coloredLog, matrixToArray } from "./utils";

console.log("PATHFINDER ALGORITHM START\n");

// Parse arguments
const { argv } = yargs.option("jsonFile", {
  alias: "f",
  description:
    "Relative file path of the map that will be used by the algorithm",
  type: "string",
});

// Not fully supported yet
const data: RawData = argv.f
  ? (() => JSON.parse(fs.readFileSync(argv.f)))()
  : [
      [1, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 0, 1],
      [1, 1, 1, 0, 1, 1],
      [0, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 0, 1],
      [0, 1, 1, 1, 1, 1],
    ];

const matrix = arrayToMatrix(data);

const initialPos = matrix.findNodeByPos(matrix.map, 1, 2);
const finalPos = matrix.findNodeByPos(matrix.map, 2, 2);

initialPos.type = "start";
finalPos.type = "end";

console.log(matrixToArray(matrix), "\n");
console.log(initialPos);
console.log(finalPos, "\n");

console.log(
  findPath({
    matrix: matrix,
    initialPos: initialPos,
    finalPos: finalPos,
  }),
  "\n"
);

coloredLog({ color: "green", output: "coloredLog", newLine: true });

console.log("PATHFINDER ALGORITHM END");
