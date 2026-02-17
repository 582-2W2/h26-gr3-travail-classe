# Semaine 4 – Grille adaptative, composants de base, propriétés personnalisées CSS
## 🎯 Objectifs de la semaine
- Utiliser les **propriétés personnalisées CSS** (variables)
- Implémenter des **thèmes dynamiques** avec variables
- Apprendre **CSS Grid** pour créer des mises en page complexes
- Créer des **grilles adaptatives** avec `auto-fit` et `repeat()`
- Créer un **carrousel horizontal** en CSS pur
- Comprendre les différentes approches de contrôle de carrousel

---

## 1. Propriétés personnalisées CSS (Variables)

### Déclarer des variables dans `:root`
```css
:root {
  /* Couleurs */
  --couleur-primaire: #2196F3;
  --couleur-secondaire: #4CAF50;
  --couleur-danger: #f44336;
  
  /* Espaces */
  --espace-petit: 8px;
  --espace-moyen: 16px;
  --espace-grand: 32px;
  
  /* Autres */
  --radius: 8px;
  --ombre: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Utiliser les variables avec `var()`
```css
.bouton {
  background: var(--couleur-primaire);
  padding: var(--espace-moyen);
  border-radius: var(--radius);
  box-shadow: var(--ombre);
}

.carte {
  background: white;
  padding: var(--espace-grand);
  border-radius: var(--radius);
}
```

### Pourquoi utiliser des variables?
✅ **Centralisation** : Changer une couleur une seule fois  
✅ **Cohérence** : Même espacement partout  
✅ **Maintenabilité** : Plus facile à modifier  
✅ **Thèmes** : Changer facilement de palette de couleurs  

---

## 5. Thèmes dynamiques avec variables

### Créer plusieurs thèmes
```css
:root {
  /* Thème clair (défaut) */
  --fond: #ffffff;
  --texte: #1a1a1a;
  --accent: #2196F3;
}

body.theme-sombre {
  /* Thème sombre */
  --fond: #1a1a1a;
  --texte: #ffffff;
  --accent: #64B5F6;
}

body.theme-automne {
  /* Thème automne */
  --fond: #fde4d4;
  --texte: #3d2817;
  --accent: #d97000;
}
```

### Appliquer les variables
```css
body {
  background: var(--fond);
  color: var(--texte);
  transition: background 300ms, color 300ms; /* Transition douce */
}

.bouton {
  background: var(--accent);
  color: white;
}
```

### Changer de thème avec JavaScript
```javascript
function changerTheme(nom) {
  document.body.className = '';
  if (nom) {
    document.body.classList.add('theme-' + nom);
  }
}

