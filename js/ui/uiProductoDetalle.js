import { formatearDescuento, formatearPrecio } from "../helpers/helperFormato.js";
import { getCarrito } from "../helpers/helperLocalStorage.js";
import { obtenerPrecioFinal } from "../producto/productoUtils.js";

export function renderizarProducto(producto) {

    const divProducto = document.getElementById('producto');   

    const precioNuevo = obtenerPrecioFinal(producto);
    
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
                        <span class="precio-final">${formatearPrecio(precioNuevo)}</span> 
                        <span class="precio-original">${formatearPrecio(producto.price)}</span>
                        <span class="descuento-porcentaje">${formatearDescuento(producto.discountPercentage)}</span>
                                               
                    </div>
                    <div class="info-descripcion">
                        <span class="descripcion">${producto.description}</span>
                    </div>                    
                    <div class="acciones">
                        <div class="acciones-botones">
                            <div class="carrito-acciones">
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
