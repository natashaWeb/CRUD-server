const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/authControllers");
const productControllers = require("../controllers/productControllers");

// Definimos las rutas de productos
router.post(
    "/product/new",
    authControllers.isAuth,
    productControllers.crearProducto
);
router.put(
    "/product/edit/:id",
    authControllers.isAuth,
    productControllers.editarProducto
);
router.delete(
    "/product/delete/:id",
    authControllers.isAuth,
    productControllers.eliminarProducto
);
router.get("/product/get", productControllers.obtenerProductos);
router.post(
    "/myproduct/get",
    authControllers.isAuth,
    productControllers.obtenerMisProductos
);

module.exports = router;
