import { inicializarEventosGlobal } from "./eventosGlobal.js";
import { inicializarEventosIndex } from "./eventosIndex.js";
import { obtenerProductos } from "./api.js";
import { renderizarCarrito, renderizarProductos, setProductosUI } from "./ui.js";
import { cargarNavbar, cargarCarritoLateral } from "./layoutComponente.js";
import { getCarrito, setProductos } from "./helpers/helperLocalStorage.js";

window.addEventListener('load', init);

async function init() {
    
    try {

        document.getElementById('navbarComponente').innerHTML = await cargarNavbar();
        document.getElementById('contenedorCarritoLateral').innerHTML = await cargarCarritoLateral();             
    
        inicializarEventosGlobal();
        inicializarEventosIndex();
    
        const productos = await obtenerProductos();
        setProductos(productos);
        setProductosUI(productos);
        renderizarProductos(productos);
        renderizarCarrito(getCarrito());

    } catch (error) {
        console.log(error);        
    }
  
    
}