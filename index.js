var express = require('express')
var app = express();
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var credentials = require('./credentials')
//Cookies
var cookieParser = require('cookie-parser')(credentials.cookieSecret);
var session = require('express-session');

app.use(cookieParser)
app.use(session({
    secret: credentials.cookieSecret,
    resave: true,
    saveUninitialized: true
}))

//Handlerbars
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {}
            this._sections[name] = options.fn(this)
            return null
        }
    }
})
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Server config
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({
    extended: true
}));

//Config sockets
const socketsManager = require('./src/Controller/SocketsManager')
socketsManager.prepareSockets(io)

//Routes
const roomController = require('./src/Controller/RoomController')
roomController.handleRoutes(app)
const roomPageController = require('./src/Controller/RoomPageController')
roomPageController.handleRoutes(app)

//GET
app.get('/', (req, res) => {
    res.render('home')
})

// Middlewares
app.use((req, res) => {
    res.type('text/plain')
    res.send('Error404')
})

app.use((err, req, res, next) => {
    res.type('text/plain')
    res.send('Error500')
    console.log(err)
})

http.listen(app.get('port'), () => {
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
})