const express = require('express');
const CartManager = require('../CartManager');
const router = express.Router();

const manager = new CartManager('./data/cart.json');

router.post('/', async (req, res) => {
    try {
        const newCart = await manager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).send('Error al crear el carrito.');
    }
});

router.get('/:cid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    try {
        const cart = await manager.getCartById(cid);
        if (cart) {
            res.json(cart);
        } else {
            res.status(404).send('Carrito no encontrado.');
        }
    } catch (error) {
        res.status(500).send('Error al obtener el carrito.');
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const cid = parseInt(req.params.cid);
    const pid = parseInt(req.params.pid);
    try {
        const updatedCart = await manager.addProductToCart(cid, pid, 1);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).send('Error al agregar el producto al carrito.');
    }
});

module.exports = router;
