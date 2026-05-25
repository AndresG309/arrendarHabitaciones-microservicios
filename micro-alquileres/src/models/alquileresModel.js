import pool from '../database/db.js'
import { v4 as uuidv4 } from 'uuid'

class AlquileresModel {
  async createAlquiler(alquiler) {
    const alquilerId = uuidv4()
    const fechaInicio = new Date().toISOString().split('T')[0]

    await pool.query(
      `INSERT INTO alquileres
       (id, habitacionId, nombrePropietario, nombreArrendatario, fechaInicio)
       VALUES (?, ?, ?, ?, ?)`,
      [
        alquilerId,
        alquiler.habitacionId,
        alquiler.nombrePropietario,
        alquiler.nombreArrendatario,
        fechaInicio,
      ],
    )

    return alquilerId
  }
}

export default new AlquileresModel()
