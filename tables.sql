INSERT INTO usuario (nombre, correoElectronico, contrasena) VALUES ('Carlos.1', 'usuario_aleatorio@example.com', 'Nani+1821');
INSERT INTO usuario (nombre, correoElectronico, contrasena) VALUES ('Pedro.1', 'usuario_aleatorio@example.com', 'Pedro+1821');
------------------------------------------------------------------

-- Crear la tabla Usuario
CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correoElectronico VARCHAR(255) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- Crear la tabla Preferencias
CREATE TABLE Preferencias (
    idPreferencia INT PRIMARY KEY AUTO_INCREMENT,
    nombreFiltro VARCHAR(255) NOT NULL,
    ciudad VARCHAR(255),
    codigoPostal VARCHAR(20),
    idUsuario INT,
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario)
);