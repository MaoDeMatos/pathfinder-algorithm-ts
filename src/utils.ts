export const consoleColors = {
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  green: "\x1b[92m",
  gray: "\x1b[90m",
  default: "\x1b[0m",
};

export const coloredLog = ({
  color = "default",
  output,
}: {
  color?: "red" | "yellow" | "blue" | "green" | "gray" | "default";
  output: any;
}) => {
  console.log(`${consoleColors[color]}%s${consoleColors.default}`, output);
};

export const arrayToMatrix = (rawData: RawData) => {
  const findByType = (map: MatrixNode[], type: string) => {
    const foundNode = map.find((el) => el.type == type);
    if (foundNode) return foundNode;
    throw new Error(`Could not find "${type}" node`);
  };

  const matrix: Matrix = {
    map: [],
    initialPos: (map) => findByType(map, "start"),
    finalPos: (map) => findByType(map, "end"),
  };

  let i = 0;
  let j = 0;

  for (i = 0; i < rawData.length; i++) {
    const line = rawData[i];

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

      matrix.map.push(thisNode);
    }
  }

  matrix.size = [i, j];

  return matrix;
};

export const matrixToArray = (matrix: Matrix) => {
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
};

export const findNodeByPos = (map: MatrixNode[], x: number, y: number) =>
  map.find((el) => el.x == x && el.y == y);
