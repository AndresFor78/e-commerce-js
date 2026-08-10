import { obtenerTotalProductosCarrito } from "../carrito/carrito.js";
import { crearItemCarrito } from "../carrito/carritoItemFactory.js";
import { obtenerTotalCarrito } from "../carrito/carritoUtils.js";
import { RUTAS } from "../constants/rutas.js";
import { getCarrito, setCarrito } from "../helpers/helperLocalStorage.js";
import { obtenerCantidadDescuentos, 
         obtenerCantidadTotalProductos, obtenerTotalCompra, 
         obtenerTotalDescuentos, obtenerValorTotalProductos } from "../carrito/carritoItemOperaciones.js";

export function renderizarCarritoLateral(carrito, productos) {

    const carritoUI = obtenerCarritoUI();

    actualizarEstadoCarrito(carrito, productos, carritoUI);
         
    if (carrito.length === 0) {          
        renderizarCarritoLateralVacio(carritoUI.listaCarrito);          
        return;
    }

    carritoUI.listaCarrito.innerHTML = renderizarCarrito(carrito, productos, crearHtmlCarritoLateral);    
    
}

export function renderizarCarritoPrincipal(carrito, productos) {

    const carritoPrincipal = document.getElementById('carritoPrincipal');

    if (carrito.length === 0) {
        renderizarCarritoPrincipalVacio(carritoPrincipal);
        return;
    };

    const carritoLista = carritoPrincipal.querySelector('.carrito-principal-lista');
    const carritoResumen = carritoPrincipal.querySelector('.carrito-principal-resumen');  
    const totalProductosCarrito = obtenerTotalProductosCarrito(carrito); 
    
    const tituloCarritoLista = `<h2>Carrito (${totalProductosCarrito} productos)</h2>`;
    const tituloResumen = `<h2>Resumen de la compra</h2>`

    carritoLista.innerHTML = tituloCarritoLista + renderizarCarrito(carrito, productos, crearHtmlCarritoPrincipal);
    carritoResumen.innerHTML = tituloResumen + renderizarCarritoResumen(carrito, productos, crearHtmlCarritoPrincipalResumen);
    

}

