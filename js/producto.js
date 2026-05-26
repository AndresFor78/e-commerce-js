import { cargarNavbar } from "./layoutComponente.js";

window.addEventListener('load', init);

async function init() {

    const navbar = document.getElementById('navbarComponente');
    navbar.innerHTML = await cargarNavbar();
    
}