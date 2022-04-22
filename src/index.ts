const fs = require("fs");
const yargs = require("yargs");

import { findPath } from "./findPath";
import { arrayToMatrix, coloredString, printMatrix } from "./utils";

console.log(
  coloredString({ color: "blue", output: "PATHFINDER ALGORITHM START\n" })
);

// Parse arguments
const { argv } = yargs.option("jsonFile", {
  alias: "f",
  description:
    "Relative file path of the map that will be used by the algorithm",
  type: "string",
});

const data: RawData = argv.f
  ? (() => JSON.parse(fs.readFileSync(argv.f)))()
  : [
      [1, 1, 1, 1, 0, 1],
      [1, 1, "S", 1, "E", 1],
      [1, 1, 1, 1, 0, 0],
      [1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1],
      [1, 0, 0, 0, 0, 1],
    ];

const baseMatrix = arrayToMatrix(data);
const processedMatrix = findPath(baseMatrix);
printMatrix(processedMatrix);

console.log(
  coloredString({ color: "blue", output: "PATHFINDER ALGORITHM END" })
);
