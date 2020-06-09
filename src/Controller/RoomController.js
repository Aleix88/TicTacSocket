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

function joinRoom(req, res) {
    const roomName = req.body.joinedRoom
    const userName = req.body.userName
    let room = checkRoom(roomName)
    if (room != null) {
        console.log('Joining room...')
        room.isFull = true
        room.usernames.push(userName)
        req.session.userName = userName
        req.session.roomName = roomName
        res.redirect('/room/' + roomName)
    } else {
        console.log('Not valid room')
        res.render('home')
    }
}

function createRoom(req, res) {
    const roomName = req.body.createdRoom
    const userName = req.body.userName
    if (isRoomCreated(roomName)) {
        console.log('This room is already created...')
        res.render('home')
    } else {
        console.log('New room created!')
        let newRoom = new Room(roomName)
        newRoom.usernames.push(userName)
        createdRooms.push(newRoom)
        req.session.userName = userName
        req.session.roomName = roomName
        res.redirect('/room/' + roomName)
    }
}

function deleteRoom(roomName) {
    createdRooms = createdRooms.filter((room) => roomName !== room.name)
}

module.exports.deleteRoom = deleteRoom

module.exports.handleRoutes = ((app) => {
    
    app.post('/join-room', joinRoom)
    app.post('/create-room', createRoom)

})