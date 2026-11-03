import { Router } from "express";

import { pool } from "../db";

const router = Router();

// 3. Endpoint GET: Consultar consolidado de ventas con parametro
router.get('/api/v1/ventas/consolidado', async (req, res) => {
    try {

        const { sucursal, anio } = req.query;

        // Validación de parámetros obligatorios
        if (!sucursal || !anio) {
            return res.status(400).json({
                error: "Bad request",
                message: 'Debe enviar ambos parámetros'
            });
        }

        // Se ejecua el SP en BD
        const [rows] = await pool.query('CALL db_ventas_tech(?, ?)', [sucursal, anio])

        // Enviamos la respuesta al cliente
        res.status(200).json({
            status: 'success',
            total_registros: rows[0] ? rows[0].length : 0,
            data: rows[0]
        });

    } catch (error) {
        console.log('Error en GET /ventas/consolidado', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error en MySQL' });
    }
})

// 4. Endpoint POST: Ingresar nueva venta

router.post('/api/v1/ventas', async (req, res) => {
    try {
        const { id_producto, id_cliente, cantidad, fecha_venta } = req.body;

        // Validación de datos

        if (!id_producto || !id_cliente || !cantidad || !fecha_venta) {
            return res.status(400).json({
                error: 'Bad Request',
                message: "Todos los parámetros son obligatorios"
            });
        }
        // Inserta datos en la BD 

        await pool.query('CALL db_registrar_venta(?,?,?,?)', [id_producto, id_cliente, cantidad, fecha_venta]);

        // Respuesta 201 Created

        res.status(201).json({
            message: 'Venta registrada exitosamente',
            datos_registrados: { id_producto, id_cliente, cantidad, fecha_venta }
        });
    } catch (error) {
        console.log('Error en POST /ventas:', error);
        res.status(500).json({ error: 'Internal Server Error', message: 'Error al insertar' });
    }

});

export default router;
