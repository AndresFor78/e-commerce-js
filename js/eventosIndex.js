import { renderizarProductos, renderizarCarrito} from "./ui.js";
import { agregarAlCarrito } from "./carrito.js";
import { obtenerProductosStore } from "./store/store.js";
import { getCarrito } from "./helpers/helperLocalStorage.js";

export function inicializarEventosIndex() {

    const buscador = document.getElementById('buscador');
    const grillaProductos = document.getElementById('grillaProductos');    
    const ordenador = document.getElementById('ordenador');
   
    buscador.addEventListener('input', handlerBuscador);
    grillaProductos.addEventListener('click', manejarEventosGrillaProductos);    
    ordenador.addEventListener('change', manejarSelectOrdenador);

}

async function handlerBuscador(e) {

    const valor = e.target.value.toUpperCase();
    const productos = await obtenerProductosStore();

    const productosFiltrados = productos.filter(p=> p.title.toUpperCase().includes(valor));

    renderizarProductos(productosFiltrados);    
    
}

async function manejarEventosGrillaProductos(e) {

    const carrito = getCarrito();
    const productos = await obtenerProductosStore();

    const card = e.target.closest('.card');

    if (!card) return;

    const idProducto = Number(card.dataset.id);
    const producto = productos.find(p=> p.id === idProducto);

    if (!producto) return;

    // Agregar al carrito
    if (e.target.classList.contains('btn-agregar-carrito')) {
        agregarAlCarrito(producto, carrito);
        renderizarCarrito(getCarrito(), productos);              
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

