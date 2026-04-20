# BLUECOM Blog — Système de Design de Référence

Ce fichier contient l'intégralité du code CSS de référence, les variables,
la typographie et les règles visuelles extraites des articles canoniques.

---

## 1. VARIABLES CSS GLOBALES

Copier ces variables dans chaque `<style>` d'article. Modifier uniquement
`--accent` et `--accent2` selon le thème (voir tableau dans SKILL.md).

```css
:root {
  /* === BASE === */
  --bg:        #f9f6f1;   /* fond crème chaud */
  --ink:       #100e0b;   /* texte principal */
  --deep:      #0f1c2a;   /* bleu nuit — héro, footer, encadrés foncés */
  --warm:      #efe9de;   /* fond section intermédiaire */
  --rule:      #ddd5c5;   /* séparateurs, bordures légères */
  --muted:     #8a8078;   /* texte secondaire, labels */

  /* === THÈME (à surcharger selon le thème de l'article) === */
  --accent:    #c4882a;   /* couleur principale du thème */
  --accent2:   #e8c26a;   /* couleur secondaire / hover */

  /* === TYPOGRAPHIE === */
  --font-serif: 'Cormorant Garamond', 'Libre Baskerville', Georgia, serif;
  --font-sans:  'DM Sans', 'Barlow', system-ui, sans-serif;
}
```

### Surcharges par thème

```css
/* STRATÉGIE */
--accent: #c4882a;  --accent2: #e8c26a;

/* CRISE */
--accent: #b84a1e;  --accent2: #e07b2a;

/* MEDIA TRAINING */
--accent: #4a90b8;  --accent2: #7ab8d4;

/* DIGITAL */
--accent: #3d9970;  --accent2: #5cb89a;

/* RELATIONS PUBLIQUES */
--accent: #7c5cbf;  --accent2: #a88de0;

/* AUDIOVISUEL */
--accent: #e07b2a;  --accent2: #f0a855;
```

---

## 2. TYPOGRAPHIE

### Google Fonts à importer (choisir la paire selon le format)

**Format A & B (analytique, fond) :**
```html
<link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

**Format C (manifeste, tribune) :**
```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Hiérarchie typographique

| Élément | Font | Taille | Graisse | Couleur |
|---------|------|--------|---------|---------|
| H1 héro | Serif | clamp(3rem, 7vw, 6.5rem) | 700 | #fff (sur fond sombre) |
| H2 section | Serif | clamp(1.5rem, 2.8vw, 2.05rem) | 700 | var(--deep) |
| Corps texte | Sans | 0.97rem | 400 | #3a3228 |
| Pull quote | Serif | clamp(1.3rem, 2.5vw, 1.75rem) | 400 italique | var(--deep) ou #fff |
| Label section | Sans | 0.68rem | 700 | var(--accent) |
| Badge/tag | Sans | 0.7rem | 700 | var(--accent) |
| Meta info | Sans | 0.72rem | 400 | rgba(255,255,255,.4) |

### Règles typographiques

- Les titres H1 du héro utilisent `clamp()` pour être responsive
- Les H2 de section sont précédés d'un `.section-label` numéroté
- Le corps de texte a `line-height: 1.85–1.88` pour respiration maximale
- Les citations sont toujours en *Cormorant Garamond italique*
- Jamais d'Arial, Roboto ou Inter

---

## 3. TOPBAR (Navigation fixe)

```css
.topbar {
  background: var(--deep);
  padding: 12px 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--accent);
  position: sticky;
  top: 0;
  z-index: 100;
}
.logo {
  font-family: var(--font-serif);
  color: #fff;
  font-size: 1.15rem;
  font-weight: 600;
  letter-spacing: .12em;
  text-transform: uppercase;
}
.logo em { color: var(--accent2); font-style: normal; }
.topnav a {
  color: rgba(255,255,255,.4);
  text-decoration: none;
  font-size: .72rem;
  letter-spacing: .14em;
  text-transform: uppercase;
  margin-left: 28px;
  transition: color .2s;
}
.topnav a:hover { color: var(--accent2); }
```

```html
<header class="topbar">
  <div class="logo">Blue<em>Com</em> Stratégies</div>
  <nav class="topnav">
    <a href="#">Accueil</a>
    <a href="#">Services</a>
    <a href="#">Blog</a>
    <a href="#">Contact</a>
  </nav>
</header>
```

---

## 4. HÉRO — DEUX VARIANTES

