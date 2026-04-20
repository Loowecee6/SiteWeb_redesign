---
name: bluecom-blog
description: >
  Rédige et génère des articles de blog HTML complets et prêts à publier pour BLUECOM Stratégies,
  agence conseil en communication basée à Dakar, Sénégal. Utilise ce skill chaque fois que
  l'utilisateur demande un article de blog, une tribune, un billet éditorial ou un contenu long
  pour le site BLUECOM — même s'il dit simplement "écris-moi un article sur X" ou "je veux un
  post de blog". Ce skill couvre les 6 thèmes d'expertise de l'agence : Stratégie, Crise,
  Media Training, Digital, Relations Publiques, Audiovisuel. Il produit un fichier HTML autonome
  avec le design éditorial de référence BLUECOM, les règles éditoriales, et la structure narrative
  codifiée. Ne jamais produire un article en simple texte ou markdown quand ce skill est disponible
  — toujours générer le fichier HTML complet.
---

# BLUECOM Blog — Skill de rédaction d'articles

Ce skill génère des **articles de blog HTML complets**, au design éditorial de référence BLUECOM,
pour les 6 thèmes d'expertise de l'agence. Il encode à la fois les règles éditoriales, la
structure narrative, l'identité visuelle et le code HTML/CSS à produire.

Lire le fichier de référence complet avant de rédiger :
→ `references/design-system.md` — système de design complet (CSS, palette, typographie, composants)
→ `references/themes.md` — règles éditoriales et angles par thème
→ `references/html-templates.md` — blocs HTML copiables pour chaque composant

---

## WORKFLOW DE PRODUCTION

### Étape 0 — Identifier le thème et l'angle

Avant tout, déterminer :
1. **Quel thème BLUECOM** parmi les 6 (voir `references/themes.md`)
2. **Quel format d'article** parmi les 3 formats disponibles (voir ci-dessous)
3. **Quel angle éditorial** : tribune d'opinion, analyse de fond, ou guide pratique
4. **Quelle accroche** : partir d'une tension réelle, d'un paradoxe, ou d'un constat terrain

> Si le sujet n'entre pas dans les 6 thèmes, le rattacher au thème le plus proche. Ne jamais
> produire un article générique sans ancrage thématique BLUECOM.

### Étape 1 — Choisir le format d'article

**FORMAT A — Tribune éditoriale** *(modèle : "Comm vs Marketing")*
- Ton : journaliste senior, voix d'autorité, légèrement provocateur
- Structure : constat → causes → preuves → solutions → conclusion forte
- Longueur : 900–1 200 mots de corps d'article
- Composants obligatoires : citation centrale, tableau comparatif ou liste narrative, encadré alerte

**FORMAT B — Article de fond analytique** *(modèle : "Tendances 2026")*
- Ton : consultant senior, pédagogique, structuré
- Structure : contexte → 4–6 tendances/points développés → perspective
- Longueur : 800–1 100 mots de corps d'article
- Composants obligatoires : pull quote, liste à puces thématique, section par section numérotée

**FORMAT C — Article manifeste / appel à l'action** *(modèle : "Visibilité vs Expertise")*
- Ton : tribune personnelle, engagement direct, "vous" impliquant
- Structure : accroche-miroir → citation-choc → développement → confession BLUECOM → checklist → conclusion-punch
- Longueur : 900–1 300 mots de corps d'article
- Composants obligatoires : citation d'origine mise en scène, statistiques, checklist, encadré BLUECOM, barre de lecture JS

### Étape 2 — Rédiger le contenu

