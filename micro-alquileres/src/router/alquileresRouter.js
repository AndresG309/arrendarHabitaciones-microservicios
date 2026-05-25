import { Router } from 'express'
import {
  getAllAlquileres,
  getMisAlquileres,
} from '../controllers/alquileresController.js'
import { checkIfAdmin, checkIfOwner } from '../middlewares/index.js'

const router = Router()

// Ruta para el administrador
router.get('/', checkIfAdmin, getAllAlquileres)

// Ruta para el propietario
router.get('/misAlquileres', checkIfOwner, getMisAlquileres)

export default router
