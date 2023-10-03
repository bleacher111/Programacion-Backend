const express = require('express');
const productRoutes = require('./product.js');
const cartRoutes = require('./cart.js');  

const app = express();
const PORT = 8080;

app.use(express.json());  

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
