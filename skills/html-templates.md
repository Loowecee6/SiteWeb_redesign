# BLUECOM Blog — Templates HTML Complets

Ce fichier contient les blocs HTML copiables et assemblables pour produire
un article complet. Combiner ces blocs selon le format choisi.

---

## SHELL COMPLET — DOCTYPE & HEAD

```html
<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>[TITRE DE L'ARTICLE] — BLUECOM Stratégies</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  /* → Coller ici toutes les variables et règles CSS de references/design-system.md */
  /* → Surcharger --accent et --accent2 selon le thème */
</style>
</head>
<body>
  <!-- TOPBAR -->
  <!-- HERO (Format A/B ou C) -->
  <!-- ARTICLE WRAP -->
  <!-- CTA STRIP -->
  <!-- SITE FOOTER -->
  <!-- SCRIPT (Format C uniquement) -->
</body>
</html>
```

---

## BLOC 1 — TOPBAR

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

## BLOC 2A — HÉRO FORMAT A/B (avec colonne SVG)

```html
<section class="hero">
  <div class="hero-content">

    <div class="category-tag">
      <span class="line"></span>
      <span>[THÈME] · [SOUS-CATÉGORIE]</span>
    </div>

    <p class="hero-kicker">[Accroche courte — tension ou paradoxe]</p>

    <h1 class="article-title">[Titre principal de l'article]</h1>

    <p class="article-intro">[Chapeau en 2–3 phrases. Enjeu + promesse de l'article.]</p>

    <div class="article-info">
      <span>🗓 [Mois Année]</span>
      <span>⏱ [X] min de lecture</span>
      <span>📍 Dakar, Sénégal</span>
    </div>

  </div>

  <div class="article-visual">
    <!-- Illustration SVG thématique ici -->
    <!-- Voir references/themes.md pour les instructions par thème -->
    <svg viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg">
      <!-- ... -->
    </svg>
  </div>
</section>
```

---

## BLOC 2C — HÉRO FORMAT C (typographique pleine largeur)

```html
<section class="hero">
  <div class="hero-inner">

    <div class="hero-eyebrow">
      <div class="dash"></div>
      <span>[Thème] · [Sous-catégorie éditoriale]</span>
    </div>

    <h1 class="hero-headline">
      <span class="line-muted">[Première partie du titre — muted/italique]</span>
      [Deuxième partie du titre]
      <span class="line-accent">[Mot ou groupe accentué en or]</span>
    </h1>

    <div class="hero-sub-band">
      <p class="hero-lead">[Chapeau — 2 à 4 phrases. Enjeu, contexte, promesse.]</p>
      <div class="hero-meta-block">
        <p class="meta-item"><strong>BLUECOM Stratégies</strong></p>
        <p class="meta-item">Dakar · [Mois Année]</p>
        <p class="meta-item">⏱ [X] min de lecture</p>
      </div>
    </div>

  </div>
  <div class="reading-bar"><div class="reading-bar-fill" id="readBar"></div></div>
</section>
```

---

## BLOC 3 — OUVERTURE D'ARTICLE WRAP

```html
<div class="article-wrap">

  <!-- Accroche italique d'ouverture -->
  <p class="opening-statement">
    [2 à 4 phrases en italique. Plante le décor, la scène ou le paradoxe.
    Peut contenir un <span class="highlight">mot ou groupe mis en valeur</span>.]
  </p>

  <!-- Sections ici -->

</div>
```

---

## BLOC 4 — SECTION STANDARD

```html
<div class="section">
  <div class="section-label">
    <span class="num">01 —</span>
    <span class="line"></span>
  </div>
  <h2>[Titre de la section — sous forme de question ou d'affirmation forte]</h2>
  <p>[Paragraphe d'introduction de la section...]</p>
  <p>[Développement...]</p>
</div>
```

**Note :** Incrémenter le numéro (01, 02, 03…) pour chaque section. Idéalement 5 à 7 sections par article.

---

## BLOC 5 — PULL QUOTE (fond crème)

```html
<div class="mid-quote">
  <p>[Citation forte, en italique. Peut contenir un <em>groupe accentué</em>
  en couleur thématique pour le mot ou l'idée centrale.]</p>
</div>
```

