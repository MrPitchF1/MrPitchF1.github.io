var port = 3000;
var socket = io.connect('http://127.0.0.1:' + port);

socket.on('userName', function(userName)
{
    console.log('You\'r username is =>' + userName + '\n');
    $('textarea').val($('textarea').val() + 'You\'r username => '+ userName + '\n');
});

socket.on('newU',function(userName)
{
    console.log('New user has been connected to chat | ' + userName);



    $('textarea').val($('textarea').val() + userName + ' connected!\n');
});

$(document).on('click', 'button', function()
{
    var message = $('input').val();
    socket.emit('message',message);

    $('input').val(null);
});
socket.on('messageToClients', function(msg,name)
{
    console.log(name + ' | => ' + msg);
    $('textarea').val($('textarea').val() + name + ' : '+ msg +'\n');
}); 
