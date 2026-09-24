import { STATE } from "../state/state.js";

export function renderizarPaginacion(cantidadPaginas) {

    let html = '';
    let divPaginacion = document.getElementById('paginacion');

    html += `<button class="btnAnterior" type="button"><</button>`;  
    html += `<div class="paginas">`;  

    for (let i = 1; i <= cantidadPaginas; i++) {
        html += `<button class="btnNumeroPagina" type="button" value="${i}">${i}</button>`        
    }

    html += `</div>`;
    html += `<button class="btnSiguiente" type="button">></button>`;

    divPaginacion.innerHTML = html;

    const paginaActual = STATE.paginaActual;

    const btnPaginaActual = divPaginacion.querySelector(`button[value="${paginaActual}"]`);
    btnPaginaActual.classList.add('pagina-actual');
    
}