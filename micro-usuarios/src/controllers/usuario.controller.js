import UsuarioModel from "../models/usuario.model.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/config.js";

export class UsuarioController {

    // GET /usuarios - Listar todos los usuarios (solo admin)
    static async getAll(req, res) {
        try {
            const usuarios = await UsuarioModel.getAll();
            res.json({
                success: true,
                data: usuarios
            });
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }


    static async getUserById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await UsuarioModel.getUserById(id);

            if (!usuario) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            res.json({
                success: true,
                data: usuario
            });
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }

    // Solo admin
    static async createUser(req, res) {
        try {
            const { fullname, username, password, rol } = req.body;

            // Validar campos requeridos
            if (!fullname || !username || !password || !rol) {
                return res.status(400).json({
                    success: false,
                    message: 'Todos los campos son requeridos: fullname, username, password, rol'
                });
            }

            // Validar rol
            const rolesValidos = ['administrador', 'arrendatario', 'propietario'];
            if (!rolesValidos.includes(rol)) {
                return res.status(400).json({
                    success: false,
                    message: `Rol inválido. Debe ser: ${rolesValidos.join(', ')}`
                });
            }

            // Verificar si el username ya existe
            const existente = await UsuarioModel.findByUsername(username);
            if (existente) {
                return res.status(409).json({ success: false, message: 'El nombre de usuario ya está en uso' });
            }

            const nuevoUsuario = await UsuarioModel.createUser({
                fullname,
                username,
                password,
                rol
            });

            res.status(201).json({
                success: true,
                data: nuevoUsuario
            });
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }

    // PUT /usuarios/:id - Actualizar usuario (solo admin)
    static async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { fullname, username, password, rol } = req.body;

            // Verificar que el usuario existe
            const usuarioExistente = await UsuarioModel.getFullUserById(id);
            if (!usuarioExistente) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            // Validar rol si se proporciona
            if (rol) {
                const rolesValidos = ['administrador', 'arrendatario', 'propietario'];
                if (!rolesValidos.includes(rol)) {
                    return res.status(400).json({
                        success: false,
                        message: `Rol inválido. Debe ser: ${rolesValidos.join(', ')}`
                    });
                }
            }

            // Si se envía un nuevo password, usarlo, de lo contrario mantener el actual
            let finalPassword = usuarioExistente.password;
            if (password) {
                finalPassword = password;
            }

            const actualizado = await UsuarioModel.updateUser(id, {
                fullname: fullname || usuarioExistente.fullname,
                username: username || usuarioExistente.username,
                password: finalPassword,
                rol: rol || usuarioExistente.rol
            });

            if (!actualizado) {
                return res.status(500).json({ success: false, message: 'No se pudo actualizar el usuario' });
            }

            res.json({ success: true, data: { message: 'Usuario actualizado exitosamente' } });
        } catch (error) {
            console.error('Error al actualizar usuario:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }

    // DELETE /usuarios/:id - Eliminar usuario (solo admin)
    static async deleteUser(req, res) {
        try {
            const { id } = req.params;

            const usuario = await UsuarioModel.getUserById(id);
            if (!usuario) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            const eliminado = await UsuarioModel.deleteUser(id);
            if (!eliminado) {
                return res.status(500).json({ success: false, message: 'No se pudo eliminar el usuario' });
            }

            res.json({ success: true, data: { message: 'Usuario eliminado exitosamente' } });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }

    // LOGEARSE
    static async login(req, res) {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ success: false, message: 'Username y password son requeridos' });
            }

            // Buscar usuario por username
            const usuario = await UsuarioModel.findByUsername(username);
            if (!usuario) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            // Verificar contraseña
            if (password !== usuario.password) {
                return res.status(401).json({ success: false, message: 'Credenciales inválidas' });
            }

            // Generar JWT
            //jwt.sign lo genera
            const token = jwt.sign(
                { id: usuario.id, username: usuario.username, rol: usuario.rol },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
            );

            // Login exitoso devuelve datos y token
            res.json({
                success: true,
                data: {
                    id: usuario.id,
                    fullname: usuario.fullname,
                    username: usuario.username,
                    rol: usuario.rol,
                    token
                }
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }

    // Endoponint/metodo para verificar token para los demas micros
    static async verifyToken(req, res) {
        try {
            // req.user ya fue llenado por el middleware verifyToken
            const usuario = await UsuarioModel.getUserById(req.user.id);

            if (!usuario) {
                return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
            }

            res.json({
                success: true,
                data: {
                    id: usuario.id,
                    fullname: usuario.fullname,
                    username: usuario.username,
                    rol: usuario.rol
                }
            });
        } catch (error) {
            console.error('Error al verificar token:', error);
            res.status(500).json({ success: false, message: 'Error interno del servidor' });
        }
    }
}
