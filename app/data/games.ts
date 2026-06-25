export interface Game {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  badge?: string;
  description: string;
}

export const games: Game[] = [
  {
    id: "1",
    name: "Mobile Legends: Bang Bang",
    slug: "mobile-legends",
    image: "/images/games/mobile-legends.jpg",
    category: "MOBA",
    badge: "HOT",
    description: "Top up Diamond Mobile Legends dengan harga termurah.",
  },
];

export const categories = ["Semua", "MOBA"];