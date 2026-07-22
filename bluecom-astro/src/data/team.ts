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
