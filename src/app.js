const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const ProductManager = require('./ProductManager.js');
const manager = new ProductManager('./data/products.json');

const productRoutes = require('./routes/products.js');
const cartRoutes = require('./routes/carts.js');

const app = express();
const PORT = 8080;

const expressHandlebars = require('express-handlebars').engine;
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Usuario conectado');
    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

app.use(express.json());

app.get('/realtimeproducts', async (req, res) => {
    const products = await manager.getProducts();  
    res.render('realTimeProducts', { products });
});

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = io; 