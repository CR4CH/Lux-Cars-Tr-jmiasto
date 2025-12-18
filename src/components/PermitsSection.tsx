import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileCheck, Shield, Award, CheckCircle2 } from "lucide-react";

const permits = [
  {
    name: "Licencja na prowadzenie działalności gospodarczej",
    number: "REGON: 123456789",
    issueDate: "2010-01-15",
    icon: FileCheck,
  },
  {
    name: "Certyfikat ISO 9001:2015",
    number: "Cert. Nr: ISO/9001/2020/PL",
    issueDate: "2020-06-10",
    icon: Award,
  },
  {
    name: "Polisa OC działalności gospodarczej",
    number: "Polisa Nr: OC/2024/123456",
    issueDate: "2024-01-01",
    validity: "2025-12-31",
    icon: Shield,
  },
  {
    name: "Zezwolenie na wynajem pojazdów",
    number: "Zezwolenie Nr: WYN/2010/789",
    issueDate: "2010-02-20",
    icon: CheckCircle2,
  },
];

const certifications = [
  "Certyfikat jakości obsługi klienta",
  "Członek Polskiego Związku Wynajmu Samochodów",
  "Certyfikat ECO dla floty elektrycznej",
  "Nagroda Najlepsza Wypożyczalnia 2023",
  "Certyfikat bezpieczeństwa danych osobowych",
];

export function PermitsSection() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="mb-4">Pozwolenia i certyfikaty</h1>
        <p className="text-lg text-gray-600">
          Nasza działalność jest w pełni legalna i certyfikowana przez odpowiednie organy
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {permits.map((permit, index) => {
          const Icon = permit.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-base">{permit.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Numer:</span>
                  <Badge variant="outline">{permit.number}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Data wydania:</span>
                  <span className="text-sm">{new Date(permit.issueDate).toLocaleDateString('pl-PL')}</span>
                </div>
                {permit.validity && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Ważne do:</span>
                    <span className="text-sm text-green-600">
                      {new Date(permit.validity).toLocaleDateString('pl-PL')}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dodatkowe certyfikaty i nagrody</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Shield className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="mb-2">Gwarancja bezpieczeństwa</h3>
              <p className="text-gray-600">
                Wszystkie nasze pojazdy są objęte pełnym ubezpieczeniem OC, AC oraz NNW. 
                Posiadamy również ubezpieczenie odpowiedzialności cywilnej dla prowadzonej działalności. 
                Twoje bezpieczeństwo i komfort to nasz priorytet.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
