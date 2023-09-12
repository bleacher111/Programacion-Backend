class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = 0; 
    }
}

class ProductManager {
    constructor() {
        this.products = [];
        this.currentId = 0; 
    }

    addProduct(product) {
        // Campos son obligatorios
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }

        // Validar que no se repita el campo “code”
        const existingProduct = this.products.find(p => p.code === product.code);
        if (existingProduct) {
            console.log("El código de producto ya existe");
            return;
        }

        // Asignar un id creciente
        product.id = ++this.currentId;
        this.products.push(product);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const foundProduct = this.products.find(p => p.id === id);
        if (!foundProduct) {
            console.log("Not found");
            return null;
        }
        return foundProduct;
    }
}


