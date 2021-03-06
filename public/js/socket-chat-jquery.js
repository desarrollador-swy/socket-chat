var params = new URLSearchParams(window.location.search);

//referencias de jquery
var divUusuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');


var nombre = params.get('nombre');
var sala = params.get('sala');
var id_emisor;


function renderizarMensajes(mensaje, yo) {
    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var admi = 'info'

    if (mensaje.nombre === 'Administrador') {
        
        admi = 'danger'
    }

    if (yo) {
        html += '<li class="reverse">';
    html += '    <div class="chat-content">';
    html += '        <h5>' + mensaje.nombre + '</h5>';
    html += '        <div class="box bg-light-inverse">' + mensaje.mensaje + '</div>';
    html += '    </div>';
    html += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
    html += '    <div class="chat-time">'+hora+'</div>';
    html += '</li>';
    }else{

    html += '<li class="animated fadeIn">';
     if (mensaje.nombre !== 'Administrador') {
         
         html += ' <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
     }

    html += ' <div class="chat-content">';
    html += '     <h5>' + mensaje.nombre + '</h5>';
    html += '     <div class="box bg-light-'+admi+'">' + mensaje.mensaje + '</div>';
    html += '  </div>';
    html += ' <div class="chat-time">'+hora+'</div>';
    html += '</li>';

    }

    

    

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

// funciones para renderizar usuarios
function renderizarUsuarios(personas) {

    console.log(personas);
    var html = '';

    html += '<li>';
    html += '    <a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (let i = 0; i < personas.length; i++) {
        var c = i + 1;
        html += '<li>';
        html += ' <a data-usuario="'+personas[i].nombre+'" data-id="' +
         personas[i].id + '"  href="javascript:void(0)"><img src="assets/images/users/' + c + '.jpg" alt="user-img" class="img-circle"> <span>' +
          personas[i].nombre + '<small class="text-success">online</small></span></a>'
        html += '</li>'

        if (personas[i].nombre === nombre) {
            id_emisor = personas[i].id;
            
        }

    }
    divUusuarios.html(html);



    // Listerners
    divUusuarios.on('click', 'a', function () {
        var id = $(this).data('id');
        var usuario = $(this).data('usuario');
        var emisor = {};
        var receptor = {id: id,nombre: usuario};
        emisor.id =id_emisor ;
        emisor.nombre = nombre;
        if (id) {
            console.log(receptor);
                window.open('privado.html?nombre='+usuario+'&sala='+id+''+''+emisor.id+''+'&id='+emisor.id+'');
                
            
        }

    });

    formEnviar.on('submit', function (e) {
        e.preventDefault();
        console.log(txtMensaje.val());
        if (txtMensaje.val().trim().length === 0) {
            return;
        }

        //Enviar información
        socket.emit('crearMensaje', {
            nombre: nombre,
            mensaje: txtMensaje.val()
        }, function (resp) {
            txtMensaje.val('').focus();
            renderizarMensajes(resp,true);
            scrollBottom();
        });


    })








}