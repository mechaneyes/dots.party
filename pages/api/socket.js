// Implementing WebSocket communication in Next.js on LogRocket
// https://blog.logrocket.com/implementing-websocket-communication-next-js/

import { Server } from 'Socket.IO'

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')

    const io = new Server(res.socket.server)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        socket.broadcast.emit('update-input', msg)
      })

      socket.on('mouse-pos-change', msg => {
        socket.broadcast.emit('update-mouse-pos', msg)
      })
    })
  }
  res.end()
}

export default SocketHandler
