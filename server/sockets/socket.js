const { io } = require('../server')
io.on('connection', (client) => {
    console.log('usuario conectado');
    client.emit('enviarmensaje', {
        usuario: 'admiin',
        mensaje: 'iniciaste neggro'
    })

    client.on('disconnect', ()=>console.log('Usuario desconectado'));
    // escuchar al cliente
    client.on('enviarmensaje', (data, callback)=>{
    console.log(data);
    client.broadcast.emit('enviarmensaje', data)
       /*if (mensaje.usuario) {
        callback({
            respo: 'todo Salio bien negro'
        });   
       }else{
        callback({
            respo: 'todo Salio mal negro'
        } );
       }*/
        

    });
    
});