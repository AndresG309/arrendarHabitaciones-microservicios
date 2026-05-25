import app from './app.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __filePath = fileURLToPath(import.meta.url)
const __dirName = path.dirname(__filePath)

dotenv.config({
    path: path.resolve(__dirName, '../.env')
})

const variablesEntorno = {
    DB_HOST : process.env.DB_HOST,
    DB_NAME : process.env.DB_NAME,
    DB_PORT : process.env.DB_PORT,
    SERVICE_PORT : process.env.SERVICE_PORT
}
console.log('Variables de entorno cargadas: ', variablesEntorno)

const PORT = process.env.SERVICE_PORT || 3303

app.listen(PORT, ()=>{
    console.log(`Microservicio de alquileres escuchando en puerto ${PORT}`)
})