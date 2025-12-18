import { useState, useMemo } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarTrigger } from "./components/ui/sidebar";
import { CarCard, type Car } from "./components/CarCard";
import { BookingDialog } from "./components/BookingDialog";
import { CarDetailDialog } from "./components/CarDetailDialog";
import { AdvancedCarSearch } from "./components/AdvancedCarSearch";
import { ContactSection } from "./components/ContactSection";
import { AboutSection } from "./components/AboutSection";
import { TeamSection } from "./components/TeamSection";
import { PermitsSection } from "./components/PermitsSection";
import { Car as CarIcon, Home, Info, Tag, Phone, Users, FileCheck, Menu } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./components/ui/collapsible";

// Mock data samochodów z rozszerzonymi informacjami
const carsData: Car[] = [
  {
    id: "1",
    name: "BMW X5 xDrive40i",
    brand: "BMW",
    model: "X5",
    category: "SUV",
    price: 450,
    image: "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzYxMjQwMjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1639280791656-5f8506ff21d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXYlMjBjYXJ8ZW58MXx8fHwxNzYxMjQwMjE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1728458032011-23a66142fbf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibXclMjBsdXh1cnklMjBjYXJ8ZW58MXx8fHwxNzYxMzEzMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1688105029658-dcd434e75a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGNhciUyMGludGVyaW9yfGVufDF8fHx8MTc2MTMxMzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    seats: 5,
    fuelType: "Diesel",
    transmission: "Automat",
    rating: 4.8,
    year: 2023,
    available: true,
    description: "Luksusowy SUV BMW X5 łączy w sobie sportowy charakter z elegancją i komfortem. Idealne auto dla rodziny i biznesu.",
    features: [
      "Napęd 4x4",
      "Panoramiczny dach",
      "Skórzana tapicerka",
      "System nawigacji",
      "Klimatyzacja 4-strefowa",
      "Tempomat adaptacyjny",
    ],
  },
  {
    id: "2",
    name: "Porsche 911 Carrera",
    brand: "Porsche",
    model: "911",
    category: "Sportowy",
    price: 850,
    originalPrice: 1050,
    image: "https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYxMjgyNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1541348263662-e068662d82af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjYXJ8ZW58MXx8fHwxNzYxMjgyNTkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1612805143869-59b13feb8f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MTMxMzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1617776919745-3b30ac157d3d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjB0cnVuayUyMHNwYWNlfGVufDF8fHx8MTc2MTMxMzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    seats: 2,
    fuelType: "Benzyna",
    transmission: "Automat",
    rating: 4.9,
    year: 2024,
    available: true,
    isPromo: true,
    promoLabel: "-20%",
    description: "Ikonowy samochód sportowy Porsche 911 zapewnia niezapomniane wrażenia z jazdy. Moc, precyzja i legendarny design.",
    features: [
      "Silnik 3.0L Twin-Turbo",
      "0-100 km/h w 3.9s",
      "Sport Chrono Package",
      "Sportowy wydech",
      "Skórzane fotele sportowe",
      "System audio Bose",
    ],
  },
  {
    id: "3",
    name: "Mercedes S-Class",
    brand: "Mercedes",
    model: "S-Class",
    category: "Luksusowy",
    price: 650,
    image: "https://images.unsplash.com/photo-1721994234246-45087e5aca16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWx8ZW58MXx8fHwxNzYxMjQ4NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1721994234246-45087e5aca16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWx8ZW58MXx8fHwxNzYxMjQ4NTcyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1688105029658-dcd434e75a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXJjZWRlcyUyMGNhciUyMGludGVyaW9yfGVufDF8fHx8MTc2MTMxMzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    seats: 5,
    fuelType: "Diesel",
    transmission: "Automat",
    rating: 4.9,
    year: 2023,
    available: true,
    description: "Mercedes S-Class to definicja luksusu i komfortu. Najnowocześniejsze technologie w eleganckim wydaniu.",
    features: [
      "MBUX Hyperscreen",
      "Zawieszenie pneumatyczne",
      "Masaż foteli",
      "Ambient lighting 64 kolory",
      "Head-up display",
      "Burmester 4D Surround Sound",
    ],
  },
  {
    id: "4",
    name: "Audi A4 Avant",
    brand: "Audi",
    model: "A4",
    category: "Sedan",
    price: 280,
    originalPrice: 350,
    image: "https://images.unsplash.com/photo-1658662160331-62f7e52e63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjEyODUyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1658662160331-62f7e52e63de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWRhbiUyMGNhcnxlbnwxfHx8fDE3NjEyODUyMDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1612805143869-59b13feb8f95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWRpJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MTMxMzE5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    seats: 5,
    fuelType: "Benzyna",
    transmission: "Automat",
    rating: 4.7,
    year: 2022,
    available: true,
    isPromo: true,
    promoLabel: "WEEKEND -20%",
    description: "Audi A4 Avant to eleganckie kombi łączące sportowy charakter z praktycznością. Idealne na dłuższe trasy.",
    features: [
      "Virtual Cockpit",
      "Quattro 4WD",
      "Matrix LED",
      "Asystent parkowania",
      "Kamera cofania",
      "Podgrzewane fotele",
    ],
  },
  {
    id: "5",
    name: "Volkswagen Golf GTI",
    brand: "Volkswagen",
    model: "Golf",
    category: "Kompakt",
    price: 180,
    image: "https://images.unsplash.com/photo-1701314860844-cd2152fa9071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYWN0JTIwY2FyfGVufDF8fHx8MTc2MTIwMjY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1701314860844-cd2152fa9071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYWN0JTIwY2FyfGVufDF8fHx8MTc2MTIwMjY1NXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    seats: 5,
    fuelType: "Benzyna",
    transmission: "Manual",
    rating: 4.5,
    year: 2023,
    available: false,
    description: "Kompaktowy hot-hatch VW Golf GTI z charakterem sportowym. Dynamika i komfort w jednym.",
    features: [
      "Silnik 2.0 TSI 245 KM",
      "Sportowe zawieszenie",
      "Fotele kubełkowe",
      "Digital Cockpit Pro",
      "Felgi 18 cali",
    ],
  },
  {
    id: "6",
    name: "Tesla Model 3 Long Range",
    brand: "Tesla",
    model: "Model 3",
    category: "Elektryczny",
    price: 420,
    originalPrice: 500,
    image: "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhcnxlbnwxfHx8fDE3NjEyMTA1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGNhcnxlbnwxfHx8fDE3NjEyMTA1Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    seats: 5,
    fuelType: "Elektryczny",
    transmission: "Automat",
    rating: 4.8,
    year: 2024,
    available: true,
    isPromo: true,
    promoLabel: "ECO -16%",
    description: "Tesla Model 3 to elektryczny sedan przyszłości. Zasięg do 600 km, autopilot i zero emisji.",
    features: [
      "Zasięg 600 km",
      "Autopilot",
      "Ekran dotykowy 15 cali",
      "Premium Audio",
      "0-100 km/h w 4.4s",
      "Supercharger access",
    ],
  },
];

