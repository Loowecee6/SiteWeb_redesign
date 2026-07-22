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
