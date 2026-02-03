let btnEssai = document.querySelector("#btn-essai");
console.log("Valeur de btnEssai : ", btnEssai);

if(btnEssai) {
    btnEssai.addEventListener("click", gererClic);
}

function gererClic(evt) {
    console.log("Événement clic : ", evt);
    // Modifier la courbure du bouton aléatoirement
    // Disons entre 10% et 50%
    // Math.random() donne un nombre dans l'interval [0, 1)
    let courbureAlea = Math.floor(Math.random()*41) + 10;
    console.log("Courbure aléatoire : ", courbureAlea);
    btnEssai.style.borderRadius = courbureAlea + "px";
    btnEssai.style.backgroundColor = "blue";
}

// btnEssai.addEventListener("click", function(){})
// btnEssai.addEventListener("click", ()=>{})