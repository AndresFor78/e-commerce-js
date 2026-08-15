import { cargarNavbar, cargarCarritoLateral } from "../layout-componentes/layoutComponente.js";
import { inicializarEventosGlobal } from "../eventos/eventosGlobal.js";
import { obtenerProductosStore } from "../store/store.js";
import { renderizarCarritoLateral } from "../ui/uiCarrito.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { crearItemsCarrito } from "../carrito/itemCarritoFactory.js";

export async function bootstrapApp() {
    
    document.getElementById('navbarComponente').innerHTML = await cargarNavbar();
    document.getElementById('contenedorCarritoLateral').innerHTML = await cargarCarritoLateral();             
        
    inicializarEventosGlobal();

    const productos = await obtenerProductosStore();

    const itemsCarrito = crearItemsCarrito(getCarrito(), productos);
    console.log(itemsCarrito);
    
    renderizarCarritoLateral(itemsCarrito);  

    return productos;
    
}