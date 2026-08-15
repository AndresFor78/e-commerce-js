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

export function obtenerCantidadDescuentos(itemsCarrito) {
    
    const arrayFiltrado = itemsCarrito.filter(item => item.montoDescuentoUnitario > 0);

    if (!arrayFiltrado) return 0;

    const total = arrayFiltrado.length;

    return total;
    
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