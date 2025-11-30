import { Calendar, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import brewzzyLogo from "@/assets/brewzzy-logo.png";

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
  onPlansClick,
}: NavbarProps) => {
  // Try to use the sidebar toggle when inside SidebarProvider (Layout).
  let toggleSidebar: (() => void) | null = null;
  try {
    const ctx = useSidebar();
    toggleSidebar = ctx.toggleSidebar;
  } catch (e) {
    // Not inside SidebarProvider — ignore.
  }
  return (
    <nav className="sticky top-0 z-50 w-full bg-background shadow-sm border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={onHomeClick}
          >
            <img
              src={brewzzyLogo}
              alt="Brewzzy Logo"
              className="w-8 h-8 object-contain"
            />
            <span className="text-xl font-semibold text-primary">Brewzzy</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Button
              variant="ghost"
              className="text-foreground hover:text-white transition-colors font-medium"
              onClick={onHomeClick}
            >
              Home
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-white transition-colors font-medium"
              onClick={onCafesClick}
            >
              Explore Cafes
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-white transition-colors font-medium"
              onClick={onPlansClick}
            >
              Subscription Plans
            </Button>
            <Button
              variant="ghost"
              className="text-foreground hover:text-white transition-colors font-medium"
              onClick={onMyBookingsClick}
            >
              <Calendar className="w-4 h-4 mr-2" />
              My Bookings
            </Button>
          </div>

          {/* Mobile Menu Button (opens sidebar when available) */}
          <div className="md:hidden flex items-center gap-2">
            {toggleSidebar ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleSidebar && toggleSidebar()}
                className="text-foreground hover:text-white"
              >
                <Menu className="w-5 h-5" />
              </Button>
            ) : null}
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onMyBookingsClick}
                className="text-foreground hover:text-white"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
