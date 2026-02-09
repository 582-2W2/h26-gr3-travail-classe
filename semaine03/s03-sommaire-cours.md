# Semaine 3 – Images adaptatives

## 🎯 Objectifs de la semaine
- Comprendre la **mise en page adaptative** (suite)
- Maîtriser les **images adaptatives** avec CSS
- Utiliser l'élément `<picture>` pour servir différentes images
- Implémenter `srcset` et `media` pour optimiser les images
- Choisir la bonne stratégie selon le contexte

---

## 1. Mise en page adaptative (suite)

### Rappel des breakpoints
```css
/* Mobile (par défaut) */
/* ... */

/* Tablette */
@media (min-width: 768px) {
  /* ... */
}

/* Écran large */
@media (min-width: 1200px) {
  /* ... */
}
```

### Adaptation du contenu
- **Layout** : Colonnes qui changent de nombre
- **Espacement** : Padding/margin qui augmentent
- **Typographie** : Tailles de polices qui croissent
- **Images** : Fichiers différents selon le contexte

---

## 2. Images adaptatives avec CSS

### Rendre une image fluide
```css
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```

**Explications** :
- `max-width: 100%` : L'image ne dépasse pas son conteneur
- `height: auto` : Le ratio d'aspect est préservé
- `display: block` : Évite l'espace blanc sous l'image

### Adapter la taille selon l'écran
```css
/* Mobile */
.hero img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

/* Tablette+ */
@media (min-width: 768px) {
  .hero img {
    height: 400px;
  }
}
```

### `object-fit` : Remplir l'espace
```css
img {
  width: 100%;
  height: 300px;
  object-fit: cover;      /* Recadre pour remplir */
  object-position: 50% 50%; /* Centre du recadrage */
}
```

**Valeurs courantes** :
- `cover` : Remplit le conteneur (peut recadrer)
- `contain` : Rentre entièrement (peut laisser du vide)
- `fill` : Étire pour remplir exactement

---

## 3. Élément `<picture>` – Images multiples

### Syntaxe de base
```html
<picture>
  <source media="(min-width: 1200px)" srcset="bureau.jpg">
  <source media="(min-width: 768px)" srcset="tablette.jpg">
  <img src="mobile.jpg" alt="Description de l'image">
</picture>
```

**Comment ça marche** :
1. Le navigateur évalue chaque `<source>` de haut en bas
2. Le premier `media` valide est utilisé
3. Si aucun ne correspond, la valeur dans l'attribut `src` de l'élément `<img>` est utilisée (*fallback*)

### Utilité
- Servir une **image différente** selon la taille de l'écran
- Économiser de la bande passante (mobile = image plus petite)
- Optimiser pour différentes résolutions (*retina*)
- Adapter l'image d'un point de vue éditorial

---

## 4. Attribut `srcset` – Résolutions multiples

### Gérer les écrans haute densité (retina)
```html
<img 
  src="photo.jpg"
  srcset="photo.jpg 1x, photo@2x.jpg 2x"
  alt="Ma photo"
>
```

**Signification** :
- `photo.jpg 1x` : Écran normal
- `photo@2x.jpg 2x` : Écran retina (2× les pixels)

---

## 5. Combiner `<picture>` + `srcset`

### Cas complet : images différentes + résolutions
```html
<picture>
  <source 
    media="(min-width: 1200px)"
    srcset="desktop.jpg 1x, desktop@2x.jpg 2x"
  >
  <source 
    media="(min-width: 768px)"
    srcset="tablet.jpg 1x, tablet@2x.jpg 2x"
  >
  <img 
    src="mobile.jpg"
    srcset="mobile.jpg 1x, mobile@2x.jpg 2x"
    alt="Ma photo"
  >
</picture>
```

**Avantage** : Optimisation complète = images rapides et adaptées 🚀

---

## 6. Formats d'images modernes

### WebP (plus léger, meilleure qualité)
```html
<picture>
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Ma photo">
</picture>
```

### AVIF (encore plus léger)
```html
<picture>
  <source srcset="photo.avif" type="image/avif">
  <source srcset="photo.webp" type="image/webp">
  <img src="photo.jpg" alt="Ma photo">
</picture>
```

**Fallback** : Si le navigateur ne supporte pas AVIF/WebP, il utilise JPG.

---

## 7. Cas pratiques courants

### Bannière héroïque adaptative
```html
<picture>
  <source media="(min-width: 1200px)" srcset="hero-bureau.jpg">
  <source media="(min-width: 768px)" srcset="hero-tablette.jpg">
  <img src="hero-mobile.jpg" alt="Bannière" style="width: 100%; height: auto;">
</picture>
```

---

## Checklist de la semaine
- [ ] Implémenter `max-width: 100%` sur les images
- [ ] Utiliser `object-fit: cover` si nécessaire
- [ ] Créer au moins un `<picture>` adaptatif
- [ ] Utiliser `srcset` pour les résolutions
- [ ] Tester sur mobile/tablette/bureau
- [ ] Utiliser au moins un format moderne (WebP ou AVIF)

---

## Table de synthèse

| Technique | Quand l'utiliser | Avantage |
|-----------|------------------|---------|
| `max-width: 100%` | Toujours | Image fluide simple |
| `object-fit` | Images carrées/fixes | Remplissage flexible |
| `<picture>` | Images très différentes | Meilleur contrôle |
| `srcset` 1x/2x | Écrans retina | Optimisation simple |
| `WebP`/`AVIF` | Tous les cas | Réduction de taille |

---

**Ressources rapides** : Testez vos images sur [ImageOptim](https://imageoptim.com/) ou [Squoosh](https://squoosh.app/) ! 📸
