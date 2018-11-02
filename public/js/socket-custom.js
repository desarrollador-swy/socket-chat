var socket = io();

socket.on('connect', function () {
    console.log('se conecto al servidor');

});

socket.on('disconnect', function () {
    console.log('se desconecto del servidor');
});
// para enitir informacion
socket.emit('enviarmensaje',{
  //  usuario: 'David',
    mensaje: 'hola mundo'
}, function(resp) {
    console.log('se disparo´el callback'+'\n', resp);
});
//escuchar mensaje
socket.on('enviarmensaje',function(resp){
 console.log(resp);
});