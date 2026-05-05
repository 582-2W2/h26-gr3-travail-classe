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

    function afficherListeFilms() {
        // Vider la section avant d'ajouter les films
        sectionListeFilms.innerHTML = "";
        for (const film of listeFilms) {
            // Cloner le gabarit
            const articleFilm = gabaritFilm.cloneNode(true).content;

            // On associe le clic du bouton "Supprimer"
            const btnSupprimer = articleFilm.querySelector(".btn-supprimer");
            btnSupprimer.addEventListener("click", 
                evt => {
                    // A) Retirer l'article correspondant à ce bouton du DOM
                    evt.target.closest(".tuile").remove();
                    
                    // B) Retirer l'objet correspondant à ce film du tableau JS des films (listeFilms)
                    listeFilms.splice(listeFilms.indexOf(film), 1);

                    // Alternativement, si on fait B), on pourrait réafficher tous les films en appelant 
                    // la fonction d'affichage de nouveau au lieu de faire l'étape A) (retirer manuellement l'article du DOM)
                    // afficherListeFilms();                    
                }
            );

            // Changer les attributs de l'image et les textes du titre et de la 
            // description
            const imageFilm = articleFilm.querySelector("img");

            articleFilm.querySelector("figcaption").textContent = film.titre;
            articleFilm.querySelector("p.description").textContent = film.synopsis;
            imageFilm.alt = film.alt;
            imageFilm.src = "ressources/images/films/" + film.vignette;
            // Gérer les erreurs liées aux images de films introuvables
            imageFilm.addEventListener("error", () => {
                imageFilm.src = "ressources/images/films/affiche-defaut.png";
            });


            // Injecter cet article dans la section des films
            sectionListeFilms.prepend(articleFilm);
        }
    }

    // Appel initial de la fonction d'affichage
    afficherListeFilms();

    // Afficher le formulaire pour proposer un film
    const btnProposer = document.querySelector(".btn-proposer");
    const frmAjouterFilm = document.querySelector("#form-ajouter-film");

    btnProposer.addEventListener("click", () => {
        frmAjouterFilm.classList.remove("cache");
        // On met le focus sur le 1er élément du formulaire
        frmAjouterFilm.querySelector("input, textarea").focus();
    });

    // Ajout d'un film
    frmAjouterFilm.addEventListener("submit", (evt) => {
        // Empêche le formulaire soumis de faire une requête HTTP à l'URL 
        // spécifiée dans l'attribut action (ou la page elle-même si 
        // cet attribut n'est pas utilisé)
        evt.preventDefault();

        // On cherche toutes les valeurs saisies par l'utilisateur
        const titre = document.querySelector("#film-titre").value.trim();
        const synopsis = document.querySelector("#film-synopsis").value.trim();
        let vignette = document.querySelector("#film-vignette").value.trim();

        // Valider que ces valeurs ne sont pas vides
        if (!titre || !synopsis) {
            alert("Le titre et le synopsis sont obligatoires");
            // Une fonction est interrompue dès qu'une instruction return est exécutée
            return
        }

        // Naif et insuffisant
        // if(!vignette) {
        //     vignette = "affiche-defaut.png";
        // }

        // Créer un objet film ... 
        const nouveauFilm = {
            titre: titre,
            synopsis: synopsis,
            vignette: vignette,
            alt: `Affiche du film ${titre}`
        }
        // ... et l'ajouter au tableau
        listeFilms.push(nouveauFilm);
        console.log("Liste film a un nouveau film : ", listeFilms);


        // Afficher les films de nouveau (puisque le tableau des films a changé)
        afficherListeFilms();

        // Réinitialiser les champs de formulaire
        frmAjouterFilm.reset();
        // On cache le formulaire
        frmAjouterFilm.classList.add("cache");
    });



}