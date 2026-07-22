# BLUECOM Stratégies Astro Migration - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the BLUECOM Stratégies website from static HTML/CSS/JS to Astro with Content Collections.

**Architecture:** Progressive migration on a new Git branch. Astro components with CSS custom properties for the design system, Content Collections for blog content, and minimal client-side JS for navigation, scroll animations, and form handling.

**Tech Stack:** Astro 5.x, TypeScript, CSS Custom Properties, Content Collections (Markdown), Vercel

## Global Constraints
- Site target: bluecom-strategies.sn
- Cible: dirigeants/C-Suite en Afrique de l'Ouest
- Palette: --blue-deep: #004080, --gold: #C9A84C, --anthracite: #1a1a1a
- Fonts: Cormorant Garamond (display) + Outfit (body)
- WCAG 2.1 AA compliance required
- Gold (#C9A84C) on white = 3.2:1 contrast — use only at 18px+ or bold
- Reduced motion: respect prefers-reduced-motion

---

## Task 1: Project Setup & Branch

**Estimated time:** 10 min
**Depends on:** Nothing

- [ ] **Step 1.1:** Create feature branch

```bash
git checkout -b feature/astro-migration
```

Expected output: `Switched to a new branch 'feature/astro-migration'`

- [ ] **Step 1.2:** Initialize Astro project in subdirectory

```bash
npm create astro@latest bluecom-astro -- --template basics --no-install --no-git --typescript strict
```

Expected output: `Project initialized!`

- [ ] **Step 1.3:** Install dependencies

```bash
cd bluecom-astro && npm install
```

Expected output: `added XX packages`

- [ ] **Step 1.4:** Create `bluecom-astro/astro.config.mjs`

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://bluecom-strategies.sn',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  vite: {
    css: {
      preprocessorOptions: {},
    },
  },
});
```

- [ ] **Step 1.5:** Create `bluecom-astro/tsconfig.json`

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 1.6:** Add npm scripts to `bluecom-astro/package.json` — edit the `"scripts"` block:

```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "lint": "tsc --noEmit"
  }
}
```

- [ ] **Step 1.7:** Copy assets from old site

```bash
mkdir -p bluecom-astro/public/images/team
mkdir -p bluecom-astro/public/images/blog
cp "assets/logo BLUECOM_fond_blanc.png" bluecom-astro/public/images/logo.png
cp assets/images/* bluecom-astro/public/images/ 2>/dev/null || true
cp assets/favicon.png bluecom-astro/public/favicon.png 2>/dev/null || true
```

- [ ] **Step 1.8:** Remove default Astro files

```bash
rm -f bluecom-astro/src/pages/index.astro
rm -f bluecom-astro/src/components/Counter.astro 2>/dev/null || true
```

- [ ] **Step 1.9:** Verify dev server starts

```bash
cd bluecom-astro && npx astro dev --port 4321 &
sleep 5 && curl -s http://localhost:4321/ | head -5
kill %1 2>/dev/null || true
```

Expected output: HTML response from Astro dev server

- [ ] **Step 1.10:** Commit

```bash
git add bluecom-astro/ && git commit -m "feat: init Astro project with config and assets"
```

---

## Task 2: Design System - CSS Tokens & Global Styles

**Estimated time:** 15 min
**Depends on:** Task 1

- [ ] **Step 2.1:** Create `bluecom-astro/src/styles/variables.css`

```css
:root {
  /* Colors */
  --blue-deep: #004080;
  --blue-mid: #005599;
  --blue-light-bg: #E8F0F8;
  --blue-accent: #0066CC;
  --blue-dark: #001a33;

  --anthracite: #1a1a1a;
  --grey-light: #F5F5F5;
  --grey-mid: #999999;
  --grey-dark: #666666;
  --white: #FFFFFF;
  --cream: #F8F6F3;

  --gold: #C9A84C;
  --gold-light: #E5D4A1;

  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Outfit', system-ui, sans-serif;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  --container-max: 1400px;
  --section-padding: 120px;

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
  --transition-bounce: 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Shadows */
  --shadow-sm: 0 4px 10px rgba(0, 64, 128, 0.05);
  --shadow-md: 0 10px 30px rgba(0, 64, 128, 0.1);
  --shadow-lg: 0 20px 60px rgba(0, 64, 128, 0.15);
  --shadow-gold: 0 10px 30px rgba(201, 168, 76, 0.2);
}
```

- [ ] **Step 2.2:** Create `bluecom-astro/src/styles/global.css`

```css
@import './variables.css';

/* Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}

body {
  font-family: var(--font-body);
  color: var(--anthracite);
  background: var(--white);
  overflow-x: hidden;
  line-height: 1.6;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

ul, ol {
  list-style: none;
}

/* Container */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 48px;
}

@media (max-width: 768px) {
  .container {
    padding: 0 24px;
  }
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  line-height: 1.15;
}

/* Section Label */
.section-label {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.section-label-line {
  width: 48px;
  height: 2px;
  background: var(--gold);
  position: relative;
}

.section-label-line::after {
  content: '';
  position: absolute;
  right: -8px;
  top: -3px;
  width: 8px;
  height: 8px;
  background: var(--gold);
  transform: rotate(45deg);
}

.section-label span {
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  font-weight: 500;
  color: var(--gold);
}

.section-title {
  font-family: var(--font-display);
  font-size: 48px;
  font-weight: 600;
  color: var(--anthracite);
  line-height: 1.15;
  margin-bottom: 24px;
  letter-spacing: -0.02em;
}

.section-title em {
  font-style: italic;
  font-weight: 400;
  color: var(--blue-deep);
}

.section-sub {
  font-family: var(--font-body);
  font-size: 17px;
  color: var(--grey-dark);
  line-height: 1.7;
  max-width: 560px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 64px;
  gap: 48px;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    margin-bottom: 40px;
  }
  .section-title {
    font-size: 32px;
  }
}

/* Sections */
section {
  padding: var(--section-padding) 0;
}

@media (max-width: 768px) {
  section {
    padding: 64px 0;
  }
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: var(--gold);
  color: var(--blue-dark);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 2px solid var(--gold);
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
}

.btn-primary:hover {
  background: var(--white);
  border-color: var(--white);
  color: var(--blue-dark);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: transparent;
  color: var(--white);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 4px;
  cursor: pointer;
  transition: all var(--transition-normal);
  text-decoration: none;
}

.btn-secondary:hover {
  background: var(--white);
  color: var(--blue-deep);
  border-color: var(--white);
}

.btn-arrow {
  transition: transform var(--transition-normal);
}

.btn-primary:hover .btn-arrow,
.btn-secondary:hover .btn-arrow {
  transform: translateX(4px);
}

/* Skip Link */
.skip-link {
  position: absolute;
  top: -100%;
  left: 16px;
  z-index: 10000;
  padding: 12px 24px;
  background: var(--gold);
  color: var(--blue-dark);
  font-weight: 600;
  border-radius: 0 0 4px 4px;
  transition: top var(--transition-fast);
}

.skip-link:focus {
  top: 0;
}

/* Focus Visible */
:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 2px;
}

/* Grain Overlay */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

/* Back to Top */
.back-to-top {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 999;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gold);
  color: var(--blue-dark);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  transition: all var(--transition-normal);
  box-shadow: var(--shadow-gold);
}

.back-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.back-to-top:hover {
  background: var(--white);
  color: var(--blue-deep);
}

.back-to-top svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 42px;
    height: 42px;
  }
}

/* Scroll Reveal */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.1s; }
.reveal-delay-2 { transition-delay: 0.2s; }
.reveal-delay-3 { transition-delay: 0.3s; }
.reveal-delay-4 { transition-delay: 0.4s; }

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 2.3:** Commit

```bash
git add bluecom-astro/src/styles/ && git commit -m "feat: add CSS design tokens and global styles"
```

---

## Task 3: Base Layout & Skip Link

**Estimated time:** 15 min
**Depends on:** Task 2

- [ ] **Step 3.1:** Create `bluecom-astro/src/components/ui/SkipLink.astro`

```astro
---
---
<a href="#main-content" class="skip-link">Aller au contenu principal</a>
```

- [ ] **Step 3.2:** Create `bluecom-astro/src/components/ui/GrainOverlay.astro`

```astro
---
---
<div class="grain-overlay" aria-hidden="true"></div>
```

- [ ] **Step 3.3:** Create `bluecom-astro/src/layouts/BaseLayout.astro`

```astro
---
interface Props {
  title: string;
  description?: string;
  ogImage?: string;
  canonical?: string;
  schema?: Record<string, unknown>;
}

const {
  title,
  description = "Agence de conseil en communication institutionnelle dédiée aux dirigeants, entreprises et collectivités.",
  ogImage = "/images/og-image.jpg",
  canonical,
  schema,
} = Astro.props;

const siteUrl = 'https://bluecom-strategies.sn';
const currentCanonical = canonical || `${siteUrl}${Astro.url.pathname}`;
const schemaJson = schema || {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "BLUECOM Stratégies",
  "url": siteUrl,
  "logo": `${siteUrl}/images/logo.png`,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Résidence Adja Farma GUEYE, 4ème étage",
    "addressLocality": "Dakar",
    "addressCountry": "SN"
  },
  "telephone": "+221338277788",
  "email": "Bluecom@orange.sn",
  "description": "Agence de conseil en communication institutionnelle avec 10 ans d'expertise au Sénégal et en Afrique de l'Ouest."
};
---
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content={description}>
  <meta property="og:title" content={title}>
  <meta property="og:description" content={description}>
  <meta property="og:type" content="website">
  <meta property="og:url" content={currentCanonical}>
  <meta property="og:image" content={`${siteUrl}${ogImage}`}>
  <meta property="og:locale" content="fr_SN">
  <meta property="og:site_name" content="BLUECOM Stratégies">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={title}>
  <meta name="twitter:description" content={description}>
  <link rel="canonical" href={currentCanonical}>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/png" href="/favicon.png">
  <script type="application/ld+json" set:html={JSON.stringify(schemaJson)} />
  <style>
    @import '../styles/global.css';
  </style>
  <slot name="head" />
</head>
<body>
  <slot name="skip" />
  <slot name="grain" />
  <slot />
  <slot name="scripts" />
</body>
</html>
```

- [ ] **Step 3.4:** Commit

```bash
git add bluecom-astro/src/components/ui/ bluecom-astro/src/layouts/ && git commit -m "feat: add BaseLayout with meta, OG, Schema.org, skip link, grain overlay"
```

---

## Task 4: UI Components

