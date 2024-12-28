const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get('/', (req, res) => {
    const query = "SELECT * FROM products";
    database.query(query, (err, results) => {
        res.render('index', { products: results });
    });
});

app.post('/api/products', (req, res) => {
    const { name, price, description } = req.body;
    const query = "INSERT INTO products (name, price, description, created_at) VALUES (?, ?, ?, NOW())";
    database.query(query, [name, price, description], () => {
        res.redirect('/');
    });
});
app.post('/api/products/update/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    
    const query = "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?";
    
    database.query(query, [name, price, description, id], () => {
        res.redirect('/');
    });
});
app.post('/api/products/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM products WHERE id = ?";
    database.query(query, [id], () => {
        res.redirect('/');
    });
});
app.listen(3001, function() {
    console.log("Listening to http://localhost:3001");
    console.log("Bisa Bang GG");
});
