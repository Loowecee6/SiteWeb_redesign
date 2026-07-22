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
