const socketIo = require('socket.io');

let io;

function initializeSocket(server) {
    io = socketIo(server);
    io.on('connection', (socket) => {
        console.log('Usuario conectado');
        socket.on('disconnect', () => {
            console.log('Usuario desconectado');
        });
    });
}

function getIo() {
    if (!io) {
        throw new Error('Socket.io no fue inicializado!');
    }
    return io;
}

module.exports = {
    initializeSocket,
    getIo
};
