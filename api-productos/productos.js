const { Router } = require('express');
const router = Router();
const productosController = require('../controllers/productos.controller');

// GET /api/productos -> Consultar productos
router.get('/', productosController.obtenerProductos);

// POST /api/productos -> Guardar nuevo producto
router.post('/', productosController.crearProducto);

module.exports = router;

const productosModel = require('../models/productos.model');

// GET
const obtenerProductos = async (req, res) => {
  try {
    const productos = await productosModel.obtenerTodos();
    return res.status(200).json(productos);
  } catch (error) {
    return res.status(500).json({ error: 'Error al consultar productos' });
  }
};

// POST
const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;

  // Validación básica
  if (!nombre || precio == null) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  try {
    const nuevoProducto = await productosModel.insertar({ nombre, descripcion, precio, stock });
    return res.status(201).json(nuevoProducto);
  } catch (error) {
    return res.status(500).json({ error: 'Error al guardar el producto' });
  }
};

module.exports = { obtenerProductos, crearProducto };