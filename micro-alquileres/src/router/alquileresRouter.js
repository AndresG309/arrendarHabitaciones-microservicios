import { Router } from 'express'
import {  } from '../controllers/alquileresController.js'
import {
  checkIfAdmin,
  checkIfOwner
} from '../middlewares/index.js'

const router = Router()

// Ruta para el administrador
router.get('/', checkIfAdmin)

// Ruta para el propietario

export default router
