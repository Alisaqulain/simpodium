export type BrandItem = {
  name: string;
  subtitle?: string;
  kind: "collectible" | "team" | "manufacturer";
  img: string;
};

export const brands: BrandItem[] = [
  {
    name: "MJX HyperGo",
    subtitle: "MJX • HyperGo",
    kind: "collectible",
    img: "/Mjx1.jpeg",
  },
  {
    name: "MJX",
    kind: "collectible",
    img: "/mjx.jpeg",
  },
  {
    name: "Rallaro",
    kind: "collectible",
    img: "/Rallaro.avif",
  },
  {
    name: "Mini GT",
    kind: "collectible",
    img: "/miniGT.webp",
  },
  {
    name: "Pop Race",
    kind: "collectible",
    img: "/Pop race.jpg",
  },
  {
    name: "Tomica",
    kind: "collectible",
    img: "/brands/tomica.jpg",
  },
  {
    name: "Bburago",
    subtitle: "B Burago",
    kind: "collectible",
    img: "/Bburago.jpg",
  },
  {
    name: "Ferrari",
    kind: "manufacturer",
    img: "/Ferrari.jpeg",
  },
  {
    name: "Red Bull",
    kind: "team",
    img: "/Redbull.jpeg",
  },
  {
    name: "McLaren",
    kind: "manufacturer",
    img: "/McLaren.jpeg",
  },
  {
    name: "Mercedes",
    kind: "manufacturer",
    img: "/Mercedes.jpeg",
  },
  {
    name: "Audi",
    kind: "manufacturer",
    img: "/Audi.jpg",
  },
  {
    name: "BMW",
    kind: "manufacturer",
    img: "/brands/bmw.jpg",
  },
  {
    name: "Lamborghini",
    kind: "manufacturer",
    img: "/Lamborghini.jpeg",
  },
];

