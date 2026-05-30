export async function obtenerProductos() {

    const resul = await fetch('https://dummyjson.com/products?limit=30');

    if(!resul.ok) throw new Error("Error al obtener productos");

    const productos = await resul.json();
    return productos.products;    
    
}
