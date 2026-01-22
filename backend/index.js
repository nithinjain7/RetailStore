const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 5432
});

app.get('/products', async (req, res) => {
  const result = await pool.query('SELECT * FROM products');
  res.json(result.rows);
});

app.post('/products', async (req, res) => {
  const { name, price, stock } = req.body;
  await pool.query(
    'INSERT INTO products (name, price, stock) VALUES ($1,$2,$3)',
    [name, price, stock]
  );
  res.sendStatus(201);
});

app.put('/products/:id', async (req, res) => {
  const { name, price, stock } = req.body;
  await pool.query(
    'UPDATE products SET name=$1, price=$2, stock=$3 WHERE id=$4',
    [name, price, stock, req.params.id]
  );
  res.sendStatus(200);
});

app.delete('/products/:id', async (req, res) => {
  await pool.query('DELETE FROM products WHERE id=$1', [req.params.id]);
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Backend running on port 3000'));
