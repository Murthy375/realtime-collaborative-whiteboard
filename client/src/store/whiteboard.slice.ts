// zustand
import type { StateCreator } from "zustand";

// socket.io
import { socket } from "../socket";

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
  updateElements: (elements) => set(() => ({ elements })),
  addRemoteElement: (newElement) =>
    set((state) => ({ elements: [...state.elements, newElement] })), // recives single stroke from another user via socket.io
  addLocalElement: (element) => {
    set((state) => ({ elements: [...state.elements, element] })); // for user drawan elements to be shown on the current user's canvas and
    socket.emit("drawing-elements", element); // emit the drawn element to the server for broadcasting to other users
  },
});
