// socket.io
import type { Server, Socket } from "socket.io";

// redis
import { redis } from "../db/redis-connection.js";

// utils
import { getBannerKeyForWhiteboardForUsers } from "../utils/banners.redis.js";

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

      // get whiteboard elements data from redis, if it exists
      let whiteboardElementsData: any;
      whiteboardElementsData = await redis.hgetall(
        `whiteboard:${whiteboardId}:elements`,
      );

      if (!whiteboardElementsData) {
        // check from db, query to get whiteboard elements data from db [simulation]
        whiteboardElementsData = [];

        // store the queried data in redis before emetting it to all clients in the whiteboard
        await redis.hset(`whiteboard:${whiteboardId}:elements`, {
          whiteboardElementsData,
        });
      }
      // emit the elements data to all clients in the whiteboard
      socket
        .to(whiteboardId)
        .emit("whiteboard-elements", JSON.stringify(whiteboardElementsData));
    } catch (error) {
      console.error("join-whiteboard failed", error);
    }
  });
};
