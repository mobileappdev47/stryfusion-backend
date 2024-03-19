const bodyParser = require('body-parser');
const express = require('express');
const dbConnect = require('./config/dbConnect.js');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const homeRouter = require('./routes/homeRoute.js');
const ourbrandsRouter = require('./routes/ourbrandsRoute.js')
const ourbrandsmainRouter = require('./routes/ourbrandmainRoute.js')
const processRouter = require('./routes/processRoute.js')
const processmainRouter = require('./routes/processmainRoute.js')
const productRouter = require('./routes/productRoute.js')
const productmainRouter = require('./routes/productmainRoute.js')
const locationRouter = require('./routes/locationRoute.js')
const locationmainRouter = require('./routes/locationmainRoute.js')
const experienceRouter = require('./routes/experienceRoute.js')
const experiencemainRouter = require('./routes/experiencemainRoute.js')
const revolutionRouter = require('./routes/revolutionRoute.js')
const clientRouter = require('./routes/clientRoute.js')
const clientmainRouter = require('./routes/clientmainRoute.js')
const contactRouer = require('./routes/contactRoute.js')
const userRouter = require('./routes/userRoute.js')
const possibleRouter = require('./routes/possibleRoute.js')

const { notFound, errorHandler } = require('./middlewares/errorHandlers.js');
dbConnect();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/uploads', express.static('uploads'));

app.use('/api/home', homeRouter);

app.use('/api/ourbrands', ourbrandsRouter);
app.use('/api/ourbrandsmain', ourbrandsmainRouter)

app.use('/api/process', processRouter);
app.use('/api/processmain', processmainRouter)

app.use('/api/product', productRouter);
app.use('/api/productmain', productmainRouter);

app.use('/api/location', locationRouter)
app.use('/api/locationmain', locationmainRouter)

app.use('/api/experience', experienceRouter)
app.use('/api/experiencemain', experiencemainRouter)

app.use('/api/revolution', revolutionRouter)

app.use('/api/client', clientRouter)
app.use('/api/clientmain', clientmainRouter)

app.use('/api/contact', contactRouer)

app.use('/api/possible', possibleRouter);

app.use('/api/user', userRouter)

app.get('*', (req, res) => {
  
})

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is starting on ${PORT}`);
});
