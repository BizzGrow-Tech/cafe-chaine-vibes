import { useState } from "react";
import { Calendar, Clock, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import QRCodeLib from "qrcode";

interface Cafe {
  id: string;
  name: string;
  image: string;
  location: string;
}

interface BookingModalProps {
  cafe: Cafe | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (booking: any) => void;
}

interface BookingForm {
  fullName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: string;
}

export const BookingModal = ({ cafe, isOpen, onClose, onBookingComplete }: BookingModalProps) => {
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [formData, setFormData] = useState<BookingForm>({
    fullName: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '2'
  });
  const [qrCode, setQrCode] = useState<string>('');

  const generateQrCode = async (bookingId: string, bookingData: any) => {
    try {
      const qrData = JSON.stringify({
        bookingId,
        cafe: cafe?.name,
        date: bookingData.date,
        time: bookingData.time,
        guests: bookingData.guests,
        name: bookingData.fullName
      });
      
      const qrCodeDataURL = await QRCodeLib.toDataURL(qrData, {
        width: 200,
        margin: 2,
        color: {
          dark: '#1a1a1a',
          light: '#ffffff'
        }
      });
      
      return qrCodeDataURL;
    } catch (error) {
      console.error('Failed to generate QR code:', error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cafe) return;
    
    // Generate booking ID
    const bookingId = `BK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Generate QR code
    const qrCodeDataURL = await generateQrCode(bookingId, formData);
    
    const booking = {
      id: bookingId,
      cafe: cafe,
      ...formData,
      createdAt: new Date().toISOString(),
      qrCode: qrCodeDataURL
    };
    
    setQrCode(booking.qrCode);
    onBookingComplete(booking);
    setStep('confirmation');
    
    toast({
      title: "Booking Confirmed!",
      description: `Your table at ${cafe.name} has been reserved.`,
    });
  };

  const downloadQrCode = () => {
    const link = document.createElement('a');
    link.download = `chaîne-booking-${cafe?.name}.png`;
    link.href = qrCode;
    link.click();
  };

  const resetModal = () => {
    setStep('form');
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      date: '',
      time: '',
      guests: '2'
    });
    setQrCode('');
  };

  const handleClose = () => {
    onClose();
    setTimeout(resetModal, 300); // Reset after modal closes
  };

  if (!cafe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="modal-content max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            {step === 'form' ? `Book a Table at ${cafe.name}` : 'Booking Confirmed'}
          </DialogTitle>
        </DialogHeader>

        {step === 'form' ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              <div>
                <Label htmlFor="time">Time</Label>
                <Select value={formData.time} onValueChange={(value) => setFormData(prev => ({ ...prev, time: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 14 }, (_, i) => {
                      const hour = Math.floor((i + 16) / 2);
                      const minute = (i + 16) % 2 === 0 ? '00' : '30';
                      const time24 = `${hour.toString().padStart(2, '0')}:${minute}`;
                      const time12 = new Date(`2000-01-01 ${time24}`).toLocaleTimeString('en-US', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                      });
                      return (
                        <SelectItem key={time24} value={time24}>
                          {time12}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="guests">Number of Guests</Label>
              <Select value={formData.guests} onValueChange={(value) => setFormData(prev => ({ ...prev, guests: value }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 8 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>
                      {i + 1} {i === 0 ? 'Person' : 'People'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-gradient-warm text-primary-foreground hover:opacity-90">
              Confirm Booking
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-6">
            <div className="w-48 h-48 mx-auto bg-white p-4 rounded-2xl border shadow-sm">
              <img src={qrCode} alt="Booking QR Code" className="w-full h-full" />
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-primary">Your booking is confirmed!</h3>
              <p className="text-sm text-muted-foreground">
                Show this QR code at {cafe.name} on {new Date(formData.date).toLocaleDateString()} at{' '}
                {new Date(`2000-01-01 ${formData.time}`).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true
                })}
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={downloadQrCode} variant="outline" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button onClick={handleClose} className="flex-1 bg-gradient-warm">
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};