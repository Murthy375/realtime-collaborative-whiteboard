import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import { useState } from "react";
import type { Tool } from "../types";

const Whiteboard = () => {

  const [selectedTool, setSelectedTool] = useState<Tool>("select");

  return (
    <div>
      <Canvas selectedTool={selectedTool} />
      <Toolbar selectedTool={selectedTool} onToolChange={setSelectedTool} />
    </div>
  );
};

export default Whiteboard;
