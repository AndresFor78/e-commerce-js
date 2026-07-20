export function inicializarEventosCarrito() {

    document.getElementById('carritoPrincipalContenido').addEventListener('click', manejarEventosCarrito);

}

function manejarEventosCarrito(e) {

    console.log(e.target);
    
    
}