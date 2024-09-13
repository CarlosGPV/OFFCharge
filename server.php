<?php
session_start();
// Verifica si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtiene los datos del cuerpo de la solicitud JSON
    $json_data = file_get_contents("php://input");
    
    // Decodifica el JSON a un array de PHP
    $usuario = json_decode($json_data);

    // Conéctate a la base de datos (ajusta los valores según tu configuración)
    $conexion = new mysqli("localhost", "root", "", "offcharge");

    // Verifica la conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
        echo "Conexión fallida";
    }

    $idUsuario = null;
    if ($usuario->accion === "login") {
        // Inicio de sesión
        // Escapa los datos para evitar inyección SQL
        $nombreUsuario = $conexion->real_escape_string($usuario->nombre);
        $contraseñaUsuario = $conexion->real_escape_string($usuario->contraseña);

        $consulta = "SELECT * FROM usuario WHERE nombre = '$nombreUsuario' AND contrasena = '$contraseñaUsuario'";
        $resultado = $conexion->query($consulta);
        
        // Verifica si se encontró un usuario
        if ($resultado->num_rows > 0) {
            echo " Usuario encontrado. ¡Inicio de sesión exitoso! ";

            $consultaIn = "SELECT idUsuario FROM usuario WHERE nombre = '$nombreUsuario' AND contrasena = '$contraseñaUsuario'";
            $userLogin=$conexion->query($consultaIn);

            if ($userLogin) {
                $idUsuario = $userLogin->fetch_assoc()['idUsuario'];
                echo "ID del Usuario: " . $idUsuario;
                $_SESSION['idUsuarioA'] = $idUsuario;
            }
            
            $consultaF="SELECT * FROM  preferencias WHERE idUsuario = '$idUsuario'";
            $userFilter =$conexion->query($consultaF);

            
        } else {
            echo "Usuario no encontrado. ¡Inicio de sesión fallido!";
        }
    } elseif ($usuario->accion === "registro") {
        // Registro de usuario
        // Escapa los datos para evitar inyección SQL
        $nombreUsuario = $conexion->real_escape_string($usuario->nombre);
        $correoUsuario = $conexion->real_escape_string($usuario->correoElectronico);
        $contraseñaUsuario = $conexion->real_escape_string($usuario->contraseña);

        $consulta_existencia = "SELECT * FROM usuario WHERE nombre = '$nombreUsuario'";
        $resultado_existencia = $conexion->query($consulta_existencia);

        // Verifica si se encontró un usuario
        if ($resultado_existencia->num_rows > 0) {
            echo "El usuario ya existe. ¡Registro fallido!";
        } else {
            $consulta_insercion = "INSERT INTO usuario (nombre, correoElectronico, contrasena) 
                                  VALUES ('$nombreUsuario', '$correoUsuario', '$contraseñaUsuario')";
            
            if ($conexion->query($consulta_insercion) === TRUE) {
                echo "Usuario registrado correctamente. ¡Registro exitoso!";
            } else {
                echo "Error al registrar el usuario: " . $conexion->error;
            }
        }
        
    }elseif ($usuario->accion === "filtro") {
        // Escapa los datos para evitar inyección SQL
        $idUsuario = $_SESSION['idUsuarioA'];
        $nombreFiltro = $conexion->real_escape_string($usuario->nombreF);
        $ciudad = $conexion->real_escape_string($usuario->ciudad);
        $codigoPostal = $conexion->real_escape_string($usuario->codigoPostal);
        $query = "INSERT INTO Preferencias (nombreFiltro,ciudad, codigoPostal, idUsuario) 
                      VALUES ('$nombreFiltro','$ciudad', '$codigoPostal', '$idUsuario')";

            if ($conexion->query($query) === TRUE) {
                echo "Filtro guardado exitosamente.";
            } else {
                echo "Error al guardar el filtro: " . $conexion->error;
            }
    }elseif ($usuario->accion === "obtenerFiltros") {
        // Obtiene los filtros del usuario actual
        $idUsuario = $_SESSION['idUsuarioA'];
    
        $consultaFiltros = "SELECT nombreFiltro FROM Preferencias WHERE idUsuario = '$idUsuario'";
        $resultadoFiltros = $conexion->query($consultaFiltros);
    
        $filtros = array();
        while ($fila = $resultadoFiltros->fetch_assoc()) {
            $filtros[] = $fila['nombreFiltro'];
        }
        
        echo json_encode(array('filtros' => $filtros));

    }elseif ($usuario->accion === "obtenerDatosMapa") {
        $nombreFiltro = $conexion->real_escape_string($usuario->nombreFiltro);
        
        $consultaDatosMapa = "SELECT * FROM Preferencias WHERE nombreFiltro = '$nombreFiltro'";
        $resultadoDatosMapa = $conexion->query($consultaDatosMapa);
    
        $datosMapa = array();
        while ($fila = $resultadoDatosMapa->fetch_assoc()) {
            $datosMapa[] = $fila; 
        }
    
        // Devuelve los datos del mapa como JSON
        echo json_encode(array('datosMapa' => $datosMapa));
    }

    // Cierra la conexión
    $conexion->close();
} else {
    echo "Error: Método de solicitud no permitido.";
}
?>