import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import { redis } from "./db/redis-connection.js";

export function initSocket(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_ORIGIN },
  });

  io.on("connection", (socket: Socket) => {
    console.log("client connected", socket.id);

    socket.on("join-whiteboard", async (whiteboardId: string) => {
      try {
        socket.join(whiteboardId);
        socket.data.whiteboardId = whiteboardId;
        await redis.sadd(`whiteboard:${whiteboardId}:users`, socket.id);
        socket.to(whiteboardId).emit("user-joined", socket.id);
      } catch (error) {
        console.error("join-whiteboard failed", error);
      }
    });

    socket.on("disconnect", async (reason) => {
      console.log("client disconnected", socket.id, reason);
      try {
        const whiteboardId = socket.data.whiteboardId;
        if (whiteboardId) {
          await redis.srem(`whiteboard:${whiteboardId}:users`, socket.id);
        }
      } catch (error) {
        console.error("disconnect failed", error);
      }
    });
  });

  return io;
}
