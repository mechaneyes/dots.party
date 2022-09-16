// Implementing WebSocket communication in Next.js on LogRocket
// https://blog.logrocket.com/implementing-websocket-communication-next-js/

import { Server } from "socket.io";

let io;
let numPainters = 0;

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");

    // res.socket.server.io = io;
    // io.on("connection", (socket) => {
    //   console.log("num num", numPainters);
    //   socket.broadcast.emit("update-painters", numPainters);
    // });
  } else {
    console.log("Socket is initializing");

    io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      numPainters++;
      console.log("add", numPainters);
      socket.emit("first-load", numPainters);
      socket.broadcast.emit("update-painters", numPainters);
      

      socket.on("disconnect", function () {
        numPainters--;
        console.log("subtract", numPainters);
        socket.broadcast.emit("update-painters", numPainters);
      });

      socket.on("add-dot", (msg) => {
        socket.broadcast.emit("update-dot", msg);
        console.log("update-dot", msg);
      });
    });
  }
  res.end();
};

// export let numPainters;

export default SocketHandler;
