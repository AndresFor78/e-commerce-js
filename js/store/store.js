import { obtenerProductos } from "../api.js";
import { getProductos, setProductos } from "../helpers/helperLocalStorage.js";

let productosCache = null;

export async function obtenerProductosStore() {
    
    let productos = [];

    // Memoria
    if (productosCache) return productosCache;

    // LocalStorage
    productos = getProductos();
    if (productos) {
        productosCache = productos;
        return productos;        
    }

    // Fetch
    productos = await obtenerProductos();
    if (productos) {
        productosCache = productos;
        setProductos(productos);
        return productos;
    }
}