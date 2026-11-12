import { reglasPaginacion } from "../paginacion/paginador.js";
import { STATE } from "../state/state.js";

export function renderizarPaginacion(cantidadPaginas) {

    let paginaActual = STATE.paginaActual;
    
    const paginaInicial = 1;
    const paginaFinal = cantidadPaginas;

    const objetoPaginacion = {
        paginaInicial: paginaInicial,
        paginaFinal: paginaFinal,
        paginaActual: paginaActual
    };

    const reglas = reglasPaginacion.filter(regla => regla.condicion(objetoPaginacion)); 
    
    if (reglas.length === 0) return;
    
    let contenedoresPaginacion = document.querySelectorAll('.paginacion');    

    let html = '';
    html += `<button class="btnAnterior" type="button"><</button>`
    html += `<div class="paginas">`;

    reglas.forEach(regla => {
        const arreglo = regla.calculo(objetoPaginacion);
        html = renderizar(arreglo, html);
    });   

    html += `</div>`;
    html += `<button class="btnSiguiente" type="button">></button>`

    contenedoresPaginacion.forEach(contenedor => {

        contenedor.innerHTML = html;

        const btnPaginaActual = contenedor.querySelector(`button[value="${objetoPaginacion.paginaActual}"]`);
        btnPaginaActual.classList.add('pagina-actual');

    });    
    
}

function renderizar(arregloPaginas, html) {

    arregloPaginas.forEach(datoPagina => {
        html += `<button class="btnNumeroPagina" value="${datoPagina}" type="button">${datoPagina}</button>`
    });

    return html;    

}