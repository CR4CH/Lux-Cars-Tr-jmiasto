import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, Fuel, Settings, Star } from "lucide-react";

export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  seats: number;
  fuelType: string;
  transmission: string;
  rating: number;
  year?: number;
  available: boolean;
  isPromo?: boolean;
  promoLabel?: string;
  description?: string;
  features?: string[];
}

interface CarCardProps {
  car: Car;
  onBook: (car: Car) => void;
  onViewDetails: (car: Car) => void;
}

export function CarCard({ car, onBook, onViewDetails }: CarCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onViewDetails(car)}>
      <div className="relative">
        <ImageWithFallback
          src={car.image}
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        {car.isPromo && (
          <Badge className="absolute top-3 right-3 bg-secondary text-white">
            {car.promoLabel || "PROMOCJA"}
          </Badge>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white px-2 py-1 rounded">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm">{car.rating}</span>
        </div>
        {!car.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive" className="text-lg">
              Niedostępny
            </Badge>
          </div>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="mb-2">
          <div className="flex gap-2 mb-2">
            <Badge variant="outline" className="border-primary text-primary">
              {car.brand}
            </Badge>
            <Badge variant="outline">
              {car.category}
            </Badge>
          </div>
          <h3 className="mb-2">{car.name}</h3>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{car.seats}</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="w-4 h-4" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1">
            <Settings className="w-4 h-4" />
            <span>{car.transmission}</span>
          </div>
        </div>
        
        <div className="flex items-baseline gap-2">
          {car.originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {car.originalPrice} zł/dzień
            </span>
          )}
          <span className="text-2xl text-primary">
            {car.price} zł
          </span>
          <span className="text-gray-600">/dzień</span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          className="flex-1 bg-primary hover:bg-primary/90" 
          onClick={(e) => {
            e.stopPropagation();
            onBook(car);
          }}
          disabled={!car.available}
        >
          Rezerwuj
        </Button>
        <Button 
          variant="outline" 
          className="flex-1" 
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(car);
          }}
        >
          Szczegóły
        </Button>
      </CardFooter>
    </Card>
  );
}
