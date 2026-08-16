import { ComingSoonPage } from "@/components/site/ComingSoonPage";
import { features } from "@/config/features";
import { CafePageContent } from "./CafePageContent";

export const metadata = {
  title: "Cafe",
  description: "SIM PODIUM cafe menu — coffee, drinks, and lounge food. Coming soon.",
};

export default async function CafePage() {
  if (!features.cafe) {
    return (
      <ComingSoonPage
        eyebrow="CAFE"
        title="Our cafe menu is coming soon."
        desc="Coffee, cold drinks, snacks, and fast food for long racing sessions — launching shortly."
      />
    );
  }

  return <CafePageContent />;
}
