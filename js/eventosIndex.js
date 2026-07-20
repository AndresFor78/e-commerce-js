import { renderizarProductos, renderizarCarritoLateral} from "./ui.js";
import { agregarAlCarrito } from "./carrito.js";
import { obtenerProductosStore } from "./store/store.js";
import { getCarrito } from "./helpers/helperLocalStorage.js";

export function inicializarEventosIndex() {

    const buscador = document.getElementById('buscador');
    const grillaProductos = document.getElementById('grillaProductos');    
    const ordenador = document.getElementById('ordenador');
   
    buscador.addEventListener('input', handlerBuscador);
    grillaProductos.addEventListener('click', manejarEventosGrillaProductos); 
    ordenador.addEventListener('change', handlerOrdenador);   
   
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

    console.log(e.target);    

    const card = e.target.closest('.card');

    if (!card) return;

    const idProducto = Number(card.dataset.id);
    const producto = productos.find(p=> p.id === idProducto);

    if (!producto) return;

    // Tarjeta
    if (e.target.classList.contains('abrir-detalle')) {
        window.location.href = `producto.html?idProducto=${producto.id}`;
    }

    // Agregar al carrito
    if (e.target.classList.contains('btn-agregar-carrito')) {
        agregarAlCarrito(producto, carrito, 1);
        renderizarCarritoLateral(getCarrito(), productos);              
    };
    
}

const estrategia = {
    precioMayor: (a, b)=> b.price - a.price,
    precioMenor: (a, b)=> a.price - b.price,
    mejorEvaluado: (a, b)=> b.rating - a.rating
}

async function handlerOrdenador(e) {
    
    const criterio = e.target.value;
    const productos = await obtenerProductosStore();
    const productosOrdenados = [...productos].sort(estrategia[criterio]);  

    renderizarProductos(productosOrdenados);
    
}



