import { Calendar, Clock, Users, QrCode, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Booking {
  id: string;
  cafe: {
    id: string;
    name: string;
    image: string;
    location: string;
  };
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  createdAt: string;
  qrCode: string;
}

interface MyBookingsProps {
  bookings: Booking[];
  onBack: () => void;
}

export const MyBookings = ({ bookings, onBack }: MyBookingsProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const isUpcoming = (date: string) => {
    return new Date(date) >= new Date();
  };

  const upcomingBookings = bookings.filter(booking => isUpcoming(booking.date));
  const pastBookings = bookings.filter(booking => !isUpcoming(booking.date));

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="cafe-card mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src={booking.cafe.image} 
              alt={booking.cafe.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <CardTitle className="text-lg text-primary">{booking.cafe.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{booking.cafe.location}</p>
            </div>
          </div>
          <div className="w-16 h-16 bg-white p-2 rounded-lg border">
            <img src={booking.qrCode} alt="QR Code" className="w-full h-full" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(booking.date)}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>{formatTime(booking.time)}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-2" />
            <span>{booking.guests} {booking.guests === '1' ? 'person' : 'people'}</span>
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground">
            Booking ID: {booking.id}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cafes
        </Button>
        <h1 className="text-3xl font-bold text-primary">My Bookings</h1>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <QrCode className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-primary mb-2">No bookings yet</h3>
          <p className="text-muted-foreground mb-6">
            Start exploring cafes and make your first reservation!
          </p>
          <Button onClick={onBack} className="bg-gradient-warm">
            Discover Cafes
          </Button>
        </div>
      ) : (
        <div className="space-y-8">
          {upcomingBookings.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Upcoming Bookings</h2>
              {upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}

          {pastBookings.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-primary mb-4">Past Bookings</h2>
              {pastBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};