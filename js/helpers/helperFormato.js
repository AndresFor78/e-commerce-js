export function formatearPrecio(valor) {
    return `$${valor.toFixed(2)}`;
}

export function formatearDescuento(valor) {
    return `${valor.toFixed(2)}%`
}