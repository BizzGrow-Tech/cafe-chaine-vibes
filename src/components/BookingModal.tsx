import { useState } from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

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

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const BookingModal = ({
  cafe,
  isOpen,
  onClose,
  onBookingComplete,
}: BookingModalProps) => {
  const [step, setStep] = useState<"info" | "redeemed">("info");
  const [otp, setOtp] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");

  const handleRedeem = () => {
    if (!cafe) return;
    const code = generateOTP();
    const now = new Date();
    const expires = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes

    const redemption = {
      id: `RD-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      cafe,
      otp: code,
      createdAt: now.toISOString(),
      expiresAt: expires.toISOString(),
    };

    setOtp(code);
    setExpiresAt(expires.toISOString());
    onBookingComplete(redemption);
    setStep("redeemed");

    toast({
      title: "Code Generated",
      description: `Your redemption code for ${cafe.name} is ready.`,
    });
  };

  const copyOtp = async () => {
    try {
      await navigator.clipboard.writeText(otp);
      toast({ title: "Copied", description: "OTP copied to clipboard." });
    } catch (e) {
      toast({ title: "Copy failed", description: "Could not copy OTP." });
    }
  };

  const handleClose = () => {
    setStep("info");
    setOtp("");
    setExpiresAt("");
    onClose();
  };

  if (!cafe) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="modal-content max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            {step === "info" ? `Visit ${cafe.name}` : "Redemption Code"}
          </DialogTitle>
        </DialogHeader>

        {step === "info" ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={cafe.image}
                alt={cafe.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {(cafe as any).name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {(cafe as any).tagline ?? ""}
                </p>
                <p className="text-sm text-muted-foreground">{cafe.location}</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              When you arrive at the cafe, tap "Redeem" to generate a one-time
              code. Present the code to the staff to claim your redemption.
            </p>

            <div className="flex gap-3">
              <Button
                onClick={handleRedeem}
                className="flex-1 bg-gradient-accent text-primary-foreground"
              >
                Redeem
              </Button>
              <Button variant="ghost" onClick={handleClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="p-6 bg-card rounded-2xl">
              <div className="text-4xl font-mono tracking-wider text-primary">
                {otp}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Valid until{" "}
                {new Date(expiresAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={copyOtp} className="flex-1">
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
              <Button
                onClick={handleClose}
                className="flex-1 bg-gradient-accent text-primary-foreground"
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
