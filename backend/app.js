const express = require('express');
const cors = require('cors');

const users = require('./routes/users.js');
const items = require('./routes/items.js');

const app = express();
app.use(express.json());

app.use(cors({
  origin: [
    'http://localhost:5000',
    'http://localhost:5173',
    'https://marketplace-api-bb3o.onrender.com',
    'https://marketplace-hcv1.onrender.com',
  ],
}));

app.use('/api/users', users);
app.use('/api/items', items);

app.get('/health', (req, res) => {
  res.send('OK');
});

module.exports = app;
