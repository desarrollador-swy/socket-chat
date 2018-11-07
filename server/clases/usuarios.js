class Usuarios {

    constructor() {

        this.personas = [];
    }

    agregarPersonas(id, nombre, sala) {
        let persona = { id, nombre, sala };

        this.personas.push(persona);

        return this.personas;
    }

    getPersona(id) {

        let persona = this.personas.filter(persona => persona.id === id)[0]
        return persona;
    }

    getPersonas() {
      return this.personas;
    }
    
    getSala(sala){
        let conectados = this.personas.filter(persona => persona.sala === sala);
        return conectados;
    }

    borrarPersona(id){
        let borrado = this.getPersona(id);
        this.personas = this.personas.filter(persona => persona.id != id);
        return borrado;
    }

}
module.exports = {
    Usuarios

}