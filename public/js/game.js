document.addEventListener('DOMContentLoaded', function (event) {

    const userName = document.getElementById('userName').innerHTML
    const roomName = document.getElementById('roomName').innerHTML

    let socket = io()
    socket.emit('joinGame',  {
        userName: userName,
        roomName: roomName
    })

})