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

function crearArregloPaginacion(inicio, final) {
    
    const arreglo = [];

    for (let i = inicio; i <= final; i++) {
        arreglo.push(i);
    };

    return arreglo;
}

export const reglasPaginacion = [
    {
        condicion: datos => datos.paginaFinal <= 4,
        calculo: datos => {
            return crearArregloPaginacion(datos.paginaInicial, datos.paginaFinal)
        }
    },
    {
        condicion: datos => datos.paginaActual <= datos.paginaInicial + 2,
        calculo: datos => {
            return crearArregloPaginacion(datos.paginaInicial, datos.paginaActual)
        }
    },
    {
        condicion: datos => datos.paginaActual > datos.paginaInicial + 2 && datos.paginaActual === datos.paginaFinal,
        calculo: datos => {
            return [datos.paginaInicial, '...', datos.paginaActual - 2, datos.paginaActual - 1, datos.paginaActual];
        }
    },
    {
        condicion: datos => datos.paginaActual > datos. paginaInicial + 2 && datos.paginaActual !== datos.paginaFinal,
        calculo: datos => {
            return [datos.paginaInicial, '...', datos.paginaActual - 1, datos.paginaActual];
        }
    },
    {
        condicion: datos => datos.paginaActual > datos.paginaFinal - 3 && datos.paginaActual !== datos.paginaFinal,
        calculo: datos => {
            return crearArregloPaginacion(datos.paginaActual + 1, datos.paginaFinal);
        }
    },
    {
        condicion: datos => datos.paginaActual <= datos.paginaFinal - 3 && datos.paginaActual == datos.paginaInicial,
        calculo: datos => {
            return [datos.paginaActual + 1, datos.paginaActual + 2, '...', datos.paginaFinal];
        }
    },
    {
        condicion: datos => datos.paginaActual <= datos.paginaFinal - 3 && datos.paginaActual !== datos.paginaInicial,
        calculo: datos => {
            return [datos.paginaActual + 1, '...', datos.paginaFinal];
        }
    }
]