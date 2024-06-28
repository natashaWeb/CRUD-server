const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Definimos el esquema del los productos en mongoDB
const productoSchema = new Schema({
    titulo: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
    ownerId: {
        type: String,
        require: true,
    },
});

const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;
