export const consoleColors = {
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  green: "\x1b[92m",
  gray: "\x1b[90m",
  default: "\x1b[0m",
};

type ColorLogArgs = {
  color?: "red" | "yellow" | "blue" | "green" | "gray" | "default";
  output: any;
  newLine?: boolean;
};

export function coloredLog({
  color = "default",
  output,
  newLine = false,
}: ColorLogArgs) {
  console.log(
    `${consoleColors[color]}%s${consoleColors.default}`,
    output,
    newLine ? "\n" : ""
  );
}

export function arrayToMatrix(rawData: RawData) {
  const matrix: Matrix = {
    map: [],
    findNodeByPos: function (map, x, y) {
      const foundNode = map.find((el) => el.x == x && el.y == y);
      if (foundNode) return foundNode;
      throw new Error();
    },
  };

  for (let i = 0; i < rawData.length; i++) {
    const line = rawData[i];

    for (let j = 0; j < line.length; j++) {
      const value = line[j];
      const thisNode: MatrixNode = {
        x: i + 1,
        y: j + 1,
        value: value,
        blocked: value == 1 ? false : true,
      };

      matrix.map.push(thisNode);
    }
  }

  return matrix;
}

export function matrixToArray(matrix: Matrix) {
  const map: RawData = [];

  matrix.map.forEach((el) => {
    if (el.value != undefined) {
      if (!map[el.x - 1]) {
        map.push([el.value]);
      } else {
        map[el.x - 1].push(el.value);
      }
    }
  });

  return map;
}
