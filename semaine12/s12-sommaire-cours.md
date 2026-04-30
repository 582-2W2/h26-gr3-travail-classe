# Semaine 12 - Structures de données JavaScript et transitions de vue

## 🎯 Objectifs de la semaine
- Structurer des données en JavaScript avec des tableaux et des objets.
- Parcourir, transformer et afficher des données de manière dynamique dans le DOM.
- Comprendre le principe de l'API `view-transition` pour animer des changements d'interface.
- Mettre en place des transitions simples en CSS, puis des transitions pilotées en JavaScript.
- Produire une interface plus fluide sans complexifier inutilement le code.

---

## 1. Structures de données : pourquoi aller au-delà des variables simples ?

Dans une interface réelle, on manipule rarement une seule valeur isolée. On travaille plutôt avec :
- des collections d'éléments (produits, films, recettes, cartes, etc.) ;
- des éléments qui possèdent plusieurs propriétés (titre, description, image, catégorie, statut, etc.).

Les tableaux et les objets permettent d'organiser ces données de façon lisible, maintenable et réutilisable.

---

## 2. Les tableaux (`Array`) : gérer des collections

Un tableau regroupe plusieurs valeurs dans un ordre défini.

```js
const films = ['Dune', 'Arrival', 'Blade Runner 2049'];
```

### Opérations fréquentes
- Ajouter : `push()`
- Retirer le dernier : `pop()`
- Parcourir : `for...of`, `forEach()`
- Transformer : `map()`
- Filtrer : `filter()`
- Chercher : `find()`

### Exemple de parcours
```js
for (const film of films) {
	console.log(film);
}
```

### Point clé
Un tableau est idéal quand l'ordre des éléments compte et qu'on applique une logique répétée sur chaque entrée.

---

## 3. Les objets (`Object`) : décrire une entité

Un objet regroupe des paires clé-valeur pour représenter une entité.

```js
const film = {
	titre: 'Dune',
	realisateur: 'Denis Villeneuve',
	duree: 155,
	vu: true
};
```

### Accès aux propriétés
```js
console.log(film.titre);
console.log(film['duree']);
```

### Modification
```js
film.vu = false;
film.note = 9;
```

### Point clé
Un objet est pertinent quand chaque élément possède plusieurs attributs nommés.

---

## 4. Combiner tableaux et objets

Le cas le plus courant en développement web : un tableau d'objets.

```js
const catalogue = [
	{ id: 1, nom: 'Affiche', prix: 12.99, categorie: 'deco' },
	{ id: 2, nom: 'Tasse', prix: 9.5, categorie: 'maison' },
	{ id: 3, nom: 'Carnet', prix: 6.0, categorie: 'bureau' }
];
```

Ce format permet de :
- filtrer selon une propriété (`categorie`) ;
- trier selon un critère (`prix`) ;
- générer dynamiquement des éléments HTML à partir des données.

---

## 5. Rendre des données dans le DOM

Une approche claire consiste à séparer :
- la création d'un élément (une carte, une ligne, etc.) ;
- l'affichage de la collection complète.

```js
function creerCarte(produit) {
	const carte = document.createElement('article');
	carte.className = 'carte-produit';
	carte.innerHTML = `
		<h3>${produit.nom}</h3>
		<p>Prix : ${produit.prix.toFixed(2)} $</p>
	`;
	return carte;
}

function afficherCatalogue(donnees) {
	const conteneur = document.querySelector('.catalogue');
	conteneur.innerHTML = '';

	for (const produit of donnees) {
		conteneur.append(creerCarte(produit));
	}
}
```

---

## 6. Introduction à l'API `view-transition`

L'API `view-transition` permet d'animer un changement visuel entre deux états d'une même page (ou d'une portion de page), de manière plus fluide qu'une transition CSS classique appliquée isolément à un seul élément.

Principe général :
1. Le navigateur capture l'état visuel avant la mise à jour.
2. Le code applique la mise à jour du DOM.
3. Le navigateur anime la transition entre l'ancien et le nouvel état.

