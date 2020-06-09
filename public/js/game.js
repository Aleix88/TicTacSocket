
document.addEventListener('DOMContentLoaded', function (event) {
    let socket = io()

    const userName = document.getElementById('userName').innerHTML
    const roomName = document.getElementById('roomName').innerHTML

    //Send - Join game
    socket.emit('joinGame',  {
        userName: userName,
        roomName: roomName
    })

    //Wait players to join
    socket.on('joinedRoom', (msg) => {
        $('.modal-container').addClass('no-display')
        console.log($('.modal-container'))
    })



    //Add token on click
    $(".token-box").on('click', function(event) {
        const target = event.target
        if ($(target).hasClass('token')) return
        $(target).removeClass('token-box')
        $(target).addClass('token')
    })
})