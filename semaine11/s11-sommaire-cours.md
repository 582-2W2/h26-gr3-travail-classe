# Semaine 11 - Gabarits HTML, DOM et JavaScript

## 🎯 Objectifs de la semaine
- Comprendre le rôle de l'élément HTML `template` dans la génération de contenu dynamique
- Réutiliser une structure HTML sans dupliquer du balisage dans le JavaScript
- Manipuler le contenu d'un gabarit avec les méthodes `cloneNode()` et `importNode()`
- Respecter la séparation des responsabilités entre le HTML, le CSS et le JavaScript
- Organiser le code de rendu dynamique en fonctions simples, lisibles et réutilisables

---

## 1. Pourquoi utiliser un gabarit HTML ?

Quand plusieurs éléments de la page partagent la même structure, il devient inefficace de reconstruire tout le HTML avec des chaînes de caractères ou une longue suite de `createElement()`.

L'élément `template` permet de conserver dans la page un morceau de HTML prêt à être réutilisé, sans l'afficher immédiatement.

### Avantages
- Le balisage reste dans le HTML, à l'endroit où il est facile à lire et à modifier
- JavaScript se concentre sur la logique de génération et l'injection des données
- La structure visuelle est plus facile à maintenir
- On évite de mélanger contenu, présentation et logique dans un même bloc

### Exemple de base
```html
<template id="gabarit-carte">
	<article class="carte">
		<h2 class="carte__titre"></h2>
		<p class="carte__description"></p>
	</article>
</template>
```

---

## 2. Comment fonctionne `template` ?

Le contenu placé dans un élément `template` n'est pas rendu directement dans la page. Il reste disponible en mémoire dans la propriété `content`.

```js
const gabarit = document.querySelector('#gabarit-carte');
console.log(gabarit.content);
```

### À retenir
- `template.content` retourne un fragment de document
- Le contenu du gabarit peut être cloné autant de fois que nécessaire
- Tant qu'on n'insère pas le clone dans le DOM, rien n'apparaît à l'écran

---

## 3. Générer un élément avec `cloneNode()`

La méthode `cloneNode(true)` crée une copie complète du nœud ciblé, avec tous ses descendants.

```js
const fragment = gabarit.content.cloneNode(true);
const titre = fragment.querySelector('.carte__titre');
const description = fragment.querySelector('.carte__description');

titre.textContent = 'Thé glacé maison';
description.textContent = 'Boisson fraîche servie avec citron et menthe.';
```

### Pourquoi utiliser `true` ?
- `cloneNode(false)` copie seulement le nœud parent
- `cloneNode(true)` copie aussi tout le contenu interne

Dans le cas d'un gabarit HTML, on veut presque toujours une copie complète de la structure.

---

## 4. Le rôle de `importNode()`

`importNode()` sert à importer un nœud provenant d'un autre document avant de l'utiliser dans le document courant.

```js
const copie = document.importNode(gabarit.content, true);
```

### Différence pratique
- `cloneNode(true)` : copie un nœud déjà associé au document courant
- `importNode(noeud, true)` : importe une copie provenant d'une autre source documentaire

### En contexte de cours
Pour des exemples simples dans une seule page, `cloneNode(true)` est généralement suffisant. Il reste toutefois utile de connaître `importNode()` pour comprendre la logique complète du DOM.

---

## 5. Séparation des responsabilités

L'utilisation des gabarits HTML encourage une meilleure organisation du code.

### Répartition recommandée
- HTML : structure des cartes, des listes et du gabarit
- CSS : apparence visuelle, mise en page, couleurs, états visuels
- JavaScript : données, génération des clones, injection dans la page, interactions

### Exemple d'organisation
```js
function creerCarte(produit) {
	const fragment = gabarit.content.cloneNode(true);
	fragment.querySelector('.carte__titre').textContent = produit.nom;
	fragment.querySelector('.carte__description').textContent = produit.description;
	return fragment;
}

function afficherProduits(produits) {
	conteneur.innerHTML = '';

	for (const produit of produits) {
		conteneur.append(creerCarte(produit));
	}
}
```

