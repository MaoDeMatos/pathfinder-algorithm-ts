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
