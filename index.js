let express = require('express')
let app = express();
let http = require('http').createServer(app)
let io = require('socket.io')(http)

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
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}));

//Config sockets
const socketsManager = require('./src/Controller/SocketsManager')
socketsManager.prepareSockets(io)

//Routes
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