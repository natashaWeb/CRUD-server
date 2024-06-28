const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");

// Definimos las rutas de autenticacion
router.post("/login", authControllers.login);
router.get("/verificar", authControllers.verificarToken);

module.exports = router;
