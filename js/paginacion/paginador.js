import { STATE } from "../state/state.js";

export function obtenerProductosPorPagina(paginaActual, productos) {

    if (!productos) return [];
    
    const inicio = (paginaActual - 1) * STATE.cantidadProductosPorPagina;
    const final = inicio + STATE.cantidadProductosPorPagina;  

    return productos.slice(inicio, final);

}

export function obtenerCantidadPaginas(productos) {

    if (!productos) return 0;
    
    return Math.ceil(productos.length / STATE.cantidadProductosPorPagina);
}