# Semaine 8 - Gestion des classes CSS par programmation

## 🎯 Objectifs de la semaine
- Comprendre le rôle des classes CSS comme mécanisme d'**état d'interface**
- Utiliser l'API `classList` pour ajouter, retirer, basculer et tester des classes
- Contrôler des **transitions CSS** par JavaScript en changeant les classes au bon moment
- Contrôler des **animations CSS** par JavaScript en déclenchant, redéclenchant, mettant en pause ou en arrêtant une animation
- Concevoir des interactions UI simples où CSS gère le rendu et JavaScript gère la logique

---

## 1. Pourquoi manipuler les classes en JavaScript?

Au lieu de modifier plusieurs styles directement dans JavaScript, on préfère souvent :
- définir les styles en CSS
- définir des classes d'état (`.ouvert`, `.actif`, `.anime`, `.cache`)
- laisser JavaScript seulement ajouter ou retirer ces classes

### Pourquoi cette approche?
- Le CSS conserve la responsabilité du rendu visuel
- Le JavaScript reste plus simple et plus lisible
- Les transitions et animations sont plus faciles à maintenir
- On peut réutiliser les mêmes classes sur plusieurs composants

### Exemple d'idée générale
```css
.panneau {
	opacity: 0;
	translate: 0 -10px;
	pointer-events: none;
	transition: opacity 200ms ease, translate 200ms ease;
}

.panneau.ouvert {
	opacity: 1;
	translate: 0 0;
	pointer-events: auto;
}
```

```js
const panneau = document.querySelector('.panneau');

panneau.classList.add('ouvert');
```

---

## 2. L'API `classList`

`classList` donne accès aux classes d'un élément HTML sous forme de collection manipulable.

### Sélectionner un élément
```js
const carte = document.querySelector('.carte');
```

### `add()`
Ajoute une ou plusieurs classes.

```js
carte.classList.add('active');
carte.classList.add('visible', 'accent');
```

### `remove()`
Retire une ou plusieurs classes.

```js
carte.classList.remove('active');
```

### `toggle()`
Ajoute la classe si elle est absente, la retire si elle est présente.

```js
carte.classList.toggle('ouverte');
```

Avec un second argument booléen, on force l'état voulu.

```js
const estVisible = true;
carte.classList.toggle('visible', estVisible);
```

### `contains()`
Vérifie la présence d'une classe.

```js
if (carte.classList.contains('active')) {
	console.log('La carte est active');
}
```

### `replace()`
Remplace une classe existante par une autre.

```js
carte.classList.replace('theme-clair', 'theme-sombre');
```

---

## 3. Déclencher une transition CSS avec `classList`

Une transition CSS se produit quand une propriété change de valeur et qu'un `transition` est défini.

### Exemple CSS
```css
.boite {
	opacity: 0;
	scale: 0.96;
	transition: opacity 180ms ease-out, scale 180ms ease-out;
}

.boite.visible {
	opacity: 1;
	scale: 1;
}
```

### Exemple JavaScript
```js
const boite = document.querySelector('.boite');
const bouton = document.querySelector('.btn-afficher');

bouton.addEventListener('click', () => {
	boite.classList.toggle('visible');
});
```

**Idée clé** : JavaScript ne change pas `opacity` ni `scale` directement. Il bascule seulement la classe `visible`.

---

## 4. Contrôler des animations CSS avec des classes

Une animation CSS peut être associée à une classe qu'on ajoute ou retire au bon moment.

### Exemple CSS
```css
@keyframes secousse {
	0%, 100% {
		translate: 0 0;
	}
	25% {
		translate: -6px 0;
	}
	75% {
		translate: 6px 0;
	}
}

.champ.erreur {
	animation: secousse 220ms ease-in-out 1;
}
```

### Exemple JavaScript
```js
const champ = document.querySelector('.champ');
const boutonTester = document.querySelector('.btn-tester');

boutonTester.addEventListener('click', () => {
	champ.classList.add('erreur');
});
```

Ici, l'ajout de la classe `erreur` déclenche l'animation.

---

## 5. Redéclencher une animation

