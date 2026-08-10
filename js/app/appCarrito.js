import { bootstrapApp } from "../bootstrap/bootstrapApp.js";
import { inicializarEventosCarrito } from "../eventos/eventosCarrito.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { renderizarCarritoPrincipal } from "../ui/uiCarrito.js";

window.addEventListener('load', initCarrito);

async function initCarrito() {
   
    const productos = await bootstrapApp();
    inicializarEventosCarrito();

    const carrito = getCarrito();

    renderizarCarritoPrincipal(carrito, productos);    
}