import { Router } from 'express'
import {
  getAllHabitacionesDisponibles,
  createHabitacion,
  rentHabitacion,
} from '../controllers/habitacionesController'
import {
  checkIfAdmin,
  checkIfOwner,
  checkIfTenant,
  checkValidToken,
} from '../middlewares'

const router = Router()

// Rutas solo para arrendatarios
router.get('/', checkIfTenant, getAllHabitacionesDisponibles)
router.put('/:id', checkIfTenant, rentHabitacion)

// Rutas solo para propietario
router.post('/', checkIfOwner, createHabitacion)

export default router
