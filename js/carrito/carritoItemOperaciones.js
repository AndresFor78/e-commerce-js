export function obtenerCantidadTotalProductos(arrayItemCarrito) {
    
    const total = arrayItemCarrito.reduce((acc, item)=>{
        return acc + item.cantidad;
    }, 0);

    return total;

}

export function obtenerValorTotalProductos(arrayItemCarrito) {
    
    const total = arrayItemCarrito.reduce((acc, item)=> {
        return acc + (item.precioOriginal * item.cantidad);
    }, 0);

    return total;
}

export function obtenerCantidadDescuentos(arrayItemCarrito) {
    
    const arrayFiltrado = arrayItemCarrito.filter(item => item.montoDescuentoUnitario > 0);

    if (!arrayFiltrado) return 0;

    const total = arrayFiltrado.length;

    return total;
    
}

export function obtenerTotalDescuentos(arrayItemCarrito) {
    
    const totalDescuentos = arrayItemCarrito.reduce((acc, item)=> {
        return acc + item.montoDescuentoTotal;
    }, 0);

    return totalDescuentos;

}

export function obtenerTotalCompra(arrayItemCarrito) {
    
    const totalProductos = obtenerValorTotalProductos(arrayItemCarrito);
    const totalDescuentos = obtenerTotalDescuentos(arrayItemCarrito);

    return totalProductos - totalDescuentos;
}  