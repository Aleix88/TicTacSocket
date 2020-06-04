const Room = function (name) {
    this.name = name
    this.isFull = false
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
    const {roomName} = req.body
    let room = checkRoom(roomName)
    if (room != null) {
        console.log('Joining room...')
        room.isFull = true
        res.render('home', {error: 'Joining room...'})
    } else {
        console.log('Not valid room')
        res.render('home', {error: 'This room is already in use or it doesnt exist'})
    }
}

function createRoom(req, res) {
    const {roomName} = req.body
    if (isRoomCreated(roomName)) {
        console.log('This room is already created...')
        res.render('home', {error: 'This room is already created'})
    } else {
        console.log('New room created!')
        createdRooms.push(new Room(roomName))
        res.render('home')
    }
}

module.exports.registerRoutes = ((app) => {
    app.post('/create-room', createRoom)
    app.post('/join-room', joinRoom)
})