import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Search } from "lucide-react";

interface CarSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  priceFilter: string;
  onPriceChange: (value: string) => void;
}

export function CarSearch({
  searchTerm,
  onSearchChange,
  categoryFilter,
  onCategoryChange,
  priceFilter,
  onPriceChange,
}: CarSearchProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Szukaj samochodu po nazwie..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select value={categoryFilter} onValueChange={onCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="Kategoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie kategorie</SelectItem>
            <SelectItem value="SUV">SUV</SelectItem>
            <SelectItem value="Sedan">Sedan</SelectItem>
            <SelectItem value="Sportowy">Sportowy</SelectItem>
            <SelectItem value="Kompakt">Kompakt</SelectItem>
            <SelectItem value="Elektryczny">Elektryczny</SelectItem>
            <SelectItem value="Luksusowy">Luksusowy</SelectItem>
          </SelectContent>
        </Select>
        
        <Select value={priceFilter} onValueChange={onPriceChange}>
          <SelectTrigger>
            <SelectValue placeholder="Przedział cenowy" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie ceny</SelectItem>
            <SelectItem value="0-200">Do 200 zł/dzień</SelectItem>
            <SelectItem value="200-400">200-400 zł/dzień</SelectItem>
            <SelectItem value="400-600">400-600 zł/dzień</SelectItem>
            <SelectItem value="600+">Powyżej 600 zł/dzień</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
