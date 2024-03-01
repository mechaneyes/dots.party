import cors from "cors";
import express from "express";
import http from "http";
import { Server } from "socket.io";

async function startServer() {
  const app = express();

  // Set up CORS middleware for Express
  const corsOptions = {
    origin: "http://localhost:3000", // or use '*' to allow all origins
    methods: ["GET", "POST"],
    credentials: true, // allow session cookie from browser to pass through
  };
  app.use(cors(corsOptions));

  const server = http.createServer(app);

  // Set up CORS configuration for Socket.IO
  const ioOptions = {
    cors: {
      origin: "http://localhost:3000", // or use '*' to allow all origins
      methods: ["GET", "POST"],
      credentials: true,
    },
  };

  const ioInstance = new Server(server, ioOptions);

  // Socket.io Logic
  ioInstance.on("connection", (socket) => {
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
    let numPainters = ioInstance.engine.clientsCount;
    ioInstance.emit("update-painters", numPainters);

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("A user disconnected");
      numPainters = ioInstance.engine.clientsCount;
      ioInstance.emit("update-painters", numPainters);
    });
  });

  const port = process.env.PORT || 3009;
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

startServer();
