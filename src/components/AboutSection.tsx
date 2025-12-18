import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Award, Shield, Users, TrendingUp } from "lucide-react";

export function AboutSection() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="mb-4">O naszej firmie</h1>
        <p className="text-lg text-gray-600">
          Od ponad 15 lat dostarczamy najlepsze samochody dla najbardziej wymagających klientów
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1579216417367-febadf042a97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWwlMjBvZmZpY2V8ZW58MXx8fHwxNzYxMzEzMTk2fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="AutoRent office"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h2>Twój zaufany partner w mobilności</h2>
          <p className="text-gray-600">
            AutoRent to wypożyczalnia samochodów premium, która od 2010 roku dostarcza najwyższej jakości 
            usługi dla klientów indywidualnych i biznesowych. Nasza flota składa się z ponad 200 nowoczesnych 
            pojazdów najlepszych marek światowych.
          </p>
          <p className="text-gray-600">
            Stawiamy na bezpieczeństwo, komfort i profesjonalną obsługę. Każdy nasz samochód jest regularnie 
            serwisowany i utrzymywany w doskonałym stanie technicznym. Nasi doświadczeni pracownicy służą 
            pomocą 7 dni w tygodniu.
          </p>
          <p className="text-gray-600">
            Oferujemy elastyczne warunki wynajmu, konkurencyjne ceny oraz możliwość dostawy pojazdu pod 
            wskazany adres. Dołącz do tysięcy zadowolonych klientów, którzy nam zaufali!
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-primary" />
            <p className="text-3xl mb-1 text-primary">15+</p>
            <p className="text-gray-600">lat doświadczenia</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Users className="w-10 h-10 mx-auto mb-3 text-primary" />
            <p className="text-3xl mb-1 text-primary">10k+</p>
            <p className="text-gray-600">zadowolonych klientów</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Award className="w-10 h-10 mx-auto mb-3 text-primary" />
            <p className="text-3xl mb-1 text-primary">200+</p>
            <p className="text-gray-600">pojazdów we flocie</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="w-10 h-10 mx-auto mb-3 text-primary" />
            <p className="text-3xl mb-1 text-primary">100%</p>
            <p className="text-gray-600">ubezpieczonych aut</p>
          </CardContent>
        </Card>
      </div>

      {/* Values */}
      <div>
        <h2 className="mb-6 text-center">Nasze wartości</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                Bezpieczeństwo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Wszystkie nasze pojazdy są w pełni ubezpieczone i przechodzą regularne przeglądy techniczne.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Jakość
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Oferujemy tylko samochody premium od renomowanych producentów, zawsze w doskonałym stanie.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Obsługa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Nasz zespół profesjonalistów zawsze służy pomocą i doradza przy wyborze najlepszego pojazdu.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
