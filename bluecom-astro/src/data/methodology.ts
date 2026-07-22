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
