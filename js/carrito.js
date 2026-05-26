let carrito = [];

export function agregarAlCarrito(producto) {

    const existe = carrito.find(c=> c.idProducto === producto.id);
    
    if (existe) {
        existe.cantidad++;
    }else{
        const nuevo = {
            idProducto: producto.id,           
            cantidad: 1
        }

        carrito.push(nuevo);
    }
}

export function eliminarProducto(productoCarrito) {
   
    const existe = carrito.find(c=> c.idProducto === productoCarrito.idProducto);

    if (existe) {
        carrito = carrito.filter(c=> c.idProducto !== productoCarrito.idProducto);
    }
}

export function obtenerCarrito() {
    return carrito;    
}

export function obtenerTotalProductosCarrito() {    
    
    const total = carrito.reduce((acc, item)=> {
        return acc + item.cantidad;
    }, 0);

    return total;
}

