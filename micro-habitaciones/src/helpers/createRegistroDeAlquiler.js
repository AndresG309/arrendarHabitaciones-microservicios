const ALQUILERES_API = 'http://localhost:3003/api/'

async function createRegistroDeAlquiler(datos) {
  try {
    const { habitacionId, nombrePropietario, nombreArrendatario } = datos

    const response = await fetch(ALQUILERES_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        habitacionId,
        nombrePropietario,
        nombreArrendatario,
      }),
    })

    const data = await response.json()

    if (!data.success) {
      throw new Error('No se ha podido crear el registro de alquiler')
    }

    return data.data.alquilerId
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : 'Error al crear registro de alquiler',
    )
  }
}

export { createRegistroDeAlquiler }