Produire les textes dans cet ordre :
1. **Titre** (max 12 mots, avec tension ou paradoxe)
2. **Chapeau** (2–3 phrases, résume l'enjeu, donne envie de lire)
3. **Accroche d'ouverture** (italic, 2–4 phrases, plante le décor ou le conflit)
4. **Corps** (5–7 sections titrées selon le format choisi)
5. **Conclusion** (synthèse + phrase-choc finale mémorable)
6. **CTA** (appel à l'action lié au thème BLUECOM)

### Étape 3 — Générer le HTML

Assembler le fichier HTML complet en utilisant :
- Le **shell HTML de base** (topbar + hero + article-wrap + cta-strip + footer)
- Les **composants thématiques** adaptés au thème et au format
- Les **couleurs d'accentuation** du thème (voir `references/themes.md`)
- L'**illustration SVG** générée selon le thème

Sauvegarder dans `/mnt/user-data/outputs/article_[slug].html`

---

## RÈGLES ÉDITORIALES FONDAMENTALES

### Voix et ton

| Règle | Description |
|-------|-------------|
| **Ancrage géographique** | Toujours citer Dakar, Sénégal, Afrique de l'Ouest ou le continent. Jamais un article générique universel. |
| **Tension d'ouverture** | Chaque article commence par un paradoxe, une injustice ou une scène reconnaissable. |
| **Tutoiement du marché** | S'adresser au lecteur en "vous" — le décideur, l'entrepreneur, le communicant. |
| **Preuve avant affirmation** | Chaque claim fort est étayé par un exemple concret, une stat, ou un cas terrain. |
| **Fin mémorable** | La dernière phrase doit fonctionner seule, hors contexte, comme une formule. |

### Ce qu'on évite absolument

- ❌ Les généralités mondiales sans ancrage Afrique de l'Ouest
- ❌ Le jargon académique non traduit en langage opérationnel
- ❌ Les listes à puces orphelines (toujours précédées d'un paragraphe d'intro)
- ❌ Les titres de section génériques ("Introduction", "Conclusion")
- ❌ La promotion directe de BLUECOM sans lien éditorial naturel
- ❌ Les articles de moins de 700 mots de corps de texte

### Ce qui est toujours présent

- ✅ Une citation mise en exergue (pull quote ou citation centrale)
- ✅ Au moins un composant visuel structurant (tableau, liste narrative, stats, checklist)
- ✅ La mention de Dakar / Sénégal / Afrique de l'Ouest dans le corps
- ✅ Un encadré BLUECOM en lien naturel avec le sujet (sauf si hors sujet)
- ✅ Un CTA éditorial en bas (pas commercial, mais invitant au dialogue)

---

## STRUCTURE DU FICHIER HTML

Chaque article produit suit exactement cette structure de fichier :

```
<!DOCTYPE html>
<html lang="fr">
<head>
  [meta + title + Google Fonts]
  [<style> : variables CSS + composants]
</head>
<body>
  [.topbar]          ← Navigation BLUECOM
  [.hero]            ← Grand titre + chapeau + meta
  [.article-wrap]    ← Corps de l'article
    [.opening-statement]
    [sections numérotées]
    [composants selon format : quote, tableau, stats, checklist...]
    [.conclusion-block]
  [.cta-strip]       ← Appel à l'action
  [.site-footer]     ← Pied de page BLUECOM
  [<script>]         ← Barre de lecture (Format C uniquement)
</body>
</html>
```

Pour le code complet de chaque composant → voir `references/html-templates.md`
Pour les variables CSS et la palette → voir `references/design-system.md`

---

## LES 6 THÈMES ET LEURS ACCENTS

Résumé rapide — détail complet dans `references/themes.md`

| # | Thème | Couleur accent | Badge hex | Ton |
|---|-------|---------------|-----------|-----|
| 1 | **Stratégie** | Or — `#c4882a` | `#e8c26a` | Prospectif, vision long terme |
| 2 | **Crise** | Terracotta — `#b84a1e` | `#e07b2a` | Urgent, direct, sans fioritures |
| 3 | **Media Training** | Bleu acier — `#4a90b8` | `#7ab8d4` | Pédagogique, pratico-pratique |
| 4 | **Digital** | Vert — `#3d9970` | `#5cb89a` | Dynamique, données, terrain |
| 5 | **Relations Publiques** | Violet — `#7c5cbf` | `#a88de0` | Subtil, stratégique, nuancé |
| 6 | **Audiovisuel** | Orange — `#e07b2a` | `#f0a855` | Créatif, sensoriel, vivant |

---

## CHECK-LIST AVANT LIVRAISON

Avant de sauvegarder et présenter le fichier HTML, vérifier :

- [ ] Le fichier s'appelle `article_[slug-du-titre].html`
- [ ] Le `<title>` HTML inclut le titre de l'article et "BLUECOM Stratégies"
- [ ] La couleur d'accent correspond au thème (variable `--accent` et `--accent2`)
- [ ] Le héro contient : tag catégorie + kicker + titre H1 + chapeau + meta (date, durée, lieu)
- [ ] Le corps contient au moins 5 sections avec titres H2
- [ ] Au moins une citation centrale ou pull quote est présente
- [ ] Au moins un composant structurant (tableau, liste narrative, stats, checklist) est présent
- [ ] L'encadré BLUECOM est présent si pertinent
- [ ] Le CTA final est cohérent avec le thème de l'article
- [ ] L'illustration SVG dans le héro est thématique (pas générique)
- [ ] Le fichier est sauvegardé dans `/mnt/user-data/outputs/`
