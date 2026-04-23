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
// Attraper la section qui contiendra les films
const sectionListeFilms = document.querySelector("#page-films section.grille");

// /////////////////////////////////////////////////////////////
// MÉTHODE 1 : en créant les éléments HTML dynamiquement avec JS
// /////////////////////////////////////////////////////////////

// Boucler à travers la liste des films pour générer l'affichage des
// films dynamiquement
// if (sectionListeFilms) {
//     for (const film of listeFilms) {
//         // On créé les éléments nécessaires et on leur assigne propriétés et 
//         // contenu texte
//         const article = document.createElement("article");
//         article.classList.add("tuile");
//         const figure = document.createElement("figure");
//         const img = document.createElement("img");
//         img.src = "ressources/images/films/" + film.vignette;
//         img.alt = film.alt;
//         const figcaption = document.createElement("figcaption");
//         figcaption.textContent = film.titre;
//         const p = document.createElement("p");
//         p.classList.add("description");
//         p.textContent = film.synopsis;

//         // Imbriquer les éléments les uns dans les autres comme dans le code 
//         // HTML statique fourni
//         figure.append(img);
//         figure.append(figcaption);
//         article.append(figure);
//         article.append(p);

//         console.log("Article du prochain film : ", article);
//         // Imbriquer l'article complété dans la section de la liste des films
//         sectionListeFilms.append(article);
//     }
// }

// //////////////////////////////////////////////////////////////
// MÉTHODE 2 : en clonant un gabarit HTML et injectant le contenu
// //////////////////////////////////////////////////////////////

// Boucler à travers la liste des films pour injecter une copie du 
// gabarit "gabarit-film" dans la section "sectionListeFilms"

// Saisir le gabarit-film
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