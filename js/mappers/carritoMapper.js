export function crearItemCarritoUI(producto, productoCarrito) {

    const descuento = producto.discountPercentage/100
    
    return {
        idProducto: producto.id,
        titulo: producto.title,
        precio: producto.price,
        imagen: producto.thumbnail,
        cantidad: productoCarrito.cantidad,
        descuento,
        precioFinal: producto.price - (producto.price * descuento),
        totalPorProducto: producto.price * productoCarrito.cantidad
    }
}