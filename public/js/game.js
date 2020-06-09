
document.addEventListener('DOMContentLoaded', function (event) {

    const userName = document.getElementById('userName').innerHTML
    const roomName = document.getElementById('roomName').innerHTML

    //Sockets connections
    /*let socket = io()
    socket.emit('joinGame',  {
        userName: userName,
        roomName: roomName
    })

    socket.on('joinedRoom', (msg) => {
        document.getElementById('players').innerHTML = 'Players joined: 2/2'
    })*/


    //Game tokens
    $(".token-box").on('click', function(event) {
        const target = event.target
        if ($(target).hasClass('token')) return
        $(target).removeClass('token-box')
        $(target).addClass('token')
    })
})