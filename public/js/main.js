document.addEventListener('DOMContentLoaded', function(event) {

    const joinButton = document.getElementById('joinButton')
    const createButton = document.getElementById('createButton')
    const joinInput = document.getElementById('joinInput')
    const createInput = document.getElementById('createInput')
    const userNameInput = document.getElementById('userInput')

    joinButton.addEventListener('click', (e) => {
        let socket = io()
        socket.emit('join room', {
            roomName: joinInput.value,
            userName: userNameInput.value
        })
    })

    createButton.addEventListener('click', (e) => {
        let socket = io()
        socket.emit('create room', {
            roomName: createInput.value,
            userName: userNameInput.value
        })
    })

})