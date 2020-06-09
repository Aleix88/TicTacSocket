
document.addEventListener('DOMContentLoaded', function (event) {
    let socket = io()

    const userName = document.getElementById('userName').innerHTML
    const roomName = document.getElementById('roomName').innerHTML

    //Send - Join game
    socket.emit('joinGame',  {
        userName: userName,
        roomName: roomName
    })

    // //Wait players to join
    socket.on('joinedRoom', (msg) => {
        $('.modal-container').addClass('no-display')
    })

    // //Wait opponent turn
    socket.on('opponent-placed-token', (coordinates) => {
        const position = coordinates.x + coordinates.y * 3
        const token = $('.board-game').children().eq(position).children().first()
        token.removeClass('token-box')
        token.removeClass('token-cross')
        token.addClass('token token-circle')
    })

    function sendTokenPlacement(x, y) {
        socket.emit('token-placed', {
            coordinates: {
                x: x,
                y: y
            }
        })
    }

    //Add token on click
    $(".token-box").on('click', function(event) {
        const target = event.target
        if ($(target).hasClass('token')) return
        $(target).removeClass('token-box')
        $(target).addClass('token')
        const position = $(target).parent().index()
        sendTokenPlacement(position - 3 * parseInt(position/3), parseInt(position/3))
    })
})