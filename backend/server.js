require('dotenv').config();
const dbConnect = require("../backend/dataBase-config")
const express = require('express');
const app = express();
const Routes = require("./routes")
const cors = require('cors');

const corsOption = {
    credentials:true,
    origin: ['http://localhost:3000'],
   
};
app.use(cors(corsOption));

// this middleware convert data request body into json
app.use(express.json());
// all url go through Routes middleware
app.use(Routes)


app.get('/',(req,res)=>{
    res.send("hello from vaibhav")
})

const PORT = process.env .PORT || 5500
app.listen(PORT,()=>{
    console.log(`Listing  on Port ${PORT}`)
})
dbConnect();