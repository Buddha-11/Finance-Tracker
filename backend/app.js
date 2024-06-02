const express =require ('express')
const app =express();
const mongoose = require('mongoose');
const transactionRoutes= require('./routes/transactions')

require('dotenv').config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());
app.use('/',transactionRoutes);

const dbURI = MONGO_URL;
mongoose.connect(dbURI)
  .then((result) => {
    app.listen(PORT);
    console.log("listening on port:",PORT)})
  .catch((err) => console.log(err));

  app.use(express.urlencoded({extended:true}));