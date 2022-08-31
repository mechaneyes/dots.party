import { useEffect } from 'react'
import io from 'Socket.IO-client'

let socket

const Eyesee = () => {
  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
  }

  return null
}

export default Eyesee;