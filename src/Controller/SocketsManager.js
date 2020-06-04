

function handleConnection(socket) {
    console.log('User connected!')
}



module.exports.prepareSockets = ((io) => {
    io.on('connection', handleConnection)
})