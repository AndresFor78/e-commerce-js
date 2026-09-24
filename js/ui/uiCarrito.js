import { crearItemCarrito } from "../carrito/itemCarritoFactory.js";
import { RUTAS } from "../constants/rutas.js";
import { obtenerCantidadProductosConDescuentos, 
         obtenerCantidadTotalProductos, obtenerTotalCompra, 
         obtenerTotalDescuentos, obtenerValorTotalProductos } from "../carrito/itemCarritoOperaciones.js";
import { formatearDescuento, formatearPrecio } from "../helpers/helperFormato.js";

export function renderizarCarritoLateral(itemsCarrito) {

    const carritoUI = obtenerCarritoUI();

    actualizarEstadoCarrito(itemsCarrito, carritoUI);
         
    if (itemsCarrito.length === 0) {          
        renderizarCarritoLateralVacio(carritoUI.listaCarrito);          
        return;
    }

    carritoUI.listaCarrito.innerHTML = renderizarCarrito(itemsCarrito, crearHtmlCarritoLateral);    
    
}

export function renderizarCarritoPrincipal(itemsCarrito) {

    const carritoPrincipal = document.getElementById('carritoPrincipal');

    if (itemsCarrito.length === 0) {
        renderizarCarritoPrincipalVacio(carritoPrincipal);
        return;
    };

    const carritoLista = carritoPrincipal.querySelector('.carrito-principal-lista');
    const carritoResumen = carritoPrincipal.querySelector('.carrito-principal-resumen');  
    const totalProductosCarrito = obtenerCantidadTotalProductos(itemsCarrito); 
    
    const tituloCarritoLista = `<h2>Carrito (${totalProductosCarrito} productos)</h2>`;
    const tituloResumen = `<h2>Resumen de la compra</h2>`

    carritoLista.innerHTML = tituloCarritoLista + renderizarCarrito(itemsCarrito, crearHtmlCarritoPrincipal);
    carritoResumen.innerHTML = tituloResumen + renderizarCarritoResumen(itemsCarrito, crearHtmlCarritoPrincipalResumen);    

}

function renderizarCarrito(itemsCarrito, crearHtml) {

    let html = '';

    itemsCarrito.forEach(itemCarrito =>{
        html += crearHtml(itemCarrito);
    })

    return html;
    
}

function actualizarEstadoCarrito(itemsCarrito, carritoUI) {

    const total = obtenerCantidadTotalProductos(itemsCarrito);

    carritoUI.listaCarrito.classList.toggle('carrito-vacio', itemsCarrito.length === 0);
    carritoUI.btnVer.classList.toggle('ocultar', itemsCarrito.length === 0);
    carritoUI.divCarritoResumen.classList.toggle('ocultar', itemsCarrito.length === 0);
    carritoUI.cantidadTotalProductos.textContent = total;
    carritoUI.contadorCarrito.textContent = total;
    carritoUI.spanTotalCarrito.textContent = `$ ${obtenerTotalCompra(itemsCarrito).toFixed(2)}`

}

function renderizarCarritoLateralVacio(listaCarrito) {

    listaCarrito.innerHTML = `<div class="carrito-vacio">
                                <div class="carrito-vacio-header">
                                    <p>Tu carrito está vacío</p>
                                    <img class="imagen-carrito-vacio" src="${RUTAS.imagenes.carritoVacio}">
                                </div>
                                <button class="btn-accion btn-ver-productos carrito-lateral-vacio-boton-pequeño">Volver a comprar</button>
                              </div>`    
}

function renderizarCarritoPrincipalVacio(carritoPrincipal) {
    
    carritoPrincipal.innerHTML = `<div class="carrito-principal-vacio">                                    
                                    <div class="carrito-vacio-header">
                                        <img class="imagen-carrito-vacio" src="${RUTAS.imagenes.carritoVacio}">
                                        <div class="carrito-vacio-info">
                                            <h3>Tu carro está vacío</h3>
                                            <p>¡Continúa busando tus productos!</p>
                                        </div>
                                    </div>
                                    <button class="btn-accion">Ver productos</button>
                                  </div>
                                  `
}



function renderizarCarritoResumen(itemsCarrito, crearHtml) {    

    return crearHtml(itemsCarrito);
   
}

