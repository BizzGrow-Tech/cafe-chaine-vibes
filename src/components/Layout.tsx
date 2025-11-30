import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, Coffee, Calendar, CreditCard } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  onHomeClick?: () => void;
  onMyBookingsClick?: () => void;
  onCafesClick?: () => void;
  onPlansClick?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  onHomeClick,
  onMyBookingsClick,
  onCafesClick,
  onPlansClick,
}) => {
  return (
    <SidebarProvider>
      {/* Mobile-only sidebar (sheet) — does not affect desktop layout */}
      <div className="md:hidden">
        <Sidebar side="left" variant="sidebar" collapsible="icon" className="">
          <SidebarHeader>
            <div className="flex items-center justify-between px-2">
              <div className="text-lg font-semibold">Brewzzy</div>
              <SidebarTrigger />
            </div>
            <div className="px-2">
              <SidebarInput placeholder="Search cafes..." />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarMenu>
              <li>
                <SidebarMenuButton
                  onClick={onHomeClick}
                  className="flex items-center gap-2"
                >
                  <Home className="size-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </li>
              <li>
                <SidebarMenuButton
                  onClick={onCafesClick}
                  className="flex items-center gap-2"
                >
                  <Coffee className="size-4" />
                  <span>Explore Cafes</span>
                </SidebarMenuButton>
              </li>
              <li>
                <SidebarMenuButton
                  onClick={onPlansClick}
                  className="flex items-center gap-2"
                >
                  <CreditCard className="size-4" />
                  <span>Plans</span>
                </SidebarMenuButton>
              </li>
              <li>
                <SidebarMenuButton
                  onClick={onMyBookingsClick}
                  className="flex items-center gap-2"
                >
                  <Calendar className="size-4" />
                  <span>My Redemptions</span>
                </SidebarMenuButton>
              </li>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter>
            <div className="p-2 text-sm text-muted-foreground">
              Brewzzy • Premium
            </div>
          </SidebarFooter>
        </Sidebar>
      </div>

      {/* Main content: make it flex-grow so it fills remaining space in the provider's flex container */}
      <div className="flex-1">{children}</div>
    </SidebarProvider>
  );
};

export default Layout;