**Estimated time:** 15 min
**Depends on:** Task 3

- [ ] **Step 4.1:** Create `bluecom-astro/src/components/ui/Button.astro`

```astro
---
interface Props {
  variant?: 'primary' | 'secondary';
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

const { variant = 'primary', href, type = 'button', ariaLabel } = Astro.props;
const className = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
---

{href ? (
  <a href={href} class={className} aria-label={ariaLabel}>
    <slot />
  </a>
) : (
  <button type={type} class={className} aria-label={ariaLabel}>
    <slot />
  </button>
)}
```

- [ ] **Step 4.2:** Create `bluecom-astro/src/components/ui/SectionLabel.astro`

```astro
---
interface Props {
  text: string;
  align?: 'left' | 'center';
}

const { text, align = 'left' } = Astro.props;
---

<div class="section-label" style={`justify-content: ${align === 'center' ? 'center' : 'flex-start'};`}>
  <div class="section-label-line"></div>
  <span>{text}</span>
</div>
```

- [ ] **Step 4.3:** Create `bluecom-astro/src/components/ui/BackToTop.astro`

```astro
---
---
<button class="back-to-top" id="back-top" aria-label="Retour en haut">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
</button>

<script>
  const backTop = document.getElementById('back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
</script>
```

- [ ] **Step 4.4:** Commit

```bash
git add bluecom-astro/src/components/ui/ && git commit -m "feat: add Button, SectionLabel, BackToTop UI components"
```

---

## Task 5: Layout Components (Header, Navigation, Footer)

**Estimated time:** 20 min
**Depends on:** Task 4

- [ ] **Step 5.1:** Create `bluecom-astro/src/components/layout/Navigation.astro`

```astro
---
const navItems = [
  { label: "L'Agence", href: "/about/" },
  { label: "Expertises", href: "/services/" },
  { label: "Méthodologie", href: "/methodology/" },
  { label: "Réalisations", href: "/portfolio/" },
  { label: "Blog", href: "/blog/" },
];

const ctaItem = { label: "Prendre RDV", href: "/#contact" };
---

<button class="menu-toggle" aria-label="Ouvrir le menu de navigation" aria-expanded="false" aria-controls="navLinks">
  <span></span>
  <span></span>
  <span></span>
</button>

<ul id="navLinks" class="nav-links">
  {navItems.map((item) => (
    <li>
      <a href={item.href}>{item.label}</a>
    </li>
  ))}
  <li>
    <a href={ctaItem.href} class="nav-cta">{ctaItem.label}</a>
  </li>
</ul>

<style>
  .menu-toggle {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    z-index: 1001;
  }

  .menu-toggle span {
    width: 24px;
    height: 2px;
    background: var(--white);
    border-radius: 2px;
    transition: all var(--transition-normal);
  }

  .menu-toggle[aria-expanded="true"] span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }
  .menu-toggle[aria-expanded="true"] span:nth-child(2) {
    opacity: 0;
  }
  .menu-toggle[aria-expanded="true"] span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 32px;
  }

  .nav-links a {
    font-family: var(--font-body);
    font-size: 14px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    letter-spacing: 0.3px;
    transition: color var(--transition-normal);
    position: relative;
  }

  .nav-links a:hover,
  .nav-links a[aria-current="page"] {
    color: var(--white);
  }

  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--gold);
    transition: width var(--transition-normal);
  }

  .nav-links a:hover::after {
    width: 100%;
  }

  .nav-cta {
    padding: 10px 20px !important;
    background: var(--gold) !important;
    color: var(--blue-dark) !important;
    font-weight: 600 !important;
    border-radius: 4px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 12px !important;
  }

  .nav-cta::after {
    display: none !important;
  }

  .nav-cta:hover {
    background: var(--white) !important;
  }

  @media (max-width: 992px) {
    .menu-toggle {
      display: flex;
    }

    .nav-links {
      position: fixed;
      top: 0;
      right: -100%;
      width: 300px;
      height: 100vh;
      background: var(--blue-dark);
      flex-direction: column;
      justify-content: center;
      gap: 24px;
      padding: 32px;
      transition: right var(--transition-normal);
      box-shadow: -10px 0 30px rgba(0, 0, 0, 0.3);
    }

    .nav-links.open {
      right: 0;
    }

    .nav-links a {
      font-size: 18px;
    }
  }
</style>

<script>
  const toggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
</script>
```

- [ ] **Step 5.2:** Create `bluecom-astro/src/components/layout/Header.astro`

```astro
---
import Navigation from './Navigation.astro';
---

<header id="navbar">
  <div class="nav-inner container">
    <a href="/" class="logo" aria-label="BLUECOM Stratégies - Accueil">
      <img src="/images/logo.png" alt="BLUECOM Logo" width="180" height="48">
    </a>
    <Navigation />
  </div>
</header>

<style>
  header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    padding: 20px 0;
    transition: all var(--transition-normal);
  }

  header.scrolled {
    background: rgba(0, 26, 51, 0.95);
    backdrop-filter: blur(10px);
    padding: 12px 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  }

  .nav-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo img {
    height: 48px;
    width: auto;
  }

  @media (max-width: 992px) {
    .logo img {
      height: 36px;
    }
  }
</style>

<script>
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }
</script>
```

- [ ] **Step 5.3:** Create `bluecom-astro/src/components/layout/Footer.astro`

```astro
---
const currentYear = new Date().getFullYear();

const navLinks = [
  { label: "Notre ADN", href: "/about/" },
  { label: "Expertises", href: "/services/" },
  { label: "Méthodologie", href: "/methodology/" },
  { label: "Réalisations", href: "/portfolio/" },
  { label: "Blog", href: "/blog/" },
  { label: "Contact", href: "/#contact" },
];

const servicesLinks = [
  { label: "Stratégie & Conseil", href: "/services/" },
  { label: "Media Training", href: "/services/" },
  { label: "Gestion de Crise", href: "/services/" },
  { label: "Webmarketing", href: "/services/" },
  { label: "Relations Publiques", href: "/services/" },
  { label: "Production Audiovisuelle", href: "/services/" },
];

const resourcesLinks = [
  { label: "Blog", href: "/blog/" },
  { label: "Portfolio", href: "/portfolio/" },
  { label: "Mentions légales", href: "/mentions-legales/" },
  { label: "Politique de confidentialité", href: "/politique-confidentialite/" },
];
---

<footer>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/" class="logo" aria-label="BLUECOM Stratégies - Accueil">
          <img src="/images/logo.png" alt="BLUECOM Logo" width="180" height="48">
        </a>
        <p>BLUECOM Stratégies est votre partenaire de confiance pour la communication institutionnelle et le conseil aux dirigeants au Sénégal et en Afrique de l'Ouest.</p>
      </div>
      <div class="footer-col">
        <h4>Navigation</h4>
        <ul class="footer-links">
          {navLinks.map((link) => (
            <li><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Expertises</h4>
        <ul class="footer-links">
          {servicesLinks.map((link) => (
            <li><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      </div>
      <div class="footer-col">
        <h4>Ressources</h4>
        <ul class="footer-links">
          {resourcesLinks.map((link) => (
            <li><a href={link.href}>{link.label}</a></li>
          ))}
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© {currentYear} BLUECOM Stratégies. Tous droits réservés.</p>
      <p>Conçu avec soin pour l'excellence africaine</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: var(--blue-dark);
    color: var(--white);
    padding: 80px 0 32px;
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr;
    gap: 48px;
    margin-bottom: 48px;
  }

  .footer-brand p {
    color: rgba(255, 255, 255, 0.6);
    font-size: 14px;
    line-height: 1.7;
    margin-top: 20px;
    max-width: 320px;
  }

  .footer-brand .logo img {
    height: 48px;
    width: auto;
  }

  .footer-col h4 {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--gold);
    margin-bottom: 20px;
  }

  .footer-links {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-links a {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    transition: color var(--transition-normal);
  }

  .footer-links a:hover {
    color: var(--white);
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 32px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 13px;
    color: rgba(255, 255, 255, 0.4);
  }

  @media (max-width: 992px) {
    .footer-grid {
      grid-template-columns: 1fr 1fr;
      gap: 40px;
    }
  }

  @media (max-width: 576px) {
    .footer-grid {
      grid-template-columns: 1fr;
      gap: 32px;
    }
    .footer-bottom {
      flex-direction: column;
      gap: 8px;
      text-align: center;
    }
  }
</style>
```

- [ ] **Step 5.4:** Commit

```bash
git add bluecom-astro/src/components/layout/ && git commit -m "feat: add Header, Navigation, Footer layout components"
```

---

## Task 6: Data Files

**Estimated time:** 10 min
**Depends on:** Task 1

- [ ] **Step 6.1:** Create `bluecom-astro/src/data/team.ts`

```ts
export interface TeamMember {
  name: string;
  role: string;
  badge: string;
  image: string;
  bio: string;
  alt: string;
}

export const team: TeamMember[] = [
  {
    name: "Ibrahima Souleymane NDIAYE",
    role: "Expert en communication",
    badge: "Directeur Associé",
    image: "/images/team/ibrahima-ndiaye.jpg",
    bio: "Ancien Directeur de la Télévision Nationale et ancien Conseiller en communication à l'UEMOA.",
    alt: "Ibrahima Souleymane NDIAYE, Directeur Associé de BLUECOM Stratégies",
  },
  {
    name: "Cheikh Tidiane FALL",
    role: "Expert en communication",
    badge: "Directeur Associé",
    image: "/images/team/cheikh-tidiane-fall.jpg",
    bio: "Ancien Rédacteur en Chef au Quotidien National Le Soleil, et ancien Directeur de la Communication de la Sénégalaise Des Eaux.",
    alt: "Cheikh Tidiane FALL, Directeur Associé de BLUECOM Stratégies",
  },
];
```

- [ ] **Step 6.2:** Create `bluecom-astro/src/data/services.ts`

