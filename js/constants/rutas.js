export const RUTAS = {
    paginas: {
        principal: 'index.html',
        carrito: 'carrito.html',
        producto: idProducto => `producto.html?idProducto=${idProducto}`
    },
    imagenes: {
        carritoVacio: '../assets/img/empty-cart.svg'
    }

}