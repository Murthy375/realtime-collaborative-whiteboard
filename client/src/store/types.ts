// global types
import type { ShapeData } from "../types";

export interface SelectedToolState {
  selectedTool: string;
  updateSelectedTool: (newSelectedTool: string) => void;
}

export interface ElementsState {
  elements: ShapeData[];
  updateElements: (newElements: ShapeData[]) => void;
}

export type AppStoreTypes = SelectedToolState & ElementsState;
