import { Check, Crown, Star, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const plans = [
  {
    id: "monthly",
    name: "Coffee Explorer",
    price: "₹299",
    period: "per month",
    icon: Coffee,
    features: [
      "5 free bookings monthly",
      "Basic cafe recommendations",
      "Standard support",
      "Mobile app access"
    ],
    popular: false
  },
  {
    id: "quarterly", 
    name: "Cafe Connoisseur",
    price: "₹799",
    period: "per quarter",
    savings: "Save ₹97",
    icon: Star,
    features: [
      "20 free bookings quarterly",
      "Priority cafe access",
      "Advanced recommendations",
      "Member-only offers",
      "Premium support",
      "Early access to new cafes"
    ],
    popular: true
  },
  {
    id: "yearly",
    name: "Cafe Champion",
    price: "₹2,999",
    period: "per year", 
    savings: "Save ₹589",
    icon: Crown,
    features: [
      "Unlimited bookings",
      "VIP cafe access",
      "Personalized concierge",
      "Exclusive events access",
      "Premium member rewards",
      "Priority customer support",
      "Annual cafe tour passes"
    ],
    popular: false
  }
];

export const SubscriptionPlans = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Choose Your
          <span className="bg-gradient-warm bg-clip-text text-transparent"> Cafe Journey</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock premium cafe experiences with our carefully crafted subscription plans.
          More bookings, better perks, endless discoveries.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const IconComponent = plan.icon;
          return (
            <Card 
              key={plan.id}
              className={`subscription-card ${plan.popular ? 'featured' : ''} relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-warm text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-cream rounded-2xl flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-primary" />
                </div>
                
                <CardTitle className="text-2xl font-bold text-primary mb-2">
                  {plan.name}
                </CardTitle>
                
                <div className="space-y-1">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                  {plan.savings && (
                    <p className="text-sm text-green-600 font-medium">{plan.savings}</p>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full rounded-full text-lg py-6 ${
                    plan.popular 
                      ? 'bg-gradient-warm text-primary-foreground hover:opacity-90' 
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  Subscribe Now
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center mt-12">
        <p className="text-muted-foreground mb-4">
          All plans include access to our premium cafe network and mobile app.
        </p>
        <p className="text-sm text-muted-foreground">
          Cancel anytime. No hidden fees. Start your cafe journey today.
        </p>
      </div>
    </div>
  );
};