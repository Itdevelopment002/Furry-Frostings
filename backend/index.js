const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api', [productRoutes, categoryRoutes]);

app.listen(5000, () => console.log('Server started on port 5000'));
