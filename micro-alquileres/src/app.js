import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import alquileresRouter from './router/alquileresRouter.js'

const app = express()

// Deshabilitar el header X-Powered-By
app.disable('x-powered-by')

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/', alquileresRouter)

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Microservicio de alquileres - OK',
  })
})

export default app
