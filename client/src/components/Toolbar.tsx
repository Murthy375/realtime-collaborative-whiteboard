import type { ToolbarProps } from "../types";

const Toolbar = ({ selectedTool, onToolChange }: ToolbarProps) => {
  const getButtonClass = (tool: string) => {
    const base = "p-2 rounded border-2 transition-colors";
    if (selectedTool === tool) {
      return `${base} bg-blue-500 text-white border-blue-400`;
    }
    return `${base} bg-zinc-800 text-zinc-300 border-zinc-700/50 hover:bg-zinc-700/70`;
  };

  return (
    <div className="bg-zinc-900 p-2 flex space-x-2 absolute bottom-0 left-0 right-0 w-fit m-auto rounded-lg mb-5">
      <button
        className={getButtonClass("pan")}
        onClick={() => onToolChange("pan")}
      >
        Pan
      </button>
      <button
        className={getButtonClass("rect")}
        onClick={() => onToolChange("rect")}
      >
        Rectangle
      </button>
      <button
        className={getButtonClass("line")}
        onClick={() => onToolChange("line")}
      >
        Pen
      </button>
      <button
        className={getButtonClass("eraser")}
        onClick={() => onToolChange("eraser")}
      >
        Eraser
      </button>
      <button
        className={getButtonClass("arrow")}
        onClick={() => onToolChange("arrow")}
      >
        Arrow
      </button>
      <button
        className={getButtonClass("select")}
        onClick={() => onToolChange("select")}
      >
        Select
      </button>
    </div>
  );
};

export default Toolbar;
