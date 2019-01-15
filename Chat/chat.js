var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var log4js = require('log4js');
var logger = log4js.getLogger();

var port = 3000;

logger.debug('Script has been started...');

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket)
{
    var name = 'U' + (socket.id).toString().substr(1,4);

    socket.broadcast.emit('newU',name);

    socket.emit('userName', name);

    logger.info(name + ' connected to chat!');
  
    socket.on('message', function(msg)
{
    logger.warn('----------');
    logger.warn('Use: ' + name + ' | Message: ' + msg);
    logger.warn('====> Sending message to other chaters.....');
    io.sockets.emit('messageToClients',msg,name);
    });
   
});


server.listen(port);
