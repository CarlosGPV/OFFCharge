var usuarioLogueado = false;
var mapa;
var mapaSencillo;

function limpiarFormularioInicio() {
    document.getElementById("nombreUsuarioI").value = "";
    document.getElementById("contraseñaUsuarioI").value = "";

    document.getElementById("usuarioError").textContent = "";
    document.getElementById("contraseñaError").textContent = "";

    console.log("Formulario limpio");
}
function desplegarMenu() {
    var divIzquierdo = document.getElementById('contenedorMenu');
    if (divIzquierdo.style.width < '1%') {
        divIzquierdo.style.width = '30%';
        console.log("MENU ABIERTO");
    } else {
        divIzquierdo.style.width = '0%';
        console.log("MENU CERRADO");
    }
}
function validarNombreUsuarioInicio() {
    var nombreUsuario = document.getElementById("nombreUsuarioI").value;
    var tieneMayuscula = false;
    var tieneNumero = false;
    var spanUsuarioError = document.getElementById("usuarioError");
    var nombrevalido;

    if (nombreUsuario.length > 25) {
        nombrevalido = false;
    }

    for (var i = 0; i < nombreUsuario.length; i++) {
        var caracter = nombreUsuario.charAt(i);

        if (caracter >= 'A' && caracter <= 'Z') {
            tieneMayuscula = true;
        } else if (!isNaN(parseInt(caracter))) {
            tieneNumero = true;
        }
    }
    if (tieneNumero == true && tieneMayuscula == true) {
        nombrevalido = true;
        console.log("El nombre es valido");
    } else {
        nombrevalido = false;
        console.log("El nombre no es valido");
    }
    if (nombrevalido) {
        spanUsuarioError.textContent = "";
        console.log("El nombre es valido");
    } else {
        spanUsuarioError.textContent = "El nombre tiene que contener una mayúscula, un número. Máximo 25 caracteres.";
    }

    return nombrevalido;
}
function validarNombreUsuarioRegistro() {
    var nombreUsuario = document.getElementById("nombreUsuarioR").value;
    var tieneMayuscula = false;
    var tieneNumero = false;
    var spanUsuarioError = document.getElementById("usuarioErrorR");
    var nombrevalido;

    if (nombreUsuario.length > 25) {
        nombrevalido = false;
    }

    for (var i = 0; i < nombreUsuario.length; i++) {
        var caracter = nombreUsuario.charAt(i);

        if (caracter >= 'A' && caracter <= 'Z') {
            tieneMayuscula = true;
        } else if (!isNaN(parseInt(caracter))) {
            tieneNumero = true;
        }
    }
    if (tieneNumero == true && tieneMayuscula == true) {
        nombrevalido = true;
        console.log("El nombre es valido");
    } else {
        nombrevalido = false;
        console.log("El nombre no es valido");
    }
    if (nombrevalido) {
        spanUsuarioError.textContent = "";
        console.log("El nombre es valido");
    } else {
        spanUsuarioError.textContent = "El nombre tiene que contener una mayúscula, un número. Máximo 25 caracteres.";
    }

    return nombrevalido;
}
function eliminarEspacios(event) {
    if (event.key === " ") {
        event.preventDefault();
    }
}
function validarContraseñaInicio() {
    var contrasena = document.getElementById("contraseñaUsuarioI").value;
    var contValida;
    var spanContraseñaError = document.getElementById("contraseñaError");
    var expresion = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

    if (expresion.test(contrasena)) {
        spanContraseñaError.textContent = "";
        console.log("Contraseña válida");
        contValida = true;
        return contValida;
    } else {
        spanContraseñaError.textContent = "Debe tener al menos una mayúscula, un número y un carácter especial de la lista: !@#$%^&*()_+";
        contValida = false;
        return contValida;
    }
}
function validarContraseñaRegistro() {
    var contrasena = document.getElementById("contraseñaUsuarioR").value;
    var contValida;
    var spanContraseñaError = document.getElementById("contraseñaErrorR");
    var expresion = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

    if (expresion.test(contrasena)) {
        spanContraseñaError.textContent = "";
        console.log("Contraseña válida");
        contValida = true;
        return contValida;
    } else {
        spanContraseñaError.textContent = "Debe tener al menos una mayúscula, un número y un carácter especial de la lista: !@#$%^&*()_+";
        contValida = false;
        return contValida;
    }
}
function validarRepetirContraseña() {
    var contrasena = document.getElementById("RepetirContraseñaUsuarioR").value;
    var Repetidacontrasena = document.getElementById("contraseñaUsuarioR").value;
    var contValida;
    var spanContraseñaError = document.getElementById("repetircontraseñaErrorR");
    var expresion = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;

    if (expresion.test(contrasena) && contrasena === Repetidacontrasena) {
        spanContraseñaError.textContent = "";
        console.log("Contraseña válida");
        contValida = true;
        return contValida;
    } else {
        spanContraseñaError.textContent = "No coincide con la contraseña";
        contValida = false;
        return contValida;
    }

}
function validarCorreoElectronico() {
    var correo = document.getElementById("correoUsuarioR").value;
    var spanCorreoError = document.getElementById("correoErrorR");

    var patronCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (patronCorreo.test(correo)) {
        console.log("Correo electrónico válido");
        spanCorreoError.textContent = "";
        return true;
    } else {
        spanCorreoError.textContent = "Tiene que tener formato correo, incluyendo el @";
        console.log("Correo electrónico no válido");
        return false;
    }
}
function crearObjetoUsuario() {
    if (validarNombreUsuarioInicio() && validarContraseñaInicio()) {
        var usuario = {
            accion: "login",
            nombre: document.getElementById("nombreUsuarioI").value,
            contraseña: document.getElementById("contraseñaUsuarioI").value
        };
        console.log("Inicio exitoso:", usuario);
        console.log("Nombre", document.getElementById("nombreUsuarioI").value)
        console.log("Contraseña", document.getElementById("contraseñaUsuarioI").value)
    }
    limpiarFormularioInicio();
    envioInicioSesion(usuario);
}
function crearObjetoRegistro() {
    if (validarNombreUsuarioRegistro() && validarContraseñaRegistro() && validarCorreoElectronico() && validarRepetirContraseña()) {
        var registro = {
            accion: "registro",
            nombre: document.getElementById("nombreUsuarioR").value,
            correoElectronico: document.getElementById("correoUsuarioR").value,
            contraseña: document.getElementById("contraseñaUsuarioR").value
        };
        console.log("Registro exitoso:", registro);
        console.log("Nombre: ", document.getElementById("nombreUsuarioR").value)
        console.log("Correo: ", document.getElementById("correoUsuarioR").value)
        console.log("Contraseña: ", document.getElementById("contraseñaUsuarioR").value)
    }
    limpiarFormularioRegistro();
    envioRegistro(registro);
}

