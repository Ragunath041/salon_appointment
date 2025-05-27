import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Scissors, 
  Droplet, 
  PaintBucket, 
  Sparkles, 
  Wind, 
  Calendar, 
  Clock, 
  Info,
  DollarSign
} from "lucide-react";

const serviceCategories = [
  {
    id: "haircuts",
    title: "Haircuts & Styling",
    icon: Scissors,
    services: [
      { name: "Women's Haircut & Style", price: "$45+" },
      { name: "Men's Haircut & Style", price: "$35+" },
      { name: "Children's Haircut (12 & under)", price: "$25+" },
      { name: "Shampoo & Blowout", price: "$35+" },
      { name: "Special Occasion Style", price: "$65+" },
      { name: "Bridal Hair Trial", price: "$85+" },
    ],
  },
  {
    id: "color",
    title: "Hair Color Services",
    icon: PaintBucket,
    services: [
      { name: "Single Process Color", price: "$85+" },
      { name: "Double Process Color", price: "$125+" },
      { name: "Partial Highlights", price: "$95+" },
      { name: "Full Highlights", price: "$120+" },
      { name: "Balayage", price: "$140+" },
      { name: "Ombré", price: "$130+" },
      { name: "Color Correction", price: "Consultation Required" },
    ],
  },
  {
    id: "treatments",
    title: "Hair Treatments",
    icon: Sparkles,
    services: [
      { name: "Deep Conditioning Treatment", price: "$35+" },
      { name: "Keratin Smoothing Treatment", price: "$250+" },
      { name: "Scalp Treatment", price: "$45+" },
      { name: "Hair & Scalp Mask", price: "$55+" },
      { name: "Olaplex Treatment", price: "$65+" },
    ],
  },
  {
    id: "extensions",
    title: "Hair Extensions",
    icon: Droplet,
    services: [
      { name: "Consultation", price: "Complimentary" },
      { name: "Tape-In Extensions (Full)", price: "$450+" },
      { name: "Tape-In Extensions (Partial)", price: "$300+" },
      { name: "Extension Removal", price: "$75+" },
      { name: "Extension Maintenance", price: "$100+" },
    ],
  },
  {
    id: "texturizing",
    title: "Texturizing Services",
    icon: Wind,
    services: [
      { name: "Permanent Wave", price: "$95+" },
      { name: "Relaxer", price: "$85+" },
      { name: "Brazilian Blowout", price: "$275+" },
      { name: "Perm Rod Set", price: "$65+" },
    ],
  },
  {
    id: "additional",
    title: "Additional Services",
    icon: Scissors, // Changed from Comb to Scissors as there's no Comb icon
    services: [
      { name: "Bang Trim", price: "$15" },
      { name: "Neck Trim", price: "$10" },
      { name: "Beard Trim & Shape", price: "$20+" },
      { name: "Makeup Application", price: "$75+" },
      { name: "Makeup Lesson", price: "$95+" },
    ],
  },
];

const Services = () => {
  return (
    <div className="bg-salon-light py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Our <span className="text-salon-gold">Services</span>
          </h1>
          <p className="text-salon-muted">
            We offer a comprehensive range of hair services to keep you looking your absolute best.
            All services include a consultation to ensure we understand your goals and preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {serviceCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-salon-dark text-white p-6 flex items-center">
                <div className="bg-salon-gold/20 p-3 rounded-full mr-4">
                  <category.icon className="h-6 w-6 text-salon-gold" />
                </div>
                <h2 className="text-2xl font-serif font-bold">{category.title}</h2>
              </div>
              
              <div className="p-6">
                <ul className="space-y-4">
                  {category.services.map((service, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span className="text-salon-dark">{service.name}</span>
                      <span className="text-salon-gold font-medium">{service.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center text-salon-dark">
            Service Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="bg-salon-gold/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Info className="h-6 w-6 text-salon-gold" />
              </div>
              <h3 className="font-serif font-bold mb-2">New Clients</h3>
              <p className="text-sm text-salon-muted">
                We recommend booking a consultation before your first appointment to discuss your hair goals and expectations.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-salon-gold/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-salon-gold" />
              </div>
              <h3 className="font-serif font-bold mb-2">Appointment Length</h3>
              <p className="text-sm text-salon-muted">
                Service times vary. Please allow additional time for more complex services such as color corrections or special styling.
              </p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-salon-gold/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-6 w-6 text-salon-gold" />
              </div>
              <h3 className="font-serif font-bold mb-2">Pricing</h3>
              <p className="text-sm text-salon-muted">
                Prices may vary based on hair length, thickness, and the stylist's experience level. A detailed quote will be provided during consultation.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button
              asChild
              className="bg-salon-gold hover:bg-salon-gold/90 text-white px-8"
            >
              <Link to="/appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Book Your Appointment
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
