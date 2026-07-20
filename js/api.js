export async function obtenerProductos() {

    const resul = await fetch('https://dummyjson.com/products?limit=0');

    if(!resul.ok) throw new Error("Error al obtener productos");

    const productos = await resul.json();
    return productos.products;    
    
}

export async function obtenerProductoPorId(idProducto) {
    
    const resul = await fetch(`https://dummyjson.com/products/${idProducto}`);

    if (!resul.ok) throw new Error("Ocurrió un error al acceder a la información del producto");

    return await resul.json();  
    
}