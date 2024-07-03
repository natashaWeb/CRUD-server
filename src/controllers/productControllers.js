const Producto = require("../models/product");

// Funcion para crear productos
exports.crearProducto = async (req, res) => {
    const { titulo, precio, imagen, categoria, ownerId } = req.body;
    try {
        // Creamos el producto
        if (
            titulo.length === 0 ||
            precio < 0 ||
            imagen.length === 0 ||
            categoria.length === 0
        ) {
            return res.status(500).json({ error: "Complete todos los datos" });
        }
        const nuevoProducto = new Producto({
            titulo,
            precio,
            imagen,
            categoria,
            ownerId,
        });
        // Guardamos el producto
        const productoGuardado = await nuevoProducto.save();
        res.status(200).json(productoGuardado);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({
            error: "Error en el servidor al crear el producto",
        });
    }
};

// Funcion para editar productos
exports.editarProducto = async (req, res) => {
    const { id } = req.params;
    const { titulo, precio, imagen, categoria } = req.body;
    try {
        // Buscamos el producto a editar
        let producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        if (
            titulo.length === 0 ||
            precio < 0 ||
            imagen.length === 0 ||
            categoria.length === 0
        ) {
            return res.status(500).json({ error: "Complete todos los datos" });
        }
        // En caso de existir editar
        producto.titulo = titulo;
        producto.precio = precio;
        producto.imagen = imagen;
        producto.categoria = categoria;
        // Guardar producto
        const productoActualizado = await producto.save();
        res.status(200).json(productoActualizado);
    } catch (error) {
        console.error("Error al editar el producto:", error);
        res.status(500).json({
            error: "Error en el servidor al editar el producto",
        });
    }
};

// Funcion para eliminar productos
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;
    try {
        // Buscamos producto a eliminar
        let producto = await Producto.findByIdAndDelete(id);
        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
        res.status(500).json({
            error: "Error en el servidor al eliminar el producto",
        });
    }
};

// Funcion para obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        // Buscamos todos los productos
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({
            error: "Error en el servidor al obtener los productos",
        });
    }
};
exports.obtenerProductosHotSale = async (req, res) => {
    try {
        // Buscamos los 5 productos con el precio más bajo
        const productos = await Producto.find().sort({ precio: 1 }).limit(5);
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({
            error: "Error en el servidor al obtener los productos",
        });
    }
};
exports.obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error("Error al obtener el producto:", error);
        res.status(500).json({
            error: "Error en el servidor al obtener el producto",
        });
    }
};

exports.obtenerProductosPorCategoria = async (req, res) => {
    const { categoria } = req.query;
    try {
        const productos = await Producto.find({ categoria });
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al buscar productos por categoría:", error);
        res.status(500).json({
            message: "Error al buscar productos por categoría",
        });
    }
};

// Funcion para obtener productos propios
exports.obtenerMisProductos = async (req, res) => {
    const { ownerId } = req.body;
    try {
        // Buscamos los productos del propietario
        const productos = await Producto.find({ ownerId });
        res.status(200).json(productos);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({
            error: "Error en el servidor al obtener los productos",
        });
    }
};
