import { inicializarEventosGlobal } from "./eventosGlobal.js";
import { getCarrito, getProductos } from "./helpers/helperLocalStorage.js";
import { cargarNavbar, cargarCarritoLateral } from "./layoutComponente.js";
import { renderizarCarrito, setProductosUI } from "./ui.js";

window.addEventListener('load', init);

async function init() {

    document.getElementById('navbarComponente').innerHTML = await cargarNavbar();
    document.getElementById('contenedorCarritoLateral').innerHTML = await cargarCarritoLateral();

    setProductosUI(getProductos());

    renderizarCarrito(getCarrito());
    console.log(getProductos());
    
    inicializarEventosGlobal();
    
}