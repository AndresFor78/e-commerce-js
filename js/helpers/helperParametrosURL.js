export function obtenerValorParametro(nombreParametro) {

    const parametros = new URLSearchParams(window.location.search);

    if (!parametros) return;

    const valor = parametros.get(nombreParametro);

    return valor;
    
}