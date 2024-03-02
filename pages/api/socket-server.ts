import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as IOServer } from "socket.io";
import { Server } from "socket.io";

// Setting Up Socket.IO with Next.js 13: Real-time Communication in Your Web Application
// https://blog.geogo.in/setting-up-socket-io-with-next-js-13-real-time-communication-in-your-web-application-8c95cf17e0c

export const config = {
  api: {
    bodyParser: false,
  },
};

interface SocketServer extends HTTPServer {
  io?: IOServer | undefined;
}

interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO;
}

let io;
const port = process.env.port || 3009;

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (res.socket.server.io) {
    res
      .status(200)
      .json({
        success: true,
        message: "Socket is already running",
        socket: parseInt(port as string) + 1,
      });
    return;
  }

  console.log("Starting Socket.IO server on port:", parseInt(port as string) + 1);

  const io = new Server({
    path: "/api/socket",
    addTrailingSlash: false,
    cors: { origin: "*" },
  }).listen(parseInt(port as string) + 1);

  io.on("connect", (socket) => {
    const _socket = socket;
    console.log("socket connect", socket.id);
    _socket.broadcast.emit("welcome", `Welcome ${_socket.id}`);
    socket.on("disconnect", async () => {
      console.log("socket disconnect");
    });
  });

  res.socket.server.io = io;
  res
    .status(201)
    .json({
      success: true,
      message: "Socket is started",
      socket: parseInt(port as string) + 1,
    });

  // Initialize Socket.IO only once
  // if (!io) {
  //   io = new Server(res.socket.server);

  //   // Socket.io Logic
  //   io.on("connection", (socket) => {
  //     console.log("A user connected");

  //     // Broadcast dot data to other clients
  //     socket.on("add-dot", (dotData) => {
  //       console.log("Received dotData:", dotData);
  //       // Assuming dotData initially contains x, y, r
  //       // const color = // ... get the color of the dot on the server ...
  //       const completeDotData = [
  //         dotData[0],
  //         dotData[1],
  //         dotData[2],
  //         dotData[3],
  //         dotData[4],
  //         dotData[5],
  //         dotData[6],
  //         dotData[7],
  //       ];
  //       console.log("Broadcasting dotData:", dotData);
  //       socket.broadcast.emit("broadcast-dot", completeDotData);
  //     });

  //     // Update the number of connected painters
  //     let numPainters = io.engine.clientsCount;
  //     io.emit("update-painters", numPainters);

  //     // Handle disconnection
  //     socket.on("disconnect", () => {
  //       console.log("A user disconnected");
  //       numPainters = io.engine.clientsCount;
  //       io.emit("update-painters", numPainters);
  //     });
  //   });
  // }

  // res.end();
}
