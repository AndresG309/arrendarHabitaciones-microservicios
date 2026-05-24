import dotenv from 'dotenv';
dotenv.config();

export const {
    PORT = 3000,
    DB_HOST = 'localhost',
    DB_USER = 'root',
    DB_PASSWORD = '',
    DB_NAME = 'micro_usuarios',
    JWT_SECRET = 'mi_secreto_jwt_incognito',
    JWT_EXPIRES_IN = '24h', // Duracion del token
} = process.env;