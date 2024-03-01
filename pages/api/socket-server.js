import { Server } from "socket.io";

let io;

export default async function handler(req, res) {
  // Initialize Socket.IO only once
  if (!io) {
    io = new Server(res.socket.server);

    // Socket.io Logic
    io.on("connection", (socket) => {
      console.log("A user connected");

      // Broadcast dot data to other clients
      socket.on("add-dot", (dotData) => {
        // Assuming dotData initially contains x, y, r
        // const color = // ... get the color of the dot on the server ...
        const completeDotData = [
          dotData[0],
          dotData[1],
          dotData[2],
          dotData[3],
          dotData[4],
          dotData[5],
          dotData[6],
          dotData[7],
        ];
        console.log("completeDotData", completeDotData);
        socket.broadcast.emit("broadcast-dot", completeDotData);
      });

      // Update the number of connected painters
      let numPainters = io.engine.clientsCount;
      io.emit("update-painters", numPainters);

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("A user disconnected");
        numPainters = io.engine.clientsCount;
        io.emit("update-painters", numPainters);
      });
    });
  }

  res.end();
}