```ts
export interface Service {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    number: "01",
    title: "Stratégie & Conseil",
    description: "Audit, positionnement d'image et élaboration de plateformes de marque percutantes.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-deep)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>`,
  },
  {
    number: "02",
    title: "Media Training",
    description: "Préparation aux interventions presse, radio et TV. Maîtrise du discours et de la posture.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-deep)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>`,
  },
  {
    number: "03",
    title: "Gestion de Crise",
    description: "Anticipation, veille et pilotage de communication sensible pour protéger votre organisation.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-deep)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4L12 14.01l-3-3" /></svg>`,
  },
  {
    number: "04",
    title: "Webmarketing",
    description: "Conception de sites vitrines, SEO, campagnes digitales et stratégies réseaux sociaux.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-deep)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>`,
  },
  {
    number: "05",
    title: "Relations Publiques",
    description: "Interactions avec les décideurs locaux et nationaux, cartographie et influence.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-deep)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  },
  {
    number: "06",
    title: "Production Audiovisuelle",
    description: "Création de contenus vidéo institutionnels, reportages et interviews de dirigeants.",
    icon: `<svg viewBox="0 0 24 24" fill="none" stroke="var(--blue-deep)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>`,
  },
];
```

- [ ] **Step 6.3:** Create `bluecom-astro/src/data/stats.ts`

```ts
export interface Stat {
  value: string;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "10", suffix: "+", label: "Ans d'expérience" },
  { value: "5k", suffix: "+", label: "Clients conseillés" },
  { value: "10k", suffix: "+", label: "Heures de formation" },
  { value: "98", suffix: "%", label: "Taux de satisfaction" },
];
```

- [ ] **Step 6.4:** Create `bluecom-astro/src/data/marquee.ts`

```ts
export const marqueeItems: string[] = [
  "Stratégie Institutionnelle",
  "Relations Presse",
  "Media Training",
  "Communication de Crise",
  "Digital & Social Media",
  "Lobbying",
  "Affaires Publiques",
  "Conseil Dirigeants",
];
```

- [ ] **Step 6.5:** Create `bluecom-astro/src/data/methodology.ts`

```ts
export interface MethodologyStep {
  number: number;
  title: string;
  description: string;
}

export const steps: MethodologyStep[] = [
  {
    number: 1,
    title: "Diagnostic",
    description: "Analyse complète de votre situation actuelle, de votre environnement et de vos parties prenantes.",
  },
  {
    number: 2,
    title: "Stratégie",
    description: "Élaboration d'un plan d'action sur mesure aligné sur vos objectifs et vos ressources.",
  },
  {
    number: 3,
    title: "Mise en œuvre",
    description: "Déploiement opérationnel avec suivi rigoureux et ajustements en temps réel.",
  },
  {
    number: 4,
    title: "Évaluation",
    description: "Mesure des résultats et optimisation continue pour maximiser l'impact à long terme.",
  },
];
```

- [ ] **Step 6.6:** Commit

```bash
git add bluecom-astro/src/data/ && git commit -m "feat: add data files for team, services, stats, marquee, methodology"
```

---

## Task 7: Homepage Sections Part 1 (Hero, Marquee, Services, About, Team)

**Estimated time:** 30 min
**Depends on:** Tasks 4, 5, 6

- [ ] **Step 7.1:** Create `bluecom-astro/src/components/sections/Hero.astro`

```astro
---
import { stats } from '@/data/stats';
---

<section id="hero">
  <div class="hero-bg"></div>
  <div class="hero-pattern"></div>
  <div class="hero-glow"></div>
  <div class="hero-glow-2"></div>
  <div class="hero-content container">
    <div class="hero-left">
      <div class="hero-badge">
        <div class="hero-badge-dot"></div>
        <span>Expertise 10 ans</span>
      </div>
      <h1 class="hero-title">Façonner l'impact.<br>Inspirer la <em>confiance.</em></h1>
      <p class="hero-sub">Agence de conseil en communication institutionnelle dédiée aux dirigeants,
        entreprises et collectivités. Stratégie, narration, gestion de crise et rayonnement digital.</p>
      <div class="hero-actions">
        <a href="/services/" class="btn-primary">Notre Expertise <span class="btn-arrow">→</span></a>
        <a href="/#contact" class="btn-secondary">Prendre Contact</a>
      </div>
    </div>
    <div class="hero-right">
      <div class="hero-stats-card">
        <div class="stats-grid">
          {stats.map((stat) => (
            <div class="stat-item">
              <span class="stat-number">{stat.value}<span>{stat.suffix}</span></span>
              <span class="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    overflow: hidden;
    padding-top: 76px;
    background: var(--blue-dark);
  }

  .hero-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #000d1a 0%, #001a33 30%, var(--blue-deep) 70%, #003366 100%);
  }

  .hero-pattern {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    background: repeating-linear-gradient(
      65deg,
      transparent,
      transparent 40px,
      rgba(201, 168, 76, 0.15) 40px,
      rgba(201, 168, 76, 0.15) 41px
    );
  }

  .hero-glow {
    position: absolute;
    top: -150px;
    right: 200px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.12) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(60px);
  }

  .hero-glow-2 {
    position: absolute;
    bottom: -100px;
    left: -100px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(0, 64, 128, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    filter: blur(80px);
  }

  .hero-content {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 80px;
    align-items: center;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 16px 8px 8px;
    background: rgba(201, 168, 76, 0.1);
    border: 1px solid rgba(201, 168, 76, 0.2);
    border-radius: 100px;
    margin-bottom: 32px;
  }

  .hero-badge-dot {
    width: 8px;
    height: 8px;
    background: var(--gold);
    border-radius: 50%;
    animation: pulse-dot 2s ease-in-out infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.5); }
  }

  .hero-badge span {
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    color: var(--gold);
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .hero-title {
    font-family: var(--font-display);
    font-size: 64px;
    font-weight: 600;
    color: var(--white);
    line-height: 1.1;
    margin-bottom: 24px;
    letter-spacing: -0.02em;
  }

  .hero-title em {
    font-style: italic;
    color: var(--gold);
    font-weight: 400;
  }

  .hero-sub {
    font-family: var(--font-body);
    font-size: 17px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.7;
    margin-bottom: 40px;
    max-width: 520px;
  }

  .hero-actions {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
  }

  .hero-stats-card {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 40px;
    backdrop-filter: blur(10px);
  }

  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }

  .stat-item {
    text-align: center;
    padding: 16px;
  }

  .stat-number {
    display: block;
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 600;
    color: var(--white);
    line-height: 1;
    margin-bottom: 8px;
  }

  .stat-number span {
    color: var(--gold);
  }

  .stat-label {
    font-family: var(--font-body);
    font-size: 13px;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 0.5px;
  }

  @media (max-width: 992px) {
    .hero-content {
      grid-template-columns: 1fr;
      gap: 48px;
      text-align: center;
    }
    .hero-title { font-size: 48px; }
    .hero-sub { margin: 0 auto 40px; }
    .hero-actions { justify-content: center; }
    .hero-badge { margin: 0 auto 32px; }
  }

  @media (max-width: 576px) {
    .hero-title { font-size: 36px; }
    .stat-number { font-size: 36px; }
    .stats-grid { gap: 16px; }
  }
</style>
```

- [ ] **Step 7.2:** Create `bluecom-astro/src/components/sections/Marquee.astro`

```astro
---
import { marqueeItems } from '@/data/marquee';
---

<section class="marquee-section">
  <div class="marquee-track">
    <div class="marquee-item">
      {marqueeItems.map((item) => (
        <>
          <span>{item}</span>
          <div class="marquee-dot"></div>
        </>
      ))}
    </div>
    <div class="marquee-item" aria-hidden="true">
      {marqueeItems.map((item) => (
        <>
          <span>{item}</span>
          <div class="marquee-dot"></div>
        </>
      ))}
    </div>
  </div>
</section>

<style>
  .marquee-section {
    padding: 24px 0;
    background: var(--blue-dark);
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    overflow: hidden;
  }

  .marquee-track {
    display: flex;
    animation: marquee 30s linear infinite;
    width: max-content;
  }

  .marquee-section:hover .marquee-track {
    animation-play-state: paused;
  }

  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .marquee-item {
    display: flex;
    align-items: center;
    gap: 32px;
    padding: 0 16px;
  }

  .marquee-item span {
    font-family: var(--font-body);
    font-size: 13px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.5);
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  .marquee-dot {
    width: 4px;
    height: 4px;
    background: var(--gold);
    border-radius: 50%;
    flex-shrink: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-track {
      animation: none;
    }
  }
</style>
```

- [ ] **Step 7.3:** Create `bluecom-astro/src/components/sections/Services.astro`

```astro
---
import { services } from '@/data/services';
---

