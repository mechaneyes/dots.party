import { Server } from "socket.io";

let io;

export default async function handler(req, res) {
  if (!io) {
    // Initialize Socket.IO server only once
    io = new Server(res.socket.server);

    // Your Socket.IO logic here:
    io.on('connection', (socket) => {
      console.log('A user connected');
      // ... your socket event listeners and handlers 
    });
  }

  res.end(); 
}
