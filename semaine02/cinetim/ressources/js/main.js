let btnEssai = document.querySelector("#btn-essai");

if(btnEssai) {
    btnEssai.addEventListener("click", gererClic);
}

function gererClic(evt) {
    let courbureAlea = Math.floor(Math.random()*41) + 10;
    btnEssai.style.borderRadius = courbureAlea + "px";
}