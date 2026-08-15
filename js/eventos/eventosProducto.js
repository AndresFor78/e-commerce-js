import { agregarAlCarrito } from "../carrito/carrito.js";
import { crearItemsCarrito } from "../carrito/itemCarritoFactory.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { obtenerValorParametro } from "../helpers/helperParametrosURL.js";
import { obtenerProductosStore } from "../store/store.js";
import { renderizarCarritoLateral } from "../ui/uiCarrito.js";

export function inicializarEventosProducto() {

    document.addEventListener('carritoActualizado', actualizarUI);

    const divProducto = document.getElementById('producto');
    
    divProducto.addEventListener('click', handlerProducto);
    
}

function actualizarUI() {

    const idProducto = obtenerValorParametro('idProducto');
    const productoCantidad = document.getElementById('productoCarritoCantidad');

    if(!idProducto) return;

    const producto = getCarrito().find(c=> c.idProducto === Number(idProducto));

    if (!producto) {
        productoCantidad.textContent = '';
        return;
    }
    
    productoCantidad.textContent = `${producto.cantidad} unidades en el carrito`;   
    
}

async function handlerProducto(e) {

    const divProducto = e.target.closest('.producto');

    if (!divProducto) return;      
    const productos = await obtenerProductosStore();    

    const idProducto = Number(divProducto.dataset.idproducto);
    const producto = productos.find(p=> p.id === idProducto);

    if (!producto) return;    

    const spanCantidadProducto = divProducto.querySelector('.producto-cantidad');     
    const cantidadProducto = Number(spanCantidadProducto.textContent);
    const spanCantidadEnCarrito = divProducto.querySelector('.producto-info-carrito-cantidad');
    
    // Incrementar cantidad producto
    if (e.target.classList.contains('btn-incrementar')) {
        spanCantidadProducto.textContent = cantidadProducto + 1;
    }

    // Decrementar
    if (e.target.classList.contains('btn-decrementar')) {
        if (spanCantidadProducto.textContent === '1') return;
        spanCantidadProducto.textContent = cantidadProducto - 1;        
    }
    
    // Agregar al carrito
    if (e.target.classList.contains('btn-agregar-carrito')) {

        agregarAlCarrito(producto, getCarrito(), cantidadProducto);
        const itemsCarrito = crearItemsCarrito(getCarrito(), productos);
        renderizarCarritoLateral(itemsCarrito); 
        spanCantidadProducto.textContent = 1; 

        const productoAgregado = getCarrito().find(c=> c.idProducto === producto.id);

        if (!productoAgregado) return;

        spanCantidadEnCarrito.textContent = `${productoAgregado.cantidad} unidades en el carrito`;

    }
}