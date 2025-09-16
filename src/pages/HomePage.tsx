import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CafeCard } from "@/components/CafeCard";
import { BookingModal } from "@/components/BookingModal";
import { MyBookings } from "@/components/MyBookings";

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
  const [currentView, setCurrentView] = useState<'home' | 'bookings'>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);

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

  if (currentView === 'bookings') {
    return (
      <div className="min-h-screen bg-background">
        <MyBookings bookings={bookings} onBack={handleBackToHome} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMyBookingsClick={handleMyBookingsClick} />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-primary mb-4">
            Discover Your Perfect
            <span className="bg-gradient-warm bg-clip-text text-transparent"> Cafe</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Book tables at the city's most charming cafes. From cozy corners to rooftop views, 
            find your ideal spot for coffee, conversation, and connection.
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