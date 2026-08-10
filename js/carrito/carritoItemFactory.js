import { obtenerMontoDescuentoUnitario, obtenerPorcentajeDescuento, obtenerPrecioFinal } from "../producto/productoUtils.js";

export function crearItemCarrito(producto, productoCarrito) {

    const precioFinal = obtenerPrecioFinal(producto);
    const porcentajeDescuento = obtenerPorcentajeDescuento(producto);
    const montoDescuentoUnitario = obtenerMontoDescuentoUnitario(producto);
    const montoDescuentoTotal = montoDescuentoUnitario * productoCarrito.cantidad;
    
    return {
        idProducto: producto.id,
        titulo: producto.title,
        precioOriginal: producto.price,
        imagen: producto.thumbnail,
        cantidad: productoCarrito.cantidad,
        porcentajeDescuento,
        montoDescuentoUnitario,
        montoDescuentoTotal,
        precioFinal,
        totalOriginalPorProducto: producto.price * productoCarrito.cantidad,
        totalFinalPorProducto: precioFinal * productoCarrito.cantidad
    };
    
}