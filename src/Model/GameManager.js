var uuid = require('uuid');

let games = []

const Game = function (id, roomName, playerOne, playerTwo) {
    this.id = id
    this.room = roomName
    this.board = [[-1,-1,-1], [-1,-1,-1], [-1,-1,-1]]
    this.tokenType = {}
    this.tokenType[playerOne] = 0
    this.tokenType[playerTwo] = 1
}

function createGame(roomName, playerOne, playerTwo) {
    const id = uuid.v4()
    const newGame = new Game(id, roomName, playerOne, playerTwo)
    games.push(newGame)
    return id
}

function addToken(gameID, playerName, coordinates) {
    const game = games.filter((game) => game.id === gameID)[0]
    if (game) {
        const tokenType = game.tokenType[playerName]
        if (game.board[coordinates.y][coordinates.x] === -1) {
            game.board[coordinates.y][coordinates.x] = tokenType
            return checkIfWin(game, tokenType, coordinates)
        }
    }
    return -1
}

function checkIfWin(game, tokenType, coordinates) {
    if (game) {
        //Check x axis
        let win = true
        for (let i = 1; i < 3; i++) {
            const x = coordinates.x + i > 2 ? coordinates.x + i - 3 : coordinates.x + 1
            win = win && game.board[coordinates.y][x] === tokenType
        }
        console.log(`First win: ${win}`)
        if (win) return true
        win = true
        //Check y axis
        for (let i = 1; i < 3; i++) {
            const y = coordinates.y + i > 2 ? coordinates.y + i - 3 : coordinates.y + 1
            win = win && game.board[y][coordinates.x] === tokenType
        }
        console.log(`Second win: ${win}`)
        if (win) return true
        win = true
        //Check diagonal
        for (let i = 1; i < 3; i++) {
            const x = coordinates.x + i > 2 ? coordinates.x + i - 3 : coordinates.x + 1
            const y = coordinates.y + i > 2 ? coordinates.y + i - 3 : coordinates.y + 1
            win = win && game.board[y][x] === tokenType
        }
        console.log(`Third win: ${win}`)
        if (win) return true
        win = true
        //Check diagonal
        for (let i = 1; i < 3; i++) {
            const x = coordinates.x - i < 0 ? coordinates.x - i + 3 : coordinates.x - 1
            const y = coordinates.y + i > 2 ? coordinates.y + i - 3 : coordinates.y + 1
            win = win && game.board[y][x] === tokenType
        }
        console.log(`Fourth win: ${win}`)
        if (win) return true
    }
    return false
}

module.exports.addToken = addToken
module.exports.createGame = createGame