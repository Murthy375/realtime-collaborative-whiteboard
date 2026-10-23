export type Point = {
  x: number;
  y: number;
};

export type Shape =
  | {
      type: string;
      id: string;
      x: number;
      y: number;
      width: number;
      height: number;
      rotation: number;
      draggable: boolean;
      fill: string;
      stroke: string;
      strokeWidth: number;
    }
  | {
      type: "arrow";
      id: string;
      start: Point;
      end: Point;
      stroke: string;
      strokeWidth: number;
      pointerLength: number;
      pointerWidth: number;
    };
