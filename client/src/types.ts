export type Tool = "line" | "rect" | "select" | "arrow" | "eraser" | "pan";

export type CanvasProps = {
  selectedTool: Tool;
};

// idk why type Point is there ?
export type Point = {
  x: number;
  y: number;
};

export type RectData = {
  type: "rect";
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
};

export type ArrowData = {
  type: "arrow";
  id: string;
  start: Point;
  end: Point;
  stroke: string;
  strokeWidth: number;
  pointerLength: number;
  pointerWidth: number;
};

export type ShapeData = RectData | ArrowData;

export type ToolbarProps = {
  selectedTool: Tool;
  onToolChange: (tool: Tool) => void;
};
