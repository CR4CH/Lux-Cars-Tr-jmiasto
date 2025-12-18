import { Dialog, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Users, 
  Fuel, 
  Settings, 
  Star, 
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";
import { useState } from "react";
import type { Car } from "./CarCard";

interface CarDetailDialogProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBook: (car: Car) => void;
}

export function CarDetailDialog({ car, open, onOpenChange, onBook }: CarDetailDialogProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!car) return null;

  const images = car.gallery || [car.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Image Gallery */}
        <div className="relative aspect-video bg-gray-100">
          <ImageWithFallback
            src={images[currentImageIndex]}
            alt={`${car.name} - zdjęcie ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {car.isPromo && (
            <Badge className="absolute top-4 left-4 bg-secondary text-white">
              {car.promoLabel || "PROMOCJA"}
            </Badge>
          )}

          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? "bg-white w-8" 
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Car Details */}
        <div className="p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-primary text-primary">
                  {car.brand}
                </Badge>
                <Badge variant="outline">{car.category}</Badge>
                {car.available ? (
                  <Badge className="bg-green-600 text-white">Dostępny</Badge>
                ) : (
                  <Badge variant="destructive">Niedostępny</Badge>
                )}
              </div>
              <h2 className="mb-2">{car.name}</h2>
              <div className="flex items-center gap-1 text-gray-600">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{car.rating}/5</span>
              </div>
            </div>
            
            <div className="text-right">
              {car.originalPrice && (
                <p className="text-gray-400 line-through text-sm">
                  {car.originalPrice} zł/dzień
                </p>
              )}
              <p className="text-3xl text-primary">{car.price} zł</p>
              <p className="text-gray-600">za dzień</p>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y">
            <div className="flex flex-col items-center text-center">
              <Users className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm text-gray-600">Miejsca</p>
              <p>{car.seats}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Fuel className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm text-gray-600">Paliwo</p>
              <p>{car.fuelType}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Settings className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm text-gray-600">Skrzynia</p>
              <p>{car.transmission}</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Calendar className="w-6 h-6 text-primary mb-2" />
              <p className="text-sm text-gray-600">Rok</p>
              <p>{car.year || "2023"}</p>
            </div>
          </div>

          {/* Description */}
          {car.description && (
            <div>
              <h3 className="mb-2">Opis pojazdu</h3>
              <p className="text-gray-600">{car.description}</p>
            </div>
          )}

          {/* Features */}
          <div>
            <h3 className="mb-3">Wyposażenie</h3>
            <div className="grid grid-cols-2 gap-2">
              {car.features?.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-blue-50 p-4 rounded-lg flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <p className="mb-1">Dostawa na adres</p>
              <p className="text-sm text-gray-600">
                Dowieziemy auto pod wskazany przez Ciebie adres. Koszt dostawy ustalany indywidualnie.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={() => {
                onBook(car);
                onOpenChange(false);
              }}
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={!car.available}
            >
              {car.available ? "Zarezerwuj teraz" : "Niedostępny"}
            </Button>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Zamknij
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
