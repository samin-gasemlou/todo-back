const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const crud = require('./CRUD/crud');
const auth = require('./ROUTES/Auth');
const taskByDate = require('./ROUTES/TaskByDate')
const Complete = require('./ROUTES/Complete')
require('dotenv').config();

const app = express();//?
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/api/tasks",crud);
app.use("/api/auth",auth);
app.use("/api/tasks",taskByDate);
app.use("/api/tasks",Complete);


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('MongoDB Connected'))
.catch(err=> console.log(err));

app.listen(PORT,()=>{
    console.log(`Server is Running on http://localhost:${PORT}`)
})