const roomController = require('./RoomController')
const gameManager = require('./GameManager')

//Events
const JOINED_EVENT = 'joinedRoom'

const UserSocket = function (socket, userName, room) {
    this.socket = socket
    this.userName = userName
    this.room = room
    this.gameID = null
}

let connectedSockets = {}
let socketIO = null

function sendMessage(userName, roomName, event, data) {
    const client = connectedSockets[roomName].filter((client) => {return client.userName === userName})[0]
    client.socket.emit(event, data)
}

function deleteClient(socket, userName, roomName) {
    if (connectedSockets[roomName]) {
        connectedSockets[roomName] = connectedSockets[roomName].filter((element) => {return element.socket !== socket})
        roomController.deleteUserFrom(userName, roomName)
        if (connectedSockets[roomName].length <= 0) {
            connectedSockets[roomName] = undefined
        }
    }
}

function findClient(socket) {
    for (let room in connectedSockets) {
        let roomClients = connectedSockets[room]
        for (let client of roomClients) {
            if (client.socket === socket) {
                return client
            }
        }
    }
    return null
}

function findOpponent(userName, room) {
    if (connectedSockets[room]) {
        return connectedSockets[room].filter((clientAux) => userName !== clientAux.userName)[0]
    }
    return null
}

function createGame(roomName, playerOne, playerTwo) {
      const gameID = gameManager.createGame(roomName, playerOne, playerTwo)
      for (userSocket of connectedSockets[roomName]) {
        userSocket.gameID = gameID
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
            const random = Math.floor(Math.random() * (2))
            sendMessage(connectedSockets[roomName][0].userName, roomName, JOINED_EVENT, {isYourTurn: random === 1})
            sendMessage(userName, roomName, JOINED_EVENT, {isYourTurn: random === 0})
            createGame(roomName, connectedSockets[roomName][0].userName, userName)
        }
    })

    socket.on('disconnect', () => {
        const [roomName, userName] = [socket.roomName, socket.userName]
        deleteClient(socket, userName, roomName)
        console.log(`${userName} disconected from ${roomName}.`)
        const opponent = findOpponent(userName, roomName)
        //Check if opponent is still connected
        if (opponent) {
            sendMessage(opponent.userName, opponent.room, 'opponent-disconnected')
        }
    })

    socket.on('token-placed', (data) => {
        const {x, y} = data.coordinates
        const client = findClient(socket)
        const opponent = findOpponent(client.userName, client.room)
        //Check if opponent is still connected
        if (opponent) {
            sendMessage(opponent.userName, opponent.room, 'opponent-placed-token', {
                coordinates:data.coordinates,
                isYourTurn: true
            })
            const win = gameManager.addToken(client.gameID, client.userName, data.coordinates)
            if (win) {
                console.log(`User: ${client.userName} win!`)
            }
        }
    })
}


module.exports.prepareSockets = ((io) => {
    socketIO = io 
    io.on('connection', handleConnection)
})