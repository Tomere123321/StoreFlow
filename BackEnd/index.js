require('dotenv').config();
const mongoose = require('mongoose');   
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_URI,).then(() => { console.log('Connected to DB')})


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

