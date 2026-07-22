export interface Client {
  name: string;
  initials: string;
  color: string;
}

export const clients: Client[] = [
  { name: "Groupe Pétrolier du Sénégal", initials: "GPS", color: "#004080" },
  { name: "Banque Atlantique", initials: "BA", color: "#C9A84C" },
  { name: "Ministère de l'Économie", initials: "ME", color: "#1a3a5c" },
  { name: "Sonatel", initials: "ST", color: "#2d5a87" },
  { name: "Groupe Teyliom", initials: "GT", color: "#8b2c2c" },
  { name: "Air Sénégal", initials: "AS", color: "#1a4a3a" },
  { name: "Dakar Université", initials: "DU", color: "#5a2d87" },
  { name: "Ciments du Sahel", initials: "CS", color: "#5c3a1a" },
  { name: "Orange Sénégal", initials: "OS", color: "#e65100" },
  { name: "Groupe Sonaged", initials: "GS", color: "#00695c" },
  { name: "Senelec", initials: "SE", color: "#283593" },
  { name: "Manoeuvre Conseil", initials: "MC", color: "#4a148c" },
];