---

## 7. Première étape : transitions globales en CSS

On peut commencer avec un effet global simple.

```css
::view-transition-old(root),
::view-transition-new(root) {
	animation-duration: 300ms;
	animation-timing-function: ease;
}

::view-transition-old(root) {
	animation-name: fondu-sortie;
}

::view-transition-new(root) {
	animation-name: fondu-entree;
}

@keyframes fondu-sortie {
	from { opacity: 1; }
	to { opacity: 0; }
}

@keyframes fondu-entree {
	from { opacity: 0; }
	to { opacity: 1; }
}
```

Cette approche ne demande pas de cibler des éléments précis : on anime la transition de la vue globale.

---

## 8. Déclencher une transition avec JavaScript

Pour animer une mise à jour dynamique, on encapsule le changement du DOM dans `document.startViewTransition()`.

```js
function changerCategorie(categorie) {
	if (!document.startViewTransition) {
		appliquerFiltre(categorie);
		return;
	}

	document.startViewTransition(() => {
		appliquerFiltre(categorie);
	});
}
```

### Pourquoi ce test ?
- L'API n'est pas disponible dans tous les navigateurs.
- Le test permet un comportement de secours propre : l'interface reste fonctionnelle, même sans animation.

---

## 9. Transition ciblée d'un élément (option avancée)

On peut associer un nom de transition à un élément avec `view-transition-name` pour créer des animations plus fines (ex. : carte sélectionnée, image mise en vedette).

```css
.carte-active {
	view-transition-name: carte-active;
}
```

Cette stratégie est utile pour donner une continuité visuelle lors d'un changement d'état précis.

---

## 10. Erreurs fréquentes à éviter

- Utiliser des structures de données trop plates, puis multiplier les variables séparées.
- Mélanger logique de données, rendu HTML et gestion d'événements dans une seule fonction.
- Oublier de vider le conteneur avant un nouveau rendu complet.
- Déclencher une transition sans prévoir de solution de secours si l'API n'est pas prise en charge.
- Créer des animations trop longues qui nuisent à la lisibilité de l'interface.

---

## 11. Bonnes pratiques

- Nommer clairement les propriétés des objets (`nom`, `prix`, `categorie`, etc.).
- Favoriser des fonctions courtes : une fonction pour construire, une fonction pour afficher.
- Garder les animations brèves et cohérentes avec l'intention UI.
- Tester le comportement avec et sans `startViewTransition`.
- Prioriser la clarté du code avant l'effet visuel.

---

## Checklist de la semaine
- [ ] Créer et manipuler un tableau en JavaScript.
- [ ] Créer et manipuler un objet avec plusieurs propriétés.
- [ ] Utiliser un tableau d'objets pour représenter des données d'interface.
- [ ] Générer du contenu HTML dynamique à partir de ces données.
- [ ] Déclencher une transition de vue avec `document.startViewTransition()`.
- [ ] Ajouter un style de transition en CSS avec les pseudo-éléments dédiés.
- [ ] Prévoir un comportement de secours si l'API n'est pas disponible.

---

## Table de synthèse

| Besoin | Outil | Résultat |
|--------|-------|----------|
| Représenter une collection | `Array` | Données ordonnées et parcourables |
| Représenter une entité | `Object` | Données structurées par propriétés |
| Générer l'UI à partir des données | Boucle + fonctions de rendu DOM | Contenu dynamique maintenable |
| Lancer une transition lors d'un changement de DOM | `document.startViewTransition()` | Changement visuel fluide |
| Personnaliser l'animation | `::view-transition-*` en CSS | Contrôle du style et du timing |
| Gérer la compatibilité | Test de disponibilité de l'API | Expérience robuste sur tous les navigateurs |

---

**À retenir** : les tableaux et les objets structurent vos données ; l'API `view-transition` structure la fluidité visuelle entre deux états de l'interface. Ensemble, ces outils permettent de créer des interfaces dynamiques, lisibles et agréables à utiliser.
