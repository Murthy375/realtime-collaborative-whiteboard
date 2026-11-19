// socket.io
import type { Socket } from "socket.io";

// redis
import { redis } from "../db/redis-connection.js";

// utils
import { getBannerKeyForWhiteboardForElements } from "../utils/banners.redis.js";

export const registerDrawingHandlers = (socket: Socket) => {
  socket.on("drawing-elements", async (data: unknown) => {
    try {
      const whiteboardId = socket.data.whiteboardId;
      if (!whiteboardId) return;
      if (
        typeof data !== "object" ||
        data === null ||
        !("id" in data) ||
        typeof data.id !== "string"
      ) {
        console.error("drawing-elements received an invalid element");
        return;
      }

      await redis.hset(
        getBannerKeyForWhiteboardForElements(whiteboardId),
        data.id,
        JSON.stringify(data),
      );

      // emit the drawing data to all clients in the whiteboard except the sender
      socket.to(whiteboardId).emit("drawing-data", data);
    } catch (error) {
      console.error("drawing-data failed", error);
    }
  });
};
