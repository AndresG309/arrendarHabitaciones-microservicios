import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { checkValidToken } from './middlewares/checkValidToken'
import habitacionesRouter from './routes/habitacionesRouter'

const app = express()

// Deshabilitar el header X-Powered-By
app.disable('x-powered-by')

// Middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Rutas
app.use('/habitaciones', checkValidToken, habitacionesRouter)

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Microservicio de habitaciones - OK',
  })
})

export default app
