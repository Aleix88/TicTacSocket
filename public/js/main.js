document.addEventListener('DOMContentLoaded', function(event) {

    const form = document.getElementById('menuForm')
    const joinInput = document.getElementById('joinInput')
    const createInput = document.getElementById('createInput')
    const userNameInput = document.getElementById('userInput')

    form.addEventListener('submit', (e) => {
        let socket = io()
        socket.emit('connect', {
            roomName: joinInput.value,
            userName: userNameInput.value
        })
    })

})