function actualizarEstadoCarrito(productosCarrito, productos, carritoUI) {

    const total = obtenerTotalProductosCarrito(productosCarrito);

    carritoUI.listaCarrito.classList.toggle('carrito-vacio', productosCarrito.length === 0);
    carritoUI.btnVer.classList.toggle('ocultar', productosCarrito.length === 0);
    carritoUI.divCarritoResumen.classList.toggle('ocultar', productosCarrito.length === 0);
    carritoUI.cantidadTotalProductos.textContent = total;
    carritoUI.contadorCarrito.textContent = total;
    carritoUI.spanTotalCarrito.textContent = `$ ${obtenerTotalCarrito(productosCarrito, productos).toFixed(2)}`

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

function renderizarCarrito(carrito, productos, crearHtml) {

    let html = '';

    carrito.forEach(productoCarrito => {

        const producto = productos.find(p=> p.id === productoCarrito.idProducto);

        if (!producto) return;

        const itemCarrito = crearItemCarrito(producto, productoCarrito);

        html += crearHtml(itemCarrito);        

    });

    return html;
    
}

function renderizarCarritoResumen(carrito, productos, crearHtml) {

    let arrayItemCarrito = [];    
    
    carrito.forEach(productoCarrito => {

        const producto = productos.find(p=> p.id === productoCarrito.idProducto);

        if(!producto) return;

        const itemCarrito = crearItemCarrito(producto, productoCarrito);

        arrayItemCarrito.push(itemCarrito);

    });

    return crearHtml(arrayItemCarrito);
   
}

function crearHtmlCarritoLateral(itemCarrito) {

    return `<div class="carrito-item" data-id="${itemCarrito.idProducto}">                    
                <img class="abrir-detalle" src="${itemCarrito.imagen}">
                <div class="carrito-contenido">
                    <div class="carrito-contenido-header">
                        <span class="producto-nombre abrir-detalle">${itemCarrito.titulo}</span>
                        <span class="producto-total">$${itemCarrito.totalFinalPorProducto.toFixed(2)}</span>                            
                    </div> 
                    <div class="carrito-contenido-cuerpo">
                        <div class="contenido-precio">
                            <div>
                                <span class="precio-final">$ ${itemCarrito.precioFinal.toFixed(2)}</span>
                                <span class="descuento-porcentaje">$ ${itemCarrito.porcentajeDescuento.toFixed(2)}%</span>
                            </div>
                            <span class="precio-original">$ ${itemCarrito.precioOriginal}</span>
                        </div>
                        <div class="contenido-acciones">
                            <div class="carrito-acciones">
                                <button class="btn-incrementar">+</button>
                                <span class="producto-cantidad">${itemCarrito.cantidad}</span>
                                <button class="btn-decrementar">-</button>                               
                            </div>
                            <span class="carrito-eliminar-producto"><i class="fa-solid fa-trash-can"></i></span>
                        </div>                     
                    </div>                   
                </div>
            </div>
            <hr>`;
    
}

function crearHtmlCarritoPrincipal(itemCarrito) {
    
    return `<div class="carrito-principal-item" data-idproducto="${itemCarrito.idProducto}">
                <img src="${itemCarrito.imagen}"> 
                <div class="carrito-principal-contenido">
                    <div class="carrito-principal-info">
                        <span class="carrito-principal-titulo">${itemCarrito.titulo}</span>
                    </div>
                    <div class="carrito-principal-precio">
                        <div class="precio-info">
                            <span class="precio-final">$${itemCarrito.precioFinal.toFixed(2)}</span>
                            <span class="precio-original">$${itemCarrito.precioOriginal.toFixed(2)}</span>
                        </div>
                        <span class="descuento-porcentaje">${itemCarrito.porcentajeDescuento.toFixed(2)}%</span>
                    </div>
                    <div class="contenido-acciones">
                        <div class="carrito-acciones">
                            <button class="btn-incrementar">+</button>
                            <span class="producto-cantidad">${itemCarrito.cantidad}</span>
                            <button class="btn-decrementar">-</button>                               
                        </div>                        
                    </div>                          
                </div>
                <span class="carrito-eliminar-producto"><i class="fa-solid fa-trash-can"></i></span>
            </div>    
            `
}

function crearHtmlCarritoPrincipalResumen(arrayItemCarritoUI) {

    if(!arrayItemCarritoUI) return;

    let htmlDescuentosDetalle = '';

    arrayItemCarritoUI.forEach(item => {       
        
        htmlDescuentosDetalle += `<div class="contenido-item-detalle">
                                    <span class="item-contenido-titulo">${item.titulo}</span>
                                    <span class="item-contenido-total-descuento">-$${item.montoDescuentoTotal.toFixed(2)}</span>
                                  </div>                        
                                 `
    })

    const totalProductos = obtenerCantidadTotalProductos(arrayItemCarritoUI);
    const valorTotalProductos = obtenerValorTotalProductos(arrayItemCarritoUI);
    const cantidadDescuentos = obtenerCantidadDescuentos(arrayItemCarritoUI);
    const totalDescuentos = obtenerTotalDescuentos(arrayItemCarritoUI);
    const totalCompra = obtenerTotalCompra(arrayItemCarritoUI);

    console.log(cantidadDescuentos);
    

    const html = `<div class="principal-resumen">
                    <div class="principal-resumen-header">
                        <span class="productos-title">Productos(${totalProductos})</span>
                        <span class="productos-total">$${valorTotalProductos.toFixed(2)}</span>                    
                    </div>  
                    <hr>                  
                    <div class="principal-resumen-descuentos">
                        <div id="acordeon" class="acordeon">
                            <div class="acordeon-item">
                                <button class="acordeon-item-header">
                                    <span class="header-descuentos">Descuentos(${cantidadDescuentos})</span>
                                    <span class="header-total-descuentos">-$${totalDescuentos.toFixed(2)}</span>
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
                        <span class="resumen-total-valor">$${totalCompra.toFixed(2)}</span>
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

