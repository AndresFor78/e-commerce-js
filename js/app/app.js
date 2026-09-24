import { bootstrapApp } from "../bootstrap/bootstrapApp.js";
import { inicializarEventosIndex } from "../eventos/eventosIndex.js";
import { obtenerCantidadPaginas, obtenerProductosPorPagina } from "../paginacion/paginador.js";
import { STATE } from "../state/state.js";
import { renderizarPaginacion } from "../ui/uiPaginacion.js";
import { renderizarProductos } from "../ui/uiProductos.js";

window.addEventListener('load', init);

async function init() {
    
    try {
        const productos = await bootstrapApp();

        inicializarEventosIndex();     
        
        const paginaActual = STATE.paginaActual;
        console.log(paginaActual);
            
        const cantidadPaginas = obtenerCantidadPaginas(productos);
        const productosPorPagina = obtenerProductosPorPagina(paginaActual, productos); 
       
        renderizarProductos(productosPorPagina);  
        renderizarPaginacion(cantidadPaginas);  

    } catch (error) {
        console.log(error);        
    }
  
    
}