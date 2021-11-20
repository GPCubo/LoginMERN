const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config();
const {mongoose}= require('./database/database')

// Settings, configuración del servidor
app.set('port', process.env.PORT || 9000);

// Middlewares

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes

app.use(require('./routes/index.routes'))

// Errors
app.use((err, req, res, next)=>{
    res.send({ error:  err.message });
});

// Public

// app.use(express.static(path.join(__dirname, '../log-in/public')))



app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get("port")}`);
});