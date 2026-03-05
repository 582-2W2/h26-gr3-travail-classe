# Semaine 6 – Animations CSS par images-clés

## 🎯 Objectifs de la semaine
- Comprendre le rôle des animations dans l'**interface utilisateur (UI)**
- Créer des animations avec `@keyframes`
- Maîtriser les propriétés détaillées : durée, délai, itérations, direction, mode de remplissage, état de lecture
- Utiliser les fonctions temporelles **prédéfinies** (`linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `step-start`, `step-end`)
- Appliquer le raccourci `animation` proprement
- Produire des animations utiles à l'UX sans nuire à la lisibilité ni à la performance

---

## 1. Pourquoi animer en UI Web?

Une animation UI sert à :
- Donner un **retour visuel** (succès, erreur, chargement)
- Guider l'attention vers un élément important
- Expliquer une transition d'état (ouvert/fermé, actif/inactif)
- Rendre l'interface plus fluide et compréhensible

**Principe clé** : l'animation doit soutenir l'usage, pas distraire.

---

## 2. Base des images-clés (`@keyframes`)

### Syntaxe minimale
```css
@keyframes apparition {
	from {
		opacity: 0;
		translate: 0 8px;
	}
	to {
		opacity: 1;
		translate: 0 0;
	}
}
```

Puis on applique cette animation à un élément :
```css
.carte {
	animation-name: apparition;
	animation-duration: 300ms;
}
```

### Variante avec pourcentages
```css
@keyframes pulse {
	0% {
		scale: 1;
	}
	50% {
		scale: 1.04;
	}
	100% {
		scale: 1;
	}
}
```

---

## 3. Propriétés d'animation (détaillées)

### `animation-name`
Nom de l'animation déclarée avec `@keyframes`.

### `animation-duration`
Durée d'un cycle (`200ms`, `1s`, etc.).

### `animation-delay`
Temps d'attente avant le départ.

### `animation-timing-function`
Vitesse perçue pendant l'animation. Cette semaine :
- `linear`
- `ease`
- `ease-in`
- `ease-out`
- `ease-in-out`
- `step-start`
- `step-end`

### `animation-iteration-count`
Nombre de répétitions (`1`, `2`, `infinite`).

### `animation-direction`
- `normal`
- `reverse`
- `alternate`
- `alternate-reverse`

### `animation-fill-mode`
Comportement avant/après l'animation :
- `none`
- `forwards`
- `backwards`
- `both`

### `animation-play-state`
- `running`
- `paused`

---

## 4. Raccourci `animation`

```css
.notification {
	animation: apparition 250ms ease-out 0ms 1 normal both running;
}
```

Ordre courant (souple, mais à garder lisible) :
1. `name`
2. `duration`
3. `timing-function`
4. `delay`
5. `iteration-count`
6. `direction`
7. `fill-mode`
8. `play-state`

---

## 5. Exemples UI fréquents

### A) Apparition douce d'un panneau
```css
@keyframes panneau-entre {
	from {
		opacity: 0;
		translate: 0 -10px;
	}
	to {
		opacity: 1;
		translate: 0 0;
	}
}

.panneau.ouvert {
	animation: panneau-entre 220ms ease-out;
}
```

### B) Indicateur de chargement simple
```css
@keyframes rotation {
	from {
		rotate: 0deg;
	}
	to {
		rotate: 360deg;
	}
}

.spinner {
	animation: rotation 900ms linear infinite;
}
```

### C) Mise en valeur d'un bouton d'action
```css
@keyframes accent {
	0%, 100% {
		scale: 1;
	}
	50% {
		scale: 1.06;
	}
}

.btn-principal:focus-visible {
	animation: accent 320ms ease-in-out 1;
}
```

---

## 6. Bonnes pratiques pour une animation utile

- Garder des durées courtes (souvent entre `150ms` et `400ms`)
- Favoriser les propriétés plus fluides (`opacity`, `transform` / `translate` / `scale` / `rotate`)
- Éviter de multiplier les animations simultanées
- Animer surtout les changements d'état importants
- Prévoir l'accessibilité avec `prefers-reduced-motion`

### Fiche-résumé : performance des animations

#### Étapes de rendu du navigateur
1. `Style` : calcule les styles finaux.
2. `Layout` (**reflow**) : calcule tailles et positions.
3. `Paint` (**repaint**) : dessine les pixels.
4. `Composite` : assemble les calques à l'écran.

Règle générale de coût : `reflow` > `repaint` > `composite`.

#### Quoi animer (et quoi éviter)

| À privilégier | Pourquoi | À éviter en animation continue | Pourquoi |
|---|---|---|---|
| `transform` (`translate`, `scale`, `rotate`) | Souvent géré au niveau composite, plus fluide | `top`, `right`, `bottom`, `left` | Déclenche souvent layout + paint |
| `opacity` | Peu coûteux, transitions douces | `width`, `height` | Reflow fréquent si animé en continu |
| `filter` (usage modéré) | Effets visuels sans déplacer le layout | `margin`, `padding` | Modifie la géométrie, recalculs possibles |

#### Cas fréquent : ouvrir/fermer une boîte sans `height`
- Mouvement visuel fluide : `transform: scaleY(...)` (n'affecte pas l'espace du layout).
- Ouverture qui pousse réellement le contenu : `max-height` ou `grid-template-rows: 0fr -> 1fr`.
- Pour un déplacement horizontal/vertical : préférer `transform: translate(...)` à `left/top`.

### Respect de la réduction de mouvement
```css
@media (prefers-reduced-motion: reduce) {
	* {
		animation-duration: 0.01ms !important;
		animation-iteration-count: 1 !important;
	}
}
```

---

## 7. Limites de cette semaine

Cette semaine, on utilise seulement les fonctions temporelles **prédéfinies**.
Les fonctions temporelles personnalisées (ex. `cubic-bezier(...)`, `steps(...)` avancé) seront vues la semaine suivante.

---

## Checklist de la semaine
- [ ] Créer au moins une animation avec `@keyframes`
- [ ] Utiliser `animation-duration`, `animation-delay` et `animation-iteration-count`
- [ ] Tester au moins 3 mots-clés de `animation-timing-function`
- [ ] Utiliser le raccourci `animation` sur un composant UI
- [ ] Ajouter une animation utile (panneau, bouton, chargement, etc.)
- [ ] Prévoir un comportement pour `prefers-reduced-motion`

---

## Table de synthèse

| Élément | Rôle | Exemple |
|--------|------|---------|
| `@keyframes` | Définir les étapes d'animation | `from/to`, `0%-100%` |
| `animation-name` | Choisir la séquence | `animation-name: apparition;` |
| `animation-duration` | Définir la durée | `250ms`, `1s` |
| `animation-timing-function` | Définir le rythme | `ease-out`, `linear` |
| `animation-delay` | Retarder le départ | `animation-delay: 120ms;` |
| `animation-iteration-count` | Répéter l'animation | `1`, `infinite` |
| `animation-fill-mode` | Conserver un état avant/après | `forwards`, `both` |
| `animation` (raccourci) | Tout écrire en une ligne | `animation: nom 300ms ease;` |

---

**À retenir** : une bonne animation UI clarifie les interactions, accompagne les changements d'état et améliore la perception de qualité, sans ralentir ni distraire l'utilisateur.
