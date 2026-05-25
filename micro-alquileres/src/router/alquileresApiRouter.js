import { Router } from 'express'
import { createAlquiler } from '../controllers/alquileresController.js'

const router = Router()

// Crear alquiler (LLamado desde el micro habitaciones automáticamente)
router.post('/', createAlquiler)

export default router
