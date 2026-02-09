# Semaine 2 – Mise en page adaptative

## 🎯 Objectifs de la semaine
- Comprendre l'approche **mobile-first**
- Maîtriser les **ruptures** (breakpoints) et adapter le design
- Utiliser les **requêtes médias** (media queries)
- Découvrir les **requêtes de conteneurs** (container queries)
- Rendre la typographie **adaptative** et **fluide**
- Créer une grille flexible avec `flexbox`

---

## 1. Approche mobile-first

L'approche **mobile-first** signifie :
- **Commencer par le design mobile** (petit écran)
- **Ajouter de la complexité** au fur et à mesure que l'écran grandit
- Utiliser `min-width` dans les media queries (aller vers plus grand)

### Avantages
- Performance optimisée : début avec peu de CSS
- Base de code plus simple et plus maintenable
- Adaptation progressive et naturelle

---

## 2. Points de rupture (Breakpoints)

Les **breakpoints** sont des points où le design change pour s'adapter à la taille de l'écran.

### Breakpoints courants
```
Petit mobile    : 320px à 480px
Mobile          : 480px à 768px
Tablette        : 768px à 1024px
Écran large     : 1024px à 1440px
Écran XL        : 1440px+
```

### Exemple simplifié pour ce cours
```
Mobile          : par défaut (aucune restriction)
Tablette        : min-width: 768px
Écran large     : min-width: 1200px
```

---

## 3. Requêtes médias (Media Queries)

### Syntaxe de base
```css
@media (min-width: 768px) {
  /* CSS s'applique à partir de 768px */
  body {
    font-size: 18px;
  }
}
```

### Propriétés courantes
- `min-width: 768px` → S'applique à partir de 768px et plus
- `max-width: 767px` → S'applique jusqu'à 767px
- `orientation: landscape` → Mode paysage
- `(prefers-color-scheme: dark)` → Mode sombre préféré

### Exemple complet
```css
/* Mobile (par défaut) */
.grille {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* Tablette et plus */
@media (min-width: 768px) {
  .grille {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Écran large */
@media (min-width: 1200px) {
  .grille {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 4. Requêtes de conteneurs (*Container Queries*) : repoussé à plus tard dans la session

Les **container queries** permettent de adapter le style selon la **taille du conteneur parent**, pas la fenêtre.

### Syntaxe
```css
/* Définir le conteneur */
.parent {
  container-type: inline-size;
}

/* S'adapter selon la taille du conteneur */
@container (min-width: 400px) {
  .enfant {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

### Quand l'utiliser ?
- Composants réutilisables qui changent de largeur
- Layouts imbriqués complexes
- Mieux qu'une media query pour les composants isolés

---

## 5. Typographie adaptative

### Option 1 : Requêtes médias
```css
/* Mobile */
html {
  font-size: 0.875rem;
}

body {
    line-height: 1.5;
}

h1 {
  font-size: 1.5rem;
}

/* Tablette */
@media (min-width: 768px) {
  html {
    font-size: 1rem;
  }
}

/* Écran large */
@media (min-width: 1200px) {
  html {
    font-size: 1.25rem;
  }
  
  h1 {
    font-size: 2.25rem;
  }
}
```

### Option 2 : Typographie fluide avec `clamp()`
```css
html {
  /* min, préféré (viewport), max */
  font-size: clamp(0.75rem, 0.75rem + 0.5vw, 1.5rem);
}

h1 {
  font-size: clamp(24px, 5vw, 48px);
}
```

**`clamp(minimum, préféré, maximum)`** :
- **minimum** : Taille minimale (très petit écran)
- **préféré** : Ajusté automatiquement selon `vw` (% de largeur viewport)
- **maximum** : Taille maximale (très grand écran)

**Avantage** : Gère automatiquement tous les écrans entre min et max 🚀

---

## 6. Grille flexible avec flexbox

### Flex wrap (adaptation automatique)
```css
.grille {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tuile {
  /* Sur mobile : full width */
  flex: 1 1 100%;
  min-width: 250px;
}

@media (min-width: 768px) {
  .tuile {
    /* Sur tablette : 2 colonnes */
    flex: 1 1 calc(50% - 0.5rem);
  }
}

@media (min-width: 1200px) {
  .tuile {
    /* Sur large écran : 3+ colonnes */
    flex: 1 1 calc(33.333% - 0.7rem);
  }
}
```

### Ou avec CSS Grid (plus simple) : à voir bientôt en classe 
```css
.grille {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grille {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .grille {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 7. Espacement adaptatif

Utiliser des unités relatives pour que l'espacement s'ajuste aussi :

```css
/* Mobile */
section {
  padding: 1rem;
  margin: 1.5rem 0;
}

/* Tablette+ */
@media (min-width: 768px) {
  section {
    padding: 2rem;
    margin: 2rem 0;
  }
}
```

Ou avec `clamp()` pour une fluidité :
```css
section {
  padding: clamp(1rem, 5vw, 3rem);
  margin: clamp(1.5rem, 5vw, 3rem) 0;
}
```

---

## 8. Focus visible pour l'accessibilité

Ajouter un style visible pour les éléments focalisés au clavier :

```css
nav a {
  outline: none;
}

nav a:focus-visible {
  outline: 2px solid #0066cc;
  outline-offset: 4px;
}
```

**Pourquoi** : les utilisateurs qui naviguent au clavier (sans souris) doivent voir où ils sont ! ♿

---

## Checklist de la semaine
- [ ] Tester le design sur mobile, tablette (768px), et écran plus large (1200px)
- [ ] Ajouter au moins 2 breakpoints au CSS
- [ ] Implémenter une typographie adaptative (media query OU clamp)
- [ ] Utiliser flexbox avec flex-wrap (ou plus tard, CSS Grid)
- [ ] Ajouter `:focus-visible` sur la navigation
- [ ] Tester la navigation au clavier

---

## Ressources rapides

| Concept | À retenir |
|---------|-----------|
| **Mobile-first** | CSS de base pour mobile, ajouter avec `@media (min-width:...)` |
| **Breakpoint** | Point où le design change (768px, 1200px, etc.) |
| **Media query** | `@media (min-width: Xpx) { }` pour adapter le style |
| **Container query** | Adapter selon le conteneur parent, pas la fenêtre |
| **clamp()** | `clamp(min, vw, max)` pour un sizing fluide auto |
| **flex-wrap** | `flex-wrap: wrap;` pour des colonnes adaptatives |
| **focus-visible** | `:focus-visible` pour l'accessibilité clavier |

---

**Questions ? Consultez les tests et le code d'exemple de CinéTIM (à compléter au prochain cours ou par vous-même) ! 🎬**
