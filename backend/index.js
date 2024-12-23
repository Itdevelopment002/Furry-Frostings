const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', [productRoutes, categoryRoutes]);

app.listen(5000, () => console.log('Server started on port 5000'));
