import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Switch } from "./ui/switch";
import { Search } from "lucide-react";

interface AdvancedCarSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  brandFilter: string;
  onBrandChange: (value: string) => void;
  modelFilter: string;
  onModelChange: (value: string) => void;
  categoryFilter: string;
  onCategoryChange: (value: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  availableOnly: boolean;
  onAvailableOnlyChange: (value: boolean) => void;
  brands: string[];
  models: string[];
}

export function AdvancedCarSearch({
  searchTerm,
  onSearchChange,
  brandFilter,
  onBrandChange,
  modelFilter,
  onModelChange,
  categoryFilter,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  availableOnly,
  onAvailableOnlyChange,
  brands,
  models,
}: AdvancedCarSearchProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <Input
          type="text"
          placeholder="Szukaj po nazwie samochodu..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label>Marka</Label>
          <Select value={brandFilter} onValueChange={onBrandChange}>
            <SelectTrigger>
              <SelectValue placeholder="Wszystkie marki" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie marki</SelectItem>
              {brands.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Model</Label>
          <Select 
            value={modelFilter} 
            onValueChange={onModelChange}
            disabled={brandFilter === "all"}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wszystkie modele" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Wszystkie modele</SelectItem>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Kategoria</Label>
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
        </div>

        <div className="space-y-2 flex items-end">
          <div className="flex items-center space-x-2">
            <Switch
              id="available-only"
              checked={availableOnly}
              onCheckedChange={onAvailableOnlyChange}
            />
            <Label htmlFor="available-only" className="cursor-pointer">
              Tylko dostępne
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Zakres cenowy (zł/dzień)</Label>
          <span className="text-sm text-gray-600">
            {priceRange[0]} zł - {priceRange[1]} zł
          </span>
        </div>
        <Slider
          min={0}
          max={1000}
          step={50}
          value={priceRange}
          onValueChange={onPriceRangeChange}
          className="w-full"
        />
      </div>
    </div>
  );
}
