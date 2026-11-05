import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import type { Tool } from "../types";
import { socket } from "../socket";

const Whiteboard = () => {
  const [selectedTool, setSelectedTool] = useState<Tool>("select");
  const { whiteboardId } = useParams();

  useEffect(() => {
    if (!whiteboardId) return;

    const onUserJoined = (id: string) => console.log("user joined : ", id);

    socket.on("user-joined", onUserJoined);
    socket.connect();
    socket.emit("join-whiteboard", whiteboardId);

    return () => {
      socket.off("user-joined", onUserJoined);
      socket.disconnect();
    };
  }, [whiteboardId]);

  return (
    <div>
      <Canvas selectedTool={selectedTool} />
      <Toolbar selectedTool={selectedTool} onToolChange={setSelectedTool} />
    </div>
  );
};

export default Whiteboard;
