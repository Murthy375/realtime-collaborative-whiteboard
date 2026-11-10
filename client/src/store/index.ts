// zustand
import { create } from "zustand";

// types
import type { AppStoreTypes } from "./types";

// slices
import { selectedToolSlice, elementsSlice } from "./whiteboard.slice";

// wiring
export const useAppStore = create<AppStoreTypes>() ((...setGetApi) => ({
    ...selectedToolSlice(...setGetApi),
    ...elementsSlice(...setGetApi),
}))