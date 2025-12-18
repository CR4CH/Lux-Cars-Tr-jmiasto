import { Card, CardContent } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Mail, Phone } from "lucide-react";

const teamMembers = [
  {
    name: "Jan Kowalski",
    position: "Dyrektor zarządzający",
    email: "jan.kowalski@autorent.pl",
    phone: "+48 123 456 789",
    image: "https://images.unsplash.com/photo-1683770997177-0603bd44d070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFsc3xlbnwxfHx8fDE3NjEyNzQ3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Anna Nowak",
    position: "Kierownik działu obsługi klienta",
    email: "anna.nowak@autorent.pl",
    phone: "+48 123 456 790",
    image: "https://images.unsplash.com/photo-1683770997177-0603bd44d070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFsc3xlbnwxfHx8fDE3NjEyNzQ3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Piotr Wiśniewski",
    position: "Specjalista ds. flotowych",
    email: "piotr.wisniewski@autorent.pl",
    phone: "+48 123 456 791",
    image: "https://images.unsplash.com/photo-1683770997177-0603bd44d070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFsc3xlbnwxfHx8fDE3NjEyNzQ3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    name: "Maria Lewandowska",
    position: "Koordynator rezerwacji",
    email: "maria.lewandowska@autorent.pl",
    phone: "+48 123 456 792",
    image: "https://images.unsplash.com/photo-1683770997177-0603bd44d070?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJvZmVzc2lvbmFsc3xlbnwxfHx8fDE3NjEyNzQ3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

export function TeamSection() {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="mb-4">Nasza kadra</h1>
        <p className="text-lg text-gray-600">
          Poznaj nasz zespół profesjonalistów, którzy codziennie dbają o Twoje zadowolenie
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
            <ImageWithFallback
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover"
            />
            <CardContent className="p-4 space-y-3">
              <div>
                <h3 className="mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600">{member.position}</p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                    {member.phone}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
