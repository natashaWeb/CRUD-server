const mongoose = require("mongoose");
const Usuario = require("./models/user");

// Conectamos la base de datos MongoDB
mongoose
    .connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(async () => {
        // Creamos los usuarios predefinidos (Admin, Vendedor, Cliente)
        console.log("Conectado a MongoDB");
        // Usuarios con sus respectivos roles
        const usuariosPredefinidos = [
            { usuario: "admin", contraseña: "1234", rol: 2 },
            { usuario: "vendedor", contraseña: "1234", rol: 1 },
        ];
        for (let usuario of usuariosPredefinidos) {
            try {
                // Verificamos que no esten los usuarios creados
                const existeUsuario = await Usuario.findOne({
                    usuario: usuario.usuario,
                });
                // Si existen omitir
                if (existeUsuario) {
                    console.log(
                        `El usuario ${usuario.usuario} ya existe, se omite la inserción.`
                    );
                } else {
                    // En caso contrario crear
                    await Usuario.create(usuario);
                    console.log(
                        `Usuario ${usuario.usuario} creado correctamente.`
                    );
                }
            } catch (error) {
                console.error(
                    `Error al insertar usuario ${usuario.nombre}:`,
                    error
                );
            }
        }
    })
    .catch((error) => {
        console.error("Error al conectar a MongoDB:", error);
    });