Si une classe est déjà présente, ajouter à nouveau la même classe ne redémarre pas toujours l'animation. Il faut souvent :
- retirer la classe
- forcer un recalcul
- réajouter la classe

```js
function redemarrerAnimation(element, nomClasse) {
	element.classList.remove(nomClasse);
	void element.offsetWidth;
	element.classList.add(nomClasse);
}
```

### Utilisation
```js
const notification = document.querySelector('.notification');
const bouton = document.querySelector('.btn-relancer');

bouton.addEventListener('click', () => {
	redemarrerAnimation(notification, 'anime');
});
```

Cette technique est utile pour rejouer une animation d'accentuation, d'erreur ou de confirmation.

---

## 6. Mettre en pause ou arrêter une animation

On peut piloter l'état d'une animation avec une classe supplémentaire.

### Exemple CSS
```css
.spinner {
	animation: rotation 900ms linear infinite;
}

.spinner.pause {
	animation-play-state: paused;
}
```

### Exemple JavaScript
```js
const spinner = document.querySelector('.spinner');
const boutonPause = document.querySelector('.btn-pause');

boutonPause.addEventListener('click', () => {
	spinner.classList.toggle('pause');
});
```

On peut aussi utiliser une classe pour complètement retirer l'animation, par exemple avec `animation: none;`.

---

## 7. Exemples d'applications UI

### A) Ouvrir/fermer un panneau
```js
const boutonPanneau = document.querySelector('.btn-panneau');
const panneau = document.querySelector('.panneau');

boutonPanneau.addEventListener('click', () => {
	panneau.classList.toggle('ouvert');
});
```

### B) Afficher une notification avec animation
```js
const notification = document.querySelector('.notification');

function afficherNotification() {
	notification.classList.add('visible', 'anime');
}
```

### C) Changer l'état d'un bouton
```js
const boutonAction = document.querySelector('.btn-action');

boutonAction.addEventListener('mouseenter', () => {
	boutonAction.classList.add('survole');
});

boutonAction.addEventListener('mouseleave', () => {
	boutonAction.classList.remove('survole');
});
```

Dans chaque cas, `classList` sert à relier une interaction utilisateur à un état visuel défini en CSS.

---

## 8. Bonnes pratiques

- Donner aux classes des noms d'état clairs : `ouvert`, `actif`, `visible`, `pause`, `erreur`
- Éviter de modifier beaucoup de styles directement avec `element.style`
- Utiliser JavaScript pour la logique, et CSS pour le rendu
- Prévoir ce qui se passe si la classe est déjà présente
- Tester les états au clic, au survol, au focus et lors de la fermeture
- Garder des transitions courtes et des animations utiles à l'interface

---

## Checklist de la semaine
- [ ] Sélectionner un élément et accéder à son `classList`
- [ ] Utiliser `add()` et `remove()` correctement
- [ ] Utiliser `toggle()` pour ouvrir/fermer un état visuel
- [ ] Utiliser `contains()` pour tester un état courant
- [ ] Déclencher une transition CSS par ajout/retrait de classe
- [ ] Déclencher ou redéclencher une animation CSS avec JavaScript
- [ ] Mettre en pause ou arrêter une animation via une classe d'état

---

## Table de synthèse

| Élément | Technique | Rôle |
|--------|-----------|------|
| `classList.add()` | Ajouter une classe | Activer un état visuel |
| `classList.remove()` | Retirer une classe | Désactiver un état visuel |
| `classList.toggle()` | Basculer une classe | Ouvrir/fermer un composant |
| `classList.contains()` | Tester une classe | Vérifier l'état d'un élément |
| `classList.replace()` | Remplacer une classe | Passer d'un thème/état à un autre |
| Transition CSS | Classe + `transition` | Animer un changement d'état en douceur |
| Animation CSS | Classe + `@keyframes` | Déclencher une séquence animée |
| `animation-play-state` | Classe d'état | Mettre une animation en pause |

---

**À retenir** : `classList` est une API centrale pour piloter les états d'interface. En pratique, on s'en sert pour relier les interactions JavaScript à des classes CSS qui contrôlent ensuite les transitions et les animations.
