import { cargarNavbar, cargarCarritoLateral } from "../layout-componentes/layoutComponente.js";
import { inicializarEventosGlobal } from "../eventos/eventosGlobal.js";
import { obtenerProductosStore } from "../store/store.js";
import { renderizarCarritoLateral } from "../ui/uiCarrito.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";

export async function bootstrapApp() {
    
    document.getElementById('navbarComponente').innerHTML = await cargarNavbar();
    document.getElementById('contenedorCarritoLateral').innerHTML = await cargarCarritoLateral();             
        
    inicializarEventosGlobal();

    const productos = await obtenerProductosStore();
    renderizarCarritoLateral(getCarrito(), productos);  

    return productos;
    
}