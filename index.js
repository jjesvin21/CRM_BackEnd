const express = require('express');
const app = express()
const citizen_routes =require('./routes/citizen_routes');
const cors = require('cors');
const mongoose = require('mongoose');
const authority_router = require('./routes/authority_route');
const case_routes = require('./routes/case_route')

require('dotenv').config()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO)
    .then(()=>{
        console.log("Data Base Connected");
    })
    .catch((e)=>{
        console.error(e);
        console.log("error");
    })

app.use("/api/citizen",citizen_routes)
app.use("/api/authority",authority_router)
app.use("/api/cases",case_routes)

app.listen("8000",()=>{
    console.log("Server Started");
})
