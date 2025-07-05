const express = require("express");
const app = express();
require('dotenv').config();
require('./api/configs/db-connect');
const patientRoytes = require('./api/routes/patient.route');
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.use('/api/patient',patientRoytes)

app.get('/',(req,res)=> {
  res.send("Hello world")
});

app.listen(process.env.PORT,()=>{
  console.log("Localhost server started on Port: "+ process.env.PORT)
})