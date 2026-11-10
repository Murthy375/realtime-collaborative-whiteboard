// zustand
import type { StateCreator } from "zustand";

// types
import type { AppStoreTypes, ElementsState, SelectedToolState } from "./types";

export const selectedToolSlice: StateCreator<
  AppStoreTypes,
  [],
  [],
  SelectedToolState
> = (set) => ({
  selectedTool: "select",
  updateSelectedTool: (newSelectedTool: string) =>
    set(() => ({ selectedTool: newSelectedTool })),
});

export const elementsSlice: StateCreator<
  AppStoreTypes,
  [],
  [],
  ElementsState
> = (set) => ({
  elements: [],
  updateElements: (newElements) => set(() => ({ elements: newElements })),
});
