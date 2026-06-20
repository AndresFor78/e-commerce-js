import { bootstrapApp } from "./bootstrap/bootstrapApp.js";
import { obtenerValorParametro } from "./helpers/helperParametrosURL.js";
import { obtenerProductoPorId } from "./api.js";


window.addEventListener('load', init);

async function init() {

    await bootstrapApp();

    const idProducto = obtenerValorParametro('idProducto');

    const producto = await obtenerProductoPorId(idProducto);  
    
    console.log(producto);
    
    
}