Ici, une fonction construit une carte, et une autre gère le rendu global. Cette séparation rend le code plus facile à tester et à faire évoluer.

---

## 6. Stratégie recommandée de rendu dynamique

1. Écrire la structure répétitive dans un élément `template`.
2. Sélectionner le gabarit et le conteneur cible en JavaScript.
3. Cloner le contenu du gabarit.
4. Injecter les données dans les bons éléments du clone.
5. Ajouter le clone dans le DOM.
6. Répéter l'opération dans une fonction dédiée au rendu.

---

## 7. Exemple complet minimal

```html
<section class="recettes"></section>

<template id="gabarit-recette">
	<article class="recette">
		<h2 class="recette__titre"></h2>
		<p class="recette__temps"></p>
	</article>
</template>
```

```js
const recettes = [
	{ nom: 'Tartine tomate-basilic', temps: '8 min' },
	{ nom: 'Yogourt aux fruits', temps: '3 min' }
];

const conteneur = document.querySelector('.recettes');
const gabarit = document.querySelector('#gabarit-recette');

function creerRecette(recette) {
	const fragment = gabarit.content.cloneNode(true);
	fragment.querySelector('.recette__titre').textContent = recette.nom;
	fragment.querySelector('.recette__temps').textContent = `Temps : ${recette.temps}`;
	return fragment;
}

for (const recette of recettes) {
	conteneur.append(creerRecette(recette));
}
```

---

## 8. Erreurs fréquentes à éviter

- Oublier d'utiliser `template.content` et tenter d'insérer directement l'élément `template`
- Modifier le gabarit original au lieu de travailler sur une copie clonée
- Utiliser `innerHTML` pour tout reconstruire alors qu'un gabarit existe déjà
- Mélanger la structure HTML directement dans des chaînes JavaScript difficiles à maintenir
- Mettre toute la logique de rendu dans un seul écouteur d'événement
- Remplir le clone après son insertion sans contrôler clairement la séquence

---

## 9. Bonnes pratiques

- Donner des classes explicites aux éléments à remplir dans le gabarit
- Créer une fonction pour fabriquer un élément à partir des données
- Créer une autre fonction pour afficher une collection complète
- Vider le conteneur avant un nouveau rendu si l'affichage doit être reconstruit
- Garder les données dans des objets simples et lisibles
- Réserver `textContent` au contenu textuel pour éviter d'injecter du HTML inutilement

---

## Checklist de la semaine
- [ ] Identifier les situations où un gabarit HTML est préférable à une création manuelle répétitive
- [ ] Accéder au contenu d'un `template` avec `content`
- [ ] Cloner correctement un gabarit avec `cloneNode(true)`
- [ ] Comprendre le rôle général de `importNode()`
- [ ] Remplir un clone avec des données dynamiques
- [ ] Insérer plusieurs clones dans un conteneur cible
- [ ] Organiser le rendu dynamique en fonctions distinctes
- [ ] Respecter la séparation des responsabilités entre HTML, CSS et JavaScript

---

## Table de synthèse

| Besoin | Outil DOM | Résultat |
|--------|-----------|----------|
| Définir une structure réutilisable | `<template>` | Gabarit non affiché, prêt à être cloné |
| Accéder au contenu du gabarit | `template.content` | Fragment de document exploitable |
| Copier la structure du gabarit | `cloneNode(true)` | Copie complète du contenu |
| Importer un nœud d'un autre document | `document.importNode(noeud, true)` | Copie importée dans le document courant |
| Remplir les champs d'un clone | `querySelector()` + `textContent` | Contenu dynamique injecté |
| Ajouter le résultat dans la page | `append()` | Nouveau contenu visible dans le DOM |

---

**À retenir** : un gabarit HTML permet de garder la structure dans le HTML et la logique dans le JavaScript. Cette approche rend la génération de contenu dynamique plus claire, plus robuste et plus facile à maintenir.