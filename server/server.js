require('./config/config');

const express = require('express');

const mongoose = require('mongoose');

const path = require('path');

const cors = require('cors');

const app = express();

// Libreria que se utiliza para obtener la informacion que se nos envie en u n JSON
const bodyParser = require('body-parser'); 

app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());



// carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

//Routes
app.use(require('./routes/index'));

//DB conection
mongoose.connect(process.env.urlDB,
                {useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology: true},
                (err,res) => { 
                    if (err) throw err;
                    
                    console.log('Base de datos Online');

});

app.listen(process.env.PORT, ()=>{
    console.log(`Escuchando puerto ${process.env.PORT}`);
});