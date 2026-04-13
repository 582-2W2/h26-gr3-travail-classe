# Semaine 10 - Création et manipulation dynamique d'éléments HTML

## 🎯 Objectifs de la semaine
- Comprendre les bases de l'API DOM pour créer et manipuler des éléments HTML en JavaScript
- Utiliser les interfaces `Document` et `Element` pour ajouter, insérer, déplacer et supprimer du contenu
- Construire des interactions UI simples avec `createElement()`, `append()`, `before()`, `after()` et `remove()`
- Explorer la structure d'un conteneur avec `firstElementChild` et `children`
- Développer une logique de manipulation de nœuds claire, lisible et réutilisable

---

## 1. Rappel : le DOM et les nœuds

Le DOM (Document Object Model) est une représentation en objets d'une page HTML. JavaScript peut y accéder pour :
- lire le contenu actuel
- créer de nouveaux éléments
- modifier la structure
- retirer des éléments

Chaque balise HTML est un nœud manipulable par programmation.

### Exemple de sélection d'éléments
```js
const scene = document.querySelector('.scene');
const boutonAjouter = document.querySelector('.btn-ajouter');
```

---

## 2. Créer un élément avec `createElement()`

La méthode `document.createElement()` crée un élément en mémoire. Il n'apparaît pas dans la page tant qu'on ne l'insère pas dans le DOM.

```js
const carte = document.createElement('article');
carte.className = 'carte';
carte.textContent = 'Nouvelle carte dynamique';
```

### Bonnes pratiques
- Donner une classe ou un attribut utile dès la création
- Préparer le contenu (`textContent`, attributs, enfants) avant l'insertion
- Garder une fonction dédiée pour la création si le motif se répète

---

## 3. Ajouter un élément avec `append()`

`append()` ajoute un ou plusieurs nœuds à la fin d'un parent.

```js
const liste = document.querySelector('.liste');
const item = document.createElement('li');
item.textContent = 'Nouveau défi';

liste.append(item);
```

### Différence rapide
- `append()` accepte des nœuds et du texte
- L'élément est inséré en dernier enfant

---

## 4. Insérer autour d'un élément avec `before()` et `after()`

On peut placer un nœud juste avant ou juste après un élément existant.

```js
const vedette = document.querySelector('.vedette');

const badgeAvant = document.createElement('span');
badgeAvant.textContent = '⭐';

const badgeApres = document.createElement('span');
badgeApres.textContent = '🎉';

vedette.before(badgeAvant);
vedette.after(badgeApres);
```

### Quand les utiliser ?
- `before()` : insérer une info d'introduction
- `after()` : ajouter un accent visuel ou un message de confirmation

---

## 5. Supprimer un élément avec `remove()`

`remove()` retire directement l'élément ciblé du DOM.

```js
const missionTerminee = document.querySelector('.mission.terminee');
missionTerminee.remove();
```

### Note importante
Après suppression, la variable JavaScript peut encore exister, mais l'élément n'est plus affiché dans la page.

---

## 6. Explorer les enfants : `firstElementChild` et `children`

Ces propriétés servent à naviguer dans une structure HTML existante.

### `firstElementChild`
Retourne le premier enfant de type élément.

```js
const liste = document.querySelector('.liste');
const premier = liste.firstElementChild;

if (premier) {
	premier.classList.add('important');
}
```

### `children`
Retourne une collection des enfants éléments.

```js
const cartes = document.querySelector('.cartes');

for (const carte of cartes.children) {
	carte.classList.add('animee');
}
```

---

## 7. Stratégie recommandée pour le contenu dynamique

1. Sélectionner le parent cible.
2. Créer un élément avec `createElement()`.
3. Lui donner son contenu et ses classes.
4. L'insérer avec `append()`, `before()` ou `after()` selon le besoin.
5. Gérer la suppression avec `remove()`.
6. Vérifier l'état du conteneur avec `firstElementChild` ou `children.length`.

---

## 8. Erreurs fréquentes à éviter

- Oublier d'insérer un élément après l'avoir créé
- Confondre le parent et l'enfant lors d'un `append()`
- Supprimer un élément sans valider son existence
- Croire que `children` inclut les nœuds texte (ce n'est pas le cas)
- Écrire toute la logique dans un seul bloc au lieu de petites fonctions

---

## Checklist de la semaine
- [ ] Créer un élément avec `document.createElement()`
- [ ] Ajouter un élément dans un parent avec `append()`
- [ ] Insérer un élément avant et après un autre (`before()`, `after()`)
- [ ] Retirer un élément précis avec `remove()`
- [ ] Utiliser `firstElementChild` de façon sécuritaire
- [ ] Parcourir `children` pour appliquer un traitement à plusieurs éléments
- [ ] Organiser le code en fonctions simples de manipulation DOM

---

## Table de synthèse

| Besoin | Méthode / propriété | Résultat |
|--------|----------------------|----------|
| Créer un nouvel élément | `document.createElement('tag')` | Élément créé en mémoire |
| Ajouter en fin de parent | `parent.append(enfant)` | Élément ajouté comme dernier enfant |
| Insérer avant une cible | `cible.before(noeud)` | Nœud ajouté juste avant la cible |
| Insérer après une cible | `cible.after(noeud)` | Nœud ajouté juste après la cible |
| Retirer un élément | `element.remove()` | Élément supprimé du DOM |
| Obtenir le premier enfant | `parent.firstElementChild` | Référence vers le premier enfant élément |
| Parcourir les enfants | `parent.children` | Collection d'enfants éléments |

---

**À retenir** : la création de contenu dynamique repose sur une séquence simple (créer, configurer, insérer, retirer). Plus cette séquence est claire dans votre code, plus l'interface est facile à faire évoluer.