<section id="services">
  <div class="container">
    <div class="section-header reveal">
      <div>
        <div class="section-label">
          <div class="section-label-line"></div>
          <span>Expertises</span>
        </div>
        <h2 class="section-title">Notre maîtrise au service<br>de votre <em>réputation</em></h2>
      </div>
      <p class="section-sub">Une approche sur-mesure et pluridisciplinaire pour répondre aux enjeux de
        communication les plus complexes de votre organisation.</p>
    </div>

    <div class="services-grid reveal reveal-delay-1">
      {services.map((service) => (
        <div class="service-card">
          <div class="service-number">{service.number}</div>
          <div class="service-icon" set:html={service.icon} />
          <h3 class="service-name">{service.title}</h3>
          <p class="service-desc">{service.description}</p>
          <a href="/services/" class="service-link">Découvrir <span class="btn-arrow">→</span></a>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  #services {
    padding: var(--section-padding) 0;
    background: var(--white);
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }

  .service-card {
    padding: 40px 32px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    transition: all var(--transition-normal);
    position: relative;
    overflow: hidden;
  }

  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform var(--transition-normal);
  }

  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: var(--shadow-md);
  }

  .service-card:hover::before {
    transform: scaleX(1);
  }

  .service-number {
    font-family: var(--font-display);
    font-size: 48px;
    font-weight: 300;
    color: var(--blue-light-bg);
    line-height: 1;
    margin-bottom: 24px;
  }

  .service-icon {
    width: 48px;
    height: 48px;
    margin-bottom: 20px;
  }

  .service-icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .service-name {
    font-family: var(--font-display);
    font-size: 22px;
    font-weight: 600;
    color: var(--anthracite);
    margin-bottom: 12px;
  }

  .service-desc {
    font-size: 15px;
    color: var(--grey-dark);
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .service-link {
    font-size: 13px;
    font-weight: 700;
    color: var(--gold);
    text-transform: uppercase;
    letter-spacing: 1px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    transition: color var(--transition-normal);
  }

  .service-link:hover {
    color: var(--blue-deep);
  }

  @media (max-width: 992px) {
    .services-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 576px) {
    .services-grid { grid-template-columns: 1fr; }
    .service-card { padding: 32px 24px; }
  }
</style>
```

- [ ] **Step 7.4:** Create `bluecom-astro/src/components/sections/About.astro`

```astro
---
---
<section id="about" class="reveal">
  <div class="container">
    <div class="about-grid">
      <div class="about-visual">
        <div class="about-img-frame">
          <div class="about-img-overlay"></div>
          <div class="about-img-content">
            <div class="about-quote-mark">"</div>
            <div class="about-quote-text">Notre mission est d'accompagner les leaders africains dans leur quête d'excellence et d'influence.</div>
            <div class="about-quote-author">- Fondateur BLUECOM</div>
          </div>
          <div class="about-badge">
            <div class="about-badge-num">10</div>
            <div class="about-badge-text">Années<br>d'Expertise</div>
          </div>
        </div>
      </div>
      <div class="about-content">
        <div class="section-header" style="margin-bottom: 20px;">
          <div>
            <div class="section-label">
              <div class="section-label-line"></div>
              <span>Notre ADN</span>
            </div>
            <h2 class="section-title">L'excellence au service<br>de votre <em>leadership</em></h2>
          </div>
        </div>
        <p class="about-text">
          Fondée en 2015 à Dakar, BLUECOM Stratégies est une SARL spécialisée dans le conseil en communication. Installée au cœur de Dakar, l'agence s'est imposée en dix ans comme un acteur de référence dans l'accompagnement des organisations, entreprises et institutions sénégalaises et ouest-africaines.
        </p>
        <div class="about-values">
          <div class="value-item">
            <div class="value-square"></div>
            <div>
              <div class="value-name">Expertise sur mesure</div>
              <div class="value-desc">Chaque client est unique. Nous développons des stratégies personnalisées qui correspondent à vos objectifs spécifiques.</div>
            </div>
          </div>
          <div class="value-item">
            <div class="value-square"></div>
            <div>
              <div class="value-name">Approche africaine</div>
              <div class="value-desc">Notre connaissance profonde du contexte africain nous permet de créer des communications culturellement pertinentes.</div>
            </div>
          </div>
          <div class="value-item">
            <div class="value-square"></div>
            <div>
              <div class="value-name">Résultats mesurables</div>
              <div class="value-desc">Nous nous engageons sur des indicateurs de performance clairs et transparents pour démontrer notre impact.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  #about { padding: var(--section-padding) 0; background: var(--white); }

  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }

  .about-img-frame {
    position: relative;
    aspect-ratio: 4 / 5;
    background: linear-gradient(135deg, var(--blue-deep) 0%, var(--blue-dark) 100%);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }

  .about-img-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 30%, rgba(0, 26, 51, 0.9) 100%); }

  .about-img-content { position: relative; z-index: 1; padding: 40px; color: var(--white); }
  .about-quote-mark { font-family: var(--font-display); font-size: 72px; color: var(--gold); line-height: 1; margin-bottom: 8px; }
  .about-quote-text { font-family: var(--font-display); font-size: 20px; font-style: italic; line-height: 1.5; margin-bottom: 16px; }
  .about-quote-author { font-size: 13px; color: var(--gold); font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }

  .about-badge { position: absolute; top: 24px; right: 24px; background: var(--gold); color: var(--blue-dark); padding: 20px; border-radius: 12px; text-align: center; z-index: 1; }
  .about-badge-num { font-family: var(--font-display); font-size: 48px; font-weight: 700; line-height: 1; }
  .about-badge-text { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; line-height: 1.4; }

  .about-text { color: var(--grey-mid); line-height: 1.8; margin-bottom: 32px; }

  .about-values { display: flex; flex-direction: column; gap: 24px; }
  .value-item { display: flex; gap: 16px; align-items: flex-start; }
  .value-square { width: 6px; height: 6px; background: var(--gold); border-radius: 2px; margin-top: 8px; flex-shrink: 0; }
  .value-name { font-weight: 600; font-size: 15px; color: var(--anthracite); margin-bottom: 4px; }
  .value-desc { font-size: 14px; color: var(--grey-dark); line-height: 1.6; }

  @media (max-width: 992px) {
    .about-grid { grid-template-columns: 1fr; gap: 48px; }
    .about-img-frame { aspect-ratio: 16 / 9; }
  }
</style>
```

- [ ] **Step 7.5:** Create `bluecom-astro/src/components/sections/Team.astro`

```astro
---
import { team } from '@/data/team';
---

