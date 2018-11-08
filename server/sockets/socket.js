const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');




const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        
        console.log(data);
        var men = '';

        if ((!data.nombre || !data.sala) && !data.id) {

            if (!data.nombre) {
                men = 'nombre'
            }
            if (!data.sala) {
                men = 'sala'
            } else {
                men = 'id'
            }
            return callback({
                error: true,
                mensaje: `El ${men} es necesario`
            });
        }

        client.join(data.sala);

        usuarios.agregarPersonas(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listarPersonas', usuarios.getSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unió`));
        callback(usuarios.getSala(data.sala));

    });
// se envia un mensaje a todos
    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        
        callback(mensaje);
    });

    client.on('disconnect', () => {
        let borrado = usuarios.borrarPersona(client.id);
       if (borrado) {
           
           client.broadcast.to(borrado.sala).emit('crearMensaje', crearMensaje('Administrador', `${borrado.nombre} salio`));
           client.broadcast.to(borrado.sala).emit('listarPersonas', usuarios.getSala(borrado.sala));
       }

    });
 // mensaje privado
 client.on('mensajePrivado', data =>{

     let persona = usuarios.getPersona(client.id);
     client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre,data.mensaje));
 });

});