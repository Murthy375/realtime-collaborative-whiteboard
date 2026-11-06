import { create } from "zustand";

interface SelectedToolState {
  selectedTool: string;
  updateSelectedTool: (selectedTool: string) => void;
}

export const useSlectedToolStore = create<SelectedToolState>()((set) => ({
  selectedTool: "select",
  updateSelectedTool: (newSelectedTool: string) =>
    set(() => ({ selectedTool: newSelectedTool })),
}));
