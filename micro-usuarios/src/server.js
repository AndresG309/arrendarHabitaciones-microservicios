import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { PORT } from './config/config.js';
import usuarioRoutes from './routes/usuario.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/usuarios', usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Micro-Usuarios corriendo en puerto ${PORT}`);
});
