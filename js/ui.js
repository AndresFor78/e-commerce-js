import { obtenerTotalProductosCarrito } from "./carrito.js";
import { obtenerTotalCarrito } from "./carritoUtils.js";
import { getCarrito, setCarrito } from "./helpers/helperLocalStorage.js";
import { crearItemCarritoUI } from "./mappers/carritoMapper.js";

export function renderizarProductos(productos) {

    const spanCantidadProductos = document.getElementById('cantidadProductosEncontrados');
    spanCantidadProductos.textContent = productos.length;
    
    let grilla = document.getElementById('grillaProductos');

    grilla.innerHTML = '';  
    let html = '';

    productos.forEach(p => {

        const rating = "⭐".repeat(Math.round(p.rating));

        html+= `<div class="card" data-id="${p.id}">
                    <img class="abrir-detalle" src="${p.thumbnail}" />
                    <div class="info-producto">
                        <p class="title abrir-detalle">${p.title}</p>
                        <p class="price">$ ${p.price}</p>
                        <p class="rating">${rating}</p>
                    </div>
                    <div class="card-botones">
                        <button class="btn-agregar-carrito">Agregar</button>                             
                    </div>
                </div>`
    })

    grilla.innerHTML = html;
    
}

export function renderizarProducto(producto) {

    const divProducto = document.getElementById('producto');

    const descuento = producto.discountPercentage/100;

    const precioNuevo = producto.price - (producto.price * descuento);

    // Si el producto ya se encuentra en el carrito
    const existe = getCarrito().find(c=> c.idProducto === producto.id);

    const reseñas = producto.reviews;

    let htmlReseñas = '';

    reseñas.forEach(reseña=> {

        const fecha = new Date(reseña.date);

        htmlReseñas += `<div class="item-reseña">
                            <div class="reseña-encabezado">
                                <span class="reseña-rating">${'⭐'.repeat(Math.round(reseña.rating))}</span>
                                <span class="reseña-fecha">${fecha.toLocaleDateString('es-CL')}</span>
                            </div>
                            <span class="reseña-nombre">${reseña.reviewerName}</span>                            
                            <span class="reseña-comentario">${reseña.comment}</span>
                        </div>                         
                        `
    })    

    let html = '';

    html += `<div class="producto" data-idproducto="${producto.id}">
                <div class="producto-imagen">
                    <img src="${producto.thumbnail}">
                </div> 
                <div class="producto-info">
                    <div class="info-titulo">
                        <span class="categoria">${producto.category}</span>
                        <h1 class="titulo">${producto.title}</h1>
                        ${producto.brand ? 
                            `<span class="brand">${producto.brand}</span>`
                            :''                            
                        }
                    </div>
                    <div class="info-rating">
                        <span class="rating">${"⭐".repeat(Math.round(producto.rating))}</span>
                        ${producto.reviews.length > 0?
                            `<span class="cantidad-reseñas">${reseñas.length} reseñas</span>`
                            : ''
                        }

                    </div>
                    <div class="info-precio">
                        <span class="precioNuevo">$${precioNuevo.toFixed(2)}</span> 
                        <span class="precioOriginal">$${producto.price}</span>
                        <span class="precioDescuento">${producto.discountPercentage}%</span>
                                               
                    </div>
                    <div class="info-descripcion">
                        <span class="descripcion">${producto.description}</span>
                    </div>                    
                    <div class="acciones">
                        <div class="acciones-botones">
                            <div class="botones">
                                <button class="btn-incrementar">+</button>
                                <span class="producto-cantidad">1</span>
                                <button class="btn-decrementar">-</button>
                            </div>
                            <span class="producto-info-carrito">
                                <span id="productoCarritoCantidad" class="producto-info-carrito-cantidad">
                                    ${existe? existe.cantidad + ' unidades en el carrito' : ''}
                                </span>                            
                            </span>   
                            <div class="agregar-carro">
                                <button class="btn-agregar-carrito">Agregar al Carro</button>
                            </div>                              
                        </div>
                        <span class="producto-stock">${producto.stock} en stock</span>                                                    
                    </div> 
                    <div class="info-reseñas">
                        ${htmlReseñas}
                    </div>
                </div>
    
    
             </div>`

    divProducto.innerHTML = html;
    
}

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

    const carritoContenido = document.getElementById('carritoPrincipalContenido');

    carritoContenido.innerHTML = renderizarCarrito(carrito, productos, crearHtmlCarritoPrincipal);
    

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
                                <p>Tu carrito está vacío</p>
                              </div>`    
}



function renderizarCarrito(carrito, productos, crearHtml) {

    let html = '';

    carrito.forEach(productoCarrito => {

        const producto = productos.find(p=> p.id === productoCarrito.idProducto);

        if (!producto) return;

        const itemCarritoUI = crearItemCarritoUI(producto, productoCarrito);

        html += crearHtml(itemCarritoUI);        

    });

    return html;
    
}

function crearHtmlCarritoLateral(itemCarritoUI) {

    return `<div class="carrito-item" data-id="${itemCarritoUI.idProducto}">                    
                <img class="abrir-detalle" src="${itemCarritoUI.imagen}">
                <div class="carrito-contenido">
                    <div class="carrito-contenido-header">
                        <p class="producto-nombre abrir-detalle">${itemCarritoUI.titulo}</p>
                        <p class="producto-total">$${itemCarritoUI.totalPorProducto.toFixed(2)}</p>                            
                    </div> 
                    <div class="carrito-contenido-cuerpo">
                        <p class="producto-precio">$ ${itemCarritoUI.precio}</p> 
                        <div class="carrito-acciones-cantidad">
                            <button class="btn-mas">+</button>
                            <p class="producto-cantidad">${itemCarritoUI.cantidad}</p>
                            <button class="btn-menos">-</button>
                            <span class="carrito-eliminar-producto"><i class="fa-solid fa-trash-can"></i></span>
                        </div>                             
                    </div>                   
                </div>
            </div>
            <hr>`;
    
}

function crearHtmlCarritoPrincipal(itemCarritoUI) {
    
    return `<div class="carrito-principal-item" data-idproducto="${itemCarritoUI.idProducto}">
                <img src="${itemCarritoUI.imagen}"> 
                <div class="carrito-principal-contenido">
                    <div class="carrito-principal-info">
                        <span class="carrito-principal-titulo">${itemCarritoUI.titulo}</span>
                    </div>
                    <div class="carrito-principal-precio">
                        <span class="carrito-principal-precio-final">$${itemCarritoUI.precioFinal.toFixed(2)}</span>
                    </div>
                
                </div>

            </div>
    
            `
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

