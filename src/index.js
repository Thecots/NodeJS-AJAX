const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// database
const products = [
    {
        id: 1,
        name: 'Laptop'
    },
    {
        id: 2,
        name: "mouse"
    },
    {
        id: 3,
        name: "teclado"
    }
]
// settings
const PORT = process.env.PORT || 3000;

// middlewares
app.use(morgan('dev'));
    // Para que entienda los datos de un formulario (extended:false => pk es un formulario sencillo)
app.use(express.urlencoded({extended:false}));
    // Para que entienda los json que reciba 
app.use(express.json());

// static files
app.use(express.static(path.join(__dirname,'public')));

// routes
    // devuelve productos
app.get('/products', (req, res) =>{
    res.json(products)
})
    // añade nuevo producto
app.post('/products', (req,res) => {
    const { name } = req.body;
     products.push({
        id: (products[(products.length)-1].id)+1,
        name
    })
    res.json('done');
})
    // actualiza producto
app.put('/products/:id',(req,res) => {
    const {id} = req.params;
    const {name} = req.body;

    products.forEach((p,i) => {
        if(p.id == id){
            p.name = name;
        }
    })
    res.json('done');
})
    // elimina producto
app.delete('/products/:id',(req,res) => {
    const {id} = req.params;

    products.forEach((p,i) => {
        if(p.id == id){
            products.splice(i,1);
        }
    })
    res.json('done');
})

// server
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})