function envioInicioSesion(inicio) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Respuesta del servidor:", xhr.responseText);
            if (xhr.responseText.includes("¡Inicio de sesión exitoso!")) {
                mostrarPopupInicio();
                usuarioLogueado = true;
                mostrarBienvenida();
            } else {
                mostrarPopupInicioErr();
            }
        }
    };
    var inicioJSON = JSON.stringify(inicio);
    xhr.send(inicioJSON);
}
function envioRegistro(inicio) {

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {

        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Respuesta del servidor:", xhr.responseText);
            if (xhr.responseText.includes("¡Registro exitoso!")) {
                mostrarPopupRegistro();
            } else {
                mostrarPopupRegistroErr();
            }
        }
    };
    var registroJSON = JSON.stringify(inicio);
    xhr.send(registroJSON);
}
function mostrarR() {
    var formI = document.getElementById("formInicio");
    formI.style.display = "none";

    var formR = document.getElementById("formRegistro");
    formR.style.display = "block";
    console.log("Mostrando formulario de registro");

    var textoR = document.getElementById("textoI");
    textoR.textContent = "Registro Usuario";

}
function mostrarI() {
    var formI = document.getElementById("formInicio");
    formI.style.display = "block";

    var formR = document.getElementById("formRegistro");
    formR.style.display = "none";


    console.log("Mostrando formulario de inicio de sesion");

    var textoR = document.getElementById("textoI");
    textoR.textContent = "Iniciar sesión";
}
function mostrarBienvenida() {
    if (usuarioLogueado) {
        document.getElementById("formInicio").style.display = "none";
        document.getElementById("formRegistro").style.display = "none";
        document.getElementById("h2Inicio").style.display = "none";
        document.getElementById("textoI").style.display = "none";
        document.getElementById("bienvenida").style.display = "block";
    }
}
function limpiarFormularioRegistro() {
    document.getElementById("nombreUsuarioR").value = "";
    document.getElementById("correoUsuarioR").value = "";
    document.getElementById("contraseñaUsuarioR").value = "";
    document.getElementById("RepetirContraseñaUsuarioR").value = "";

    document.getElementById("usuarioErrorR").textContent = "";
    document.getElementById("correoErrorR").textContent = "";
    document.getElementById("contraseñaErrorR").textContent = "";
    document.getElementById("repetircontraseñaErrorR").textContent = "";

    console.log("Formulario limpio");
}
function mostrarPopupInicio() {

    document.getElementById("popupInicioBack").style.display = "block";
    document.getElementById("popupI").style.display = "block";
}
function cerrarPopupInicio() {
    document.getElementById("popupInicioBack").style.display = "none";
    document.getElementById("popupI").style.display = "none";
}
function mostrarPopupInicioErr() {

    document.getElementById("popupInicioBackErr").style.display = "block";
    document.getElementById("popupIErr").style.display = "block";
}
function cerrarPopupInicioErr() {
    document.getElementById("popupInicioBackErr").style.display = "none";
    document.getElementById("popupIErr").style.display = "none";
}
function mostrarPopupRegistro() {

    document.getElementById("popupRegistroBack").style.display = "block";
    document.getElementById("popupR").style.display = "block";
}
function cerrarPopupRegistro() {
    document.getElementById("popupRegistroBack").style.display = "none";
    document.getElementById("popupR").style.display = "none";
}
function mostrarPopupRegistroErr() {

    document.getElementById("popupRegistroBackErr").style.display = "block";
    document.getElementById("popupRErr").style.display = "block";
}
function cerrarPopupRegistroErr() {
    document.getElementById("popupRegistroBackErr").style.display = "none";
    document.getElementById("popupRErr").style.display = "none";
}
function mostrarPopupFiltro() {

    document.getElementById("popupFiltroBack").style.display = "block";
    document.getElementById("popupFiltroGuardado").style.display = "block";
}
function cerrarPopupFiltro() {
    document.getElementById("popupFiltroBack").style.display = "none";
    document.getElementById("popupFiltroGuardado").style.display = "none";
}
function mostrarPopupFiltroErr() {

    document.getElementById("popupFiltroBackErr").style.display = "block";
    document.getElementById("popupFiltroGuardadoErr").style.display = "block";
}
function cerrarPopupFiltroErr() {
    document.getElementById("popupFiltroBackErr").style.display = "none";
    document.getElementById("popupFiltroGuardadoErr").style.display = "none";
}
function mostrarFormularioFiltro() {
    document.getElementById("filtroForm").style.display = "block";
}
function ocultarBienvenida() {
    document.getElementById("bienvenida").style.display = "none";
}
function ocultarFormularioFiltro() {
    document.getElementById("filtroForm").style.display = "none";
}
function ocultarListaFiltros() {
    document.getElementById("filtrosUsuario").style.display = "none";
}
function guardarFiltro() {
    ocultarFormularioFiltro();

    var nombreFiltro = document.getElementById("nombreFiltro").value;
    var ciudad = document.getElementById("ciudad").value;
    var codigoPostal = document.getElementById("codigoPostal").value;


    if (!validarNombreFiltro(nombreFiltro) || !validarCodigoPostal(codigoPostal)) {
        limpiarFiltros();
        mostrarPopupFiltroErr();
        console.log("Error en las validaciones. No se guardará el filtro.");
        return;
    }

    var filtro = {
        accion: 'filtro',
        nombreF: nombreFiltro,
        ciudad: ciudad,
        codigoPostal: codigoPostal
    };

    envioGuardarFiltro(filtro);
    limpiarFiltros();
    ocultarBienvenida()
}

