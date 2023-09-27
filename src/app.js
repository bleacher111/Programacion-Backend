const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const PORT = 3000;

// Inicializar ProductManager con la ruta del archivo de productos
const manager = new ProductManager('./products.json');

app.get('/products', async (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    try {
        const products = await manager.getProducts(limit);
        res.json({ products });
    } catch (error) {
        res.status(500).send('Error al obtener los productos.');
    }
});

app.get('/products/:pid', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
