export function obtenerPrecioFinal(producto) {
    
    const precioFinal = producto.price - (producto.price * (producto.discountPercentage/100));
    return precioFinal;

}

export function obtenerMontoDescuentoUnitario(producto) {
    
    const montoDescuento = producto.price - obtenerPrecioFinal(producto);
    return montoDescuento;

}

export function obtenerPorcentajeDescuento(producto) {
    
    const porcentaje = producto.discountPercentage;
    return porcentaje;
    
}