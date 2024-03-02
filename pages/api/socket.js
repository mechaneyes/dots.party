import { Server } from 'socket.io'

const SocketHandler = (res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io

    // Socket.io Logic
    io.on("connection", (socket) => {
      console.log("A user connected");

      let numCollaborators = io.engine.clientsCount;
      io.emit("update-collaborators", numCollaborators);

      // Broadcast dot data to other clients
      socket.on("add-dot", (dotData) => {
        console.log("Received dotData:", dotData);
        
        // x, y, r, red, green, blue, opacity
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
        console.log("Broadcasting dotData:", dotData);
        socket.broadcast.emit("broadcast-dot", completeDotData);
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        console.log("A user disconnected");

        numCollaborators = io.engine.clientsCount;
        io.emit("update-collaborators", numCollaborators);
      });
    });
  }
  res.end()
}

export default SocketHandler