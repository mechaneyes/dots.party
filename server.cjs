const { Server } = require('socket.io');
const { createServer } = require('http');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Pass all requests to the Next.js application
    handle(req, res);
  });

  const io = new Server(server, {
    path: "/api/socket",
    cors: { origin: "*" },
  });

  io.on('connect', (socket) => {
    console.log('socket connect', socket.id);
    socket.broadcast.emit('welcome', `Welcome ${socket.id}`);
    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });
  });

  server.listen(3009, () => {
    console.log('Server listening on port 3000');
  });
});