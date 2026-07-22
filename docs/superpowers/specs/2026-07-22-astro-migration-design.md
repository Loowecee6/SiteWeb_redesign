# Design Spec: Refonte BLUECOM Stratégies vers Astro

**Date :** 2026-07-22
**Auteur :** Opencode (assistant)
**Statut :** Approuvé

---

## Résumé

Refonte majeure du site BLUECOM Stratégies (agence de communication institutionnelle basée à Dakar) vers **Astro** avec **Content Collections** pour la gestion du contenu. Migration progressive sur une nouvelle branche Git, sans interruption de service.

---

## Contexte

### Site actuel
- **URL :** bluecom-strategies.sn
- **Stack :** HTML/CSS/JS statique + Sanity CMS pour le blog
- **Cible :** Dirigeants d'entreprise et décideurs institutionnels en Afrique de l'Ouest
- **Positionnement :** Premium, communication institutionnelle

### Problèmes identifiés
1. CSS monolithique (3893 lignes) avec styles dupliqués
2. Inline styles dans le HTML
3. Sanity CMS complexe pour un site principalement statique
4. Gold (#C9A84C) sur blanc = contraste 3.2:1 (AA Large only)
5. Pas de component model réutilisable
6. Blog avec fallback fragile en cas d'erreur JS
7. Formulaire sans backend configuré

---

## Décisions techniques

| Choix | Option retenue | Justification |
|---|---|---|
| **Framework** | Astro | Islands architecture, excellent pour les sites vitrines, bon SEO |
| **CSS** | CSS modulaire + Variables | Remplace le CSS monolithique, tokens de design réutilisables |
| **CMS** | Astro Content Collections | Élimine la dépendance Sanity, tout en Git |
| **Blog** | Markdown + Content Collections | Simple, fiable, pas de service externe |
| **Formulaire** | Formspree ou Netlify Forms | Pas de backend à gérer |
| **Déploiement** | Vercel | Déploiement automatique, preview deploys, edge network |
| **Typographie** | Cormorant Garamond + Outfit | Conservée du site actuel |
| **Palette** | Bleu Deep #004080, Gold #C9A84C, Anthracite #1a1a1a | Conservée du site actuel |

---

## Architecture

### Structure des dossiers

```
bluecom-strategies/
├── public/
│   ├── fonts/
│   ├── images/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── BackToTop.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Team.astro
│   │   │   ├── Services.astro
│   │   │   ├── Methodology.astro
│   │   │   ├── Portfolio.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── Blog.astro
│   │   │   ├── Marquee.astro
│   │   │   └── Contact.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── Card.astro
│   │       ├── SectionLabel.astro
│   │       ├── GrainOverlay.astro
│   │       └── SkipLink.astro
│   ├── content/
│   │   ├── config.ts
│   │   ├── blog/
│   │   └── portfolio/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── methodology.astro
│   │   ├── portfolio.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   └── 404.astro
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   └── utils/
│       └── formatters.ts
├── astro.config.mjs
├── tsconfig.json
└── package.json
```

### Principes architecturaux
- Chaque section du site = un composant `.astro` réutilisable
- Contenu géré via Content Collections avec schéma TypeScript
- Layouts séparés pour les pages et les articles de blog
- CSS modulaire avec tokens de design
- JavaScript côté client uniquement pour : navigation mobile, animations scroll, formulaire

---

## Design System

### Tokens de design

```css
:root {
  /* Couleurs */
  --blue-deep: #004080;
  --gold: #C9A84C;
  --anthracite: #1a1a1a;
  --cream: #faf8f5;
  --white: #ffffff;
  
  /* Typographie */
  --font-serif: 'Cormorant Garamond', serif;
  --font-sans: 'Outfit', sans-serif;
  
  /* Espacement */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  
  /* Breakpoints */
  --bp-sm: 576px;
  --bp-md: 768px;
  --bp-lg: 992px;
  --bp-xl: 1200px;
}
```

### Composants UI

| Composant | Description | Props |
|---|---|---|
| `Button.astro` | Bouton avec variantes | `variant`, `href`, `type`, `ariaLabel` |
| `Card.astro` | Carte avec ombre | `variant` (team, service, testimonial) |
| `SectionLabel.astro` | Label au-dessus des titres | `text`, `align` |
| `GrainOverlay.astro` | Texture grain SVG | `opacity`, `blendMode` |
| `SkipLink.astro` | Lien d'évitement | `targetId` |
| `BackToTop.astro` | Bouton retour en haut | - |

---

## Accessibilité (WCAG 2.1 AA)

| Critère | Implémentation |
|---|---|
| Contraste texte | Gold uniquement en 18px+ ou bold |
| Skip link | Présent sur toutes les pages |
| Focus visible | Outline doré 2px |
| Reduced motion | Respect de `prefers-reduced-motion` |
| ARIA | `aria-label`, `aria-expanded`, `aria-controls` |
| Images | `alt` text descriptif |
| Formulaire | `aria-describedby` pour lier erreurs aux champs |

---

## Gestion du contenu

### Content Collections

```typescript
// src/content/config.ts
const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});
```

### Flux de mise à jour
1. **Contenu rare** (équipe, services) → modification des fichiers TypeScript + commit
2. **Contenu fréquent** (blog) → ajout de fichiers Markdown + commit
3. **Déploiement** → push vers `main` → Vercel déploie automatiquement

---

## Stratégie de test

| Type | Outil | Objectif |
|---|---|---|
| Linting | ESLint + Prettier | Code style |
| Type checking | TypeScript strict | Pas d'erreurs de type |
| Accessibilité | axe-core + Lighthouse | WCAG 2.1 AA |
| Performance | Lighthouse | Score > 90 |
| SEO | Lighthouse | Score > 90 |

### Commandes

```bash
npm run dev        # Développement local
npm run build      # Build de production
npm run preview    # Prévisualisation
npm run lint       # Vérification du code
```

---

## Stratégie de migration

### Approche progressive
1. Créer branche `feature/astro-migration`
2. Initialiser le projet Astro
3. Migrer page par page (home → about → services → etc.)
4. Tester chaque page individuellement
5. Garder le site actuel en production pendant la migration
6. Basculer une fois toutes les pages migrées et testées

### Ordre de migration
1. Configuration de base (Astro, TypeScript, CSS tokens)
2. Layouts (BaseLayout, composants UI)
3. Page d'accueil (Hero, About, Team, Services, Methodology, Portfolio, Testimonials, Blog, Contact)
4. Pages secondaires (about, services, methodology, portfolio)
5. Blog (Content Collections)
6. 404
7. Optimisations finales (performance, SEO, accessibilité)

---

## Non-goals

- Pas de backend custom
- Pas d'espace client
- Pas d'e-learning
- Pas de multi-langue (pour l'instant)
- Pas de PWA
