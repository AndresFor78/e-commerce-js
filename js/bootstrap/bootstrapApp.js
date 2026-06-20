import { cargarNavbar, cargarCarritoLateral } from "../layoutComponente.js";
import { inicializarEventosGlobal } from "../eventosGlobal.js";
import { obtenerProductosStore } from "../store/store.js";
import { renderizarCarrito } from "../ui.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";

export async function bootstrapApp() {
    
    document.getElementById('navbarComponente').innerHTML = await cargarNavbar();
    document.getElementById('contenedorCarritoLateral').innerHTML = await cargarCarritoLateral();             
        
    inicializarEventosGlobal();

    const productos = await obtenerProductosStore();
    renderizarCarrito(getCarrito(), productos);  

    return productos;
    
}