const express =require ('express')
const app =express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const mongoose = require('mongoose');
const transactionRoutes= require('./routes/transactions')
const userRoutes = require('./routes/user');
const requireAuth = require('./middleware/requireAuth');
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
app.use('/',userRoutes);

app.use('/',transactionRoutes,requireAuth);

const dbURI = MONGO_URL;
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(PORT);
    console.log("listening on port:",PORT)})
  .catch((err) => console.log(err));

