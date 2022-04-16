type findPathParamsType = {
  matrix: Matrix;
  initialPos: MatrixNode;
  finalPos: MatrixNode;
};

export function findPath({ matrix, initialPos, finalPos }: findPathParamsType) {
  const directions: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  if (initialPos.blocked) {
    return "Initial position blocked";
  }

  if (finalPos.blocked) {
    return "Final position blocked";
  }

  if (initialPos.x == finalPos.x && initialPos.y == finalPos.y) {
    return "Final position reached";
  }

  // return { matrix, initialPos, finalPos };
}
