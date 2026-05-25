import HabitacionesModel from '../models/habitacionesModel.js'

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
      `http://localhost:3001/usuarios/${idPropietario}`,
      {
        method: 'GET',
      },
    )

    const data = await response.json()

    if (!data.success) {
      throw new Error('No se ha podido obtener la información del propietario')
    }

    return data.data.fullName
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Error al obtener usuario',
    )
  }
}

export { getNombrePropietario }
