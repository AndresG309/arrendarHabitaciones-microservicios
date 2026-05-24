CREATE DATABASE IF NOT EXISTS microservicio-habitaciones;
USE microservicio-habitaciones;

CREATE TABLE IF NOT EXISTS habitaciones(
  id VARCHAR(36) PRIMARY KEY,
  ciudad VARCHAR(255) NOT NULL,
  descripcion TEXT NOT NULL,
  propietario VARCHAR(36) NOT NULL,
  costo DECIMAL(10,2) NOT NULL,
  estado BOOLEAN NOT NULL DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO habitaciones (id, ciudad, descripcion, propietario, costo, estado)
VALUES (
  'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  'Bogotá',
  'Habitación amplia con baño privado, wifi y excelente iluminación natural.',
  '11111111-2222-3333-4444-555555555555',
  850000.00,
  TRUE
);

INSERT IGNORE INTO habitaciones (id, ciudad, descripcion, propietario, costo, estado)
VALUES (
  'b2c3d4e5-f6a7-8901-bcde-2345678901fa',
  'Medellín',
  'Habitación amoblada cerca al metro, incluye servicios públicos y acceso a cocina.',
  '66666666-7777-8888-9999-000000000000',
  650000.00,
  TRUE
);

INSERT IGNORE INTO habitaciones (id, ciudad, descripcion, propietario, costo, estado)
VALUES (
  'c3d4e5f6-a7b8-9012-cdef-3456789012ab',
  'Cali',
  'Habitación cómoda en zona residencial tranquila, ideal para estudiantes.',
  'aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee',
  500000.00,
  FALSE
);