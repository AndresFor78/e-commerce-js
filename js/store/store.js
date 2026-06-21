import { obtenerProductos } from "../api.js";

let productosCache = null;

export async function obtenerProductosStore() {
    
    let productos = [];

    // Memoria
    if (productosCache) return productosCache;    

    // Fetch
    productos = await obtenerProductos();
    if (productos) {
        productosCache = productos;       
        return productos;
    }
}