import { obtenerPrecioFinal } from "../producto/productoUtils.js";

export function renderizarProductos(productos) {

    const spanCantidadProductos = document.getElementById('cantidadProductosEncontrados');
    spanCantidadProductos.textContent = productos.length;
    
    let grilla = document.getElementById('grillaProductos');

    grilla.innerHTML = '';  
    let html = '';

    productos.forEach(producto => {

        const precioFinal = obtenerPrecioFinal(producto);
        const rating = "⭐".repeat(Math.round(producto.rating));

        console.log(precioFinal);
        

        html+= `<div class="card" data-id="${producto.id}">
                    <img class="abrir-detalle" src="${producto.thumbnail}" />
                    <div class="info-producto">
                        <span class="title abrir-detalle">${producto.title}</span>
                        <div class="info-precio">
                            <div>
                                <span class="precio-final">$ ${precioFinal.toFixed(2)}</span>
                                <span class="descuento-porcentaje">${producto.discountPercentage.toFixed(2)}%</span>
                            </div>
                            <span class="precio-original">$ ${producto.price.toFixed(2)}</span>
                        </div>
                        <span class="rating">${rating}</span>
                    </div>
                    <div class="card-botones">
                        <button class="btn-agregar-carrito">Agregar</button>                             
                    </div>
                </div>`
    })

    grilla.innerHTML = html;
    
}



