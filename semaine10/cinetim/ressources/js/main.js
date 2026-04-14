const superposition = document.querySelector(".superposition-compte-rebours");
const disque = document.querySelector(".disque-compte-rebours");
const chiffre = document.querySelector(".chiffre-compte-rebours");

let decompte = 3;

disque.addEventListener("animationiteration", 
    () => chiffre.textContent = decompte>1 ? --decompte : null);

superposition.addEventListener("animationend", (evt) => {
    console.log("animationend est détecté");
    console.log("Objet évenement : ", evt);
    if(evt.animationName == "tourner-disque") {
        disque.classList.add("cache")
    }
    if(evt.animationName == "battement") {
        superposition.classList.add("cache")
    }
});

