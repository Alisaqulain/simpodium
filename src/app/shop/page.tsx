import { ComingSoonPage } from "@/components/site/ComingSoonPage";
import { features } from "@/config/features";
import { ShopPageContent } from "./ShopPageContent";

export const metadata = {
  title: "Shop",
  description: "SIM PODIUM shop — racing accessories and gear. Coming soon.",
};

export default async function ShopPage() {
  if (!features.shop) {
    return (
      <ComingSoonPage
        eyebrow="SHOP"
        title="Our shop is coming soon."
        desc="Premium sim racing gear — wheels, pedals, gloves, and more — will be available here shortly."
      />
    );
  }

  return <ShopPageContent />;
}