### Héro Format A/B (avec colonne visuelle SVG)

```css
.hero {
  background: var(--deep);
  display: grid;
  grid-template-columns: 1fr 420px;
  min-height: 80vh;
  overflow: hidden;
  position: relative;
}
.hero::before {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    -55deg, transparent 0, transparent 40px,
    rgba(196,136,42,.03) 40px, rgba(196,136,42,.03) 41px
  );
  pointer-events: none;
}
.hero-content {
  padding: 80px 72px 80px 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative; z-index: 2;
}
```

### Héro Format C (pleine largeur, typographique)

```css
.hero {
  background: var(--deep);
  position: relative;
  overflow: hidden;
  padding: 100px 0 0;
}
.hero-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 64px;
  position: relative; z-index: 2;
}
.hero-headline {
  font-family: var(--font-serif);
  font-size: clamp(3rem, 7vw, 6.5rem);
  font-weight: 700;
  line-height: 1.05;
  color: #fff;
}
.hero-headline .line-muted {
  display: block;
  color: rgba(255,255,255,.28);
  font-style: italic;
  font-weight: 400;
}
.hero-headline .line-accent {
  display: block;
  color: var(--accent2);
}
.hero-headline .line-accent::after {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(90deg, var(--accent), transparent);
  margin-top: 10px;
  width: 70%;
}
```

---

## 5. COMPOSANTS DE CORPS D'ARTICLE

### 5.1 — Section standard

```css
.section { margin-bottom: 56px; }

.section-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}
.section-label .num {
  font-size: .68rem; font-weight: 700;
  color: var(--accent);
  letter-spacing: .2em; text-transform: uppercase;
}
.section-label .line {
  width: 28px; height: 1px;
  background: var(--accent); opacity: .5;
}

.section h2 {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 2.8vw, 2.05rem);
  font-weight: 700; color: var(--deep);
  line-height: 1.25; margin-bottom: 22px;
}

.section p {
  font-size: .97rem; color: #3a3228;
  line-height: 1.88; margin-bottom: 18px;
}
```

```html
<div class="section">
  <div class="section-label">
    <span class="num">01</span>
    <span class="line"></span>
  </div>
  <h2>Titre de la section</h2>
  <p>Corps du texte...</p>
</div>
```

### 5.2 — Pull quote (fond clair)

```css
.mid-quote {
  margin: 52px -40px;
  padding: 44px 80px;
  background: var(--warm);
  border-top: 3px solid var(--accent);
  border-bottom: 3px solid var(--accent);
  text-align: center;
}
.mid-quote p {
  font-family: var(--font-serif);
  font-size: clamp(1.3rem, 2.5vw, 1.75rem);
  font-style: italic;
  color: var(--deep);
  line-height: 1.55;
}
.mid-quote p em {
  color: var(--accent); font-style: normal; font-weight: 600;
}
```

```html
<div class="mid-quote">
  <p>La compétence vous donne le droit d'être dans la compétition.<br>
  <em>La visibilité vous donne le droit d'être choisi.</em></p>
</div>
```

### 5.3 — Citation centrale (fond sombre)

```css
.origin-quote {
  position: relative;
  background: var(--deep);
  padding: 52px 56px;
  margin: 52px 0;
  overflow: hidden;
}
.origin-quote::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 5px;
  background: linear-gradient(180deg, var(--accent), var(--accent2));
}
.origin-quote::after {
  content: '\201C';
  position: absolute;
  right: 32px; bottom: -40px;
  font-family: var(--font-serif);
  font-size: 16rem;
  color: rgba(196,136,42,.08);
  line-height: 1; pointer-events: none;
}
.origin-quote p {
  font-family: var(--font-serif);
  font-size: clamp(1.1rem, 2vw, 1.45rem);
  font-style: italic;
  color: rgba(255,255,255,.88);
  line-height: 1.7;
  position: relative; z-index: 1;
  margin-bottom: 0;
}
.origin-quote .quote-strong {
  color: var(--accent2); font-style: normal; font-weight: 600;
}
```

### 5.4 — Liste narrative numérotée

