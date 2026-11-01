import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

export function initSocket(httpServer: HttpServer): Server {
  const io = new Server(httpServer, {
    cors: { origin: process.env.CLIENT_ORIGIN },
  });

  io.on("connection", (socket: Socket) => {
    console.log("client connected", socket.id);

    socket.on("join-room", (roomId: string) => {
      socket.join(roomId);

      socket.to(roomId).emit("user-joined", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("client disconnected", socket.id, reason);
    });
  });

  return io;
}