<section id="team" class="reveal">
  <div class="container">
    <div class="section-header">
      <div>
        <div class="section-label">
          <div class="section-label-line"></div>
          <span>Direction</span>
        </div>
        <h2 class="section-title">Deux experts au service<br>de votre <em>réputation</em></h2>
      </div>
      <p class="section-sub">L'agence est dirigée par deux managers associés aux parcours exceptionnels dans le journalisme et la communication.</p>
    </div>
    <div class="team-grid">
      {team.map((member, i) => (
        <div class={`team-card ${i === 0 ? 'team-card-lead' : ''}`}>
          <div class="team-avatar">
            <img src={member.image} alt={member.alt} class="team-photo" width="112" height="112" loading="lazy" />
          </div>
          <div class="team-badge"><span>{member.badge}</span></div>
          <h3 class="team-name">{member.name}</h3>
          <p class="team-role">{member.role}</p>
          <p class="team-bio">{member.bio}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  #team { padding: var(--section-padding) 0; background: var(--grey-light); }
  .team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .team-card { background: var(--white); padding: 48px 40px; border-radius: 12px; border: 1px solid #f0f0f0; transition: all var(--transition-normal); }
  .team-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .team-card-lead { background: var(--blue-dark); color: var(--white); border-color: transparent; }
  .team-avatar { width: 112px; height: 112px; border-radius: 50%; overflow: hidden; margin-bottom: 24px; background: var(--blue-light-bg); display: flex; align-items: center; justify-content: center; }
  .team-photo { width: 100%; height: 100%; object-fit: cover; }
  .team-badge { display: inline-block; padding: 6px 14px; background: rgba(201, 168, 76, 0.1); border-radius: 100px; margin-bottom: 16px; }
  .team-badge span { font-size: 11px; font-weight: 600; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; }
  .team-card-lead .team-badge { background: rgba(201, 168, 76, 0.15); }
  .team-name { font-family: var(--font-display); font-size: 24px; font-weight: 600; margin-bottom: 8px; }
  .team-role { font-size: 14px; color: var(--gold); margin-bottom: 16px; font-weight: 500; }
  .team-bio { font-size: 15px; line-height: 1.6; color: var(--grey-dark); }
  .team-card-lead .team-bio { color: rgba(255, 255, 255, 0.7); }

  @media (max-width: 768px) { .team-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 7.6:** Commit

```bash
git add bluecom-astro/src/components/sections/Hero.astro bluecom-astro/src/components/sections/Marquee.astro bluecom-astro/src/components/sections/Services.astro bluecom-astro/src/components/sections/About.astro bluecom-astro/src/components/sections/Team.astro && git commit -m "feat: add Hero, Marquee, Services, About, Team sections"
```

---

## Task 8: Homepage Sections Part 2 (Methodology, Portfolio, Testimonials, BlogSection, Contact)

**Estimated time:** 30 min
**Depends on:** Tasks 4, 6

- [ ] **Step 8.1:** Create `bluecom-astro/src/components/sections/Methodology.astro`

```astro
---
import { steps } from '@/data/methodology';
---

<section id="methodology" class="reveal">
  <div class="container">
    <div class="section-header">
      <div>
        <div class="section-label">
          <div class="section-label-line"></div>
          <span>Méthodologie</span>
        </div>
        <h2 class="section-title">Notre processus structuré<br>pour des <em>résultats</em></h2>
      </div>
      <p class="section-sub">Une approche méthodique qui garantit la cohérence et l'efficacité de chaque intervention.</p>
    </div>
    <div class="method-steps">
      {steps.map((step) => (
        <div class="method-step">
          <div class="step-circle"><div class="step-num">{step.number}</div></div>
          <h3 class="step-title">{step.title}</h3>
          <p class="step-desc">{step.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  #methodology { padding: var(--section-padding) 0; background: var(--blue-dark); color: var(--white); }
  #methodology .section-title { color: var(--white); }
  #methodology .section-title em { color: var(--gold); }
  .method-steps { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; }
  .method-step { text-align: center; padding: 32px 24px; }
  .step-circle { width: 72px; height: 72px; border-radius: 50%; border: 2px solid var(--gold); display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; position: relative; }
  .step-circle::after { content: ''; position: absolute; width: 100%; height: 100%; border-radius: 50%; border: 1px solid rgba(201, 168, 76, 0.2); transform: scale(1.2); }
  .step-num { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--gold); }
  .step-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; margin-bottom: 12px; }
  .step-desc { font-size: 15px; color: rgba(255, 255, 255, 0.6); line-height: 1.6; }

  @media (max-width: 992px) { .method-steps { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 576px) { .method-steps { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 8.2:** Create `bluecom-astro/src/components/sections/Portfolio.astro`

```astro
---
const cases = [
  { category: "Stratégie", title: "Rebranding d'un géant minier", result: "+45% de notoriété positive en 18 mois", bgClass: "case-bg-1" },
  { category: "Crise", title: "Gestion de crise multinationale", result: "Réputation restaurée en 3 mois", bgClass: "case-bg-2" },
  { category: "Digital", title: "Campagne présidentielle digitale", result: "2M+ d'impressions organiques", bgClass: "case-bg-3" },
  { category: "Institutionnel", title: "Lancement ministériel", result: "Couverture médiatique record", bgClass: "case-bg-4" },
  { category: "Formation", title: "Media training PDG", result: "100% de réussite aux interviews", bgClass: "case-bg-5" },
  { category: "Relations Publiques", title: "Sommet économique régional", result: "150+ médias accrédités", bgClass: "case-bg-6" },
];
---

<section id="realisations" class="reveal">
  <div class="container">
    <div class="section-header">
      <div>
        <div class="section-label">
          <div class="section-label-line"></div>
          <span>Réalisations</span>
        </div>
        <h2 class="section-title">Nos <em>réalisations</em> parlent d'elles-mêmes</h2>
      </div>
      <p class="section-sub">Découvrez comment nous avons aidé des organisations à atteindre leurs objectifs de communication.</p>
    </div>
    <div class="cases-grid">
      {cases.map((item) => (
        <a href="/portfolio/" class="case-card">
          <div class={`case-card-bg ${item.bgClass}`}></div>
          <div class="case-pattern"></div>
          <div class="case-overlay"></div>
          <div class="case-content">
            <div class="case-category">{item.category}</div>
            <h3 class="case-title">{item.title}</h3>
            <div class="case-result">{item.result}</div>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  #realisations { padding: var(--section-padding) 0; background: var(--white); }
  .cases-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .case-card { position: relative; aspect-ratio: 4 / 3; border-radius: 12px; overflow: hidden; display: flex; align-items: flex-end; cursor: pointer; text-decoration: none; color: var(--white); }
  .case-card-bg { position: absolute; inset: 0; }
  .case-bg-1 { background: linear-gradient(135deg, #1a3a5c, #2d5a87); }
  .case-bg-2 { background: linear-gradient(135deg, #8b2c2c, #c44040); }
  .case-bg-3 { background: linear-gradient(135deg, #1a4a3a, #2d7a5a); }
  .case-bg-4 { background: linear-gradient(135deg, #3a1a5c, #5a2d87); }
  .case-bg-5 { background: linear-gradient(135deg, #5c3a1a, #87652d); }
  .case-bg-6 { background: linear-gradient(135deg, #1a3a5c, #004080); }
  .case-pattern { position: absolute; inset: 0; opacity: 0.1; background: repeating-linear-gradient(65deg, transparent, transparent 30px, rgba(255,255,255,0.15) 30px, rgba(255,255,255,0.15) 31px); }
  .case-overlay { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%); }
  .case-content { position: relative; z-index: 1; padding: 32px; }
  .case-category { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); margin-bottom: 12px; }
  .case-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; margin-bottom: 8px; line-height: 1.3; }
  .case-result { font-size: 14px; color: rgba(255,255,255,0.8); }
  .case-card:hover .case-overlay { background: linear-gradient(180deg, rgba(0,64,128,0.3) 0%, rgba(0,26,51,0.85) 100%); }
  .case-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }

  @media (max-width: 992px) { .cases-grid { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 576px) { .cases-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 8.3:** Create `bluecom-astro/src/components/sections/Testimonials.astro`

```astro
---
const testimonials = [
  { text: "BLUECOM a complètement transformé notre manière de communiquer. Leur expertise stratégique et leur compréhension du marché africain sont inégalées.", name: "Mariam Konaré", role: "PDG, Africatinum Group", initials: "MK" },
  { text: "Une équipe professionnelle qui a su nous accompagner dans une période de crise intense. Leur réactivité et leur pragmatisme nous ont sauvés.", name: "Drissa Traoré", role: "Directeur Général, Banque Sahéliste", initials: "DT" },
  { text: "Le media training dispensé par BLUECOM a été décisif pour notre président. Aujourd'hui, il maîtrise parfaitement les interviews et les débats publics.", name: "Nadia Ouedraogo", role: "Directrice Communication, Caisse Nationale", initials: "NO" },
];
---

<section id="testimonials" class="reveal">
  <div class="container">
    <div class="section-header">
      <div>
        <div class="section-label">
          <div class="section-label-line"></div>
          <span>Témoignages</span>
        </div>
        <h2 class="section-title">Ils nous ont fait <em>confiance</em></h2>
      </div>
      <p class="section-sub">Recommandations de dirigeants qui ont transformé leur communication.</p>
    </div>
    <div class="testimonials-grid">
      {testimonials.map((t) => (
        <div class="testimonial-card">
          <div class="testimonial-stars">
            <span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span><span class="star">★</span>
          </div>
          <p class="testimonial-text">"{t.text}"</p>
          <div class="testimonial-author">
            <div class="author-avatar"><span>{t.initials}</span></div>
            <div>
              <div class="author-name">{t.name}</div>
              <div class="author-role">{t.role}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  #testimonials { padding: var(--section-padding) 0; background: var(--grey-light); }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .testimonial-card { background: var(--white); padding: 40px 32px; border-radius: 12px; border: 1px solid #f0f0f0; transition: all var(--transition-normal); }
  .testimonial-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .testimonial-stars { margin-bottom: 20px; }
  .star { color: var(--gold); font-size: 16px; }
  .testimonial-text { font-family: var(--font-display); font-size: 17px; font-style: italic; line-height: 1.6; color: var(--anthracite); margin-bottom: 24px; }
  .testimonial-author { display: flex; align-items: center; gap: 12px; }
  .author-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--blue-deep); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .author-avatar span { font-size: 14px; font-weight: 600; color: var(--white); }
  .author-name { font-weight: 600; font-size: 14px; color: var(--anthracite); }
  .author-role { font-size: 13px; color: var(--grey-mid); }

  @media (max-width: 992px) { .testimonials-grid { grid-template-columns: 1fr; max-width: 600px; } }
</style>
```

- [ ] **Step 8.4:** Create `bluecom-astro/src/components/sections/BlogSection.astro`

```astro
---
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 2);

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
---

<section id="blog" class="reveal">
  <div class="container">
    <div class="section-header">
      <div>
        <div class="section-label">
          <div class="section-label-line"></div>
          <span>Insights</span>
        </div>
        <h2 class="section-title">Nos <em>analyses</em> et tendances</h2>
      </div>
      <p class="section-sub">Restez informé des dernières évolutions en communication institutionnelle et leadership.</p>
    </div>
    <div class="blog-grid">
      {posts.map((post) => (
        <a href={`/blog/${post.slug}/`} class="blog-card">
          {post.data.image && (<div class="blog-card-img" style={`background-image: url('${post.data.image}');`}></div>)}
          <div class="blog-card-body">
            <div class="blog-meta">
              <span class="blog-category">{post.data.category}</span>
              <span>{formatDate(post.data.pubDate)}</span>
            </div>
            <h3 class="blog-title">{post.data.title}</h3>
            <p class="blog-excerpt">{post.data.description}</p>
            <span class="blog-read-more">Lire l'article →</span>
          </div>
        </a>
      ))}
    </div>
  </div>
</section>

<style>
  #blog { padding: var(--section-padding) 0; background: var(--white); }
  .blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .blog-card { background: var(--white); height: 100%; display: flex; flex-direction: column; text-decoration: none; color: inherit; transition: transform 0.3s ease; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden; }
  .blog-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .blog-card-img { width: 100%; aspect-ratio: 16 / 10; background-size: cover; background-position: center; }
  .blog-card-body { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
  .blog-meta { margin-bottom: 12px; font-size: 13px; color: var(--grey-mid); display: flex; gap: 15px; }
  .blog-category { color: var(--blue-deep); font-weight: 700; text-transform: uppercase; }
  .blog-title { font-family: var(--font-display); font-size: 20px; font-weight: 500; color: var(--blue-deep); margin-bottom: 15px; line-height: 1.4; text-decoration: none; }
  .blog-excerpt { font-size: 15px; color: var(--grey-mid); margin-bottom: 20px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .blog-read-more { margin-top: auto; font-weight: 700; font-size: 13px; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; }

  @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 8.5:** Create `bluecom-astro/src/components/sections/Contact.astro`

```astro
---
---

<section id="contact" class="reveal">
  <div class="container">
    <div class="contact-grid">
      <div class="contact-info">
        <div class="contact-info-pattern"></div>
        <h3>Prenons contact</h3>
        <p>Vous souhaitez discuter de vos besoins en communication ? Notre équipe est à votre écoute pour définir ensemble la meilleure stratégie pour votre organisation.</p>
        <div class="contact-details">
          <div class="contact-detail-item">
            <div class="contact-detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div>
              <div class="contact-detail-label">Adresse</div>
              <div class="contact-detail-value">Résidence Adja Farma GUEYE, 4ème étage, Lot N°8 Libetré 6 Extension, Dakar</div>
            </div>
          </div>
          <div class="contact-detail-item">
            <div class="contact-detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            </div>
            <div>
              <div class="contact-detail-label">Téléphone</div>
              <div class="contact-detail-value">+221 33 827 77 88 · 77 779 66 36 · 77 881 90 66</div>
            </div>
          </div>
          <div class="contact-detail-item">
            <div class="contact-detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
            </div>
            <div>
              <div class="contact-detail-label">Email</div>
              <div class="contact-detail-value">Bluecom@orange.sn</div>
            </div>
          </div>
        </div>
        <div class="contact-social">
          <a href="https://linkedin.com/company/bluecom" class="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a href="https://twitter.com/bluecom" class="social-btn" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
          </a>
          <a href="https://facebook.com/bluecom" class="social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://instagram.com/bluecom" class="social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
        </div>
      </div>
      <div class="contact-form-wrap">
        <h3 class="form-title">Envoyez-nous un message</h3>
        <form id="contactForm" novalidate>
          <div class="form-row">
            <div class="form-group">
              <label for="fullName" class="form-label">Nom complet <span class="required">*</span></label>
              <input type="text" id="fullName" name="fullName" class="form-input" placeholder="Votre nom" required aria-required="true" aria-describedby="nameError" aria-invalid="false">
              <div class="form-error" id="nameError" role="alert">Veuillez entrer votre nom (minimum 3 caractères)</div>
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email <span class="required">*</span></label>
              <input type="email" id="email" name="email" class="form-input" placeholder="votre@email.com" required aria-required="true" aria-describedby="emailError" aria-invalid="false">
              <div class="form-error" id="emailError" role="alert">Veuillez entrer un email valide</div>
            </div>
          </div>
          <div class="form-group">
            <label for="subject" class="form-label">Sujet <span class="required">*</span></label>
            <select id="subject" name="subject" class="form-select" required aria-required="true" aria-describedby="subjectError" aria-invalid="false">
              <option value="">Sélectionnez un sujet</option>
              <option value="strategy">Conseil en stratégie</option>
              <option value="media-training">Media training</option>
              <option value="crisis">Gestion de crise</option>
              <option value="digital">Marketing digital</option>
              <option value="training">Formation</option>
              <option value="other">Autre demande</option>
            </select>
            <div class="form-error" id="subjectError" role="alert">Veuillez sélectionner un sujet</div>
          </div>
          <div class="form-group">
            <label for="message" class="form-label">Message <span class="required">*</span></label>
            <textarea id="message" name="message" class="form-textarea" placeholder="Décrivez votre projet ou votre besoin..." rows="5" required aria-required="true" aria-describedby="messageError" aria-invalid="false"></textarea>
            <div class="form-error" id="messageError" role="alert">Votre message doit contenir au moins 20 caractères</div>
          </div>
          <div class="form-check">
            <input type="checkbox" id="privacy" name="privacy" required aria-required="true" aria-describedby="privacyError">
            <label for="privacy">J'accepte la <a href="/politique-confidentialite/">politique de confidentialité</a> et le traitement de mes données personnelles. <span class="required">*</span></label>
            <div class="form-error" id="privacyError" role="alert">Vous devez accepter la politique de confidentialité</div>
          </div>
          <button type="submit" class="form-submit" id="submitBtn">
            <span id="submitText">Envoyer le message</span>
          </button>
          <div class="form-success" id="formSuccess">
            <p>Merci ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </form>
      </div>
    </div>
  </div>
</section>

<style>
  #contact { padding: var(--section-padding) 0; background: var(--white); }
  .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: flex-start; }
  .contact-info { background: var(--blue-dark); color: var(--white); padding: 48px; border-radius: 16px; position: relative; overflow: hidden; }
  .contact-info-pattern { position: absolute; top: 0; right: 0; width: 200px; height: 100%; opacity: 0.06; background: repeating-linear-gradient(65deg, transparent, transparent 20px, rgba(201,168,76,0.15) 20px, rgba(201,168,76,0.15) 21px); }
  .contact-info h3 { font-family: var(--font-display); font-size: 32px; font-weight: 600; margin-bottom: 16px; }
  .contact-info > p { font-size: 15px; color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 32px; }
  .contact-details { display: flex; flex-direction: column; gap: 24px; margin-bottom: 32px; }
  .contact-detail-item { display: flex; gap: 16px; align-items: flex-start; }
  .contact-detail-icon { width: 40px; height: 40px; background: rgba(201,168,76,0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
  .contact-detail-icon svg { width: 20px; height: 20px; color: var(--gold); }
  .contact-detail-label { font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: var(--gold); margin-bottom: 4px; }
  .contact-detail-value { font-size: 14px; color: rgba(255,255,255,0.8); line-height: 1.5; }
  .contact-social { display: flex; gap: 12px; }
  .social-btn { width: 40px; height: 40px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.15); display: flex; align-items: center; justify-content: center; transition: all var(--transition-normal); color: rgba(255,255,255,0.6); }
  .social-btn svg { width: 18px; height: 18px; }
  .social-btn:hover { background: var(--gold); border-color: var(--gold); color: var(--blue-dark); }
  .contact-form-wrap { padding: 16px 0; }
  .form-title { font-family: var(--font-display); font-size: 28px; font-weight: 600; color: var(--anthracite); margin-bottom: 32px; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .form-group { margin-bottom: 20px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: var(--anthracite); margin-bottom: 8px; }
  .required { color: #c44040; }
  .form-input, .form-select, .form-textarea { width: 100%; padding: 14px 16px; font-family: var(--font-body); font-size: 15px; color: var(--anthracite); background: var(--grey-light); border: 2px solid transparent; border-radius: 8px; transition: border-color var(--transition-normal); outline: none; }
  .form-input:focus, .form-select:focus, .form-textarea:focus { border-color: var(--blue-deep); }
  .form-input.error, .form-select.error, .form-textarea.error { border-color: #c44040; }
  .form-textarea { resize: vertical; min-height: 120px; }
  .form-error { display: none; font-size: 12px; color: #c44040; margin-top: 6px; }
  .form-error.visible { display: block; }
  .form-check { display: flex; gap: 10px; align-items: flex-start; margin-bottom: 24px; }
  .form-check input[type="checkbox"] { margin-top: 4px; accent-color: var(--blue-deep); }
  .form-check label { font-size: 13px; color: var(--grey-dark); line-height: 1.5; }
  .form-check label a { color: var(--blue-deep); text-decoration: underline; }
  .form-submit { width: 100%; padding: 16px; background: var(--blue-deep); color: var(--white); font-family: var(--font-body); font-size: 15px; font-weight: 600; border: none; border-radius: 8px; cursor: pointer; transition: background var(--transition-normal); }
  .form-submit:hover { background: var(--blue-mid); }
  .form-submit:disabled { opacity: 0.7; cursor: not-allowed; }
  .form-success { display: none; margin-top: 20px; padding: 16px; background: #e8f5e9; border-radius: 8px; text-align: center; color: #2e7d32; font-size: 14px; }
  .form-success.visible { display: block; }

  @media (max-width: 992px) { .contact-grid { grid-template-columns: 1fr; gap: 40px; } }
  @media (max-width: 576px) { .form-row { grid-template-columns: 1fr; } .contact-info { padding: 32px; } }
</style>

<script>
  const form = document.getElementById('contactForm');
  if (form) {
    const fields = {
      name: { el: document.getElementById('fullName'), err: document.getElementById('nameError'), validate: (v) => v.trim().length >= 3 },
      email: { el: document.getElementById('email'), err: document.getElementById('emailError'), validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
      subject: { el: document.getElementById('subject'), err: document.getElementById('subjectError'), validate: (v) => v !== '' },
      message: { el: document.getElementById('message'), err: document.getElementById('messageError'), validate: (v) => v.trim().length >= 20 },
      privacy: { el: document.getElementById('privacy'), err: document.getElementById('privacyError'), validate: (v) => v === 'true' },
    };
    const setFieldState = (el, err, isValid) => {
      el.classList.toggle('error', !isValid);
      err.classList.toggle('visible', !isValid);
      el.setAttribute('aria-invalid', (!isValid).toString());
    };
    Object.values(fields).forEach(({ el, err, validate }) => {
      if (!el || !err) return;
      el.addEventListener(el.type === 'checkbox' ? 'change' : 'blur', () => {
        const val = el.type === 'checkbox' ? String(el.checked) : el.value;
        setFieldState(el, err, validate(val));
      });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let ok = true;
      Object.values(fields).forEach(({ el, err, validate }) => {
        if (!el || !err) return;
        const val = el.type === 'checkbox' ? String(el.checked) : el.value;
        const valid = validate(val);
        setFieldState(el, err, valid);
        if (!valid) ok = false;
      });
      if (ok) {
        const btn = document.getElementById('submitBtn');
        const txt = document.getElementById('submitText');
        if (btn) btn.disabled = true;
        if (txt) txt.textContent = 'Envoi en cours...';
        setTimeout(() => {
          if (btn) btn.disabled = false;
          if (txt) txt.textContent = 'Envoyer le message';
          const successMsg = document.getElementById('formSuccess');
          if (successMsg) successMsg.classList.add('visible');
          form.reset();
          Object.values(fields).forEach(({ el, err }) => { if (el && err) { el.classList.remove('error'); err.classList.remove('visible'); el.setAttribute('aria-invalid', 'false'); } });
          setTimeout(() => { if (successMsg) successMsg.classList.remove('visible'); }, 6000);
        }, 1500);
      } else {
        const first = form.querySelector('.error');
        if (first) first.focus();
      }
    });
  }
</script>
```

- [ ] **Step 8.6:** Commit

```bash
git add bluecom-astro/src/components/sections/Methodology.astro bluecom-astro/src/components/sections/Portfolio.astro bluecom-astro/src/components/sections/Testimonials.astro bluecom-astro/src/components/sections/BlogSection.astro bluecom-astro/src/components/sections/Contact.astro && git commit -m "feat: add Methodology, Portfolio, Testimonials, BlogSection, Contact sections"
```

---

## Task 9: Assemble Homepage

**Estimated time:** 10 min
**Depends on:** Tasks 3, 5, 7, 8

- [ ] **Step 9.1:** Create `bluecom-astro/src/pages/index.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import BackToTop from '@/components/ui/BackToTop.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';
import Hero from '@/components/sections/Hero.astro';
import Marquee from '@/components/sections/Marquee.astro';
import About from '@/components/sections/About.astro';
import Team from '@/components/sections/Team.astro';
import Services from '@/components/sections/Services.astro';
import Methodology from '@/components/sections/Methodology.astro';
import Portfolio from '@/components/sections/Portfolio.astro';
import Testimonials from '@/components/sections/Testimonials.astro';
import BlogSection from '@/components/sections/BlogSection.astro';
import Contact from '@/components/sections/Contact.astro';
---

<BaseLayout title="BLUECOM Stratégies | Conseil en Communication Premium">
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>

  <Header />

  <main id="main-content">
    <Hero />
    <Marquee />
    <About />
    <Team />
    <Services />
    <Methodology />
    <Portfolio />
    <Testimonials />
    <BlogSection />
    <Contact />
  </main>

  <Footer />
  <BackToTop />
</BaseLayout>
```

- [ ] **Step 9.2:** Verify dev server renders homepage

```bash
cd bluecom-astro && npx astro dev --port 4321 &
sleep 5 && curl -s http://localhost:4321/ | head -20
kill %1 2>/dev/null || true
```

Expected output: HTML with all sections rendered

- [ ] **Step 9.3:** Commit

```bash
git add bluecom-astro/src/pages/index.astro && git commit -m "feat: assemble homepage with all sections"
```

---

## Task 10: Secondary Pages

**Estimated time:** 15 min
**Depends on:** Tasks 3, 5, 7, 8

- [ ] **Step 10.1:** Create `bluecom-astro/src/pages/about.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import BackToTop from '@/components/ui/BackToTop.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';
import AboutSection from '@/components/sections/About.astro';
import Team from '@/components/sections/Team.astro';
---

<BaseLayout
  title="Notre ADN | BLUECOM Stratégies"
  description="Découvrez l'histoire, les valeurs et l'équipe de BLUECOM Stratégies, votre partenaire de confiance pour la communication au Sénégal."
  canonical="https://bluecom-strategies.sn/about/"
>
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>
  <Header />
  <main id="main-content">
    <AboutSection />
    <Team />
  </main>
  <Footer />
  <BackToTop />
</BaseLayout>
```

- [ ] **Step 10.2:** Create `bluecom-astro/src/pages/services.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import BackToTop from '@/components/ui/BackToTop.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';
import ServicesSection from '@/components/sections/Services.astro';
import Methodology from '@/components/sections/Methodology.astro';
import Contact from '@/components/sections/Contact.astro';
---

<BaseLayout
  title="Nos Expertises | BLUECOM Stratégies"
  description="Découvrez les 6 expertises de BLUECOM : Stratégie & Conseil, Media Training, Gestion de Crise, Webmarketing, Relations Publiques, Production Audiovisuelle."
  canonical="https://bluecom-strategies.sn/services/"
>
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>
  <Header />
  <main id="main-content">
    <ServicesSection />
    <Methodology />
    <Contact />
  </main>
  <Footer />
  <BackToTop />
</BaseLayout>
```

- [ ] **Step 10.3:** Create `bluecom-astro/src/pages/methodology.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import BackToTop from '@/components/ui/BackToTop.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';
import MethodologySection from '@/components/sections/Methodology.astro';
import Contact from '@/components/sections/Contact.astro';
---

<BaseLayout
  title="Méthodologie | BLUECOM Stratégies"
  description="Découvrez notre méthodologie en 4 étapes : diagnostic, stratégie, mise en œuvre et évaluation pour des résultats mesurables."
  canonical="https://bluecom-strategies.sn/methodology/"
>
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>
  <Header />
  <main id="main-content">
    <MethodologySection />
    <Contact />
  </main>
  <Footer />
  <BackToTop />
</BaseLayout>
```

- [ ] **Step 10.4:** Create `bluecom-astro/src/pages/portfolio.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import BackToTop from '@/components/ui/BackToTop.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';
import PortfolioSection from '@/components/sections/Portfolio.astro';
import Contact from '@/components/sections/Contact.astro';
---

<BaseLayout
  title="Portfolio | BLUECOM Stratégies"
  description="Découvrez nos études de cas et réussites en communication institutionnelle, stratégie, gestion de crise et digital pour des clients en Afrique."
  canonical="https://bluecom-strategies.sn/portfolio/"
>
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>
  <Header />
  <main id="main-content">
    <PortfolioSection />
    <Contact />
  </main>
  <Footer />
  <BackToTop />
</BaseLayout>
```

- [ ] **Step 10.5:** Commit

```bash
git add bluecom-astro/src/pages/about.astro bluecom-astro/src/pages/services.astro bluecom-astro/src/pages/methodology.astro bluecom-astro/src/pages/portfolio.astro && git commit -m "feat: add about, services, methodology, portfolio pages"
```

---

## Task 11: Blog System (Content Collections)

**Estimated time:** 20 min
**Depends on:** Task 9

- [ ] **Step 11.1:** Create `bluecom-astro/src/content/config.ts`

```ts
import { defineCollection, z } from 'astro:content';

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

export const collections = {
  blog: blogCollection,
};
```

- [ ] **Step 11.2:** Create `bluecom-astro/src/content/blog/strategie-digitale-afrique.md`

```md
---
title: "Stratégie digitale : comment engager vos audiences en Afrique"
description: "Le digital africain n'est pas un marché uniforme. C'est un archipel de cultures, de plateformes et d'usages que seule une stratégie sur-mesure peut conquérir."
pubDate: 2026-04-15
author: "BLUECOM Stratégies"
category: "Digital"
image: "/images/strategie_digitale.png"
featured: true
---

Le digital africain n'est pas un marché uniforme. C'est un archipel de cultures, de plateformes et d'usages que seule une stratégie sur-mesure peut conquérir.

## Le mythe du "marché digital africain"

Il n'existe pas un marché digital africain — il en existe cinquante-quatre, avec leurs propres écosystèmes, leurs propres plateformes dominantes, leurs propres rythmes de consommation. Une stratégie digitale pensée pour le Nigéria ne fonctionnera pas telle quelle au Sénégal.

## Mobile-first, mobile-only

Plus de 85% des internautes africains accèdent au web exclusivement via leur smartphone. Cette réalité devrait bouleverser chaque décision de production de contenu.

## Les plateformes qui comptent

- **Sénégal/Afrique de l'Ouest :** Facebook, WhatsApp, TikTok, YouTube
- **Afrique de l'Est :** Twitter/X fort, Instagram croissant, TikTok dominant chez les jeunes
- **Afrique du Nord :** Instagram dominant, YouTube très consommé
```

- [ ] **Step 11.3:** Create `bluecom-astro/src/content/blog/gestion-crise-anticiper.md`

```md
---
title: "Gestion de crise : anticiper plutôt que réagir"
description: "Dans un monde ultra-connecté, une crise peut éclater en quelques heures. L'anticipation est la clé pour protéger votre réputation."
pubDate: 2026-03-20
author: "BLUECOM Stratégies"
category: "Stratégie"
image: "/images/gestion_crise.png"
featured: false
---

Dans un monde ultra-connecté, une crise peut éclater en quelques heures. L'anticipation est la clé pour protéger votre réputation.

## Pourquoi anticiper ?

Une crise non préparée coûte en moyenne 3 à 5 fois plus cher qu'une crise gérée avec un plan de communication préétabli.

## Les piliers de la gestion de crise

1. **Veille permanente** — Surveiller les mentions de votre marque
2. **Plan de communication** — Document prêt à être déclenché
3. **Porte-parole formé** — Un visage et une voix pour la crise
4. **Réactivité** — Répondre dans les premières heures
```

- [ ] **Step 11.4:** Create `bluecom-astro/src/content/blog/interview-mediatique-dirigeants.md`

```md
---
title: "L'art de l'interview médiatique pour dirigeants"
description: "Maîtriser l'interview médiatique est devenu une compétence essentielle pour tout dirigeant souhaitant influencer le débat public."
pubDate: 2026-02-10
author: "BLUECOM Stratégies"
category: "Media Training"
image: "/images/interview_mediatique.png"
featured: false
---

Maîtriser l'interview médiatique est devenu une compétence essentielle pour tout dirigeant souhaitant influencer le débat public.

## Les règles d'or

- **Préparez vos messages clés** — Trois idées maximum par interview
- **Maîtrisez le format** — Radio, TV ou presse écrite ont leurs codes
- **Gérez le trac** — Techniques de respiration et posture
- **Restez authentique** — Le public détecte l'artificiel
```

- [ ] **Step 11.5:** Create `bluecom-astro/src/layouts/BlogPostLayout.astro`

```astro
---
import BaseLayout from './BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';

interface Props {
  title: string;
  description: string;
  pubDate: Date;
  author: string;
  category: string;
  image?: string;
}

const { title, description, pubDate, author, category, image } = Astro.props;

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
---

<BaseLayout title={`${title} | BLUECOM Stratégies`} description={description} ogImage={image}>
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>
  <Header />

  <main id="main-content" class="blog-post-page">
    <article class="blog-article container">
      <header class="article-header">
        <div class="article-meta">
          <a href="/blog/" class="article-back">← Retour au blog</a>
          <span class="article-category">{category}</span>
          <time datetime={pubDate.toISOString()}>{formatDate(pubDate)}</time>
          <span class="article-author">par {author}</span>
        </div>
        <h1 class="article-title">{title}</h1>
        <p class="article-description">{description}</p>
        {image && (
          <div class="article-hero-image">
            <img src={image} alt={title} width="1200" height="630" loading="eager" />
          </div>
        )}
      </header>
      <div class="article-content">
        <slot />
      </div>
    </article>
  </main>

  <Footer />
</BaseLayout>

<style>
  .blog-post-page { padding-top: 120px; padding-bottom: var(--section-padding); }
  .article-header { max-width: 800px; margin: 0 auto 64px; text-align: center; }
  .article-meta { display: flex; align-items: center; justify-content: center; gap: 16px; margin-bottom: 24px; font-size: 13px; color: var(--grey-mid); flex-wrap: wrap; }
  .article-back { color: var(--blue-deep); font-weight: 600; text-decoration: none; }
  .article-back:hover { text-decoration: underline; }
  .article-category { padding: 4px 12px; background: var(--blue-light-bg); color: var(--blue-deep); border-radius: 100px; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; }
  .article-title { font-family: var(--font-display); font-size: 48px; font-weight: 600; color: var(--anthracite); line-height: 1.15; margin-bottom: 20px; letter-spacing: -0.02em; }
  .article-description { font-size: 18px; color: var(--grey-dark); line-height: 1.6; max-width: 640px; margin: 0 auto 40px; }
  .article-hero-image { border-radius: 12px; overflow: hidden; margin-top: 32px; }
  .article-hero-image img { width: 100%; height: auto; }
  .article-content { max-width: 800px; margin: 0 auto; font-size: 17px; line-height: 1.8; color: var(--anthracite); }
  .article-content :global(h2) { font-family: var(--font-display); font-size: 32px; font-weight: 600; color: var(--anthracite); margin: 48px 0 20px; line-height: 1.2; }
  .article-content :global(h3) { font-family: var(--font-display); font-size: 24px; font-weight: 600; color: var(--anthracite); margin: 36px 0 16px; line-height: 1.3; }
  .article-content :global(p) { margin-bottom: 24px; }
  .article-content :global(ul), .article-content :global(ol) { margin-bottom: 24px; padding-left: 24px; }
  .article-content :global(li) { margin-bottom: 8px; line-height: 1.7; list-style: disc; }
  .article-content :global(blockquote) { border-left: 3px solid var(--gold); padding-left: 24px; margin: 32px 0; font-style: italic; color: var(--grey-dark); }
  .article-content :global(strong) { font-weight: 600; color: var(--anthracite); }

  @media (max-width: 768px) { .article-title { font-size: 32px; } .article-content { font-size: 16px; } }
</style>
```

- [ ] **Step 11.6:** Create `bluecom-astro/src/pages/blog/index.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import BackToTop from '@/components/ui/BackToTop.astro';
import Header from '@/components/layout/Header.astro';
import Footer from '@/components/layout/Footer.astro';
import { getCollection } from 'astro:content';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
---

<BaseLayout
  title="Blog & Insights | BLUECOM Stratégies"
  description="Découvrez nos analyses et tendances sur la communication institutionnelle, le leadership et les stratégies médiatiques en Afrique."
>
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>
  <Header />

  <main id="main-content" class="blog-listing">
    <section class="blog-hero">
      <div class="container">
        <div class="section-label"><div class="section-label-line"></div><span>Insights</span></div>
        <h1 class="section-title">Blog & <em>Analyses</em></h1>
        <p class="section-sub">Restez informé des dernières évolutions en communication institutionnelle et leadership.</p>
      </div>
    </section>
    <section class="blog-grid-section">
      <div class="container">
        <div class="blog-grid">
          {posts.map((post) => (
            <a href={`/blog/${post.slug}/`} class="blog-card">
              {post.data.image && (<div class="blog-card-img" style={`background-image: url('${post.data.image}');`}></div>)}
              <div class="blog-card-body">
                <div class="blog-meta">
                  <span class="blog-category">{post.data.category}</span>
                  <time datetime={post.data.pubDate.toISOString()}>{formatDate(post.data.pubDate)}</time>
                </div>
                <h2 class="blog-title">{post.data.title}</h2>
                <p class="blog-excerpt">{post.data.description}</p>
                <span class="blog-read-more">Lire l'article →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  </main>

  <Footer />
  <BackToTop />
</BaseLayout>

<style>
  .blog-listing { padding-top: 120px; }
  .blog-hero { padding: 80px 0 60px; background: var(--blue-dark); color: var(--white); }
  .blog-hero .section-title { color: var(--white); }
  .blog-hero .section-title em { color: var(--gold); }
  .blog-hero .section-sub { color: rgba(255,255,255,0.7); }
  .blog-grid-section { padding: var(--section-padding) 0; background: var(--white); }
  .blog-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
  .blog-card { background: var(--white); height: 100%; display: flex; flex-direction: column; text-decoration: none; color: inherit; transition: transform 0.3s ease; border: 1px solid #f0f0f0; border-radius: 8px; overflow: hidden; }
  .blog-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); }
  .blog-card-img { width: 100%; aspect-ratio: 16 / 10; background-size: cover; background-position: center; }
  .blog-card-body { padding: 25px; flex-grow: 1; display: flex; flex-direction: column; }
  .blog-meta { margin-bottom: 12px; font-size: 13px; color: var(--grey-mid); display: flex; gap: 15px; }
  .blog-category { color: var(--blue-deep); font-weight: 700; text-transform: uppercase; }
  .blog-title { font-family: var(--font-display); font-size: 22px; font-weight: 500; color: var(--blue-deep); margin-bottom: 15px; line-height: 1.4; }
  .blog-excerpt { font-size: 15px; color: var(--grey-mid); margin-bottom: 20px; line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
  .blog-read-more { margin-top: auto; font-weight: 700; font-size: 13px; color: var(--gold); text-transform: uppercase; letter-spacing: 1px; }
  @media (max-width: 768px) { .blog-grid { grid-template-columns: 1fr; } }
</style>
```

- [ ] **Step 11.7:** Create `bluecom-astro/src/pages/blog/[slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import BlogPostLayout from '@/layouts/BlogPostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
---

<BlogPostLayout
  title={post.data.title}
  description={post.data.description}
  pubDate={post.data.pubDate}
  author={post.data.author}
  category={post.data.category}
  image={post.data.image}
>
  <Content />
</BlogPostLayout>
```

- [ ] **Step 11.8:** Commit

```bash
git add bluecom-astro/src/content/ bluecom-astro/src/layouts/BlogPostLayout.astro bluecom-astro/src/pages/blog/ && git commit -m "feat: add blog system with Content Collections and sample posts"
```

---

## Task 12: 404 Page

**Estimated time:** 5 min
**Depends on:** Task 3

- [ ] **Step 12.1:** Create `bluecom-astro/src/pages/404.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import SkipLink from '@/components/ui/SkipLink.astro';
import GrainOverlay from '@/components/ui/GrainOverlay.astro';
import Header from '@/components/layout/Header.astro';
---

<BaseLayout
  title="Page non trouvée | BLUECOM Stratégies"
  description="La page que vous recherchez n'existe pas ou a été déplacée."
>
  <Fragment slot="skip"><SkipLink /></Fragment>
  <Fragment slot="grain"><GrainOverlay /></Fragment>
  <Header />

  <main id="main-content" class="error-page">
    <div class="error-content">
      <div class="error-code">404</div>
      <h1 class="error-title">Page non trouvée</h1>
      <p class="error-desc">La page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'URL ou retournez à l'accueil pour continuer votre navigation.</p>
      <div class="error-actions">
        <a href="/" class="btn-primary">Retour à l'accueil <span class="btn-arrow">→</span></a>
        <a href="/services/" class="btn-secondary">Nos Expertises</a>
      </div>
    </div>
  </main>
</BaseLayout>

<style>
  .error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--blue-dark);
    text-align: center;
    padding: 80px 24px;
  }

  .error-content { max-width: 600px; }

  .error-code {
    font-family: var(--font-display);
    font-size: 140px;
    font-weight: 700;
    color: var(--gold);
    line-height: 1;
    margin-bottom: 20px;
  }

  .error-title {
    font-family: var(--font-display);
    font-size: 36px;
    font-weight: 600;
    color: var(--white);
    margin-bottom: 20px;
  }

  .error-desc {
    font-family: var(--font-body);
    font-size: 17px;
    color: rgba(255, 255, 255, 0.65);
    line-height: 1.7;
    margin-bottom: 40px;
  }

  .error-actions {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .error-actions .btn-primary {
    background: var(--gold);
    color: var(--blue-dark);
    border-color: var(--gold);
  }

  .error-actions .btn-primary:hover {
    background: var(--white);
    color: var(--blue-dark);
    border-color: var(--white);
  }

  .error-actions .btn-secondary {
    color: var(--white);
    border-color: rgba(255, 255, 255, 0.25);
  }

  .error-actions .btn-secondary:hover {
    background: var(--white);
    color: var(--blue-deep);
    border-color: var(--white);
  }
</style>
```

- [ ] **Step 12.2:** Commit

```bash
git add bluecom-astro/src/pages/404.astro && git commit -m "feat: add custom 404 error page"
```

---

## Task 13: Client-Side JavaScript (Scroll Animations)

**Estimated time:** 10 min
**Depends on:** Task 9

- [ ] **Step 13.1:** Create `bluecom-astro/src/scripts/animations.ts`

```ts
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('visible');
    });
    return;
  }

  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
});
```

- [ ] **Step 13.2:** Import animations in `BaseLayout.astro` — add this line before `</body>`:

```astro
  <script>
    import '../scripts/animations.ts';
  </script>
```

The full `BaseLayout.astro` body closing section becomes:

```astro
  <slot name="scripts" />
  <script>
    import '../scripts/animations.ts';
  </script>
</body>
</html>
```

- [ ] **Step 13.3:** Commit

```bash
git add bluecom-astro/src/scripts/ bluecom-astro/src/layouts/BaseLayout.astro && git commit -m "feat: add IntersectionObserver scroll reveal animations"
```

---

## Task 14: Final Build Verification

**Estimated time:** 15 min
**Depends on:** All previous tasks

- [ ] **Step 14.1:** Run build — verify no errors

```bash
cd bluecom-astro && npm run build
```

Expected output: No errors. Output ends with something like:
```
Completed in X.Xs
```

- [ ] **Step 14.2:** Run type check

```bash
cd bluecom-astro && npm run lint
```

Expected output: No TypeScript errors

- [ ] **Step 14.3:** Start preview server and verify all pages

```bash
cd bluecom-astro && npx astro preview --port 4321 &
sleep 3

# Verify each page returns 200
curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/about/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/services/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/methodology/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/portfolio/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/blog/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/blog/strategie-digitale-afrique/
# Expected: 200

curl -s -o /dev/null -w "%{http_code}" http://localhost:4321/404-test-does-not-exist/
# Expected: 200 (serves 404.astro page)

kill %1 2>/dev/null || true
```

- [ ] **Step 14.4:** Verify homepage content

```bash
curl -s http://localhost:4321/ | grep -c "BLUECOM"
# Expected: > 0

curl -s http://localhost:4321/ | grep -c "skip-link"
# Expected: 1 (accessibility skip link present)

curl -s http://localhost:4321/ | grep -c "grain-overlay"
# Expected: 1 (grain overlay present)

curl -s http://localhost:4321/ | grep -c "aria-label"
# Expected: > 0 (accessibility attributes present)

curl -s http://localhost:4321/ | grep -c "Schema.org\|schema.org"
# Expected: > 0 (structured data present)
```

- [ ] **Step 14.5:** Verify responsive viewport meta tag on all pages

```bash
for page in "/" "/about/" "/services/" "/methodology/" "/portfolio/" "/blog/"; do
  count=$(curl -s "http://localhost:4321$page" | grep -c 'viewport')
  echo "$page: viewport=$count"
done
# Expected: all show viewport=1
```

- [ ] **Step 14.6:** Verify prefers-reduced-motion is respected in CSS

```bash
grep -r "prefers-reduced-motion" bluecom-astro/src/
# Expected: matches in global.css and Marquee.astro
```

- [ ] **Step 14.7:** Verify all images have alt text

```bash
grep -r 'alt=""' bluecom-astro/src/ | grep -v "aria-hidden"
# Expected: no empty alt attributes (except decorative images with aria-hidden)
```

- [ ] **Step 14.8:** Final commit

```bash
git add -A && git commit -m "chore: final build verification and cleanup"
```

---

## Post-Migration Checklist

After completing all tasks, verify:

- [ ] `npm run build` completes without errors
- [ ] All pages render: /, /about/, /services/, /methodology/, /portfolio/, /blog/, /blog/[slug]/
- [ ] 404 page renders for unknown routes
- [ ] Navigation works on all pages (header, footer)
- [ ] Mobile navigation toggle works
- [ ] Scroll reveal animations work (and respect prefers-reduced-motion)
- [ ] Back to top button appears after scrolling
- [ ] Contact form validation works
- [ ] Skip link works on keyboard navigation
- [ ] All images have descriptive alt text
- [ ] Gold text only appears at 18px+ or bold
- [ ] Responsive at 375px, 768px, 1200px+
- [ ] Blog posts render from Content Collections
- [ ] Schema.org structured data present in HTML head
- [ ] Meta tags and OG tags correct on all pages
- [ ] No console errors in browser

## File Tree Summary

```
bluecom-astro/
├── public/
│   ├── favicon.png
│   └── images/
│       ├── logo.png
│       ├── team/
│       └── blog/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── Navigation.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── Marquee.astro
│   │   │   ├── About.astro
│   │   │   ├── Team.astro
│   │   │   ├── Services.astro
│   │   │   ├── Methodology.astro
│   │   │   ├── Portfolio.astro
│   │   │   ├── Testimonials.astro
│   │   │   ├── BlogSection.astro
│   │   │   └── Contact.astro
│   │   └── ui/
│   │       ├── Button.astro
│   │       ├── SectionLabel.astro
│   │       ├── BackToTop.astro
│   │       ├── SkipLink.astro
│   │       └── GrainOverlay.astro
│   ├── content/
│   │   ├── config.ts
│   │   └── blog/
│   │       ├── strategie-digitale-afrique.md
│   │       ├── gestion-crise-anticiper.md
│   │       └── interview-mediatique-dirigeants.md
│   ├── data/
│   │   ├── team.ts
│   │   ├── services.ts
│   │   ├── stats.ts
│   │   ├── marquee.ts
│   │   └── methodology.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── BlogPostLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── services.astro
│   │   ├── methodology.astro
│   │   ├── portfolio.astro
│   │   ├── 404.astro
│   │   └── blog/
│   │       ├── index.astro
│   │       └── [slug].astro
│   ├── scripts/
│   │   └── animations.ts
│   └── styles/
│       ├── variables.css
│       └── global.css
├── astro.config.mjs
├── tsconfig.json
└── package.json
```
