import { Server } from "socket.io";
// import jwt from 'jsonwebtoken';

let io;

export const initSocket = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    console.log(socket);
  });
};
