# Semaine 9 - Pseudo-éléments CSS et leurs applications

## 🎯 Objectifs de la semaine
- Comprendre le rôle des pseudo-éléments CSS dans la construction d'interfaces
- Revoir les pseudo-éléments les plus utiles et leurs cas d'utilisation
- Maîtriser l'usage de `::before` et `::after` pour enrichir l'UI sans alourdir le HTML
- Produire des effets d'animation avec des pseudo-éléments et des transitions CSS
- Déclencher et contrôler des états visuels avec l'API `classList` en JavaScript

---

## 1. Rappel : qu'est-ce qu'un pseudo-élément ?

Un pseudo-élément permet de styliser une partie spécifique d'un élément sans ajouter de nouvelle balise dans le HTML.

Pseudo-éléments fréquents :
- `::before`
- `::after`
- `::first-letter`
- `::first-line`
- `::selection`
- `::placeholder`

### Points importants
- `::before` et `::after` nécessitent la propriété `content`
- Ils sont souvent utilisés pour des détails décoratifs ou des couches visuelles
- Dans plusieurs cas, on combine `position: relative` sur le parent et `position: absolute` sur le pseudo-élément

### Exemple simple
```css
.titre::first-letter {
	font-size: 1.5em;
	font-weight: 700;
}
```

---

## 2. Focus sur `::before` et `::after`

Ces deux pseudo-éléments sont les plus utilisés pour créer des effets visuels d'interface.

### Cas d'usage courants
- Soulignement animé de liens
- Barre d'accent ou bordure dynamique
- Overlay au survol d'une carte
- Pastille décorative, icône ou badge visuel

### Patron de base
```css
.element {
	position: relative;
}

.element::after {
	content: "";
	position: absolute;
	left: 0;
	bottom: -2px;
	width: 0;
	height: 2px;
	background: currentColor;
	transition: width 220ms ease;
}

.element:hover::after {
	width: 100%;
}
```

Ici, le pseudo-élément devient une ligne animée sans ajouter de balise supplémentaire.

---

## 3. Effets d'animation UI avec pseudo-éléments

Les pseudo-éléments sont utiles pour animer des détails d'interface sans toucher à la structure HTML.

### Propriétés recommandées
- `transition`
- `transform`
- `opacity`

### Exemple CSS : overlay animé
```css
.carte {
	position: relative;
	overflow: hidden;
}

.carte::before {
	content: "";
	position: absolute;
	inset: 0;
	background: rgba(0, 0, 0, 0.18);
	opacity: 0;
	transition: opacity 200ms ease;
}

.carte:hover::before {
	opacity: 1;
}
```

### Bonnes pratiques
- Privilégier les transitions courtes pour garder l'interface réactive
- Garder un contraste lisible pendant l'animation
- Éviter les effets purement décoratifs qui nuisent à la compréhension

---

## 4. Stratégie d'animation avec `classList`

Au lieu de modifier les styles un à un en JavaScript, on change les classes et on laisse le CSS gérer le rendu.

### Pourquoi utiliser `classList` ?
- Séparation claire entre logique (JS) et présentation (CSS)
- Code plus lisible et plus facile à maintenir
- Réutilisation simple des mêmes états visuels

### Méthodes utiles
- `add()`
- `remove()`
- `toggle()`
- `contains()`

### Exemple CSS + JS
```css
.bouton {
	position: relative;
	overflow: hidden;
}

.bouton::before {
	content: "";
	position: absolute;
	inset: 0;
	background: rgba(255, 255, 255, 0.2);
	opacity: 0;
	transition: opacity 180ms ease;
}

.bouton.actif::before {
	opacity: 1;
}
```

```js
const bouton = document.querySelector('.bouton');

bouton.addEventListener('click', () => {
	bouton.classList.toggle('actif');
});
```

Ici, JavaScript bascule seulement la classe `actif`. Le CSS applique l'effet via le pseudo-élément.

---

## 5. Exemples d'applications UI

### A) Lien avec soulignement animé
- État initial : ligne cachée (`width: 0`)
- État interactif : ligne visible (`width: 100%`)

### B) Carte avec overlay au survol
- État initial : overlay transparent (`opacity: 0`)
- État interactif : overlay visible (`opacity: 1`)

### C) Bouton accentué au clic
- JavaScript ajoute/retire la classe `actif`
- Le pseudo-élément crée l'accent visuel sans modifier le HTML

---

## 6. Bonnes pratiques

- Utiliser les pseudo-éléments pour le décoratif, pas pour du contenu essentiel
- Nommer les classes d'état de façon claire : `actif`, `ouvert`, `visible`
- Garder JavaScript centré sur la logique d'interaction
- Limiter les animations pour conserver performance et lisibilité
- Tester les interactions au clic, au survol et au focus clavier

---

## Checklist de la semaine
- [ ] Reconnaître les cas d'usage de `::before` et `::after`
- [ ] Créer un effet de soulignement animé avec un pseudo-élément
- [ ] Créer un overlay animé sur une carte
- [ ] Utiliser `classList.toggle()` pour changer un état visuel
- [ ] Relier une interaction JavaScript à un effet CSS basé sur pseudo-élément
- [ ] Vérifier qu'aucun pseudo-élément n'ajoute de contenu sémantique important

---

## Table de synthèse

| Besoin UI | Technique CSS | Contrôle JS |
|--------|-----------|------|
| Souligner un lien au survol | `::after` + `transition` sur `width` | Aucun (ou classe d'état) |
| Ajouter un overlay de carte | `::before` + `opacity` | Optionnel avec `classList` |
| Accent visuel d'un bouton | `::before` + classe `.actif` | `classList.toggle('actif')` |
| Montrer/cacher un effet | Classe d'état + pseudo-élément | `add()` / `remove()` |