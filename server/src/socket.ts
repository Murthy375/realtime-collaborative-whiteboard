import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

export function initSocket(httpServer: HttpServer): Server {
  io = new Server(httpServer, {
    cors: { origin: "http://localhost:3000" },
  });

  io.on("connection", (socket: Socket) => {
    // here all the stuff happens like join room, send msg and dissconnecting
  });

  return io;
}
