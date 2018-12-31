const express = require('express');
require('dotenv').config();
require('dotenv').load();
const bodyP = require('body-parser');
const app = express();


app.use(bodyP.json());
app.use(bodyP.urlencoded({ extended: false }));
const product = require('./routes/product.routes');
app.use('/products', product);
var port = process.env.server_port;
console.log(port);
app.listen(port, () => { console.log(`server listening on ${port}`); });