import { Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import chaineLogo from "@/assets/chaine-logo.png";

interface NavbarProps {
  onMyBookingsClick?: () => void;
  onHomeClick?: () => void;
  onCafesClick?: () => void;
  onPlansClick?: () => void;
}

export const Navbar = ({ 
  onMyBookingsClick, 
  onHomeClick, 
  onCafesClick, 
  onPlansClick 
}: NavbarProps) => {
  return (
    <nav className="sticky top-0 z-50 w-full bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onHomeClick}>
            <img 
              src={chaineLogo} 
              alt="Chaîne Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-semibold text-primary">Chaîne</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-accent transition-colors font-medium"
              onClick={onHomeClick}
            >
              Home
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-accent transition-colors font-medium"
              onClick={onCafesClick}
            >
              Explore Cafes
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-accent transition-colors font-medium"
              onClick={onPlansClick}
            >
              Subscription Plans
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-accent transition-colors font-medium"
              onClick={onMyBookingsClick}
            >
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onMyBookingsClick}
              className="text-foreground hover:text-accent"
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};