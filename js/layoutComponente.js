export async function cargarNavbar() {
    
    const resul = await fetch('./componentes/navbar.html');

    if (!resul.ok) throw new Error("Ocurrió un error al cargar componente navbar");

    const html = await resul.text();

    return html;
    
}

export async function cargarCarritoLateral() {
    
    const resul = await fetch('./componentes/carrito.html');
    if (!resul.ok) throw new Error("Ocurrió un error al cargar el carrito lateral");

    const html = await resul.text();

    return html;
    
}