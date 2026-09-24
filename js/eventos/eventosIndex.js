import { renderizarProductos } from "../ui/uiProductos.js";
import { renderizarCarritoLateral} from "../ui/uiCarrito.js";
import { agregarAlCarrito } from "../carrito/carrito.js";
import { obtenerProductosStore } from "../store/store.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { navegar } from "../services/navigationService.js";
import { RUTAS } from "../constants/rutas.js";
import { crearItemsCarrito } from "../carrito/itemCarritoFactory.js";
import { obtenerProductosPorPagina } from "../paginacion/paginador.js";
import { STATE } from "../state/state.js";

export function inicializarEventosIndex() {

    const buscador = document.getElementById('buscador');
    const grillaProductos = document.getElementById('grillaProductos');    
    const ordenador = document.getElementById('ordenador');
    const paginacion = document.getElementById('paginacion');
   
    buscador.addEventListener('input', handlerBuscador);
    grillaProductos.addEventListener('click', manejarEventosGrillaProductos); 
    ordenador.addEventListener('change', handlerOrdenador);  
    paginacion.addEventListener('click', handlerPaginacion); 
   
}

async function handlerBuscador(e) {

    const valor = e.target.value.toUpperCase();
    const productos = await obtenerProductosStore();

    const productosFiltrados = productos.filter(p=> p.title.toUpperCase().includes(valor));

    renderizarProductos(productosFiltrados);    
    
}

async function manejarEventosGrillaProductos(e) {    

    const card = e.target.closest('.card');

    if (!card) return;

    const carrito = getCarrito();
    const productos = await obtenerProductosStore();
    
    const idProducto = Number(card.dataset.id);
    const producto = productos.find(p=> p.id === idProducto);

    if (!producto) return;

    // Tarjeta
    if (e.target.classList.contains('abrir-detalle')) {
        navegar(RUTAS.paginas.producto(idProducto));
    }

    // Agregar al carrito
    if (e.target.classList.contains('btn-agregar-carrito')) {
        agregarAlCarrito(producto, carrito, 1);
        renderizarCarritoLateral(crearItemsCarrito(getCarrito(), productos));              
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

async function handlerPaginacion(e) {
    
    if (e.target.classList.contains('btnAnterior')) {
        console.log('anterior');
        
    }

    if (e.target.classList.contains('btnSiguiente')) {
        console.log('siguiente');
        
    }

    if (e.target.classList.contains('btnNumeroPagina')) {

        const productos = await obtenerProductosStore();
        const paginaActual = Number(e.target.value);
        
        const productosPorPagina = obtenerProductosPorPagina(paginaActual, productos);

        // Guarda la página actual en el STATE
        STATE.paginaActual = paginaActual;

        quitarEstiloPaginaActual(e.target);

        e.target.classList.add('pagina-actual');

        renderizarProductos(productosPorPagina);        
        
    }
}

function quitarEstiloPaginaActual(boton) {
    
    const divBotoneraPaginas = boton.closest('.paginas');
    const botones = divBotoneraPaginas.querySelectorAll('button');
    
    botones.forEach(btn => {
        btn.classList.remove('pagina-actual');
    })
    
    
    
}



