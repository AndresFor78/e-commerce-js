import { obtenerProductoPorId } from "./api.js";

window.addEventListener('load', init);

function init() {

    const idProducto = obtenerIdProductoDesdeUrl();    

    obtenerProductoPorId(idProducto)
    .then(producto=> {
        console.log(producto);        
    })
    .catch(e=>{
        console.log(e);        
    })
    
}

function obtenerIdProductoDesdeUrl() {

    const params = new URLSearchParams(window.location.search);
    return Number(params.get('id'));
    
}