const superposition = document.querySelector(".superposition-compte-rebours");
const disque = document.querySelector(".disque-compte-rebours");
const chiffre = document.querySelector(".chiffre-compte-rebours");

let decompte = 3;

disque.addEventListener("animationiteration", () => chiffre.textContent = --decompte);

disque.addEventListener("animationend", () => superposition.classList.add("cache"));