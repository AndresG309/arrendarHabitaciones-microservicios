import { createRegistroDeAlquiler } from '../helpers/createRegistroDeAlquiler.js'
import { getNombrePropietario } from '../helpers/getNombrePropietario.js'
import HabitacionesModel from '../models/habitacionesModel.js'

export async function getAllHabitacionesDisponibles(req, res) {
  try {
    const habitaciones = await HabitacionesModel.getHabitacionesDisponibles()

    res.status(200).json({
      success: true,
      data: habitaciones,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener habitaciones',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export async function rentHabitacion(req, res) {
  try {
    const { id } = req.params

    const arriendoHecho = await HabitacionesModel.rentHabitacion(id)

    if (!arriendoHecho) {
      res.status(409).json({
        success: false,
        message: 'La habitación no existe o ya está arrendada',
      })
      return
    }

    // MANDAR A CREAR EL REGISTRO EN EL MICROSERVICIO DE ALQUILERES
    const nombrePropietario = await getNombrePropietario(id)
    const alquilerId = await createRegistroDeAlquiler({
      habitacionId: id,
      nombrePropietario,
      nombreArrendatario: req.user.fullname,
    })

    res.status(200).json({
      success: true,
      message: 'La habitación ha sido arrendada con éxito',
      data: { alquilerId },
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al arrendar la habitación',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export async function getMisHabitaciones(req, res) {
  try {
    const { id } = req.user

    const habitaciones = await HabitacionesModel.getHabitacionesByOwner(id)

    res.status(200).json({
      success: true,
      data: habitaciones,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las habitaciones del propietario',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}

export async function createHabitacion(req, res) {
  try {
    const { ciudad, descripcion, costo, estaDisponible } = req.body
    const { id: propietario } = req.user

    // Validaciones
    if (!ciudad || !descripcion || !costo) {
      res.status(400).json({
        success: false,
        message:
          'Los campos ciudad, descripcion, propietario y costo son requeridos',
      })
      return
    }

    // Crear habitacion
    const newHabitacion = {
      ciudad,
      descripcion,
      propietario,
      costo,
      estaDisponible,
    }
    const habitacionId = await HabitacionesModel.createHabitacion(newHabitacion)

    res.status(201).json({
      success: true,
      message: 'Habitación creada correctamente',
      id: habitacionId,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al crear la habitación',
      error: error instanceof Error ? error.message : 'Error desconocido',
    })
  }
}