type PageType = "home" | "about" | "team" | "permits" | "offer" | "promotions" | "contact";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [detailCar, setDetailCar] = useState<Car | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [brandFilter, setBrandFilter] = useState("all");
  const [modelFilter, setModelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [availableOnly, setAvailableOnly] = useState(false);

  // Get unique brands and models
  const brands = useMemo(() => {
    return Array.from(new Set(carsData.map(car => car.brand))).sort();
  }, []);

  const models = useMemo(() => {
    if (brandFilter === "all") return [];
    return Array.from(new Set(carsData.filter(car => car.brand === brandFilter).map(car => car.model))).sort();
  }, [brandFilter]);

  const handleBookCar = (car: Car) => {
    setSelectedCar(car);
    setBookingOpen(true);
  };

  const handleViewDetails = (car: Car) => {
    setDetailCar(car);
    setDetailOpen(true);
  };

  const filterCars = (cars: Car[], showPromoOnly: boolean = false) => {
    return cars.filter((car) => {
      if (showPromoOnly && !car.isPromo) return false;
      if (availableOnly && !car.available) return false;
      if (searchTerm && !car.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (brandFilter !== "all" && car.brand !== brandFilter) return false;
      if (modelFilter !== "all" && car.model !== modelFilter) return false;
      if (categoryFilter !== "all" && car.category !== categoryFilter) return false;
      if (car.price < priceRange[0] || car.price > priceRange[1]) return false;
      return true;
    });
  };

  const filteredCars = currentPage === "promotions" 
    ? filterCars(carsData, true) 
    : filterCars(carsData);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Toaster />
        
        {/* Sidebar */}
        <Sidebar className="border-r border-sidebar-border bg-sidebar">
          <SidebarHeader className="border-b border-sidebar-border p-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <CarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-sidebar-foreground">AutoRent</h2>
                <p className="text-xs text-sidebar-foreground/60">Premium cars</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setCurrentPage("home")}
                  isActive={currentPage === "home"}
                  className="w-full"
                >
                  <Home className="w-4 h-4" />
                  <span>Strona główna</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full">
                      <Info className="w-4 h-4" />
                      <span>O nas</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenu className="ml-4 mt-1">
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => setCurrentPage("about")}
                          isActive={currentPage === "about"}
                        >
                          <Info className="w-4 h-4" />
                          <span>O firmie</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => setCurrentPage("team")}
                          isActive={currentPage === "team"}
                        >
                          <Users className="w-4 h-4" />
                          <span>Nasza kadra</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          onClick={() => setCurrentPage("permits")}
                          isActive={currentPage === "permits"}
                        >
                          <FileCheck className="w-4 h-4" />
                          <span>Pozwolenia</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setCurrentPage("offer")}
                  isActive={currentPage === "offer"}
                >
                  <CarIcon className="w-4 h-4" />
                  <span>Oferta</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setCurrentPage("promotions")}
                  isActive={currentPage === "promotions"}
                >
                  <Tag className="w-4 h-4" />
                  <span>Promocje</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setCurrentPage("contact")}
                  isActive={currentPage === "contact"}
                >
                  <Phone className="w-4 h-4" />
                  <span>Kontakt</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-sidebar-border p-4">
            <div className="text-xs text-sidebar-foreground/60">
              <p>© 2025 AutoRent</p>
              <p>Wszystkie prawa zastrzeżone</p>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Mobile Header */}
          <header className="lg:hidden bg-white border-b px-4 py-3 sticky top-0 z-40">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="lg:hidden">
                <Menu className="w-6 h-6" />
              </SidebarTrigger>
              <div className="flex items-center gap-2">
                <CarIcon className="w-6 h-6 text-primary" />
                <h2 className="text-primary">AutoRent</h2>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              {currentPage === "home" && (
                <>
                  {/* Hero Section */}
                  <div className="bg-gradient-to-r from-primary to-primary/80 text-white rounded-lg p-8 sm:p-12 mb-8">
                    <div className="max-w-3xl">
                      <h1 className="mb-4 text-white">Wypożycz auto marzeń</h1>
                      <p className="text-xl mb-6 text-white/90">
                        Największy wybór aut premium. Rezerwuj online w 3 minuty.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-sm text-white/80">Flota</p>
                          <p className="text-2xl">200+ aut</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-sm text-white/80">Klienci</p>
                          <p className="text-2xl">10k+</p>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <p className="text-sm text-white/80">Ocena</p>
                          <p className="text-2xl">4.8/5</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="mb-8">
                    <AdvancedCarSearch
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      brandFilter={brandFilter}
                      onBrandChange={(value) => {
                        setBrandFilter(value);
                        setModelFilter("all");
                      }}
                      modelFilter={modelFilter}
                      onModelChange={setModelFilter}
                      categoryFilter={categoryFilter}
                      onCategoryChange={setCategoryFilter}
                      priceRange={priceRange}
                      onPriceRangeChange={setPriceRange}
                      availableOnly={availableOnly}
                      onAvailableOnlyChange={setAvailableOnly}
                      brands={brands}
                      models={models}
                    />
                  </div>

                  {/* Cars Grid */}
                  <div className="mb-6">
                    <h2 className="mb-4">Dostępne samochody</h2>
                    <p className="text-gray-600 mb-6">
                      Znaleziono {filteredCars.length} {filteredCars.length === 1 ? "samochód" : "samochodów"}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                      <CarCard 
                        key={car.id} 
                        car={car} 
                        onBook={handleBookCar}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>

                  {filteredCars.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        Nie znaleziono samochodów spełniających kryteria
                      </p>
                    </div>
                  )}
                </>
              )}

              {currentPage === "about" && <AboutSection />}
              {currentPage === "team" && <TeamSection />}
              {currentPage === "permits" && <PermitsSection />}
              
              {currentPage === "offer" && (
                <>
                  <div className="mb-8">
                    <h1 className="mb-4">Nasza oferta</h1>
                    <p className="text-lg text-gray-600 mb-8">
                      Sprawdź pełną listę dostępnych pojazdów
                    </p>

                    <AdvancedCarSearch
                      searchTerm={searchTerm}
                      onSearchChange={setSearchTerm}
                      brandFilter={brandFilter}
                      onBrandChange={(value) => {
                        setBrandFilter(value);
                        setModelFilter("all");
                      }}
                      modelFilter={modelFilter}
                      onModelChange={setModelFilter}
                      categoryFilter={categoryFilter}
                      onCategoryChange={setCategoryFilter}
                      priceRange={priceRange}
                      onPriceRangeChange={setPriceRange}
                      availableOnly={availableOnly}
                      onAvailableOnlyChange={setAvailableOnly}
                      brands={brands}
                      models={models}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                      <CarCard 
                        key={car.id} 
                        car={car} 
                        onBook={handleBookCar}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                </>
              )}

              {currentPage === "promotions" && (
                <>
                  <div className="bg-gradient-to-r from-secondary to-orange-600 text-white rounded-lg p-8 sm:p-12 mb-8">
                    <h1 className="mb-4 text-white">Aktualne promocje</h1>
                    <p className="text-xl text-white/90">
                      Skorzystaj z wyjątkowych ofert i zaoszczędź nawet do 20%
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                      <CarCard 
                        key={car.id} 
                        car={car} 
                        onBook={handleBookCar}
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>

                  {filteredCars.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-500">
                        Obecnie brak aktywnych promocji. Wróć wkrótce!
                      </p>
                    </div>
                  )}
                </>
              )}

              {currentPage === "contact" && <ContactSection />}
            </div>
          </main>
        </div>

        {/* Dialogs */}
        <BookingDialog
          car={selectedCar}
          open={bookingOpen}
          onOpenChange={setBookingOpen}
        />
        
        <CarDetailDialog
          car={detailCar}
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onBook={handleBookCar}
        />
      </div>
    </SidebarProvider>
  );
}
