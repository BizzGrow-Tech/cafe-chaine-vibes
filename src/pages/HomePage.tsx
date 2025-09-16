import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { CafeCard } from "@/components/CafeCard";
import { BookingModal } from "@/components/BookingModal";
import { MyBookings } from "@/components/MyBookings";
import { HeroSection } from "@/components/HeroSection";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";

// Import cafe images
import cafe1 from "@/assets/cafe-1.jpg";
import cafe2 from "@/assets/cafe-2.jpg";
import cafe3 from "@/assets/cafe-3.jpg";
import cafe4 from "@/assets/cafe-4.jpg";
import cafe5 from "@/assets/cafe-5.jpg";
import cafe6 from "@/assets/cafe-6.jpg";

interface Cafe {
  id: string;
  name: string;
  image: string;
  tagline: string;
  location: string;
  rating: number;
  openTime: string;
}

interface Booking {
  id: string;
  cafe: Cafe;
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  createdAt: string;
  qrCode: string;
}

const CAFE_DATA: Cafe[] = [
  {
    id: "1",
    name: "Warmth & Wonder",
    image: cafe1,
    tagline: "Cozy corner for coffee & conversation",
    location: "Downtown Arts District",
    rating: 4.8,
    openTime: "7:00 AM - 10:00 PM"
  },
  {
    id: "2",
    name: "Nordic Brew",
    image: cafe2,
    tagline: "Scandinavian simplicity meets perfect coffee",
    location: "Midtown Plaza",
    rating: 4.9,
    openTime: "6:30 AM - 9:00 PM"
  },
  {
    id: "3",
    name: "The Industrial",
    image: cafe3,
    tagline: "Vintage vibes & artisan coffee",
    location: "Historic Quarter",
    rating: 4.7,
    openTime: "8:00 AM - 11:00 PM"
  },
  {
    id: "4",
    name: "Garden Retreat",
    image: cafe4,
    tagline: "Coffee among the flowers",
    location: "Botanical District",
    rating: 4.6,
    openTime: "9:00 AM - 8:00 PM"
  },
  {
    id: "5",
    name: "Skyline Roasters",
    image: cafe5,
    tagline: "City views with every sip",
    location: "Financial District",
    rating: 4.8,
    openTime: "6:00 AM - 10:00 PM"
  },
  {
    id: "6",
    name: "Artisan's Corner",
    image: cafe6,
    tagline: "Where coffee meets craftsmanship",
    location: "Creative Quarter",
    rating: 4.9,
    openTime: "7:30 AM - 9:30 PM"
  }
];

export const HomePage = () => {
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'bookings' | 'plans'>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const cafeGridRef = useRef<HTMLDivElement>(null);

  const handleCafeClick = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    setIsModalOpen(true);
  };

  const handleBookingComplete = (booking: Booking) => {
    setBookings(prev => [...prev, booking]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCafe(null);
  };

  const handleMyBookingsClick = () => {
    setCurrentView('bookings');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
  };

  const handleExploreCafes = () => {
    cafeGridRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewPlans = () => {
    setCurrentView('plans');
  };

  if (currentView === 'bookings') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onMyBookingsClick={handleMyBookingsClick} />
        <MyBookings bookings={bookings} onBack={handleBackToHome} />
      </div>
    );
  }

  if (currentView === 'plans') {
    return (
      <div className="min-h-screen bg-background">
        <Navbar onMyBookingsClick={handleMyBookingsClick} />
        <SubscriptionPlans />
        <div className="container mx-auto px-4 py-8 text-center">
          <button 
            onClick={handleBackToHome}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection 
        onExploreCafes={handleExploreCafes}
        onViewPlans={handleViewPlans}
      />
      
      {/* Navigation */}
      <Navbar onMyBookingsClick={handleMyBookingsClick} />
      
      {/* Cafe Discovery Section */}
      <div ref={cafeGridRef} className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-primary mb-4">
            Featured Cafes Near You
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Handpicked cafes that promise exceptional coffee, ambiance, and memorable experiences.
          </p>
        </div>

        {/* Pinterest-style Grid */}
        <div className="masonry-grid">
          {CAFE_DATA.map((cafe) => (
            <CafeCard
              key={cafe.id}
              id={cafe.id}
              name={cafe.name}
              image={cafe.image}
              tagline={cafe.tagline}
              location={cafe.location}
              rating={cafe.rating}
              openTime={cafe.openTime}
              onClick={handleCafeClick}
            />
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        cafe={selectedCafe}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onBookingComplete={handleBookingComplete}
      />
    </div>
  );
};