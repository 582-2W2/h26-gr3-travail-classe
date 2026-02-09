# Semaine 1 - Revision bases HTML/CSS/JS

## 🎯 Objectifs de la semaine
- Reviser la structure HTML5 semantique (header/nav/main/footer, section/article).
- Reviser flexbox, selecteurs, transitions et transformations CSS.
- Faire une manipulation minimale du DOM (querySelector, evenements de souris, modification du style).

---

## 1. Structure HTML5 semantique

### Balises de base
- `header` : en-tete (logo, nav, titre).
- `nav` : navigation principale.
- `main` : contenu principal unique.
- `section` : regroupement thematique.
- `article` : contenu autonome.
- `footer` : pied de page.

### Exemple minimal
```html
<body>
  <header>
    <nav>
      <a href="index.html">Accueil</a>
      <a href="films.html">Films</a>
    </nav>
  </header>

  <main>
    <section>
      <h1>Titre principal</h1>
      <p>Intro du contenu.</p>
    </section>
  </main>

  <footer>
    <small>© 2026</small>
  </footer>
</body>
```

---

## 2. Selecteurs CSS essentiels

### Selecteurs de base
```css
/* element */
body { margin: 0; }

/* classe */
.hero { padding: 2rem; }

/* id */
#btn-essai { background: black; }

/* descendant */
nav a { text-decoration: none; }

/* etat */
nav a:hover { text-decoration: underline; }
```

### Bonnes pratiques
- Eviter les selecteurs trop precis.
- Privilegier les classes pour le style.
- Garder une structure lisible.

---

## 3. Flexbox (mise en page rapide)

### Mise en ligne simple
```css
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
```

### Grille simple
```css
.grille {
  display: flex;
  gap: 1rem;
}

.tuile {
  flex: 1 1 0;
}
```

### Rappels
- `display: flex` active le mode flex.
- `justify-content` aligne horizontalement.
- `align-items` aligne verticalement.
- `gap` ajoute de l'espacement.

---

## 4. Transitions et transformations

### Transition
```css
.btn {
  transition: translate 150ms ease-out, box-shadow 150ms;
}

.btn:hover {
  translate: 0 -2px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}
```

### Transformations courantes
- `translate` : deplacement.
- `scale` : mise à l'échelle (agrandissement, etc.)
- `rotate` : rotation.

---

## 5. JS minimal - DOM et événements

### Selection d'un element
```js
const bouton = document.querySelector("#btn-essai");
```

### Evenement de souris
```js
bouton.addEventListener("click", gererClic);

function gererClic(evt) => {
  console.log("Clic !", evt);
}
```

### Modifier le style
```js
bouton.addEventListener("click", gererClic);

function gererClic(evt) {
  bouton.style.borderRadius = (Math.floor(Math.random()*41) + 10) + "%"; 
}
```

---

## Checklist de la semaine
- [ ] Structure HTML semantique complete.
- [ ] Navigation claire avec liens.
- [ ] Mise en page avec flexbox.
- [ ] Transitions et transformations appliquees.
- [ ] JS : selection + evenement + changement de style.

---

## A retenir
- Une structure HTML propre facilite le CSS et le JS.
- Flexbox est parfait pour aligner et distribuer.
- Une transition rend les interactions plus fluides.
- Le JS de base suffit pour un premier niveau d'interaction.
