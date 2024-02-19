const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect.js');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const homeRouter = require('./routes/homeRoute.js');
const ourbrandsRouter = require('./routes/ourbrandsRoute.js')
const processRouter = require('./routes/processRoute.js')
const productRouter = require('./routes/productRoute.js')
const locationRouter = require('./routes/locationRoute.js')
const experienceRouter = require('./routes/experienceRoute.js')
const clientRouter = require('./routes/clientRoute.js')
const contactRouer = require('./routes/contactRoute.js')
const { notFound, errorHandler } = require('./middlewares/errorHandlers.js');
dbConnect();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/uploads', express.static('uploads'));

app.get('/', async(req, res) => {
  res.send('hello from server');
});

app.use('/home', homeRouter);
app.use('/ourbrands', ourbrandsRouter);
app.use('/process', processRouter);
app.use('/product', productRouter);
app.use('/location', locationRouter)
app.use('/experience', experienceRouter)
app.use('/client', clientRouter)
app.use('/contact', contactRouer)


app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on ${PORT}`);
});