---

## BLOC 6 — CITATION CENTRALE (fond sombre)

Utiliser pour une citation d'origine externe, une réflexion fondatrice,
ou un manifeste fort. C'est le composant le plus impactant de l'article.

```html
<div class="origin-quote">
  <p>[Première partie de la citation ou du manifeste...]</p>
  <p>[Suite si nécessaire — <span class="quote-strong">mots forts en couleur</span>.]</p>
  <p>[Troisième paragraphe si citation longue...]</p>
</div>
```

---

## BLOC 7 — LISTE NARRATIVE NUMÉROTÉE

Utiliser pour les "X raisons de...", "X étapes pour...", "X erreurs à éviter".
Chaque item a un titre bold + explication.

```html
<ol class="narrative-list">
  <li>
    <strong>[Titre de l'item — bref et percutant]</strong>
    [Développement de l'item en 3 à 6 lignes. Ancrage terrain, exemple concret,
    lien avec le contexte sénégalais ou africain si possible.]
  </li>
  <li>
    <strong>[Titre de l'item 2]</strong>
    [Développement...]
  </li>
  <!-- Répéter pour chaque item. 4 à 6 items idéalement. -->
</ol>
```

---

## BLOC 8 — BLOC STATISTIQUES (3 colonnes)

```html
<div class="stat-row">
  <div class="stat-cell">
    <div class="stat-number">[Chiffre]</div>
    <div class="stat-label">[Explication courte de ce que mesure ce chiffre]</div>
  </div>
  <div class="stat-cell">
    <div class="stat-number">[Chiffre]</div>
    <div class="stat-label">[Explication...]</div>
  </div>
  <div class="stat-cell">
    <div class="stat-number">[Chiffre]</div>
    <div class="stat-label">[Explication...]</div>
  </div>
</div>
```

---

## BLOC 9 — TABLEAU COMPARATIF 2 COLONNES

```html
<div class="compare-block">
  <div class="compare-col col-a">
    <h3>📣 [Colonne A — titre]</h3>
    <ul>
      <li>[Item 1]</li>
      <li>[Item 2]</li>
      <li>[Item 3]</li>
      <li>[Item 4]</li>
      <li>[Item 5]</li>
    </ul>
  </div>
  <div class="compare-col col-b">
    <h3>🎯 [Colonne B — titre]</h3>
    <ul>
      <li>[Item 1]</li>
      <li>[Item 2]</li>
      <li>[Item 3]</li>
      <li>[Item 4]</li>
      <li>[Item 5]</li>
    </ul>
  </div>
</div>
```

---

## BLOC 10 — TABLEAU DE DONNÉES

```html
<table class="data-table">
  <thead>
    <tr>
      <th>[Colonne 1]</th>
      <th>[Colonne 2]</th>
      <th>[Colonne 3]</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>[Valeur]</td>
      <td><span class="badge badge-a">[Badge A]</span></td>
      <td>[Description]</td>
    </tr>
    <tr>
      <td>[Valeur]</td>
      <td><span class="badge badge-b">[Badge B]</span></td>
      <td>[Description]</td>
    </tr>
  </tbody>
</table>
```

CSS des badges à ajouter selon le thème :
```css
.badge-a { background: rgba(196,136,42,.15); color: var(--accent); }
.badge-b { background: rgba(16,14,11,.07); color: var(--muted); }
```

---

## BLOC 11 — ENCADRÉ BLUECOM

```html
<div class="bluecom-box">
  <p>[Texte de l'encadré. Relier l'article à la démarche BLUECOM.
  Expliquer comment BLUECOM a vécu ce problème, ou comment l'agence
  l'aborde pour ses clients. Toujours ancrer dans une réalité concrète.]</p>
  <p>[Suite si nécessaire. <strong>Mettre en gras</strong> les points-clés de la démarche.]</p>
</div>
```

---

## BLOC 12 — ENCADRÉ ALERTE

```html
<div class="alert-box">
  <p><strong>[Situation typique ou mise en garde :]</strong>
  [Description du cas concret, de l'erreur fréquente, ou de la mise en garde.
  Toujours ancré dans un contexte terrain africain. 3 à 5 lignes maximum.]</p>
</div>
```

