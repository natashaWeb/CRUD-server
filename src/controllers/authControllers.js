const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/user");

// Funcion de logueo
exports.login = async (req, res) => {
    const { usuario, contraseña } = req.body;
    try {
        // Buscamos el usuario para verificar que exista
        const usuarioVerificar = await Usuario.findOne({ usuario });
        if (!usuarioVerificar) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Verificamos contraseña
        if (contraseña !== usuarioVerificar.contraseña) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        // Firmamos el token
        const token = jwt.sign(
            { usuarioId: usuarioVerificar._id, rol: usuarioVerificar.rol },
            process.env.SECRET,
            { expiresIn: "24h" }
        );
        // Envio de token al cliente
        res.json({
            token,
            rol: usuarioVerificar.rol,
            myId: usuarioVerificar._id,
        });
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
};

// Funcion de verificacion
exports.isAuth = (req, res, next) => {
    // Guardamos el token dado desde el cliente
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(401)
            .json({ error: "Acceso denegado. Token no proporcionado." });
    }
    // Verificamos el token
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res
                .status(401)
                .json({ error: "Acceso denegado. Token inválido." });
        }
        req.usuarioId = decoded.usuarioId;
        next();
    });
};

exports.verificarToken = (req, res, next) => {
    // Guardamos el token dado desde el cliente
    const token = req.headers.authorization;
    if (!token) {
        return res
            .status(401)
            .json({ error: "Acceso denegado. Token no proporcionado." });
    }
    // Verificamos el token
    jwt.verify(token, process.env.SECRET, (error, decoded) => {
        if (error) {
            return res
                .status(401)
                .json({ error: "Acceso denegado. Token inválido." });
        }
        req.usuarioId = decoded.usuarioId;
        res.status(200).json({
            success: true,
            myId: decoded.usuarioId,
            rol: decoded.rol,
        });
        next();
    });
};
