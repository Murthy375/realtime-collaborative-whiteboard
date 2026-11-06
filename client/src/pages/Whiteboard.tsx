// react
import { useEffect } from "react";

// components
import Canvas from "../components/Canvas";
import Toolbar from "../components/Toolbar";

// react-router
import { useParams } from "react-router";

// socket
import { socket } from "../socket";

const Whiteboard = () => {
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
      <Canvas />
      <Toolbar />
    </div>
  );
};

export default Whiteboard;
