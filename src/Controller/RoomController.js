const Room = function (name) {
    this.name = name
    this.isFull = false
    this.usernames = []
}

var createdRooms = []

function checkRoom(roomName) {
    for (let room of createdRooms) {
        if (room.name === roomName && !room.isFull) {
            return room
        }
    }
    return null
}

function isRoomCreated(roomName) {
    for (let room of createdRooms) {
        if (room.name === roomName) {
            return true
        }
    }
    return false
}

function joinRoom(socket, data) {
    const {roomName, userName} = data

    let room = checkRoom(roomName)
    if (room != null) {
        console.log('Joining room...')
        room.isFull = true
        room.usernames.push(userName)
        socket.username = userName
        socket.join(roomName)
    } else {
        console.log('Not valid room')
    }
}

function createRoom(socket, data) {
    const {roomName, userName} = data
    if (isRoomCreated(roomName)) {
        console.log('This room is already created...')
    } else {
        console.log('New room created!')
        socket.username = userName
        socket.join(roomName)
        let newRoom = new Room(roomName)
        newRoom.usernames.push(userName)
        createdRooms.push(newRoom)
    }
}

module.exports.handleRoomConnections = ((socket) => {
    socket.on('join room', (data) => {joinRoom(socket, data)})
    socket.on('create room', (data) => {createRoom(socket, data)})
})