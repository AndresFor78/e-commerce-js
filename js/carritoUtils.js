export function obtenerTotalCarrito(carrito, productos) {    

    const total = carrito.reduce((acumulador, itemCarrito)=>{

        const producto = productos.find(p=> p.id === itemCarrito.idProducto);
        if (!producto) return acumulador;

        return acumulador + (producto.price * itemCarrito.cantidad);
        
    }, 0)

    return total;

}