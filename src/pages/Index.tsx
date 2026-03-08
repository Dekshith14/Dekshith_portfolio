import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import ContactSection from "@/components/sections/ContactSection";
import GlobalAnimatedBackground from "@/components/three/AnimatedBackground";

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Global animated background — fixed behind all content */}
      <GlobalAnimatedBackground />
      {/* All page content sits above the canvas */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
