import { inicializarEventos } from "./eventos.js";
import { obtenerProductos } from "./api.js";
import { renderizarProductos, setProductos } from "./ui.js";
import { cargarNavbar } from "./layoutComponente.js";

window.addEventListener('load', init);

async function init() {
    
    try {

        document.getElementById('navbarComponente').innerHTML = await cargarNavbar();
    
        inicializarEventos();
    
        const productos = await obtenerProductos();
        setProductos(productos);
        renderizarProductos(productos);

    } catch (error) {
        console.log(error);        
    }
  
    
}