```css
.narrative-list {
  list-style: none;
  margin: 24px 0;
  counter-reset: nlist;
}
.narrative-list li {
  counter-increment: nlist;
  position: relative;
  padding: 20px 0 20px 60px;
  border-bottom: 1px solid var(--rule);
  font-size: .97rem; color: #3a3228; line-height: 1.75;
}
.narrative-list li:last-child { border-bottom: none; }
.narrative-list li::before {
  content: counter(nlist, decimal-leading-zero);
  position: absolute; left: 0; top: 20px;
  font-family: var(--font-serif);
  font-size: 1.6rem; font-weight: 700;
  color: var(--accent); line-height: 1;
}
.narrative-list li strong {
  display: block; font-weight: 600;
  color: var(--deep); margin-bottom: 4px; font-size: 1rem;
}
```

### 5.5 — Bloc statistiques (3 colonnes)

```css
.stat-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2px;
  background: var(--rule);
  margin: 40px 0;
}
.stat-cell {
  background: #fff;
  padding: 28px 24px;
  text-align: center;
}
.stat-number {
  font-family: var(--font-serif);
  font-size: 3rem; font-weight: 700;
  color: var(--accent); line-height: 1; margin-bottom: 8px;
}
.stat-label {
  font-size: .8rem; color: var(--muted); line-height: 1.5;
}
```

### 5.6 — Encadré BLUECOM (note de rédaction)

```css
.bluecom-box {
  border: 1.5px solid var(--accent);
  background: #f0f5fa;
  padding: 32px 36px;
  margin: 40px 0;
  position: relative;
}
.bluecom-box::before {
  content: 'NOTE DE LA RÉDACTION';
  position: absolute; top: -11px; left: 20px;
  background: #f0f5fa; padding: 0 8px;
  font-size: .65rem; font-weight: 700;
  letter-spacing: .18em; color: var(--accent); text-transform: uppercase;
}
.bluecom-box p {
  font-size: .92rem; color: #1a2e3b;
  line-height: 1.75; margin-bottom: 0;
}
.bluecom-box strong { color: var(--accent); }
```

### 5.7 — Encadré alerte (constat terrain)

```css
.alert-box {
  border: 2px solid var(--accent);
  background: rgba(184,74,30,.06);
  padding: 24px 28px;
  margin: 36px 0;
  position: relative;
}
.alert-box::before {
  content: '⚠';
  position: absolute; top: -14px; left: 20px;
  background: var(--bg); padding: 0 6px;
  font-size: 1.1rem; color: var(--accent);
}
.alert-box p {
  font-size: .92rem; color: #3a1a0a; line-height: 1.7;
}
.alert-box strong { color: var(--accent); }
```

### 5.8 — Tableau comparatif (2 colonnes)

```css
.compare-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2px; background: var(--rule);
  margin: 40px 0; overflow: hidden;
}
.compare-col { padding: 32px 28px; background: #fff; }
.compare-col.col-b { background: #fdf4f0; }
.compare-col h3 {
  font-family: var(--font-serif); font-size: 1.05rem; font-weight: 700;
  margin-bottom: 18px; padding-bottom: 12px; border-bottom: 2px solid var(--accent);
  color: var(--deep);
}
.compare-col.col-b h3 { border-color: var(--accent); color: var(--accent); }
.compare-col ul { list-style: none; }
.compare-col ul li {
  font-size: .88rem; color: #3a3228; line-height: 1.6;
  padding: 7px 0 7px 20px; position: relative;
  border-bottom: 1px solid rgba(0,0,0,.05);
}
.compare-col ul li::before {
  content: '◆'; position: absolute; left: 0;
  color: var(--accent); font-size: .6rem; top: 10px;
}
```

### 5.9 — Checklist d'action

```css
.action-checklist {
  background: var(--deep);
  padding: 40px 44px; margin: 40px 0;
}
.action-checklist h3 {
  font-family: var(--font-serif); font-size: 1.3rem;
  color: #fff; margin-bottom: 24px; font-weight: 700;
  padding-bottom: 16px; border-bottom: 1px solid rgba(255,255,255,.1);
}
.action-checklist ul { list-style: none; }
.action-checklist ul li {
  display: flex; gap: 14px; align-items: flex-start;
  padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,.06);
  font-size: .9rem; color: rgba(255,255,255,.72); line-height: 1.6;
}
.action-checklist ul li:last-child { border-bottom: none; }
.check-icon {
  width: 20px; height: 20px; border: 1.5px solid var(--accent);
  border-radius: 3px; flex-shrink: 0; margin-top: 2px;
}
```

### 5.10 — Séparateur ornemental

```css
.ornamental-div {
  display: flex; align-items: center; gap: 16px; margin: 56px 0;
}
.ornamental-div::before, .ornamental-div::after {
  content: ''; flex: 1; height: 1px; background: var(--rule);
}
.ornamental-div span { color: var(--accent); font-size: .85rem; letter-spacing: 6px; }
```

