import { Router } from 'express'
import {
  getAllHabitacionesDisponibles,
  rentHabitacion,
  getMisHabitaciones,
  createHabitacion,
} from '../controllers/habitacionesController'
import { checkIfOwner, checkIfTenant } from '../middlewares'

const router = Router()

// Rutas solo para propietario
router.post('/', checkIfOwner, createHabitacion)
router.get('/mias', checkIfOwner, getMisHabitaciones)
// Rutas solo para arrendatarios
router.get('/', checkIfTenant, getAllHabitacionesDisponibles)
router.patch('/:id/rentar', checkIfTenant, rentHabitacion)

export default router
