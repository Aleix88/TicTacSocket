
function loadRoom(req, res) {
    console.log("Session: ")
    console.log(req.session)
    res.render('room')
}

module.exports.handleRoutes = ((app) => {
    app.get('/room/:id_room', loadRoom)
})