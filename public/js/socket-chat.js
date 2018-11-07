var socket = io();
var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    throw new Error('el nombre es necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')  
}

socket.on('connect', function () {
    console.log('se conecto al servidor');
    socket.emit('entrarChat', usuario, function (resp) {
        console.log('Usuarios conectados', resp);
    });

});

socket.on('disconnect', function () {
    console.log('se desconecto del servidor');
});
/* para enitir informacion
socket.emit('enviarmensaje', {
    usuario: 'David',
    mensaje: 'hola mundo'
}, function (resp) {
    console.log('se disparo´el callback' + '\n', resp);
});*/

//escuchar mensaje
socket.on('crearMensaje', function (resp) {
    console.log(resp);
});

// escucha cuando una persona se conmecta al chat
socket.on('listarPersonas', function (resp) {
    console.log(resp);
});

 // Mensajes privados
 socket.on('mensajePrivado', function (mensaje) {
    console.log('mensaje privado',mensaje);
});
