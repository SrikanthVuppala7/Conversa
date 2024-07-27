import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    const socketId = socket.id;
    console.log(`User connected: ${socketId}`);

    socket.on('message', (message) => {
        console.log(`Message from ${socketId}: ${message}`);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socketId}`);
    });
});

httpServer.listen(3500, () => {
    console.log('Server is listening on port 3500');
});
