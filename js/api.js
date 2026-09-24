import { API_URL } from "./constants/endpoints.js";

export async function obtenerProductos() {

    const response = await fetch(`${API_URL}/products?limit=0`);

    if(!response.ok) throw new Error("Error al obtener productos");

    const productos = await response.json();
    return productos.products;    
    
}

export async function obtenerProductoPorId(idProducto) {
    
    const response = await fetch(`${API_URL}/products/${idProducto}`);

    if (!response.ok) throw new Error("Ocurrió un error al acceder a la información del producto");

    return await response.json();  
    
}