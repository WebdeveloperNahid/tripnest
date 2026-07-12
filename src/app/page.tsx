import CategoriesSection from "@/Components/CategoriesSection";
import FAQSection from "@/Components/FAQSection";
import FeaturesSection from "@/Components/FeaturesSection";
import HeroSection from "@/Components/HeroSection";
import LatestToursSection from "@/Components/LatestToursSessection";
import NewsletterSection from "@/Components/NewsletterSection";
import StatisticsSection from "@/Components/StatisticsSection";
import TestimonialsSection from "@/Components/TestimonialsSection";

export default function Home() {
  return (
    <main className="bg-[#f4fffe]">
      <HeroSection />
      <LatestToursSection></LatestToursSection>
      <CategoriesSection />
      <FeaturesSection></FeaturesSection>
      <StatisticsSection></StatisticsSection>
      <TestimonialsSection></TestimonialsSection>
      <NewsletterSection></NewsletterSection>
      <FAQSection></FAQSection>
      
    </main>
  );
}
