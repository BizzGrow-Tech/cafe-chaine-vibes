import { ChevronDown, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onExploreCafes: () => void;
  onViewPlans: () => void;
}

export const HeroSection = ({ onExploreCafes, onViewPlans }: HeroSectionProps) => {
  return (
    <section 
      className="hero-section"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(25 35% 25% / 0.8), hsl(25 25% 15% / 0.6)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="hero-content text-center px-4 max-w-4xl mx-auto">
        <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Discover Cafes.
          <br />
          <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Book Tables.
          </span>
          <br />
          Sip More.
        </h1>
        
        <p className="hero-subtitle text-xl md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
          A new way to explore cafes and reserve your spot instantly. 
          Experience the perfect blend of discovery and convenience.
        </p>
        
        <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onExploreCafes}
            size="lg"
            className="btn-primary bg-gradient-warm text-primary-foreground hover:opacity-90 text-lg px-8 py-4 rounded-full"
          >
            <ChevronDown className="w-5 h-5 mr-2" />
            Explore Cafes
          </Button>
          
          <Button 
            onClick={onViewPlans}
            size="lg"
            variant="outline"
            className="border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 text-lg px-8 py-4 rounded-full"
          >
            <Crown className="w-5 h-5 mr-2" />
            View Subscription Plans
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};