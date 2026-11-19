// socket.io
import type { Server, Socket } from "socket.io";

// redis
import { redis } from "../db/redis-connection.js";

// utils
import {
  getBannerKeyForWhiteboardForElements,
  getBannerKeyForWhiteboardForUsers,
} from "../utils/banners.redis.js";

export const registerWhiteboardHandlers = (io: Server, socket: Socket) => {
  socket.on("join-whiteboard", async (whiteboardId: string) => {
    try {
      socket.join(whiteboardId);

      // add the socket id to the set of users of the whiteboard in redis(as a set)
      socket.data.whiteboardId = whiteboardId;
      await redis.sadd(
        getBannerKeyForWhiteboardForUsers(whiteboardId),
        socket.id,
      );
      socket.to(whiteboardId).emit("user-joined", socket.id);

      // get the list of users in the whiteboard from redis & emit it to all clients in the whiteboard
      const members = await redis.smembers(
        getBannerKeyForWhiteboardForUsers(whiteboardId),
      );
      io.emit("whiteboard-members", members);

      // Redis stores each element as a JSON value in a hash field.
      const storedElements = await redis.hgetall(
        getBannerKeyForWhiteboardForElements(whiteboardId),
      );
      const whiteboardElementsData = Object.values(storedElements).flatMap(
        (value) => {
          const element: unknown = JSON.parse(value);
          return Array.isArray(element) ? element : [element];
        },
      );

      // Send the initial data only to the client that just joined.
      socket.emit(
        "whiteboard-elements",
        JSON.stringify(whiteboardElementsData),
      );
    } catch (error) {
      console.error("join-whiteboard failed", error);
    }
  });
};
