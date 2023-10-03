const fs = require('fs').promises;

class CartManager {
    constructor(filePath) {
        this.filePath = filePath;
    }

    async _readFile() {
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    }

    async _writeFile(data) {
        await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
    }

    async getCartById(cartId) {
        const carts = await this._readFile();
        return carts.find(cart => cart.id === cartId) || null;
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        const carts = await this._readFile();
        const cart = carts.find(cart => cart.id === cartId);
        
        if (!cart) {
            throw new Error("Cart not found");
        }

        const productInCart = cart.products.find(p => p.productId === productId);
        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }

        await this._writeFile(carts);
        return cart;
    }

    async createCart() {
        const carts = await this._readFile();
        const newCartId = carts.length ? carts[carts.length - 1].id + 1 : 1;
        const newCart = {
            id: newCartId,
            products: []
        };
        carts.push(newCart);
        await this._writeFile(carts);
        return newCart;
    }

}

module.exports = CartManager;
