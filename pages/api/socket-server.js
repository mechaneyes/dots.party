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
        // Ensure dotData is valid (e.g., has the required properties)

        // Assuming dotData initially contains x, y, r, red, green, blue, opacity
        socket.broadcast.emit("broadcast-dot", dotData);
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
