export type Service = {
  n: string;
  title: string;
  duration: string;
  price: string;
  desc: string;
  featured?: boolean;
};

export const SERVICES: Service[] = [
  { n: "I", title: "Pachet Tuns Bărbați", duration: "30 min", price: "80", desc: "Tuns, spălat, curățare facială, styling." },
  { n: "II", title: "Pachet Tuns + Barbă", duration: "40 min", price: "100", desc: "Tuns, spălat, aranjat barbă, curățare facială, styling, produse de întreținere barbă." },
  { n: "III", title: "Pachet Dad & Son", duration: "60 min", price: "140 – 160", desc: "O experiență împărtășită — tată și fiu, pe scaune alăturate. Tuns complet pentru amândoi." },
  { n: "IV", title: "Tuns Simplu", duration: "15 min", price: "60", desc: "Tuns simplu din 3 mm. Rapid, curat, esențial." },
  { n: "V", title: "Tuns Simplu + Aranjat Barbă", duration: "30 min", price: "90", desc: "Produse de întreținere barbă, curățare facială." },
  { n: "VI", title: "Tuns Băieți", duration: "30 min", price: "60 – 70", desc: "Pentru cei mai tineri domni ai casei. Răbdare, atenție și un scaun pe măsură." },
  { n: "VII", title: "Aranjat Barbă", duration: "20 min", price: "50", desc: "Tuns, contur, produse de întreținere și hidratare, curățare facială." },
  { n: "VIII", title: "Aranjat Bărbați", duration: "15 min", price: "50", desc: "Spălat, uscat, styling, curățare facială." },
  { n: "IX", title: "Pachet Premium", featured: true, duration: "60 min", price: "140", desc: "Masaj capilar 10 min · Spălat · Tuns · Aranjat Barbă · Curățare facială · Styling · Produse de întreținere și hidratare barbă." },
];

export const TEAM = [
  { name: "Andrei Voiculescu", role: "Master Barber · Fondator", bio: "14 ani la scaun. Tuns clasic, foarfecă peste pieptene și o pasiune pentru bărbieritul cu briciul." },
  { name: "Ștefan Marin", role: "Senior Barber", bio: "Specialist în fade-uri precise și styling editorial. Format la Londra, întors acasă." },
  { name: "Cătălin Petre", role: "Barber & Beard Artist", bio: "Artizanul bărbii. Forme arhitecturale, hot towel, oils și o mână fermă." },
];

export const TESTIMONIALS = [
  { text: "Am intrat obosit, am ieșit ca un domn. Andrei e un meșter adevărat — fiecare detaliu contează.", name: "Mihai R.", initial: "M" },
  { text: "Cel mai bun pachet premium din oraș. Atmosfera, mirosul de produse, muzica — totul e gândit.", name: "Bogdan T.", initial: "B" },
  { text: "Vin de patru ani, n-am încercat alt loc. Tunsoarea ține trei săptămâni perfect, asta spune totul.", name: "Răzvan I.", initial: "R" },
];

export const HOURS = [
  { day: "Luni", time: "10:00 — 20:00" },
  { day: "Marți", time: "10:00 — 20:00" },
  { day: "Miercuri", time: "10:00 — 20:00" },
  { day: "Joi", time: "10:00 — 20:00" },
  { day: "Vineri", time: "10:00 — 21:00" },
  { day: "Sâmbătă", time: "09:00 — 18:00" },
  { day: "Duminică", time: "Închis", closed: true },
];