function cancelarFiltro() {

    document.getElementById("filtroForm").style.display = "none";
    document.getElementById("bienvenida").style.display = "block";
}

function validarNombreFiltro(nombre) {

    var expresion = /^[A-Za-z]+$/;
    return expresion.test(nombre) && nombre.length <= 30;
}

function validarCodigoPostal(codigoPostal) {

    var expresion = /^\d{5}$/;
    return expresion.test(codigoPostal);
}

function envioGuardarFiltro(filtro) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log("Respuesta del servidor:", xhr.responseText);
            if (xhr.responseText.includes("Filtro guardado exitosamente")) {
                mostrarPopupFiltro();
            } else {
                mostrarPopupFiltroErr();
            }
        }
    };
    var filtroJSON = JSON.stringify(filtro);
    xhr.send(filtroJSON);
}
function ocultarOtrosElementos() {

    var mensajeCentral = document.getElementById("mensajeCentral");
    mensajeCentral.style.display = "none";
}
function crearMapaSencillo() {
    var esl = document.getElementById("mensajeCentral");
    esl.style.display = "none";
    if (mapaSencillo) {
        mapaSencillo.remove();
    }
    mapaSencillo = L.map('contenedorMapa').setView([40.416775, -3.703790], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(mapaSencillo);

    mapaSencillo.zoomControl.remove();
    L.control.zoom({ position: 'topright' }).addTo(mapaSencillo);

    document.getElementById('toggleButton').disabled = false;
    agregarMarcadoresDesdeJSON(mapaSencillo);

    return mapaSencillo;
}
function agregarMarcadoresDesdeJSON(mapa) {
    const tiposDeCargadores = {};
    fetch('datos.json')
        .then(response => response.json())
        .then(data => {

            data.features.forEach(feature => {

                const coords = feature.geometry.coordinates;
                const marker = L.marker([coords[1], coords[0]]).addTo(mapa);
                const popupContent = `<b>${feature.properties.connectionType}</b><br>${feature.properties.name}<br>${feature.properties.description}<br><a href="${feature.properties.url}" target="_blank">Más información</a>`;
                const connectionType = feature.properties.connectionType;
                tiposDeCargadores[connectionType] = (tiposDeCargadores[connectionType] || 0) + 1;
                marker.bindPopup(popupContent);

            });
        })
        .catch(error => console.error('Error al cargar datos JSON:', error));
    console.log(tiposDeCargadores);
    return tiposDeCargadores;
}
function obtenerTiposDeCargadores(jsonData) {
    const tiposDeCargadores = {};

    jsonData.features.forEach(feature => {

        const { connectionType} = feature.properties;
        tiposDeCargadores[connectionType] = (tiposDeCargadores[connectionType] || 0) + 1;
    });

    return tiposDeCargadores;
}
function llamadaMapaSencillo() {
    mapaSencillo = crearMapaSencillo();
}
function limpiarFiltros() {
    document.getElementById("nombreFiltro").value = "";
    document.getElementById("ciudad").value = "";
    document.getElementById("codigoPostal").value = "";
}

function mostrarFiltroUsuario() {
    obtenerFiltrosUsuario();
    document.getElementById("bienvenida").style.display = "none";
    document.getElementById("filtrosUsuario").style.display = "block";
}
function obtenerFiltrosUsuario() {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = JSON.parse(xhr.responseText);
            mostrarFiltrosUsuario(respuesta.filtros);
        }
    };

    var filtroRequest = {
        accion: 'obtenerFiltros'
    };

    var filtroJSON = JSON.stringify(filtroRequest);
    xhr.send(filtroJSON);
}

