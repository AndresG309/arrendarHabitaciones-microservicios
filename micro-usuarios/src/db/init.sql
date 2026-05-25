CREATE DATABASE IF NOT EXISTS microservicio_usuarios;
USE microservicio_usuarios;
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(36) PRIMARY KEY, 
    fullname VARCHAR(100) NOT NULL ,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'arrendatario','propietario') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Usuario Admin
INSERT IGNORE INTO usuarios (id, fullname, username, password, rol)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'Administrador Sistema',
  'admin',
  'admin123secure',
  'administrador'
);

-- Datos de prueba que coinciden con las habitaciones y alquileres
INSERT IGNORE INTO usuarios (id, fullname, username, password, rol)
VALUES (
  '11111111-2222-3333-4444-555555555555',
  'Propietario Bogotá',
  'propietario_bogota',
  'password123',
  'propietario'
);

INSERT IGNORE INTO usuarios (id, fullname, username, password, rol)
VALUES (
  '66666666-7777-8888-9999-000000000000',
  'Propietario Medellín',
  'propietario_medellin',
  'password123',
  'propietario'
);

INSERT IGNORE INTO usuarios (id, fullname, username, password, rol)
VALUES (
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  'Carlos Ramírez',
  'carlos_ramirez',
  'password123',
  'propietario'
);

INSERT IGNORE INTO usuarios (id, fullname, username, password, rol)
VALUES (
  'bbbbbbbb-cccc-dddd-eeee-ffffffffffff',
  'Ana Torres',
  'ana_torres',
  'password123',
  'arrendatario'
);
