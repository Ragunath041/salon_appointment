import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    name: "Haircut & Styling",
    description: "Professional haircut and styling tailored to your preferences",
    price: "From $50",
  },
  {
    name: "Hair Coloring",
    description: "Full color, highlights, balayage, and other coloring services",
    price: "From $80",
  },
  {
    name: "Hair Treatment",
    description: "Deep conditioning, keratin treatment, and hair repair services",
    price: "From $70",
  },
  {
    name: "Special Occasion",
    description: "Wedding, prom, and special event hair styling services",
    price: "From $90",
  },
];

export const Services = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-salon-dark mb-4">Our Services</h1>
        <p className="text-lg text-gray-600">
          Discover our range of professional hair care services
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service) => (
          <div
            key={service.name}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-salon-gold font-semibold mb-4">{service.price}</p>
            <Button asChild className="w-full bg-salon-gold hover:bg-salon-gold/90">
              <Link to="/appointments">Book Now</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}; 