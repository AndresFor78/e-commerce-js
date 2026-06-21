export function setCarrito(carrito) {    
    localStorage.setItem('arregloCarrito', JSON.stringify(carrito));
}

export function getCarrito() {

    const carritoLocalStorage = localStorage.getItem('arregloCarrito');
    const carrito = carritoLocalStorage? JSON.parse(carritoLocalStorage): [];    
    return carrito;
    
}