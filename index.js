var express = require('express')
var app = express();

//Handlerbars
const handlebars = require('express-handlebars').create({defaultLayout: 'main'})
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//Server config
app.set('port', process.env.PORT || 3000);
app.use(express.static('public'))
app.use(express.urlencoded({
    extended: true
}));

//Routes
//GET
app.get('/', (req, res) => {
    res.render('home')
})

//POST
const roomController = require('./src/Controller/RoomController')
roomController.registerRoutes(app)

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

app.listen(app.get('port'), () => {
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
})