/***************/
// Animation de la page Accueil
/***************/
const superposition = document.querySelector(".superposition-compte-rebours");
const disque = document.querySelector(".disque-compte-rebours");
const chiffre = document.querySelector(".chiffre-compte-rebours");
if (disque && superposition && chiffre) {
    let decompte = 3;

    disque.addEventListener("animationiteration",
        () => chiffre.textContent = decompte > 1 ? --decompte : null);

    superposition.addEventListener("animationend", (evt) => {
        disque.classList.add("cache");
        superposition.classList.add("cache");
    });
}

/****************************/
// Gérer les films proposés
/****************************/
// Attraper la section qui contiendra les films
const sectionListeFilms = document.querySelector("#page-films section.grille");

// Boucler à travers la liste des films pour injecter une copie du 
// gabarit "gabarit-film" dans la section "sectionListeFilms"
if (sectionListeFilms) {
    const gabaritFilm = document.querySelector("#gabarit-film");

    for (const film of listeFilms) {
        // Cloner le gabarit
        const articleFilm = gabaritFilm.cloneNode(true).content;

        // Changer les attributs de l'image et les textes du titre et de la 
        // description
        articleFilm.querySelector("figcaption").textContent = film.titre;
        articleFilm.querySelector("p.description").textContent = film.synopsis;
        articleFilm.querySelector("img").alt = film.alt;
        articleFilm.querySelector("img").src = "ressources/images/films/" + film.vignette;

        // Injecter cet article dans la section des films
        sectionListeFilms.append(articleFilm);
    }

    // Ajout d'un film
    const btnAjouter = document.querySelector(".btn-ajouter");
    const frmAjouterFilm = document.querySelector("#frm-ajouter-film");

    btnAjouter.addEventListener("click", ()=>{
        console.log("Valeur du champ titre : ", frmAjouterFilm.titre.value);
        // Ajouter dans le tableau listeFilms un objet JS qui contient
        // les propriétés attendues
        const objetFilm = {
            titre: frmAjouterFilm.titre.value,
            synopsis: frmAjouterFilm.synopsis.value,
            vignette: frmAjouterFilm.vignette.value,
            alt: "Affiche du film " + frmAjouterFilm.titre.value
        }

        console.log("Objet film correspondant aux valeurs dans le formulaire : ", objetFilm);

        // Ajouter le film proposé dans le tableau des films
        listeFilms.push(objetFilm); // Ajouter à la fin
        console.log("Tableau listeFilms : ", listeFilms);
        
        
    });
}