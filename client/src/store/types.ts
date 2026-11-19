// global types
import type { ElementsData } from "../types";

export interface SelectedToolState {
  selectedTool: string;
  updateSelectedTool: (newSelectedTool: string) => void;
}

export interface ElementsState {
  elements: ElementsData[];
  updateElements: (newElements: ElementsData[]) => void;
  addRemoteElement: (newElement: ElementsData) => void;
  addLocalElement: (newElement: ElementsData) => void;
}

export type AppStoreTypes = SelectedToolState & ElementsState;
