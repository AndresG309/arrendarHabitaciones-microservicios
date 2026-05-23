CREATE DATABASE IF NOT EXISTS micro_usuarios;
USE micro_usuarios;
CREATE TABLE IF NOT EXISTS usuarios (
    id VARCHAR(36) PRIMARY KEY, 
    fullname VARCHAR(100) NOT NULL ,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'arrendatario','propietario') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
