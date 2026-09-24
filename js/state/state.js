import { getPaginaActual, setPaginaActual } from "../helpers/helperLocalStorage.js"

export const STATE = {
    get paginaActual(){       
        return getPaginaActual();
    },
    set paginaActual(paginaActual){
        setPaginaActual(paginaActual);
    },
    cantidadProductosPorPagina: 10
}