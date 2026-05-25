import AlquileresModel from '../models/alquileresModel.js'

// Función de uso exclusivo para otro microservicio
export async function createAlquiler(req, res) {
  try {
    const { habitacionId, nombrePropietario, nombreArrendatario } = req.body

    if (!habitacionId || !nombrePropietario || !nombreArrendatario) {
      res.status(400).json({
        success: false,
        message: 'No se han especificado los campos requeridos',
      })
    }

    const alquilerId = await AlquileresModel.createAlquiler({
      habitacionId,
      nombrePropietario,
      nombreArrendatario,
    })

    res.status(201).json({
      success: true,
      message: 'El alquiler ha sido creado correctamente',
      data: { alquilerId },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear el alquiler',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export async function getAllAlquileres(req, res) {
  try {
    const alquileres = await AlquileresModel.getAllAlquileres()

    res.status(200).json({
      success: true,
      data: alquileres,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener alquileres',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export async function getMisAlquileres(req, res) {
  try {
    const { fullname } = req.user

    const alquileres = await AlquileresModel.getAlquileresByOwnerName(fullname)

    res.status(200).json({
      success: true,
      data: alquileres,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener alquileres del propietario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}
