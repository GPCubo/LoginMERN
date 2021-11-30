const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express()
const cors = require('cors')
const dotenv = require('dotenv').config();
const {mongoose}= require('./database/database')
const multer = require('multer')


// Settings, configuración del servidor
const port = process.env.PORT || 9000;

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
//  Multer Middleware
const storage = multer.diskStorage({
    destination: path.join(__dirname,'./build/upload'),
    // destination: path.join(__dirname,'../log-in/public/upload'),
    filename: (req,file,cb)=>{
        cb(null, "imgprofile"+req.originalUrl.slice(13) +".jpeg")
    }
})
app.use(multer({
    storage,
    dest: path.join(__dirname,'./build/upload')
    // dest: path.join(__dirname,'../log-in/public/upload')
}).single('image'))

// Routes

app.use(require('./routes/index.routes'))

// Errors
app.use((err, req, res, next)=>{
    res.send({ error:  err.message });
});


// server static assets if in production
if(process.env.NODE_ENV === 'production'){    
    app.use(express.static('build'))  // set static folder 
    //returning frontend for any route other than api 
    app.get('*',(req,res)=>{     
        res.sendFile (path.resolve(__dirname,'frontend','build',         
                      'index.html' ));    
    });
}

// Public

app.use(express.static(path.join(__dirname,'build')))
app.listen(port, ()=>{
    console.log(`Server on port ${port}`);
});