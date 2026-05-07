# Semaine 13 - Filtrage, méthodes utiles, JSON et localStorage

## 🎯 Objectifs de la semaine
- Filtrer une liste de données à partir d'un mot-clé avec `filter()`.
- Normaliser des chaînes avant comparaison avec `trim()` et `toLowerCase()`.
- Exploiter `includes()` pour valider une présence dans une chaîne ou un tableau.
- Transformer un tableau en texte avec `join()` pour l'affichage.
- Comprendre le format JSON et utiliser `JSON.parse()` et `JSON.stringify()`.
- Sauvegarder et relire un état d'interface avec `localStorage`.

---

## 1. Ce qui est nouveau cette semaine

Cette semaine met l'accent sur la recherche/filtrage, la préparation des données texte et la persistance locale.

Matière additionnelle par rapport à la semaine 12 :
- filtrer une collection avec `filter()` ;
- méthodes ciblées de chaînes et tableaux (`trim`, `toLowerCase`, `includes`, `join`) ;
- format JSON et API `JSON` ;
- API `localStorage`.

---

## 2. Filtrer un tableau avec `filter()`

`filter()` parcourt un tableau et retourne un nouveau tableau contenant seulement les éléments qui respectent une condition.

```js
const films = ['Dune', 'Interstellar', 'Arrival', 'Top Gun'];
const resultat = films.filter((film) => film.includes('ar'));

console.log(resultat); // ['Interstellar', 'Arrival']
```

### Point clé
- Le tableau original n'est pas modifié.
- Le résultat peut être vide (`[]`) si rien ne correspond.

---

## 3. Filtrage par mot-clé saisi par l'utilisateur

Un filtrage fiable demande souvent une normalisation des deux côtés (saisie + donnée).

```js
function normaliser(texte) {
	return texte.trim().toLowerCase();
}

function filtrerFilms(liste, motCleSaisi) {
	const motCle = normaliser(motCleSaisi);

	if (motCle === '') {
		return liste;
	}

	return liste.filter((film) => normaliser(film).includes(motCle));
}
```

### Pourquoi normaliser ?
- `trim()` retire les espaces en trop au début/à la fin.
- `toLowerCase()` évite les problèmes de casse (`Dune` vs `dune`).

---

## 4. Méthodes utiles à retenir

### `includes()`
Vérifie la présence d'une valeur.

```js
console.log('bonjour'.includes('jour')); // true
console.log(['pomme', 'poire'].includes('poire')); // true
```

### `join()`
Assemble un tableau en une chaîne.

```js
const ingredients = ['farine', 'oeufs', 'lait'];
console.log(ingredients.join(', ')); // farine, oeufs, lait
```

### `trim()` et `toLowerCase()`
Nettoient et uniformisent une saisie.

```js
const saisie = '   Salut TIM   ';
const propre = saisie.trim().toLowerCase();

console.log(propre); // salut tim
```

---

## 5. JSON : format de données et API JavaScript

JSON (JavaScript Object Notation) est un format texte pour représenter des données structurées.

Exemple JSON valide :

```json
{
	"titre": "Dune",
	"annee": 2021,
	"genres": ["science-fiction", "drame"]
}
```

### `JSON.parse()`
Convertit une chaîne JSON en donnée JavaScript.

```js
const texte = '{"nom":"Lea","note":92}';
const objet = JSON.parse(texte);

console.log(objet.nom); // Lea
```

### `JSON.stringify()`
Convertit une donnée JavaScript en chaîne JSON.

```js
const etudiant = { nom: 'Lea', note: 92 };
const texteJson = JSON.stringify(etudiant);

console.log(texteJson); // {"nom":"Lea","note":92}
```

### Cas d'usage courant
- stocker des objets/tableaux dans `localStorage` ;
- transporter des données via API ;
- charger des données externes (optionnel).

---

## 6. API `localStorage`

`localStorage` permet de sauvegarder des données simples dans le navigateur.

### Opérations de base

```js
localStorage.setItem('theme', 'clair');
const theme = localStorage.getItem('theme');
localStorage.removeItem('theme');
```

### Important
- Les valeurs sont stockées en texte.
- Pour stocker des objets/tableaux, on combine avec JSON.

```js
const favoris = ['Dune', 'Arrival'];
localStorage.setItem('favoris', JSON.stringify(favoris));

const favorisRelus = JSON.parse(localStorage.getItem('favoris') || '[]');
console.log(favorisRelus);
```

---

## 7. Mini-flux complet typique

1. L'utilisateur saisit un mot-clé.
2. Le code normalise la saisie (`trim` + `toLowerCase`).
3. Le code filtre les données avec `filter` + `includes`.
4. L'interface affiche la liste filtrée.
5. Optionnel : on sauvegarde le mot-clé ou les préférences dans `localStorage`.

Ce flux est la base de nombreuses interfaces (catalogues, listes de films, menus, FAQ, etc.).

---

## 8. Erreurs fréquentes à éviter

- Comparer la saisie brute sans normalisation.
- Oublier que `localStorage` retourne `null` si la clé n'existe pas.
- Appeler `JSON.parse()` sur une chaîne invalide sans gestion d'erreur.
- Penser que `filter()` modifie le tableau original.
- Mélanger rendu DOM et logique de transformation dans un bloc difficile à lire.

---

## 9. Bonnes pratiques

- Créer une petite fonction utilitaire de normalisation.
- Garder le filtrage dans une fonction pure (entrée -> sortie).
- Nommer clairement les clés de `localStorage`.
- Utiliser une valeur de secours (`|| '[]'`) avant `JSON.parse()`.
- Afficher un message clair quand aucun résultat ne correspond.

---

## Checklist de la semaine
- [ ] Utiliser `filter()` pour produire une liste filtrée.
- [ ] Utiliser `trim()` et `toLowerCase()` sur une saisie utilisateur.
- [ ] Utiliser `includes()` pour la logique de recherche.
- [ ] Utiliser `join()` pour une sortie texte lisible.
- [ ] Convertir objet/tableau en JSON avec `JSON.stringify()`.
- [ ] Reconvertir JSON en donnée JavaScript avec `JSON.parse()`.
- [ ] Sauvegarder et relire une donnée dans `localStorage`.

---

## Table de synthèse

| Besoin | Outil | Résultat |
|--------|-------|----------|
| Filtrer une liste selon un mot-clé | `filter()` | Nouveau tableau de résultats |
| Vérifier une présence dans du texte | `includes()` | Test booléen simple |
| Nettoyer une saisie | `trim()` + `toLowerCase()` | Comparaison plus robuste |
| Afficher une liste sur une ligne | `join()` | Chaîne formatée |
| Convertir texte JSON -> objet JS | `JSON.parse()` | Données exploitables en JavaScript |
| Convertir objet JS -> texte JSON | `JSON.stringify()` | Données sérialisées |
| Persister un état côté navigateur | `localStorage` | Données conservées entre rechargements |

---

**À retenir** : pour une interface simple mais solide, on enchaîne trois réflexes : normaliser les entrées, filtrer clairement les données, puis persister seulement ce qui est utile avec `localStorage` et JSON.

