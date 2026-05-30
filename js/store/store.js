import { obtenerProductos } from "../api";
import { getProductos, setProductos } from "../helpers/helperLocalStorage";

let productosCache = [];

export async function obtenerProductosStore() {

    const productos = [];

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