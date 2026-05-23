import express from 'express';
import { PORT } from './config/config.js';
import usuarioRoutes from './routes/usuario.routes.js';
const app = express();

app.use(express.json);

app.get('/usuarios', (req, res) => {
    res.send('Hola MicroUsuarios')
})

app.use('/usuarios',usuarioRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

