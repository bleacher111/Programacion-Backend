const fs = require('fs').promises;

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async _readFile() {
        try {
            const data = await fs.readFile(this.path, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            // Si el archivo no existe o hay algún otro error, devuelve un array vacío
            return [];
        }
    }

    async _writeFile(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf8');
    }

    async getProducts(limit) {
        const products = await this._readFile();
        return limit ? products.slice(0, limit) : products;
    }

    async getProductById(id) {
        const products = await this._readFile();
        return products.find(p => p.id === id) || null;
    }

    async addProduct(product) {
        const products = await this._readFile();
        const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
        product.id = newId;
        products.push(product);
        await this._writeFile(products);
    }

    async updateProduct(id, updatedProduct) {
        const products = await this._readFile();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            // Mantener el ID original
            updatedProduct.id = id;
            products[productIndex] = updatedProduct;
            await this._writeFile(products);
        } else {
            throw new Error('Product not found');
        }
    }

    async deleteProduct(id) {
        const products = await this._readFile();
        const newProducts = products.filter(p => p.id !== id);
        await this._writeFile(newProducts);
    }
}

module.exports = ProductManager;
