import { QrCode, ArrowLeft, Copy } from "lucide-react";
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
  otp: string;
  createdAt: string;
  expiresAt: string;
}

interface MyBookingsProps {
  bookings: Booking[];
  onBack: () => void;
}

export const MyBookings = ({ bookings, onBack }: MyBookingsProps) => {
  const isActive = (expiresAt: string) => new Date(expiresAt) > new Date();

  const upcoming = bookings.filter((b) => isActive(b.expiresAt));
  const past = bookings.filter((b) => !isActive(b.expiresAt));

  const BookingCard = ({ booking }: { booking: Booking }) => (
    <Card className="cafe-card mb-4">
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={booking.cafe.image}
              alt={booking.cafe.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <CardTitle className="text-base md:text-lg text-primary truncate">
                {booking.cafe.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground truncate">
                {booking.cafe.location}
              </p>
            </div>
          </div>

          <div className="mt-3 md:mt-0 flex items-center md:items-start space-x-3 md:space-x-4">
            <div className="w-full md:w-40 h-20 flex flex-col items-center justify-center bg-card rounded-lg border px-3">
              <div className="text-2xl md:text-2xl font-mono tracking-wider text-primary">
                {booking.otp}
              </div>
              <div className="text-xs text-muted-foreground">Code</div>
            </div>
            <button
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border bg-background text-foreground hover:bg-card w-full md:w-auto"
              onClick={() => navigator.clipboard?.writeText(booking.otp)}
              aria-label="Copy OTP"
              title="Copy OTP"
            >
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="text-muted-foreground">
            <div>Issued: {new Date(booking.createdAt).toLocaleString()}</div>
            <div>Expires: {new Date(booking.expiresAt).toLocaleString()}</div>
          </div>
          <div className="text-sm sm:text-right mt-2 sm:mt-0">
            <div
              className={`inline-block px-3 py-1 rounded-full ${
                isActive(booking.expiresAt)
                  ? "bg-accent text-accent-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {isActive(booking.expiresAt) ? "Active" : "Expired"}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t">
          <p className="text-xs text-muted-foreground truncate">
            Redemption ID: {booking.id}
          </p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-6 justify-between">
        <div className="flex items-center w-full sm:w-auto mb-4 sm:mb-0">
          <Button variant="ghost" onClick={onBack} className="mr-3">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            My Redemptions
          </h1>
        </div>
        <div className="text-sm text-muted-foreground mt-2 sm:mt-0">
          {bookings.length} total
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16">
          <QrCode className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-2xl font-semibold text-primary mb-2">
            No redemptions yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Visit a cafe and redeem an offer to generate your first code. Your
            active redemptions will appear here with expiry and status.
          </p>
          <Button
            onClick={onBack}
            className="w-full sm:w-auto bg-gradient-accent text-primary-foreground px-6 py-3"
          >
            Discover Cafes
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">
                Active
              </h2>
              <div className="space-y-4">
                {upcoming.map((b) => (
                  <BookingCard key={b.id} booking={b} />
                ))}
              </div>
            </section>
          )}

          {past.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-primary mb-4">Past</h2>
              <div className="space-y-4">
                {past.map((b) => (
                  <BookingCard key={b.id} booking={b} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};
