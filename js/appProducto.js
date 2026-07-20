import { bootstrapApp } from "./bootstrap/bootstrapApp.js";
import { obtenerValorParametro } from "./helpers/helperParametrosURL.js";
import { obtenerProductoPorId } from "./api.js";
import { renderizarProducto } from "./ui.js";
import { inicializarEventosProducto } from "./eventosProducto.js";


window.addEventListener('load', init);

async function init() {

    await bootstrapApp();

    inicializarEventosProducto();

    const idProducto = obtenerValorParametro('idProducto');

    const producto = await obtenerProductoPorId(idProducto);  

    if (!producto) return;

    renderizarProducto(producto);   
    
    console.log(producto);
    
    
}

