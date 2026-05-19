export function obtenerProductos() {
    
    return fetch('https://dummyjson.com/products?limit=30')
    .then(res => {
        if (!res.ok) {
            throw new Error("Ocurrió un error al obtener los datos");              
        }
        return res.json();
    })
    .then(data =>{
        return data.products;
    })
}

export function obtenerProductoPorId(idProducto) {
    
    return fetch(`https://dummyjson.com/products/${idProducto}`)
    .then(resul => {
        if (!resul.ok) {
            throw new Error("Ocurrió un error al acceder al producto");                    
        }
        return resul.json();
    })
    .then(data=> data)
}