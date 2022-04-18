// type findPathParamsType = {
//   matrix: Matrix;
//   initialPos: MatrixNode;
//   finalPos: MatrixNode;
// };

import { findNodeByPos } from "./utils";

export const findPath = (matrix: Matrix): string | Matrix => {
  const directions: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const initialPos = matrix.initialPos(matrix.map);
  const finalPos = matrix.finalPos(matrix.map);

  if (initialPos.blocked || finalPos.blocked) {
    return "Initial or final position blocked";
  } else {
    initialPos.visited = true;
  }

  const map = matrix.map;
  const queue: {
    currentNode: MatrixNode;
    path: MatrixNode[];
  }[] = [{ currentNode: initialPos, path: [] }];

  while (queue.length > 0) {
    const { currentNode, path } = queue.shift()!;
    const { x, y } = currentNode;

    if (currentNode.type == "end") {
      queue.length = 0;
      const newMatrix: Matrix = { ...matrix, map: map, shortestPath: path };
      return newMatrix;
      // return `Final position reached within ${path.length} steps.`;
    }

    path.push(currentNode);

    for (const [dX, dY] of directions) {
      const nextNode = findNodeByPos(map, x + dX, y + dY);

      if (nextNode != undefined && !nextNode.blocked && !nextNode.visited) {
        nextNode.visited = true;
        queue.push({ currentNode: nextNode, path: [...path] });
      }
    }
  }

  return "Could not find a way to the end";
};
