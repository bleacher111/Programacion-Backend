const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
        if (!fs.existsSync(path)) {
            fs.writeFileSync(path, JSON.stringify([]));  
        }
    }

    _readFile() {
        const data = fs.readFileSync(this.path, 'utf8');
        return JSON.parse(data);
    }

    _writeFile(data) {
        fs.writeFileSync(this.path, JSON.stringify(data));
    }

    addProduct(product) {
        const products = this._readFile();
        const lastId = products.length ? products[products.length - 1].id : 0;
        product.id = lastId + 1;
        products.push(product);
        this._writeFile(products);
    }

    getProducts() {
        return this._readFile();
    }

    getProductById(id) {
        const products = this._readFile();
        const product = products.find(p => p.id === id);
        return product || null;
    }

    updateProduct(id, updatedProduct) {
        const products = this._readFile();
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            updatedProduct.id = id;  
            products[index] = updatedProduct;
            this._writeFile(products);
        } else {
            console.log(`Product with ID ${id} not found.`);
        }
    }

    deleteProduct(id) {
        const products = this._readFile();
        const updatedProducts = products.filter(p => p.id !== id);
        if (products.length === updatedProducts.length) {
            console.log(`Product with ID ${id} not found.`);
        } else {
            this._writeFile(updatedProducts);
        }
    }
}

module.exports = ProductManager;
