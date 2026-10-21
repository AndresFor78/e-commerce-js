import { renderizarProductos } from "../ui/uiProductos.js";
import { renderizarCarritoLateral} from "../ui/uiCarrito.js";
import { agregarAlCarrito } from "../carrito/carrito.js";
import { obtenerProductosStore } from "../store/store.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { navegar } from "../services/navigationService.js";
import { RUTAS } from "../constants/rutas.js";
import { crearItemsCarrito } from "../carrito/itemCarritoFactory.js";
import { obtenerCantidadPaginas, obtenerProductosPorPagina } from "../paginacion/paginador.js";
import { STATE } from "../state/state.js";
import { renderizarPaginacion } from "../ui/uiPaginacion.js";

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
        
        const paginaActual = STATE.paginaActual;

        if (paginaActual === 1) return;

        irAPagina(paginaActual - 1);
        
    }

    if (e.target.classList.contains('btnSiguiente')) {

        const productos = await obtenerProductosStore();
        const cantidadPaginas = obtenerCantidadPaginas(productos);

        console.log(cantidadPaginas);        
        
        const paginaActual = STATE.paginaActual;

        console.log(paginaActual);        

        if (paginaActual === cantidadPaginas) return;

        renderizarPaginacion(cantidadPaginas);

        await irAPagina(paginaActual + 1);
        
    }

    if (e.target.classList.contains('btnNumeroPagina')) {
       
        const paginaActual = Number(e.target.value);

        await irAPagina(paginaActual); 

        const productos = await obtenerProductosStore();
        
        const cantidadPaginas = obtenerCantidadPaginas(productos);

        renderizarPaginacion(cantidadPaginas);
        
    }
}

async function irAPagina(paginaActual) {

    const productos = await obtenerProductosStore();
    
    const productosPorPagina = obtenerProductosPorPagina(paginaActual, productos);

    STATE.paginaActual = paginaActual;

    actualizarEstiloPaginaActual(paginaActual);

    renderizarProductos(productosPorPagina);    

}

function actualizarEstiloPaginaActual(numeroPagina) {
    
    const paginacion = document.getElementById('paginacion');
    const botones = paginacion.querySelectorAll('.btnNumeroPagina');    
    
    botones.forEach(btn => {
        btn.classList.remove('pagina-actual');
    });

    const boton = paginacion.querySelector(`.btnNumeroPagina[value="${numeroPagina}"]`);

    console.log(boton);    

    boton.classList.add('pagina-actual');
    
}