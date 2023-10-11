const io = require('../app.js');
const express = require('express');
const ProductManager = require('../ProductManager.js');
const router = express.Router();

const manager = new ProductManager('../data/products.json');

router.get('/', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    try {
        const products = await manager.getProducts(limit);
        console.log("Productos obtenidos:", products);
        res.json(products);
    } catch (error) {
        res.status(500).send('Error al obtener los productos.');
    }
});
router.get('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        const product = await manager.getProductById(pid);
        if (product) {
            res.json(product);
        } else {
            res.status(404).send('Producto no encontrado.');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el producto.');
    }
});

router.post('/', async (req, res) => {
    try {
        await manager.addProduct(req.body);
        io.emit('newProduct', req.body);  // Aquí es donde emites el nuevo producto
        res.status(201).send('Producto agregado con éxito.');
    } catch (error) {
        res.status(500).send('Error al agregar el producto.');
    }
});

router.put('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        await manager.updateProduct(pid, req.body);
        res.send('Producto actualizado con éxito.');
    } catch (error) {
        res.status(500).send('Error al actualizar el producto.');
    }
});

router.delete('/:pid', async (req, res) => {
    const pid = parseInt(req.params.pid);
    try {
        await manager.deleteProduct(pid);
        io.emit('deleteProduct', pid);  // Aquí es donde emites la ID del producto eliminado
        res.send('Producto eliminado con éxito.');
    } catch (error) {
        res.status(500).send('Error al eliminar el producto.');
    }
});

module.exports = router;
