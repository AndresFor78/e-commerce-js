export function obtenerCantidadTotalProductos(itemsCarrito) {
    
    const total = itemsCarrito.reduce((acc, item)=>{
        return acc + item.cantidad;
    }, 0);

    return total;

}

export function obtenerValorTotalProductos(itemsCarrito) {
    
    const total = itemsCarrito.reduce((acc, item)=> {
        return acc + (item.precioOriginal * item.cantidad);
    }, 0);

    return total;
}

export function obtenerCantidadProductosConDescuentos(itemsCarrito) {
    
    return itemsCarrito.filter(itemCarrito => itemCarrito.montoDescuentoUnitario > 0).length;
    
}

export function obtenerTotalDescuentos(itemsCarrito) {
    
    const totalDescuentos = itemsCarrito.reduce((acc, item)=> {
        return acc + item.montoDescuentoTotal;
    }, 0);

    return totalDescuentos;

}

export function obtenerTotalCompra(itemsCarrito) {
    
    const totalProductos = obtenerValorTotalProductos(itemsCarrito);
    const totalDescuentos = obtenerTotalDescuentos(itemsCarrito);

    return totalProductos - totalDescuentos;
}  