import { Check, Crown, Star, Coffee } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const plan = {
  id: "standard",
  name: "Brewzzy Membership",
  price: "xxx",
  period: "variable",
  icon: Coffee,
  features: [
    "Access to partner cafes",
    "Member-only offers",
    "In-app redeem codes",
    "Priority updates and support",
  ],
};

export const SubscriptionPlans = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleSubscribeClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Choose Your
          <span className="bg-gradient-warm bg-clip-text text-transparent">
            {" "}
            Cafe Journey
          </span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock premium cafe experiences with our carefully crafted
          subscription plans. More bookings, better perks, endless discoveries.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="subscription-card relative">
          <CardHeader className="text-center pb-6 pt-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-cream rounded-3xl flex items-center justify-center">
              <plan.icon className="w-10 h-10 text-primary" />
            </div>

            <CardTitle className="text-3xl font-bold text-primary mb-2">
              {plan.name}
            </CardTitle>

            <div className="flex items-baseline justify-center space-x-3">
              <span className="text-5xl font-extrabold text-primary">
                {plan.price}
              </span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
          </CardHeader>

          <CardContent>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <Check className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={handleSubscribeClick}
              className="w-full rounded-full text-lg py-4 bg-gradient-accent text-primary-foreground hover:opacity-95"
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader className="text-center">
            <div className="mx-auto mb-4 w-24 h-24 rounded-2xl bg-gradient-accent flex items-center justify-center">
              <Crown className="w-10 h-10 text-primary-foreground" />
            </div>
            <DialogTitle className="text-2xl">
              Welcome to Brewzzy Membership
            </DialogTitle>
            <DialogDescription className="mt-2 text-muted-foreground">
              Thank you for choosing Brewzzy. You now have access to exclusive
              cafe offers and priority perks. Our team will contact you with the
              next steps.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6">
            <p className="text-center text-sm text-muted-foreground mb-4">
              A member success specialist will reach out shortly to finalize
              your membership.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={handleClose} variant="ghost" className="px-6">
                Maybe Later
              </Button>
              <Button
                onClick={handleClose}
                className="px-6 bg-gradient-accent text-primary-foreground"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">
          All plans include access to our premium cafe network and Website app.
        </p>
        <p className="text-sm text-muted-foreground">
          Cancel anytime. No hidden fees. Start your cafe journey today.
        </p>
      </div>
    </div>
  );
};
