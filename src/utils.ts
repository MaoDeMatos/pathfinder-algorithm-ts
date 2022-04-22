export const consoleColors = {
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  green: "\x1b[92m",
  gray: "\x1b[90m",
  default: "\x1b[0m",
};

export const coloredString = ({
  color = "default",
  output,
}: {
  color?: "red" | "yellow" | "blue" | "green" | "gray" | "default";
  output: any;
}) => `${consoleColors[color]}${output}${consoleColors.default}`;

export const arrayToMatrix = (rawData: RawData) => {
  const findNodeByType = (map: Matrix["map"], type: MatrixNode["type"]) => {
    for (let i = 0; i < map.length; i++) {
      const arr = map[i];
      const foundNode = arr.find((el) => el.type == type);
      if (foundNode) return foundNode;
    }
    throw new Error(`Could not find "${type}" node`);
  };

  const matrix: Matrix = {
    map: [],
    conditions: {},
    initialPos: (map) => findNodeByType(map, "start"),
    finalPos: (map) => findNodeByType(map, "end"),
  };

  let i = 0;
  let j = 0;

  for (i = 0; i < rawData.length; i++) {
    const line = rawData[i];

    if (!matrix.map[i]) {
      matrix.map.push([]);
    }

    for (j = 0; j < line.length; j++) {
      const value = line[j];
      const valueString = value.toString().toLowerCase();
      const thisNode: MatrixNode = {
        x: i + 1,
        y: j + 1,
        value: value,
        visited: false,
        blocked:
          value == 1 || valueString == "s" || valueString == "e" ? false : true,
        type:
          valueString == "s" ? "start" : valueString == "e" ? "end" : "normal",
      };

      matrix.map[i].push(thisNode);
    }
  }

  return matrix;
};

export const findNodeByPos = (map: Matrix["map"], x: number, y: number) => {
  for (let i = 0; i < map.length; i++) {
    const arr = map[i];
    const result = arr.find((el) => el.x == x && el.y == y);
    if (result) return result;
  }
};

export const printMatrix = (matrix: Matrix) => {
  if (matrix.conditions.canStart == false) {
    console.log(
      coloredString({
        color: "red",
        output: "Initial or final position blocked\n",
      })
    );
  }
  if (matrix.conditions.success == false) {
    console.log(
      coloredString({
        color: "red",
        output: "Could not find a way to the end\n",
      })
    );
  }
  if (matrix.conditions.success == true && matrix.shortestPath != undefined) {
    console.log(`Shortest path is ${matrix.shortestPath.length} steps long.\n`);
  }

  const space = "      ";
  let total = "";

  for (let i = 0; i < matrix.map.length; i++) {
    let line = space;

    for (let j = 0; j < matrix.map[i].length; j++) {
      const el = matrix.map[i][j];
      el.value = el.value === "" ? " " : el.value;

      const nodeOutput = el.blocked
        ? coloredString({ color: "gray", output: el.value })
        : el.type == "start"
        ? coloredString({
            color: "blue",
            output: el.value.toString().toUpperCase(),
          })
        : el.type == "end"
        ? coloredString({
            color: "yellow",
            output: el.value.toString().toUpperCase(),
          })
        : matrix.shortestPath?.find(
            (element) => el.x == element.x && el.y == element.y
          )
        ? coloredString({ color: "green", output: "3" })
        : el.visited
        ? coloredString({ output: "3" })
        : coloredString({ output: el.value });

      line += nodeOutput + "  ";
    }
    total += line + "\n";
  }

  console.log(total);
};
