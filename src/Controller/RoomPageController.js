const socketManager = require('./SocketsManager')

function loadRoom(req, res) {
    res.render('room', {
        userName: req.session.userName,
        roomName: req.session.roomName
    })
}

module.exports.handleRoutes = ((app) => {
    app.get('/room/:id_room', loadRoom)
})