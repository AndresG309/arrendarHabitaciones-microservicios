CREATE DATABASE IF NOT EXISTS microservicio-alquileres;
USE microservicio-alquileres;

CREATE TABLE IF NOT EXISTS alquileres (
    id VARCHAR(36) PRIMARY KEY,
    habitacionId VARCHAR(36) NOT NULL,
    nombrePropietario VARCHAR(255) NOT NULL,
    nombreArrendatario VARCHAR(255) NOT NULL,
    fechaInicio DATE NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO alquileres
(id, habitacionId, nombrePropietario, nombreArrendatario, fechaInicio)
VALUES
(
  'a1b2c3d4-e5f6-7890-abcd-123456789001',
  'c3d4e5f6-a7b8-9012-cdef-3456789012ab',
  'Carlos Ramírez',
  'Ana Torres',
  '2026-05-24'
);