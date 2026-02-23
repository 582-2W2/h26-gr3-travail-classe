# Semaine 5 – Navigation adaptative
## 🎯 Objectifs de la semaine
- Concevoir une **navigation principale adaptative** avec approche **mobile-first**
- Cacher la navigation sur mobile et l’afficher avec un **bouton burger**
- Utiliser les astuces HTML (`input type="checkbox"` + `label`) pour piloter l’interface
- Exploiter les sélecteurs CSS d’**adjacence** et la pseudo-classe `:checked`
- Animer le bouton burger et la navigation avec différentes stratégies
- Ajouter du JavaScript pour gérer le **scroll**, les interactions et la fermeture du menu

---

## 1. Structure de base : navigation mobile-first

L’idée générale :
- Sur mobile, le menu est caché par défaut.
- Un bouton burger permet de l’ouvrir/fermer.
- Sur grand écran, la navigation redevient visible en continu.

### Exemple HTML minimal
```html
<header class="entete">
	<a class="logo" href="index.html">CinéTIM</a>

	<input id="nav-toggle" class="nav-toggle" type="checkbox">
	<label for="nav-toggle" class="burger" aria-label="Ouvrir le menu">
		<span></span>
		<span></span>
		<span></span>
	</label>

	<nav class="nav-principale" aria-label="Navigation principale">
		<a href="index.html">Accueil</a>
		<a href="films.html">Films</a>
		<a href="apropos.html">À propos</a>
	</nav>
</header>
```

---

## 2. Affichage/masquage avec `checkbox` + `label`

Le duo `input[type="checkbox"]` + `label[for]` permet de contrôler un état ouvert/fermé **sans JS**.

### CSS de base
```css
/* Mobile d'abord */
.nav-toggle {
	position: absolute;
	opacity: 0;
	pointer-events: none;
}

.nav-principale {
	display: none;
}

/* Quand la case est cochée, afficher le menu */
.nav-toggle:checked ~ .nav-principale {
	display: flex;
	flex-direction: column;
}
```

### Pourquoi cette approche?
- Évite du JS pour le comportement de base
- Reste simple à maintenir
- Fonctionne bien avec une architecture mobile-first

---

## 3. Sélecteurs d’adjacence et `:checked`

Les sélecteurs utiles dans ce contexte :
- `+` : frère adjacent immédiat
- `~` : frère général (pas nécessairement collé)

### Exemples
```css
/* Cibler le bouton juste après la checkbox */
.nav-toggle:checked + .burger {
	background: transparent;
}

/* Cibler la nav qui vient plus loin dans le même parent */
.nav-toggle:checked ~ .nav-principale {
	translate: 0 0;
	opacity: 1;
}
```

**Point important** : l’ordre des éléments dans le HTML est crucial pour que les sélecteurs fonctionnent.

---

## 4. Stratégies d’animation du menu adaptatif

Plusieurs stratégies sont possibles selon l’effet désiré.

### A) Translation du menu (off-canvas)
```css
.nav-principale {
	translate: 100% 0;
	transition: translate 250ms ease;
}

.nav-toggle:checked ~ .nav-principale {
	translate: 0 0;
}
```

### B) Fondu + léger décalage
```css
.nav-principale {
	opacity: 0;
	translate: 0 -8px;
	transition: opacity 200ms ease, translate 200ms ease;
}

.nav-toggle:checked ~ .nav-principale {
	opacity: 1;
	translate: 0 0;
}
```

### C) Déplacement du contenu principal
```css
.page {
	transition: translate 250ms ease;
}

.nav-toggle:checked ~ .page {
	translate: -80% 0;
}
```

---

## 5. Animation du bouton burger

Le burger peut se transformer en « X » pour indiquer l’état ouvert.

```css
.burger span {
	display: block;
	width: 24px;
	height: 2px;
	background: currentColor;
	transition: rotate 200ms ease, translate 200ms ease, opacity 200ms ease;
}

.nav-toggle:checked + .burger span:nth-child(1) {
	rotate: 45deg;
	translate: 0 8px;
}

.nav-toggle:checked + .burger span:nth-child(2) {
	opacity: 0;
}

.nav-toggle:checked + .burger span:nth-child(3) {
	rotate: -45deg;
	translate: 0 -8px;
}
```

---

## 6. JavaScript : contrôler l’arrière-plan et fermer le menu

Le JS est utilisé ici pour améliorer l’UX :
- Bloquer le défilement de la page derrière le menu
- Désactiver les interactions de pointeur sur le contenu principal
- Fermer le menu quand on clique un item de navigation

### Exemple de script
```js
const navToggle = document.querySelector('#nav-toggle');
const nav = document.querySelector('.nav-principale');
const contenu = document.querySelector('main');
const liensNav = document.querySelectorAll('.nav-principale a');

function synchroniserMenu() {
	const ouvert = navToggle.checked;

	document.body.style.overflow = ouvert ? 'hidden' : '';
	contenu.style.pointerEvents = ouvert ? 'none' : '';
	nav.style.pointerEvents = ouvert ? 'auto' : '';
}

navToggle.addEventListener('change', synchroniserMenu);

liensNav.forEach((lien) => {
	lien.addEventListener('click', () => {
		navToggle.checked = false;
		synchroniserMenu();
	});
});
```

---

## 7. Version desktop (retour à une nav visible)

```css
@media (min-width: 768px) {
	.burger {
		display: none;
	}

	.nav-principale {
		display: flex;
		flex-direction: row;
		opacity: 1;
		translate: 0 0;
		pointer-events: auto;
	}
}
```

---

## Checklist de la semaine
- [ ] Navigation mobile-first cachée par défaut
- [ ] Bouton burger fonctionnel avec `checkbox` + `label`
- [ ] Utilisation correcte de `:checked` et des sélecteurs d’adjacence
- [ ] Au moins une animation du menu (translation, fondu, etc.)
- [ ] Animation du bouton burger (transformation en X)
- [ ] Défilement de page bloqué lorsque le menu est ouvert
- [ ] Interactions arrière-plan désactivées lorsque le menu est ouvert
- [ ] Fermeture du menu au clic sur un lien de navigation

---

## Table de synthèse

| Élément | Technique | Rôle |
|--------|-----------|------|
| État du menu | `input[type="checkbox"]` | Ouvrir/fermer sans JS de base |
| Déclencheur | `label[for]` | Actionner la case à cocher |
| Logique CSS | `:checked` + `+` / `~` | Afficher/animer burger et navigation |
| Animation menu | `transition` + `translate` / `opacity` | Rendre l’ouverture/fermeture fluide |
| Animation burger | `rotate` / `translate` / `opacity` | Visualiser l’état ouvert/fermé |
| UX avancée | JS (`overflow`, `pointer-events`) | Bloquer l’arrière-plan quand menu ouvert |
| Fermeture automatique | Événements `click` sur les liens | Refermer le menu après navigation |

---

**À retenir** : on peut construire une navigation adaptative complète avec une base HTML/CSS très solide, puis utiliser JavaScript pour peaufiner l’expérience utilisateur.

