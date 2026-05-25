import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import alquileresRouter from './router/alquileresRouter.js'
import alquileresApiRouter from './router/alquileresApiRouter.js'
import { checkValidToken, checkInternalService } from './middlewares/index.js'

const app = express()

// Deshabilitar el header X-Powered-By
app.disable('x-powered-by')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Rutas para usuarios
app.use('/alquileres', checkValidToken, alquileresRouter)
// Rutas para microservicios
app.use('/api', checkInternalService, alquileresApiRouter)

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Microservicio de alquileres - OK',
  })
})

export default app
