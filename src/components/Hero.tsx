
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-salon-dark text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')",
        }}
      ></div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-salon-gold text-white rounded-full mb-5">
            Professional Hair Salon
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Transform Your Look, Elevate Your Style
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Experience the artistry and expertise of our award-winning stylists.
            From classic cuts to trend-setting styles, we help you look and feel
            your absolute best.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <Button
              asChild
              className="bg-salon-gold hover:bg-salon-gold/90 text-white font-medium px-8 py-3"
              size="lg"
            >
              <Link to="/appointments">Book Appointment</Link>
            </Button> */}
            {/* <Button
              asChild
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium px-8 py-3"
              variant="outline"
              size="lg"
            >
              <Link to="/services">Our Services</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
