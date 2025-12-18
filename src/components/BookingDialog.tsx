import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Switch } from "./ui/switch";
import { Calendar as CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import { toast } from "sonner";
import type { Car } from "./CarCard";

interface BookingDialogProps {
  car: Car | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookingDialog({ car, open, onOpenChange }: BookingDialogProps) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    deliveryNeeded: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast.error("Wybierz daty wynajmu");
      return;
    }
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Wypełnij wszystkie pola");
      return;
    }
    
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * (car?.price || 0);
    
    toast.success(
      `Rezerwacja potwierdzona! ${car?.name} na ${days} dni. Koszt: ${totalPrice} zł`
    );
    
    onOpenChange(false);
    setFormData({ name: "", email: "", phone: "", deliveryAddress: "", deliveryNeeded: false });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  if (!car) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Rezerwacja: {car.name}</DialogTitle>
          <DialogDescription>
            Wypełnij formularz, aby zarezerwować samochód
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jan Kowalski"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="jan@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+48 123 456 789"
            />
          </div>

          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="delivery"
                checked={formData.deliveryNeeded}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, deliveryNeeded: checked })
                }
              />
              <Label htmlFor="delivery" className="cursor-pointer flex items-center gap-2">
                <MapPin className="w-4 h-4 text-secondary" />
                Chcę dostawę na adres
              </Label>
            </div>
            
            {formData.deliveryNeeded && (
              <div className="space-y-2 ml-6">
                <Label htmlFor="delivery-address">Adres dostawy</Label>
                <Input
                  id="delivery-address"
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  placeholder="ul. Przykładowa 123, Warszawa"
                />
                <p className="text-xs text-gray-500">
                  Koszt dostawy zostanie ustalony indywidualnie
                </p>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label>Data odbioru</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: pl }) : "Wybierz datę"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="space-y-2">
            <Label>Data zwrotu</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP", { locale: pl }) : "Wybierz datę"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  initialFocus
                  disabled={(date) => !startDate || date <= startDate}
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {startDate && endDate && (
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-gray-600">Liczba dni: {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))}</p>
              <p className="text-lg">
                Koszt całkowity: <span className="text-blue-600">{Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) * car.price} zł</span>
              </p>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Anuluj
            </Button>
            <Button type="submit">Potwierdź rezerwację</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
