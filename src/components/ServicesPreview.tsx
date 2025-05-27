
import { Scissors, Droplet, PaintBucket, Sparkles, Wind } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "haircut",
    name: "Haircut & Style",
    description: "Precision cuts tailored to your face shape and lifestyle.",
    icon: Scissors,
    price: "$45+",
  },
  {
    id: "color",
    name: "Hair Color",
    description: "Rich, vibrant color that enhances your natural beauty.",
    icon: PaintBucket,
    price: "$85+",
  },
  {
    id: "highlights",
    name: "Highlights & Balayage",
    description: "Sun-kissed dimension for a natural, beautiful look.",
    icon: Droplet,
    price: "$120+",
  },
  {
    id: "treatment",
    name: "Hair Treatments",
    description: "Restorative treatments to repair and revitalize your hair.",
    icon: Sparkles,
    price: "$65+",
  },
  {
    id: "blowout",
    name: "Blowout & Styling",
    description: "Smooth, voluminous styles for any occasion.",
    icon: Wind,
    price: "$35+",
  },
];

const ServicesPreview = () => {
  return (
    <section className="py-16 bg-salon-light">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Our <span className="text-salon-gold">Services</span>
          </h2>
          <p className="text-salon-muted">
            We offer a wide range of hair services designed to enhance your
            natural beauty and keep you looking your best.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="bg-salon-gold/10 p-3 rounded-full mr-4">
                  <service.icon
                    className="h-6 w-6 text-salon-gold"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-serif font-semibold text-salon-dark">
                  {service.name}
                </h3>
              </div>
              <p className="text-salon-muted mb-4">{service.description}</p>
              <p className="font-medium text-salon-gold">{service.price}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            className="bg-salon-gold hover:bg-salon-gold/90 text-white"
          >
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
