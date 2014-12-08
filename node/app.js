var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    server = require('http').Server(app),
    io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.post('/temp', function(req, res) {
  console.log(req.ip);
  console.log(req.body);
  io.sockets.emit('temp', req.body);
  res.send('Thanks!');
});


server.listen(process.env.PORT || 8080);
