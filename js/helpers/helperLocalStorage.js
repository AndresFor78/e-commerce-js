export function setCarrito(carrito) {    
    localStorage.setItem('arregloCarrito', JSON.stringify(carrito));
}

export function getCarrito() {

    const carritoLocalStorage = localStorage.getItem('arregloCarrito');
    const carrito = carritoLocalStorage? JSON.parse(carritoLocalStorage): [];    
    return carrito;
    
}

export function setProductos(productos) {
    localStorage.setItem('productosGlobal', JSON.stringify(productos));
}

export function getProductos() {
    const productos = localStorage.getItem('productosGlobal');
    return JSON.parse(productos);
}