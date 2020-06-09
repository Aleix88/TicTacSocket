
document.addEventListener('DOMContentLoaded', function (event) {
    let socket = io()
    let isYourTurn = false

    const userName = document.getElementById('userName').innerHTML
    const roomName = document.getElementById('roomName').innerHTML

    //Send - Join game
    socket.emit('joinGame',  {
        userName: userName,
        roomName: roomName
    })

    // //Wait players to join
    socket.on('joinedRoom', (data) => {
        $('#wait-modal').addClass('no-display')
        $('#disconnected-modal').addClass('no-display')
        isYourTurn = data.isYourTurn
        if (isYourTurn) $('.turn-label')[0].innerHTML = 'Is your turn!'
    })

    //Wait opponent turn
    socket.on('opponent-placed-token', (data) => {
        const position = data.coordinates.x + data.coordinates.y * 3
        const token = $('.board-game').children().eq(position).children().first()
        token.removeClass('token-box')
        token.removeClass('token-cross')
        token.addClass('token token-circle')
        isYourTurn = data.isYourTurn
        $('.turn-label')[0].innerHTML = 'Is your turn!'
    })

    //User disconnected
    socket.on('opponent-disconnected', () => {
        $('#disconnected-modal').removeClass('no-display')
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
        if (!isYourTurn) return
        isYourTurn = false
        $('.turn-label')[0].innerHTML = 'Opponent turn'
        const target = event.target
        if ($(target).hasClass('token')) return
        $(target).removeClass('token-box')
        $(target).addClass('token')
        const position = $(target).parent().index()
        sendTokenPlacement(position - 3 * parseInt(position/3), parseInt(position/3))
    })
})