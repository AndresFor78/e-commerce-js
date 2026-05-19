import { obtenerCarrito, obtenerTotalCarrito } from "./carrito.js";

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

export function actualizarContadorCarrito() {     
    document.getElementById('carritoContador').textContent = obtenerTotalCarrito();
}

export function renderizarCarrito() {
    
    const listaCarrito = document.getElementById('listaCarrito');
    let html = '';

    obtenerCarrito().forEach(c=> {

        const producto = getProductos().find(p=> p.id === c.idProducto);

        html+= `<div class="carrito-item" data-id="${producto.id}">                    
                    <img src="${producto.thumbnail}">
                    <div class="carrito-contenido">
                        <div class="carrito-contenido-header">
                            <p class="producto-nombre">${producto.title}</p>
                            <p class="producto-total">$${producto.price * c.cantidad}</p>                            
                        </div> 
                        <div class="carrito-contenido-cuerpo">
                            <p class="producto-precio">$ ${producto.price}</p> 
                            <div class="carrito-acciones-cantidad">
                                <button class="btn-mas">+</button>
                                <p class="producto-cantidad">${c.cantidad}</p>
                                <button class="btn-menos">-</button>
                                <span><i class="fa-solid fa-trash-can"></i></span>
                            </div>                             
                        </div>                   
                    </div>
                </div>
                <hr>`
    });

    listaCarrito.innerHTML = html;
}

let modalBox = document.querySelector('.modal-box');

const modalUI = {
    img: modalBox.querySelector('img'),
    titulo: modalBox.querySelector('.modal-titulo'),
    descripcion: modalBox.querySelector('.modal-descripcion')
}

export function renderizarModal(producto) {
    
   modalUI.img.src = producto.thumbnail;
   modalUI.titulo.textContent = producto.title;
   modalUI.descripcion.textContent = producto.description;

}

export function renderizarProducto(producto) {
    
    let divProducto = document.getElementById('producto');

    

}