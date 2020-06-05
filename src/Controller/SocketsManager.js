
function handleConnection(socket) {
    console.log('User connected!')
}

function deleteSocket(userName, roomName) {
    
}

module.exports.prepareSockets = ((io) => {
    io.on('connection', handleConnection)
})