function mostrarFiltrosUsuario(filtros) {
    var fil = document.getElementsByClassName("filtro");

    for (var i = 0; i < filtros.length; i++) {
        fil[i].textContent = "+ " + filtros[i];

        fil[i].addEventListener('click', function () {

            dibujarMapaConFiltro(this.textContent.substring(2));
        });

        //fil[i].append("").addEventListener()
    }
}
function dibujarMapaConFiltro(nombreFiltro) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "server.php", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var respuesta = JSON.parse(xhr.responseText);
            console.log(respuesta);
            if (Array.isArray(respuesta.datosMapa) && respuesta.datosMapa.length > 0) {

                var primerElemento = respuesta.datosMapa[0];
                var ciudadI = primerElemento.ciudad;
                var codigoPostalI = primerElemento.codigoPostal;

                console.log("Ciudad:", ciudadI, " variable de tipo ", typeof (ciudadI));
                console.log("Código Postal:", codigoPostalI, " variable de tipo ", typeof (codigoPostalI));

                dibujarMapa(ciudadI, codigoPostalI);
            } else {
                console.log("El array datosMapa no tiene el formato esperado.");
            }
        }
    };

    var filtroRequest = {
        accion: 'obtenerDatosMapa',
        nombreFiltro: nombreFiltro
    };

    var filtroJSON = JSON.stringify(filtroRequest);
    xhr.send(filtroJSON);
}
/*function dibujarMapa(ciudad, codigoPostal) {
    ocultarOtrosElementos();
    if (mapa) {
        mapa.remove();
    }

    mapa = L.map('contenedorMapa').setView([40.416775, -3.703790], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(mapa);

        mapa.zoomControl.remove();
        L.control.zoom({ position: 'topright' }).addTo(mapa); 

    fetch('datos.json')
        .then(response => response.json())
        .then(datos => {
            if (!datos.features) {
                console.error('El archivo JSON no contiene la propiedad "features".');
                return;
            }   
                const coordenadas = datos.features.geometry.coordinates;
                const ciudadElegida = datos.features.properties.poi.addressInfo.town;
                const codigoElegido = datos.features.properties.poi.addressInfo.postcode;
                 // Verifica si todos los valores necesarios están presentes
                 if (coordenadas && ciudadElegida && ciudadElegida.includes(ciudad) && codigoElegido && codigoElegido.includes(codigoPostal)){
                    
                    L.map('contenedorMapa').setView([coordenadas[1], coordenadas[0]], 15);

                    const nombre = datos.features.properties.name;
                    const connectionType = datos.features.properties.connectionType;
                    const description = datos.features.properties.description;
                    const url = datos.features.properties.url;
                    const popupContent = `<b>${connectionType}</b><br>${nombre}<br>${description}<br><a href="${url}" target="_blank">Más información</a>`;

                    L.marker([coordenadas[1], coordenadas[0]])
                    .addTo(mapa)
                    .bindPopup(popupContent);
                 }

                /*const lugares = datos.features.filter((feature) => {
                    const addressInfo = feature.properties.poi.addressInfo;

                    //console.log('addressInfo:', addressInfo);
                    //console.log('ciudad:', ciudad);
                    //console.log('codigoPostal:', codigoPostal);

                    if (addressInfo && addressInfo.town && addressInfo.postcode) {
                        const match =
                            (addressInfo.town).includes(ciudad);
                            (addressInfo.postcode).includes(codigoPostal);

                        //console.log('match:', match);

                        return match;
                    }

                    return false;
            });
            console.log(lugares);

            if (lugares.length === 0) {
                console.error('No se encontraron lugares en el JSON');
                return;
            }

            const primerLugar = lugares[0];
            const coordenadasIniciales = primerLugar.geometry.coordinates.reverse();
            mapa = L.map('contenedorMapa').setView(coordenadasIniciales, 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

            lugares.forEach(lugar => {
                const coordenadas = lugar.geometry.coordinates.reverse();
                const nombre = lugar.properties.name;
                const connectionType = lugar.properties.connectionType;
                const description = lugar.properties.description;
                const url = lugar.properties.url;
                const popupContent = `<b>${connectionType}</b><br>${nombre}<br>${description}<br><a href="${url}" target="_blank">Más información</a>`;

                L.marker(coordenadas)
                    .addTo(mapa)
                    .bindPopup(popupContent)
                    .openPopup();
            });
        })
        .catch(error => console.error('Error al cargar el archivo datos.json:', error));
}*/
function dibujarMapa(ciudad, codigoPostal) {
    ocultarOtrosElementos();
    if (mapa) {
        mapa.remove();
    }
    fetch('datos.json')
        .then(response => response.json())
        .then(datos => {
            if (!datos.features) {
                console.error('El archivo JSON no contiene la propiedad "features".');
                return;
            }

            const lugares = datos.features.filter((feature) => {
                const addressInfo = feature.properties.poi.addressInfo;

                if (addressInfo && addressInfo.town && addressInfo.postcode) {
                    return (
                        addressInfo.town.includes(ciudad.trim()) &&
                        addressInfo.postcode.includes(codigoPostal.trim())
                    );
                }

                return false;
            });

            if (lugares.length === 0) {
                console.error('No se encontraron lugares en el JSON');
                return;
            }

            // Crea un mapa centrado en las coordenadas del primer lugar encontrado
            const primerLugar = lugares[0];
            const coordenadasIniciales = primerLugar.geometry.coordinates.reverse();
            mapa = L.map('contenedorMapa').setView(coordenadasIniciales, 13);

            // Agrega una capa de mapa de OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

            // Itera sobre todos los lugares y agrega un marcador para cada uno
            lugares.forEach(lugar => {
                const { properties } = lugar;
                const { name, connectionType, description, url, poi } = properties;
                const { latitude, longitude } = poi.addressInfo;
        
                // Crea el contenido del popup
                const popupContent = `<b>${connectionType}</b><br>${name}<br>${description}<br><a href="${url}" target="_blank">Más información</a>`;

                // Agrega un marcador con una ventana emergente que muestra el contenido personalizado
                L.marker([latitude, longitude])
                    .addTo(mapa)
                    .bindPopup(popupContent)
            });
        })
        .catch(error => console.error('Error al cargar el archivo datos.json:', error));
}