import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

// Middleware para verificar que el usuario envía un token válido
export const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. No se proporcionó un token.'
            });
        }

        // El header viene como "Bearer eyJhbGci..." - extraemos solo el token
        const token = authHeader.startsWith('Bearer ')
            ? authHeader.slice(7)
            : authHeader;

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Guardar los datos del usuario en req.user para que los controladores puedan usarlos
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Token inválido o expirado.'
        });
    }
};

// Middleware para verificar que el rol del usuario esté en la lista de roles permitidos
export const authorizeRoles = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.user || !rolesPermitidos.includes(req.user.rol)) {
            return res.status(403).json({
                success: false,
                message: 'No tienes permiso para realizar esta acción.'
            });
        }
        next();
    };
};
