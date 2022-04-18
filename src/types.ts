type RawData = (string | number)[][];

type Matrix = {
  map: MatrixNode[];
  size?: number[];
  shortestPath?: MatrixNode[];
  initialPos: (map: MatrixNode[]) => MatrixNode;
  finalPos: (map: MatrixNode[]) => MatrixNode;
};

type MatrixNode = {
  x: number;
  y: number;
  value: string | number;
  blocked: boolean;
  visited: boolean;
  type: "start" | "end" | "normal";
};
