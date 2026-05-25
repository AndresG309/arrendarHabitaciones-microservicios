import HabitacionesModel from '../models/habitacionesModel.js'

const USERS_API = 'http://www.parcial3.com:3001/api'

async function getNombrePropietario(idHabitacion) {
  try {
    const idPropietario =
      await HabitacionesModel.getOwnerOfHabitacion(idHabitacion)

    if (!idPropietario) {
      throw new Error(
        'No ha sido posible validar el propietario de la habitación',
      )
    }

    const response = await fetch(
      `${USERS_API}/${idPropietario}`,
      {
        method: 'GET',
      },
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error('No se ha podido obtener la información del propietario')
    }

    return data.data.fullname
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Error al obtener usuario',
    )
  }
}

export { getNombrePropietario }
