import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-salon-dark mb-6">
            Welcome to <span className="text-salon-gold">Elite Salon</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Experience luxury hair care and styling services. Book your appointment today
            and let our expert stylists transform your look.
          </p>
          <div className="flex gap-4 justify-center">
            {isAuthenticated && user?.role === 'user' ? (
              <Button asChild className="bg-salon-gold hover:bg-salon-gold/90 text-white">
                <Link to="/appointments">Book Appointment</Link>
              </Button>
            ) : !isAuthenticated ? (
              <Button asChild className="bg-salon-gold hover:bg-salon-gold/90 text-white">
                <Link to="/login">Login to Book</Link>
              </Button>
            ) : null}
            <Button asChild variant="outline">
              <Link to="/services">Our Services</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}; 