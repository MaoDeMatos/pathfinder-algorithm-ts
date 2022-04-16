type RawData = (string | number)[][];

type Matrix = {
  map: MatrixNode[];
  size?: number[];
  initialPos?: MatrixNode;
  finalPos?: MatrixNode;
  findNodeByPos: (map: MatrixNode[], x: number, y: number) => MatrixNode;
};

type MatrixNode = {
  x: number;
  y: number;
  value?: string | number;
  blocked?: boolean;
  visited?: boolean;
  type?: "start" | "end" | "normal";
};
