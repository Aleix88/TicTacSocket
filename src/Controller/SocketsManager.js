//Events
const JOINED_EVENT = 'joinedRoom'

const UserSocket = function (socket, userName, room) {
    this.socket = socket
    this.userName = userName
    this.room = room
}

let connectedSockets = []
let socketIO = null

function sendMessage(userName, roomName, event, data) {
    const client = connectedSockets[roomName].filter((client) => {return client.userName === userName})[0]
    client.socket.emit(event, data)
}

function deleteClient(userName, roomName) {
    connectedSockets[roomName] = connectedSockets[roomName].filter((element) => {return element.socket !== socket})
    if (connectedSockets[roomName].length <= 0) {
        connectedSockets[roomName] = undefined
    }
}

function handleConnection(socket) {
    socket.on('joinGame', (data) => {
        const {roomName, userName} = data
        console.log(userName + ' joined the game!')
        socket.userName = userName
        socket.roomName = roomName
        socket.join(roomName)
        if (connectedSockets[roomName] == null) {
            connectedSockets[roomName] = [new UserSocket(socket, userName, roomName)]
        }  else {
            connectedSockets[roomName].push(new UserSocket(socket, userName, roomName))
            sendMessage(connectedSockets[roomName][0].userName, roomName, JOINED_EVENT)
            sendMessage(userName, roomName, JOINED_EVENT)
        }
    })

    socket.on('disconnect', () => {
        const [roomName, userName] = [socket.roomName, socket.userName]
        deleteClient(userName, roomName)
        console.log(`${userName} disconected from ${roomName}.`)
    })
}


module.exports.prepareSockets = ((io) => {
    socketIO = io 
    io.on('connection', handleConnection)
})