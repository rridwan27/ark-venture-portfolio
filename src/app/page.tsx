import Hero from "@/components/ui/Hero";
import Ticker from "@/components/ui/Ticker";
import Services from "@/components/ui/Services";
import CaseStudies from "@/components/ui/CaseStudies";
import Process from "@/components/ui/Process";
import RoiEstimator from "@/components/ui/RoiEstimator";
import TeamCarousel from "@/components/ui/team-2";
import Footer1 from "@/components/ui/footer-section-1";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <Ticker />
      <Services />
      <CaseStudies />
      <Process />
      <RoiEstimator />
      <TeamCarousel />
      <Footer1 />
    </main>
  );
}
