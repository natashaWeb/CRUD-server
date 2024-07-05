const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Definimos el esquema del usuario en mongoDB
const usuarioSchema = new Schema({
    usuario: {
        type: String,
        required: true,
        unique: true,
    },
    contraseña: {
        type: String,
        required: true,
    },
    rol: {
        type: Number,
        require: true,
        default: 0,
    },
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
