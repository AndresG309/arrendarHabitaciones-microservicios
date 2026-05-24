import { Router } from 'express'
import { getAllHabitaciones, getHabitacionById } from '../controllers/habitacionesController'
import { checkIfAdmin } from '../middlewares/checkIfAdmin'

const router = Router()

router.get("/:id", )

// Rutas solo para propietario
router.post("/", )

// Rutas solo para admin
router.get("/", checkIfAdmin, getAllHabitaciones)

export default router
