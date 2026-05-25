import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
//import { PORT } from './config/config.js';
import usuarioRoutes from './routes/usuario.routes.js';
import usuarioApiRoutes from './routes/usuarioApi.routes.js';
import {checkInternalService} from './middlewares/checkInternalService.js'

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT;

// Rutas
app.use('/usuarios', usuarioRoutes);
app.use('/api', checkInternalService, usuarioApiRoutes)

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Microservicio de usuarios - OK',
  })
})

app.listen(PORT, () => {
    console.log(`Micro-Usuarios corriendo en puerto ${PORT}`);
});
