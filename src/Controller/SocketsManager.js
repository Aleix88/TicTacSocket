const roomController = require('./RoomController')

function handleConnection(socket) {
    console.log('User connected!')
    roomController.handleRoomConnections(socket)
}

module.exports.prepareSockets = ((io) => {
    io.on('connection', handleConnection)
})