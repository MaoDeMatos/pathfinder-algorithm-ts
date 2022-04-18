const fs = require("fs");
const yargs = require("yargs");

import { findPath } from "./findPath";
import { arrayToMatrix, coloredLog, matrixToArray } from "./utils";

coloredLog({ color: "blue", output: "PATHFINDER ALGORITHM START\n" });

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
      [1, 1, "s", 1, "E", 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1],
    ];

const matrix = arrayToMatrix(data);

// console.log(matrix);
// console.log(matrixToArray(matrix), "\n");

// console.log(initialPos);
// console.log(finalPos, "\n");

console.log(findPath(matrix), "\n");

// coloredLog({ color: "green", output: "coloredLog\n" });

coloredLog({ color: "blue", output: "PATHFINDER ALGORITHM END" });
