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

// Encriptamos la contraseña antes de guardar usuarios
usuarioSchema.pre("save", async function (next) {
    const usuario = this;
    if (!usuario.isModified("contraseña")) {
        return next();
    }
    try {
        const hashedPassword = await bcrypt.hash(usuario.contraseña, 10);
        usuario.contraseña = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;
