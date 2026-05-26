import { obtenerCarrito, obtenerTotalProductosCarrito } from "./carrito.js";
import { obtenerTotalCarrito } from "./carritoUtils.js";

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


let modalBox = document.querySelector('.modal-box');

const modalUI = {
    img: modalBox.querySelector('img'),
    titulo: modalBox.querySelector('.modal-titulo'),
    descripcion: modalBox.querySelector('.modal-descripcion')
}

let productosGlobal = [];

export function renderizarProductos(productos) {
    
    let grilla = document.getElementById('grillaProductos');

    grilla.innerHTML = '';  
    let html = '';

    productos.forEach(p => {

        const rating = "⭐".repeat(Math.round(p.rating));

        html+= `<div class="card" data-id="${p.id}">
                             <img src="${p.thumbnail}" />
                             <div class="info-producto">
                             <p class="title">${p.title}</p>
                             <p class="price">$ ${p.price}</p>
                             <p class="rating">${rating}</p>
                             </div>
                             <div class="card-botones">
                             <button class="btn-agregar-carrito">Agregar</button>
                             <button class="btn-detalle">Ver</button>
                             </div>
                             </div>`
    })

    grilla.innerHTML = html;
    
}

export function setProductos(productos) {
    productosGlobal = productos;    
}

export function getProductos() {
    return productosGlobal;
}

export function renderizarCarrito() {    

    const productosCarrito = obtenerCarrito();

    const carritoUI = obtenerCarritoUI();

    actualizarEstadoCarrito(productosCarrito, carritoUI);
         
    if (productosCarrito.length === 0) {  
        
        renderizarCarritoVacio(carritoUI.listaCarrito);          
        return;
    }

    renderizarCarritoConProductos(productosCarrito, carritoUI.listaCarrito);
    
}

function actualizarEstadoCarrito(productosCarrito, carritoUI) {

    const total = obtenerTotalProductosCarrito();

    carritoUI.listaCarrito.classList.toggle('carrito-vacio', productosCarrito.length === 0);
    carritoUI.btnVer.classList.toggle('ocultar', productosCarrito.length === 0);
    carritoUI.divCarritoResumen.classList.toggle('ocultar', productosCarrito.length === 0);
    carritoUI.cantidadTotalProductos.textContent = total;
    carritoUI.contadorCarrito.textContent = total;
    carritoUI.spanTotalCarrito.textContent = `$ ${obtenerTotalCarrito(obtenerCarrito(), getProductos()).toFixed(2)}`

}

function renderizarCarritoVacio(listaCarrito) {

    listaCarrito.innerHTML = `<div class="carrito-vacio">
                                <p>Tu carrito está vacío</p>
                              </div>`    
}

function renderizarCarritoConProductos(productosCarrito, listaCarrito) {

    const productos = getProductos();

    let html = '';

    productosCarrito.forEach(c=> {

        const producto = productos.find(p=> p.id === c.idProducto);

        if (!producto) return;

        html+= `<div class="carrito-item" data-id="${producto.id}">                    
                    <img src="${producto.thumbnail}">
                    <div class="carrito-contenido">
                        <div class="carrito-contenido-header">
                            <p class="producto-nombre">${producto.title}</p>
                            <p class="producto-total">$${(producto.price * c.cantidad).toFixed(2)}</p>                            
                        </div> 
                        <div class="carrito-contenido-cuerpo">
                            <p class="producto-precio">$ ${producto.price}</p> 
                            <div class="carrito-acciones-cantidad">
                                <button class="btn-mas">+</button>
                                <p class="producto-cantidad">${c.cantidad}</p>
                                <button class="btn-menos">-</button>
                                <span class="carrito-eliminar-producto"><i class="fa-solid fa-trash-can"></i></span>
                            </div>                             
                        </div>                   
                    </div>
                </div>
                <hr>`
    });    

    listaCarrito.innerHTML = html;
    
}

export function renderizarModal(producto) {
    
   modalUI.img.src = producto.thumbnail;
   modalUI.titulo.textContent = producto.title;
   modalUI.descripcion.textContent = producto.description;

}
