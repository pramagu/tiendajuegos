const {application} = require('express')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.static('public'));
app.use(express.json());

const PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI || "mongodb+srv://usuario:usuario@cluster0.qskntlb.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(DB_URI)
.then( db => console.log("Conectado a servidor de base de datos"))
.catch( err => console.log("error", err))

const Juego = mongoose.model('Juego', new mongoose.Schema(
{
    nombre: String,
    precio: Number
}));

const Cliente = mongoose.model('Cliente', new mongoose.Schema(
    {
        nombre: String,
        apellido: String
    }));

app.get("/api/juegos", cors(), (req,res) => {
    Juego.find( 
        {},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.post("/api/juegos",cors(), (req,res) => {
    new Juego({nombre: req.body.nombre, precio: req.body.precio}).save((error,data) => {if (error) res.json(error);else res.json(data)})
});

app.delete("/api/juegos/:id", cors(),(req,res) => {
    Juego.findOneAndRemove( 
        {_id: req.params.id},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.put("/api/juegos/:id", cors(),(req,res) => {
    Juego.findOneAndUpdate( 
        {_id: req.params.id},
        {$set: {nombre: req.body.nombre, precio: req.body.precio}},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.get("/api/clientes", cors(), (req,res) => {
    Cliente.find( 
        {},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.post("/api/clientes",cors(), (req,res) => {
    new Cliente({nombre: req.body.nombre, apellido: req.body.apellido}).save((error,data) => {if (error) res.json(error);else res.json(data)})
});

app.delete("/api/clientes/:id", cors(),(req,res) => {
    Cliente.findOneAndRemove( 
        {_id: req.params.id},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});

app.put("/api/clientes/:id", cors(),(req,res) => {
    Cliente.findOneAndUpdate( 
        {_id: req.params.id},
        {$set: {nombre: req.body.nombre, apellido: req.body.apellido}},
        (error, data) => {if(error) res.json(error);else res.json(data) }  
     )
});


app.listen(PORT, () => {console.log("Iniciando Servidor Web")});

