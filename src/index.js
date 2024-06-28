const express = require("express");
const app = express();

const cors = require("cors");

// Variables globales
require("dotenv").config();

// Base de datos
require("./db");

// Rutas
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

// Definimos el puerto con la variable de entorno
const PORT = process.env.PORT || 3000;

// Configuramos cors

app.use(cors({
         origin: '*', // Permite solo desde este origen
         methods: ['GET', 'POST', "DELETE", "PUT"], // Métodos HTTP permitidos
         allowedHeaders: ['Content-Type', "authorization"], // Encabezados permitidos
     }));

// Iniciamos middlewares para recibir informacion del cliente
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Definimos la ruta de autenticacion
app.use("/", authRoutes);

// Definimos las rutas de productos
app.use("/", productRoutes);

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en ${PORT}`);
});
