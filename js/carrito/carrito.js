import { getCarrito, setCarrito } from "../helpers/helperLocalStorage.js";

export function agregarAlCarrito(producto, carrito, cantidad) {

    const existe = carrito.find(c=> c.idProducto === producto.id);
        
    if (existe) {
        existe.cantidad += cantidad;
    }else{
        const nuevo = {
            idProducto: producto.id,           
            cantidad: cantidad
        }

        carrito.push(nuevo);
    }
    setCarrito(carrito);
}

export function eliminarProducto(idProducto, carrito) {
   
    const existe = carrito.find(c=> c.idProducto === idProducto);

    if (existe) {
        carrito = carrito.filter(c=> c.idProducto !== idProducto); 
        setCarrito(carrito);       
    }
}

export function incrementarCantidad(idProducto, carrito) {

    const producto = carrito.find(c=> c.idProducto === idProducto);

    if (!producto) return;

    producto.cantidad++;

    setCarrito(carrito);  
    
}

export function decrementarCantidad(idProducto, carrito) {

    const producto = carrito.find(c=> c.idProducto === idProducto);
    if (!producto) return;

    if (producto.cantidad === 1) {
        eliminarProducto(idProducto, carrito);
    }else{
        producto.cantidad--;
        setCarrito(carrito);
    }
}

export function notificarCarritoActualizado() {
    document.dispatchEvent(new CustomEvent('carritoActualizado'));
}

