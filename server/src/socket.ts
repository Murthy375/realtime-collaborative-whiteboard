// node modules
import { Server as HttpServer } from "http";

// socket.io
import { Server, Socket } from "socket.io";

// redis
import { redis } from "./db/redis-connection.js";

// utils
import { getBannerKeyForWhiteboardForUsers } from "./utils/banners.redis.js";

// register handlers
import { registerWhiteboardHandlers } from "./handlers/registerWhiteboard.handlers.js";

export function initSocket(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_ORIGIN },
  });

  io.on("connect", (socket: Socket) => {
    console.log("user connected : ", socket.id);

    registerWhiteboardHandlers(io, socket);

    socket.on("disconnect", async (reason) => {
      try {
        const whiteboardId = socket.data.whiteboardId;
        if (whiteboardId) {
          // remove the user form redis set of users for the whiteboard
          await redis.srem(
            getBannerKeyForWhiteboardForUsers(whiteboardId),
            socket.id,
          );

          // fetch the updated list of users in the whiteboard from redis and emit it to all the clients
          const members = await redis.smembers(
            getBannerKeyForWhiteboardForUsers(whiteboardId),
          );

          // emit the updated list of users to all clients in the whiteboard
          io.in(whiteboardId).emit("whiteboard-members", members);
        }
      } catch (error) {
        console.error("disconnect failed : ", error);
      }
      console.log("user disconnected : ", socket.id, reason);
    });
  });

  return io;
}
