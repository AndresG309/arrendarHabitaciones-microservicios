import { pool } from "../config/db.js";
import crypto from "crypto";

class UsuarioModel {

    async getAll() {
        const [rows] = await pool.query('SELECT id, fullname, username, rol, created_at FROM usuarios');
        return rows;
    }

    async getUserById(id) {
        const [rows] = await pool.query('SELECT id, fullname, username, rol, created_at FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    }

    async getFullUserById(id) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        return rows[0];
    }

    async createUser(usuario) {
        const id = crypto.randomUUID();
        const { fullname, username, password, rol } = usuario;
        await pool.query(
            'INSERT INTO usuarios (id, fullname, username, password, rol) VALUES(?, ?, ?, ?, ?)',
            [id, fullname, username, password, rol]
        );

        return {
            id,
            fullname,
            username,
            rol
        };
    }

    async updateUser(id, data) {
        const { fullname, username, password, rol } = data;
        const [result] = await pool.query(
            'UPDATE usuarios SET fullname = ?, username = ?, password = ?, rol = ? WHERE id = ?',
            [fullname, username, password, rol, id]
        );
        return result.affectedRows > 0;
    }

    async deleteUser(id) {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }

    async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username]);
        return rows[0];
    }
}

export default new UsuarioModel();