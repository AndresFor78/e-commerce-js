import { getProductosUI, renderizarProductos, renderizarCarrito} from "./ui.js";
import { agregarAlCarrito } from "./carrito.js";
import { getCarrito, setCarrito } from "./helpers/helperLocalStorage.js";

export function inicializarEventosIndex() {
    
    const grillaProductos = document.getElementById('grillaProductos');   
    const filtrador = document.querySelector('.filtrador');
    const ordenador = document.getElementById('ordenador');
   
    grillaProductos.addEventListener('click', manejarEventosGrillaProductos);    
    ordenador.addEventListener('change', manejarSelectOrdenador);

}

function manejarEventosGrillaProductos(e) {

    const carrito = getCarrito();

    const card = e.target.closest('.card');

    if (!card) return;

    const idProducto = Number(card.dataset.id);
    const producto = getProductosUI().find(p=> p.id === idProducto);

    if (!producto) return;

    // Agregar al carrito
    if (e.target.classList.contains('btn-agregar-carrito')) {
        agregarAlCarrito(producto, carrito);
        renderizarCarrito(getCarrito());         
    };

    // Mostrar detalle producto
    if (e.target.classList.contains('btn-detalle')) {
        // abrirModal();  
        // renderizarModal(producto); 
        window.location.href = `producto.html?idProducto=${producto.id}`;
        
    }
}

const estrategia = {
    precioMayor: (a, b) => b.price - a.price,
    precioMenor: (a, b) => a.price - b.price,
    mejorEvaluado: (a, b) => b.rating - a.rating
}

function manejarSelectOrdenador(e) {

    const criterio = e.target.value;

    const ordenados = [...getProductosUI()].sort(estrategia[criterio]);
    renderizarProductos(ordenados);  
    
    
}

