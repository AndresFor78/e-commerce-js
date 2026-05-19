import { inicializarEventos } from "./eventos.js";
import { obtenerProductos } from "./api.js";
import { renderizarProductos, setProductos } from "./ui.js";

window.addEventListener('load', init);

function init() {

    inicializarEventos();

    obtenerProductos()
    .then(productos => {
        setProductos(productos);
        renderizarProductos(productos);
    })
    .catch(e=>{
        console.log(e);        
    })
    
}