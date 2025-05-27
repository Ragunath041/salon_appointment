
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-salon-dark text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold mb-4">
              <span className="text-salon-gold">Elite</span> Salon
            </h3>
            <p className="text-salon-muted mb-4">
              Providing exceptional hair styling and beauty services since 2010. Our team of professionals is dedicated to making you look and feel your best.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-salon-gold transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-salon-gold transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-salon-gold transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-salon-muted hover:text-salon-gold transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-salon-muted hover:text-salon-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-salon-muted hover:text-salon-gold transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="text-salon-muted hover:text-salon-gold transition-colors">
                  Book Appointment
                </Link>
              </li>
              {/* <li>
                <Link to="/contact" className="text-salon-muted hover:text-salon-gold transition-colors">
                  Contact
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-salon-gold mt-1 flex-shrink-0" />
                <p className="text-salon-muted">123 Style Street, Beauty City, BC 12345</p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-salon-gold flex-shrink-0" />
                <p className="text-salon-muted">(123) 456-7890</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-salon-gold flex-shrink-0" />
                <p className="text-salon-muted">info@elitesalon.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-salon-muted">
          <p>&copy; {new Date().getFullYear()} Elite Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
