type RawData = (string | number)[][];

type Matrix = {
  map: MatrixNode[];
  size?: number[];
  shortestPath?: MatrixNode[];
  conditions: {
    canStart?: boolean;
    success?: boolean;
  };
  initialPos: (map: Matrix["map"]) => MatrixNode;
  finalPos: (map: Matrix["map"]) => MatrixNode;
};

type MatrixNode = {
  x: number;
  y: number;
  value: string | number;
  blocked: boolean;
  visited: boolean;
  type: "start" | "end" | "normal";
};
