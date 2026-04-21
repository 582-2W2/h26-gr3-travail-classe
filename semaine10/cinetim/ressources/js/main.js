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
        console.log("animationend est détecté");
        console.log("Objet évenement : ", evt);
        if (evt.animationName == "tourner-disque") {
            disque.classList.add("cache")
        }
        if (evt.animationName == "battement") {
            superposition.classList.add("cache")
        }
    });
}

/****************************/
// Gérer les films proposés
/****************************/
const listeFilms = [
    {
        titre: "2001: A Space Odyssey",
        synopsis: "Voyage visuel et philosophique aux confins de l'espace.",
        vignette: "2001-a-space-odyssey.jpg",
        alt: "Affiche du film 2001: A Space Odyssey"
    },
    {
        titre: "A Clockwork Orange",
        synopsis: "Un jeune délinquant subit un traitement expérimental controversé.",
        vignette: "a-clockwork-orange.jpg",
        alt: "Affiche du film A Clockwork Orange"
    },
    {
        titre: "Apocalypse Now",
        synopsis: "Une mission périlleuse au coeur de la guerre du Vietnam.",
        vignette: "apocalypse-now.avif",
        alt: "Affiche du film Apocalypse Now"
    },
    {
        titre: "Barry Lyndon",
        synopsis: "L'ascension et la chute d'un aventurier dans l'Europe du XVIIIe siecle.",
        vignette: "barry-lyndon.jpg",
        alt: "Affiche du film Barry Lyndon"
    },
    {
        titre: "Cache",
        synopsis: "Un couple recoit de troublantes cassettes anonymes.",
        vignette: "cache.jpg",
        alt: "Affiche du film Cache"
    },
    {
        titre: "Crazy",
        synopsis: "Chronique familiale et musicale du Quebec des annees 1960 a 1980.",
        vignette: "crazy.jpg",
        alt: "Affiche du film Crazy"
    },
    {
        titre: "Frankenstein",
        synopsis: "Un scientifique donne vie a une creature inoubliable.",
        vignette: "frankenstein.png",
        alt: "Affiche du film Frankenstein"
    },
    {
        titre: "Incendies",
        synopsis: "Deux jumeaux enquêtent sur le passe bouleversant de leur mere.",
        vignette: "incendies.jpg",
        alt: "Affiche du film Incendies"
    },
    {
        titre: "Inception",
        synopsis: "Des voleurs infiltrent les reves pour y implanter une idee.",
        vignette: "inception.avif",
        alt: "Affiche du film Inception"
    },
    {
        titre: "La Bataille d'Alger",
        synopsis: "Reconstitution marquante de la lutte pour l'independance algerienne.",
        vignette: "la-bataille-d-alger.jpg",
        alt: "Affiche du film La Bataille d'Alger"
    },
    {
        titre: "Les Invasions barbares",
        synopsis: "Retrouvailles, bilans et amities face a la fin de vie.",
        vignette: "les-invasions-barbares.jpg",
        alt: "Affiche du film Les Invasions barbares"
    },
    {
        titre: "Mon oncle Antoine",
        synopsis: "Portrait sensible d'une jeunesse en region rurale.",
        vignette: "mon-oncle-antoine.jpg",
        alt: "Affiche du film Mon oncle Antoine"
    },
    {
        titre: "No Country for Old Men",
        synopsis: "Une chasse a l'homme brutale dans l'Ouest texan.",
        vignette: "no-country-for-old-men.jpg",
        alt: "Affiche du film No Country for Old Men"
    },
    {
        titre: "Polytechnique",
        synopsis: "Recit sobre et poignant d'un drame marquant au Quebec.",
        vignette: "polytechnique.jpg",
        alt: "Affiche du film Polytechnique"
    }
];


// Attraper la section qui contiendra les films
const sectionListeFilms = document.querySelector("#page-films section.grille");

// Boucler à travers la liste des films pour générer l'affichage des
// films dynamiquement
if (sectionListeFilms) {
    for (const film of listeFilms) {
        // On créé les éléments nécessaires et on leur assigne propriétés et 
        // contenu texte
        const article = document.createElement("article");
        article.classList.add("tuile");
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = "ressources/images/films/" + film.vignette;
        img.alt = film.alt;
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = film.titre;
        const p = document.createElement("p");
        p.classList.add("description");
        p.textContent = film.synopsis;

        // Imbriquer les éléments les uns dans les autres comme dans le code 
        // HTML statique fourni
        figure.append(img);
        figure.append(figcaption);
        article.append(figure);
        article.append(p);

        console.log("Article du prochain film : ", article);
        // Imbriquer l'article complété dans la section de la liste des films
        sectionListeFilms.append(article);
    }
}