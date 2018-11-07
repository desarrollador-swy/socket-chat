const { io } = require('../server');
const { Usuarios } = require('../clases/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');




const usuarios = new Usuarios();


io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        
        console.log(data);

        if (!data.nombre || !data.sala) {
            return callback({
                error: true,
                mensaje: 'El nombre es necesario'
            });
        }

        client.join(data.sala);

        usuarios.agregarPersonas(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listarPersonas', usuarios.getSala(data.sala));

        callback(usuarios.getSala(data.sala));

    });
// se envia un mensaje a todos
    client.on('crearMensaje', (data) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);

        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
    });

    client.on('disconnect', () => {
        let borrado = usuarios.borrarPersona(client.id);

        client.broadcast.to(borrado.sala).emit('crearMensaje', crearMensaje('Administrador', `${borrado.nombre} salio`))
        client.broadcast.to(borrado.sala).emit('listarPersonas', usuarios.getSala(borrado.sala));

    });
 // mensaje privado
 client.on('mensajePrivado', data =>{

     let persona = usuarios.getPersona(client.id);
     client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre,data.mensaje));
 });

});