// Implementing WebSocket communication in Next.js on LogRocket
// https://blog.logrocket.com/implementing-websocket-communication-next-js/

import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log('connection success')
      
      socket.on("mouse-change", (msg) => {
        socket.broadcast.emit("update-mouse", msg);
        console.log("update-mouse", msg);
      });
    });
  }
  res.end();
};

export default SocketHandler;
