var express = require('express')
var app = express();

app.set('port', process.env.PORT || 3000);

//Routes
app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Hello world!')
})

// Middlewares
app.use((req, res) => {
    res.type('text/plain')
    res.send('Error404')
})

app.use((err, req, res, next) => {
    res.type('text/plain')
    res.send('Error500')
})


app.listen(app.get('port'), () => {
    console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.' );
})