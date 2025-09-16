import { MapPin, Star, Clock } from "lucide-react";

interface CafeCardProps {
  id: string;
  name: string;
  image: string;
  tagline: string;
  location: string;
  rating: number;
  openTime: string;
  onClick: (cafe: any) => void;
}

export const CafeCard = ({ 
  id, 
  name, 
  image, 
  tagline, 
  location, 
  rating, 
  openTime, 
  onClick 
}: CafeCardProps) => {
  const cafe = { id, name, image, tagline, location, rating, openTime };

  return (
    <div 
      className="masonry-item"
      onClick={() => onClick(cafe)}
    >
      <div className="cafe-card cursor-pointer">
        <div className="relative overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-primary mb-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{tagline}</p>
          
          <div className="space-y-2">
            <div className="flex items-center text-xs text-muted-foreground">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{location}</span>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="w-3 h-3 mr-1" />
              <span>Open {openTime}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};