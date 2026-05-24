import pool from '../database/db.js'
import { v4 as uuidv4 } from 'uuid'

class HabitacionesModel {
  async getHabitacionesDisponibles() {
    const [habitaciones] = await pool.query(
      'SELECT id, ciudad, descripcion, propietario, costo FROM habitaciones WHERE estaDisponible = TRUE',
    )
    return habitaciones
  }

  async getHabitacionesByOwner(propietarioId) {
    const [habitaciones] = await pool.query(
      'SELECT id, ciudad, descripcion, costo, estaDisponible FROM habitaciones WHERE propietario = ?',
      [propietarioId],
    )

    return habitaciones
  }

  async createHabitacion(habitacion) {
    const habitacionId = uuidv4()

    await pool.query(
      'INSERT INTO habitaciones (id, ciudad, descripcion, propietario, costo, estaDisponible) VALUES (?, ?, ?, ?, ?, ?)',
      [
        habitacionId,
        habitacion.ciudad,
        habitacion.descripcion,
        habitacion.propietario,
        habitacion.costo,
        habitacion.estaDisponible ?? true,
      ],
    )

    return habitacionId
  }

  async rentHabitacion(id) {
    const [result] = await pool.query(
      'UPDATE habitaciones SET estaDisponible = FALSE WHERE id = ? AND estaDisponible = TRUE',
      [id],
    )

    return result.affectedRows > 0
  }
}

export default new HabitacionesModel()
