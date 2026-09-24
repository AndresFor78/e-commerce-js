export function setCarrito(carrito) {    
    localStorage.setItem('arregloCarrito', JSON.stringify(carrito));
}

export function getCarrito() {

    const carritoLocalStorage = localStorage.getItem('arregloCarrito');
    const carrito = carritoLocalStorage? JSON.parse(carritoLocalStorage): [];    
    return carrito;
    
}

export function setPaginaActual(paginaActual) {
    localStorage.setItem('paginaActual', paginaActual);
}

export function getPaginaActual() {

    const paginaActualLocalStorage = localStorage.getItem('paginaActual');
    const paginaActual = paginaActualLocalStorage? Number(paginaActualLocalStorage): 1;
    return paginaActual;
}