---

## BLOC 13 — CHECKLIST D'ACTION

```html
<div class="action-checklist">
  <h3>[Titre de la checklist — ex : "Votre audit en 8 questions"]</h3>
  <ul>
    <li>
      <span class="check-icon"></span>
      [Question ou action à vérifier — formulée à la 2e personne]
    </li>
    <li>
      <span class="check-icon"></span>
      [Item 2...]
    </li>
    <!-- Idéalement 6 à 10 items -->
  </ul>
</div>
```

---

## BLOC 14 — SÉPARATEUR ORNEMENTAL

```html
<div class="ornamental-div"><span>✦ ✦ ✦</span></div>
```

Utiliser pour séparer des sections thématiquement distinctes dans un long article.
Maximum 2 à 3 fois par article.

---

## BLOC 15 — BLOC CONCLUSION

```html
<div class="conclusion-block">
  <p class="concl-label">Pour conclure</p>
  <p>[Paragraphe de synthèse — reformuler la tension centrale de l'article
  et le chemin parcouru. Rappeler l'enjeu pour le lecteur.]</p>
  <p>[Paragraphe intermédiaire si nécessaire...]</p>
  <p>[Phrase finale — mémorable, courte, fonctionne seule hors contexte.
  En gras optionnel.]</p>
</div>
```

---

## BLOC 16 — CTA STRIP

```html
<div class="cta-strip">
  <h3>[Titre de l'appel à l'action — lié au thème de l'article]</h3>
  <p>[1 à 2 phrases expliquant comment BLUECOM peut aider sur ce sujet précis.]</p>
  <a href="#" class="cta-btn">Parlons de votre [sujet]</a>
</div>
```

### CTAs recommandés par thème

| Thème | CTA suggéré |
|-------|-------------|
| Stratégie | "Construisons votre stratégie de communication" |
| Crise | "Audit de préparation aux crises" |
| Media Training | "Formez vos dirigeants aux médias" |
| Digital | "Parlons de votre visibilité digitale" |
| Relations Publiques | "Cartographions vos parties prenantes" |
| Audiovisuel | "Donnons vie à votre histoire en vidéo" |

---

## BLOC 17 — FOOTER

```html
<footer class="site-footer">
  <strong>BLUECOM Stratégies</strong> — Agence conseil en communication · Dakar, Sénégal · 2026
</footer>
```

---

## BLOC 18 — SCRIPT BARRE DE LECTURE (Format C)

```html
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

---

## ASSEMBLAGE PAR FORMAT

### Format A — Tribune éditoriale
```
TOPBAR
HÉRO FORMAT A/B
ARTICLE WRAP
  ├── opening-statement
  ├── section (01)
  ├── origin-quote OU mid-quote
  ├── section (02)
  ├── compare-block OU data-table
  ├── section (03)
  ├── alert-box
  ├── section (04)
  ├── ornamental-div
  ├── section (05)
  └── conclusion-block
CTA STRIP
FOOTER
```

### Format B — Analyse de fond
```
TOPBAR
HÉRO FORMAT A/B
ARTICLE WRAP
  ├── opening-statement
  ├── section (01)
  ├── section (02)
  ├── mid-quote
  ├── section (03)
  ├── stat-row
  ├── section (04)
  ├── narrative-list
  ├── section (05)
  ├── ornamental-div
  ├── section (06) [optionnel]
  └── conclusion-block
CTA STRIP
FOOTER
```

### Format C — Manifeste / Appel à l'action
```
TOPBAR
HÉRO FORMAT C (avec reading-bar)
ARTICLE WRAP
  ├── opening-statement
  ├── section (01)
  ├── origin-quote [citation fondatrice]
  ├── section (02) avec narrative-list
  ├── mid-quote
  ├── section (03) avec stat-row
  ├── ornamental-div
  ├── section (04) avec bluecom-box
  ├── section (05) avec narrative-list
  ├── ornamental-div
  ├── action-checklist
  └── conclusion-block
CTA STRIP
FOOTER
SCRIPT [reading bar]
```
