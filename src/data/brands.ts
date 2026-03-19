export type BrandItem = {
  name: string;
  subtitle?: string;
  kind: "collectible" | "team" | "manufacturer";
  img: string;
};

export const brands: BrandItem[] = [];

