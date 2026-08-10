import { bootstrapApp } from "../bootstrap/bootstrapApp.js";
import { inicializarEventosIndex } from "../eventos/eventosIndex.js";
import { renderizarProductos } from "../ui/uiProductos.js";

window.addEventListener('load', init);

async function init() {
    
    try {
        const productos = await bootstrapApp();

        inicializarEventosIndex();        
        renderizarProductos(productos);     

    } catch (error) {
        console.log(error);        
    }
  
    
}