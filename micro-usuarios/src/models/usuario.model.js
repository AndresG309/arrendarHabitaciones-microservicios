import pool from "../config/db.js";


class UsuarioModel {

    async getAll(){
        const [rows] = await pool.query('SELECT id, fullname, username, rol, created_at FROM usuarios')
        return rows;
    }

    async getUserById(id){
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])
        return rows[0];
    }

    async createUser(usuario){
        const { fullname, username, password, rol} = usuario;
        const [result] = await pool.query('INSERT INTO usuarios (fullname, username, password, rol) VALUES(?, ?, ?, ?)', [fullname, username, password, rol]);

        return {
            id: result.insertId,
            fullname,username,
            rol
        }
    };

    async findByUsername(username) {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE username = ?', [username])
        return rows[0];

    }



}

export default new UsuarioModel();