// Utilisation
changerTheme('sombre'); // Applique le thème sombre
```

### Modifier une variable dynamiquement
```javascript
// Changer une variable via JavaScript
document.documentElement.style.setProperty('--accent', '#ff6b6b');
```

---

## 3. CSS Grid – Bases

### Créer une grille simple
```css
.grille {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 colonnes égales */
  gap: 20px; /* Espacement entre les éléments */
}
```

**Explications** :
- `display: grid` : Active le mode grille
- `grid-template-columns` : Définit les colonnes
- `1fr` : 1 fraction d'espace disponible (répartition égale)
- `gap` : Espacement entre lignes et colonnes

### Contrôler les lignes
```css
.grille {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 100px 200px; /* Hauteur fixe des lignes */
  gap: 15px;
}
```

### Unités courantes
- `1fr, 2fr` : Fractions d'espace (proportionnel)
- `200px` : Taille fixe en pixels
- `auto` : S'adapte au contenu
- `minmax(min, max)` : Taille flexible entre min et max

---

## 4. Grille adaptative

### Grille auto-adaptable avec `repeat()`
```css
.grille {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
```

**Comment ça marche** :
- `repeat()` : Répète un pattern
- `auto-fit` : Crée autant de colonnes que possible
- `minmax(250px, 1fr)` : Min 250px, max 1 fraction d'espace
- Résultat : Grille qui s'adapte automatiquement à la largeur

### Différence `auto-fit` vs `auto-fill`
```css
/* auto-fit: Étire les éléments pour remplir l'espace */
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

/* auto-fill: Garde les colonnes, laisse de l'espace vide */
grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
```

**Quand utiliser** :
- `auto-fit` : Galeries d'images, cartes de contenu
- `auto-fill` : Quand on veut préserver la taille des éléments

---

## 5. Positionner des éléments dans la grille

### Occuper plusieurs colonnes/lignes
```css
.element-large {
  grid-column: 1 / 3; /* De la colonne 1 à 3 (occupe 2 colonnes) */
  grid-row: 1 / 3;    /* De la ligne 1 à 3 (occupe 2 lignes) */
}

/* Raccourci: occuper toutes les colonnes */
.entete {
  grid-column: 1 / -1; /* Du début à la fin */
}
```

### Layout classique (en-tête, contenu, sidebar, pied)
```css
.layout {
  display: grid;
  grid-template-columns: 1fr 300px; /* Contenu + sidebar */
  gap: 20px;
}

.entete, .pied {
  grid-column: 1 / -1; /* Pleine largeur */
}
```

### Responsive avec media query
```css
.layout {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 colonne */
  gap: 20px;
}

@media (min-width: 900px) {
  .layout {
    grid-template-columns: 1fr 300px; /* Desktop: 2 colonnes */
  }
}
```

---

## 6. Carrousel CSS – Scroll horizontal

### Carrousel simple avec scroll
```css
.carrousel {
  display: flex;
  gap: 16px;
  overflow-x: auto;           /* Scroll horizontal */
  scroll-behavior: smooth;    /* Défilement fluide */
  padding: 16px 0;
}

.carte {
  flex: 0 0 300px;  /* Largeur fixe de 300px, ne rétrécit pas */
  min-height: 200px;
}
```

**Explications** :
- `overflow-x: auto` : Crée le scroll horizontal
- `flex: 0 0 300px` : Ne grandit pas, ne rétrécit pas, largeur 300px
- `scroll-behavior: smooth` : Défilement animé

### Cacher/styliser la scrollbar
```css
/* Scrollbar fine */
.carrousel {
  scrollbar-width: thin;
  scrollbar-color: #2196F3 #e0e0e0;
}

/* Chrome/Safari */
.carrousel::-webkit-scrollbar {
  height: 6px;
}

.carrousel::-webkit-scrollbar-thumb {
  background: #2196F3;
  border-radius: 10px;
}
```

---

## 7. Carrousel avec Snap Points

### Arrêt aligné sur chaque élément
```css
.carrousel {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory; /* Active le snap horizontal */
}
```
**résultat** : Le scroll s'arrête proprement sur chaque carte

### Carrousel pleine largeur
```css
.carrousel-fullwidth {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.slide {
  flex: 0 0 100%;           /* Chaque slide = 100% de la largeur */
  scrSS Grid
- `display: grid` pour activer la grille
- `grid-template-columns` et `grid-template-rows` pour définir la structure
- `repeat(auto-fit, minmax())` pour grilles adaptatives
- `grid-column` et `grid-row` pour positionner les éléments

### Coll-snap-align: start;
  min-height: 400px;
}
```

---

## 8. Contrôle du carrousel

### Option 1: Scroll manuel (CSS pur)
L'utilisateur scroll avec la souris/trackpad. Simple mais peu intuitif sur desktop.

### Option 2: Boutons Précédent/Suivant (avec JS : à compléter plus tard dans la session)
```javascript
let position = 0;
const slides = document.querySelectorAll('.slide');

function carrouselSuivant() {
  position = (position + 1) % slides.length;
  const carrousel = document.getElementById('carrousel');
  const largeur = carrousel.offsetWidth;
  carrousel.scrollLeft = position * largeur;
}

function carrouselPrecedent() {
  position = (position - 1 + slides.length) % slides.length;
  const carrousel = document.getElementById('carrousel');
  const largeur = carrousel.offsetWidth;
  carrousel.scrollLeft = position * largeur;
}
```

```html
<button onclick="carrouselPrecedent()">← Précédent</button>
<button onclick="carrouselSuivant()">Suivant →</button>
```

### Option 3: Onglets cliquables (avec JS : à compléter plus tard dans la session)
Chaque onglet affiche un contenu différent.

```javascript
function afficherOnglet(index) {
  const contenus = document.querySelectorAll('.onglet-contenu');
  contenus.forEach((c, i) => {
    if (i === index) {
      c.classList.add('visible');
    } else {
      c.classList.remove('visible');
    }
  });
}
```

```css
.onglet-contenu {
  display: none;
}

.onglet-contenu.visible {
  display: block;
}
```

---

## 9. Carrousel adaptatif (responsive)

### 2 éléments visibles sur mobile, 3 sur desktop
```css
.carrousel {
  display: flex;
  overflow-x: auto;
  gap: 16px;
}

.carte {
  flex: 0 0 calc(50% - 8px); /* 2 cartes visibles sur mobile */
}

@media (min-width: 900px) {
  .carte {
    flex: 0 0 calc(33.333% - 11px); /* 3 cartes sur desktop */
  }
}
```

**Calcul du gap** :
- 2 cartes : `calc(50% - gap/2)`
- 3 cartes : `calc(33.333% - gap*2/3)`

---

## 📝 Résumé des concepts clés

### CSS Grid
- `display: grid` pour activer la grille
- `grid-template-columns` et `grid-template-rows` pour définir la structure
- `repeat(auto-fit, minmax())` pour grilles adaptatives
- `grid-column` et `grid-row` pour positionner les éléments

### Variables CSS
- Déclarer dans `:root` avec `--nom-variable: valeur`
- Utiliser avec `var(--nom-variable)`
- Permet de créer des thèmes facilement
- Modifiable dynamiquement avec JavaScript

### Carrousel
- `display: flex + overflow-x: auto` pour scroll horizontal
- `scroll-snap-type` pour arrêts alignés
- Besoin de JavaScript pour boutons de contrôle
- `flex: 0 0 (largeur)` pour éléments de taille fixe

---

## 🔗 Ressources

### Grid CSS
- [CSS Tricks: Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN: CSS Grid Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Grid_Layout)

### Variables CSS
- [MDN: Propriétés personnalisées](https://developer.mozilla.org/fr/docs/Web/CSS/Using_CSS_custom_properties)

### Carrousel
- [MDN: scroll-snap-type](https://developer.mozilla.org/fr/docs/Web/CSS/scroll-snap-type)
- [CSS Tricks: Practical CSS Scroll Snapping](https://css-tricks.com/practical-css-scroll-snapping/)Grid CSS
- [CSS Tricks: Complete Guide to Grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [MDN: CSS Grid Layout](https://developer.mozilla.org/fr/docs/Web/CSS/CSS_Grid_Layout)

### 