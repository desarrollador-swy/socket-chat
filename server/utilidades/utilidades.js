const crearMensaje = ( nombre, mensaje) =>{

    return{
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }

}

const mensajePrivado = ( nombre, mensaje) =>{

    return{
        nombre,
        mensaje,
        fecha: new Date().getTime()
    }

}

module.exports = {
    crearMensaje,
    mensajePrivado
}