function crearHtmlCarritoLateral(itemCarrito) {

    return `<div class="carrito-item" data-id="${itemCarrito.idProducto}">                    
                <img class="abrir-detalle" src="${itemCarrito.imagen}">
                <div class="carrito-contenido">
                    <div class="carrito-contenido-header">
                        <span class="producto-nombre abrir-detalle">${itemCarrito.titulo}</span>
                        <span class="producto-total">${formatearPrecio(itemCarrito.totalFinalPorProducto)}</span>                            
                    </div> 
                    <div class="carrito-contenido-cuerpo">
                        <div class="contenido-precio">
                            <div>
                                <span class="precio-final">${formatearPrecio(itemCarrito.precioFinal)}</span>
                                <span class="descuento-porcentaje">${formatearDescuento(itemCarrito.porcentajeDescuento)}</span>
                            </div>
                            <span class="precio-original">${formatearPrecio(itemCarrito.precioOriginal)}</span>
                        </div>
                        <div class="contenido-acciones">
                            <div class="carrito-acciones">
                                <button class="btn-incrementar">+</button>
                                <span class="producto-cantidad">${itemCarrito.cantidad}</span>
                                <button class="btn-decrementar">-</button>                               
                            </div>
                            <button class="carrito-eliminar-producto">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>                     
                    </div>                   
                </div>
            </div>
            <hr>`;
    
}

function crearHtmlCarritoPrincipal(itemCarrito) {
    
    return `<div class="carrito-principal-item" data-idproducto="${itemCarrito.idProducto}">
                <img class="abrir-detalle" src="${itemCarrito.imagen}"> 
                <div class="carrito-principal-contenido">
                    <div class="carrito-principal-info">
                        <span class="carrito-principal-titulo abrir-detalle">${itemCarrito.titulo}</span>
                    </div>
                    <div class="carrito-principal-precio">
                        <div class="precio-info">
                            <span class="precio-final">${formatearPrecio(itemCarrito.precioFinal)}</span>
                            <span class="precio-original">${formatearPrecio(itemCarrito.precioOriginal)}</span>
                        </div>
                        <span class="descuento-porcentaje">${formatearDescuento(itemCarrito.porcentajeDescuento)}</span>
                    </div>
                    <div class="contenido-acciones">
                        <div class="carrito-acciones">
                            <button class="btn-incrementar">+</button>
                            <span class="producto-cantidad">${itemCarrito.cantidad}</span>
                            <button class="btn-decrementar">-</button>                               
                        </div>                        
                    </div>                          
                </div>
                <button class="carrito-eliminar-producto">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>    
            `
}

function crearHtmlCarritoPrincipalResumen(itemsCarrito) {

    if(!itemsCarrito) return;

    let htmlDescuentosDetalle = '';

    itemsCarrito.forEach(item => {       
        
        htmlDescuentosDetalle += `<div class="contenido-item-detalle">
                                    <span class="item-contenido-titulo">${item.titulo}</span>
                                    <span class="item-contenido-total-descuento">-${formatearPrecio(item.montoDescuentoTotal)}</span>
                                  </div>                        
                                 `
    })

    const totalProductos = obtenerCantidadTotalProductos(itemsCarrito);
    const valorTotalProductos = obtenerValorTotalProductos(itemsCarrito);
    const cantidadDescuentos = obtenerCantidadProductosConDescuentos(itemsCarrito);
    const totalDescuentos = obtenerTotalDescuentos(itemsCarrito);
    const totalCompra = obtenerTotalCompra(itemsCarrito);

    console.log(cantidadDescuentos);
    

    const html = `<div class="principal-resumen">
                    <div class="principal-resumen-header">
                        <span class="productos-title">Productos(${formatearPrecio(totalProductos)})</span>
                        <span class="productos-total">${formatearPrecio(valorTotalProductos)}</span>                    
                    </div>  
                    <hr>                  
                    <div class="principal-resumen-descuentos">
                        <div id="acordeon" class="acordeon">
                            <div class="acordeon-item">
                                <button class="acordeon-item-header">
                                    <span class="header-descuentos">Descuentos(${cantidadDescuentos})</span>
                                    <span class="header-total-descuentos">-${formatearPrecio(totalDescuentos)}</span>
                                    <span class="header-icono"><i class="fa-solid fa-angle-down"></i></span>
                                </button>
                                <div class="acordeon-item-contenido">
                                    ${htmlDescuentosDetalle}                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                    <div class="principal-resumen-total">
                        <span class="resumen-total-titulo">Total:</span>
                        <span class="resumen-total-valor">${formatearPrecio(totalCompra)}</span>
                    </div>
                    <div class="principal-resumen-acciones">
                        <button class="btn-accion btn-finalizar-compra">Finalizar compra</button>
                    </div>
                  </div>`;

    return html;
    
    
}

function obtenerCarritoUI() {
    const carritoUI = {
    listaCarrito: document.getElementById('listaCarrito'),
    btnVer: document.getElementById('btnVerCarrito'),
    cantidadTotalProductos: document.getElementById('cantidadTotalProductos'),
    contadorCarrito: document.getElementById('carritoContador'),
    spanTotalCarrito: document.getElementById('totalEstimado'),
    divCarritoResumen: document.querySelector('.carrito-resumen')
    };
    return carritoUI;    
}

