import express from 'express';
import ventasRouter from './routes/ventas';
import 'dotenv/config';

const app = express();

app.use(express.json());

// Montamos las rutas con el prefijo /api/v1/ventas
app.use('/api/v1/ventas', ventasRoutes);


// 5. Iniciar Servidor
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Servidor Express en http://localhost:${PORT}');
});