```html
<div class="ornamental-div"><span>✦ ✦ ✦</span></div>
```

### 5.11 — Tableau de données (data-table)

```css
.data-table {
  width: 100%; border-collapse: collapse; margin: 32px 0; font-size: .88rem;
}
.data-table thead tr { background: var(--deep); color: #fff; }
.data-table thead th {
  padding: 14px 18px; text-align: left;
  font-weight: 600; letter-spacing: .06em; font-size: .78rem; text-transform: uppercase;
}
.data-table tbody tr { border-bottom: 1px solid var(--rule); transition: background .15s; }
.data-table tbody tr:hover { background: var(--warm); }
.data-table tbody td { padding: 14px 18px; vertical-align: top; line-height: 1.55; color: #3a3228; }
.data-table tbody td:first-child { font-weight: 600; color: var(--deep); }
.badge {
  display: inline-block; padding: 2px 10px; border-radius: 2px;
  font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
}
```

---

## 6. CTA STRIP (Appel à l'action final)

```css
.cta-strip {
  background: linear-gradient(135deg, var(--deep), #0a1a2e);
  padding: 64px; text-align: center;
  border-top: 3px solid var(--accent);
  position: relative; overflow: hidden;
}
.cta-strip::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse 60% 80% at 50% 50%, rgba(196,136,42,.07), transparent);
  pointer-events: none;
}
.cta-strip h3 {
  font-family: var(--font-serif);
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  color: #fff; margin-bottom: 16px;
  position: relative; z-index: 1; font-weight: 700;
}
.cta-strip p {
  color: rgba(255,255,255,.5); font-size: .9rem;
  max-width: 420px; margin: 0 auto 36px;
  line-height: 1.7; position: relative; z-index: 1;
}
.cta-btn {
  display: inline-block; background: var(--accent); color: #fff;
  padding: 15px 44px; font-size: .78rem;
  font-weight: 700; letter-spacing: .2em; text-transform: uppercase;
  text-decoration: none; position: relative; z-index: 1;
  transition: background .2s, transform .15s;
}
.cta-btn:hover { background: var(--accent2); transform: translateY(-2px); }
```

---

## 7. FOOTER

```css
.site-footer {
  background: #080604;
  color: rgba(255,255,255,.28);
  text-align: center; padding: 28px;
  font-size: .74rem; letter-spacing: .06em;
}
.site-footer strong { color: var(--accent2); }
```

```html
<footer class="site-footer">
  <strong>BLUECOM Stratégies</strong> — Agence conseil en communication · Dakar, Sénégal · 2026
</footer>
```

---

## 8. BARRE DE LECTURE (Format C uniquement)

```html
<!-- Dans le héro, juste avant la fermeture de </section> -->
<div class="reading-bar"><div class="reading-bar-fill" id="readBar"></div></div>

<!-- En bas du body -->
<script>
  const bar = document.getElementById('readBar');
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    bar.style.width = pct + '%';
  });
</script>
```

```css
.reading-bar { height: 3px; background: rgba(255,255,255,.06); margin-top: 28px; }
.reading-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent), var(--accent2));
  width: 0%; transition: width .1s linear;
}
```

---

## 9. ANIMATIONS D'ENTRÉE

Appliquer sur les éléments du héro pour l'animation au chargement :

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hero-inner > * { animation: fadeUp .6s ease both; }
.hero-inner > *:nth-child(1) { animation-delay: .05s; }
.hero-inner > *:nth-child(2) { animation-delay: .15s; }
.hero-inner > *:nth-child(3) { animation-delay: .28s; }
```

---

## 10. RESPONSIVE — RÈGLES DE BASE

```css
@media (max-width: 820px) {
  .topbar { padding: 12px 24px; }
  .topnav { display: none; }
  .hero-inner { padding: 0 28px; }
  .hero { grid-template-columns: 1fr; }
  .hero-visual { display: none; }   /* masquer SVG sur mobile */
  .article-wrap { padding: 52px 24px 80px; }
  .mid-quote { margin: 40px -20px; padding: 36px 28px; }
  .stat-row { grid-template-columns: 1fr; }
  .compare-block { grid-template-columns: 1fr; }
  .cta-strip { padding: 48px 28px; }
  .origin-quote { padding: 36px 28px; }
  .action-checklist { padding: 28px 24px; }
}
```
