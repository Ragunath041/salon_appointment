import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-serif font-bold text-salon-dark">
            <span className="text-salon-gold">Elite</span> Salon
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-medium transition-colors hover:text-salon-gold ${
                location.pathname === link.path
                  ? "text-salon-gold"
                  : "text-salon-dark"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {user?.role === 'user' && (
                <>
                  <Button asChild variant="outline">
                    <Link to="/dashboard">My Dashboard</Link>
                  </Button>
                  <Button asChild className="bg-salon-gold hover:bg-salon-gold/90 text-white">
                    <Link to="/appointments">Book Appointment</Link>
                  </Button>
                </>
              )}
              {(user?.role === 'admin' || user?.role === 'stylist') && (
                <Button asChild variant="outline">
                  <Link to="/admin">Dashboard</Link>
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem className="cursor-default">
                    {user?.name} ({user?.role})
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button asChild variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="bg-salon-gold hover:bg-salon-gold/90 text-white">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? (
            <X className="h-6 w-6 text-salon-dark" />
          ) : (
            <Menu className="h-6 w-6 text-salon-dark" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-50">
          <div className="flex flex-col p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium py-2 transition-colors hover:text-salon-gold ${
                  location.pathname === link.path
                    ? "text-salon-gold"
                    : "text-salon-dark"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                {user?.role === 'user' && (
                  <>
                    <Button asChild variant="outline">
                      <Link to="/dashboard">My Dashboard</Link>
                    </Button>
                    <Button asChild className="bg-salon-gold hover:bg-salon-gold/90 text-white">
                      <Link to="/appointments" onClick={() => setIsOpen(false)}>
                        Book Appointment
                      </Link>
                    </Button>
                  </>
                )}
                {(user?.role === 'admin' || user?.role === 'stylist') && (
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/admin" onClick={() => setIsOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  className="w-full text-salon-dark hover:text-salon-gold"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                </Button>
                <Button asChild className="bg-salon-gold hover:bg-salon-gold/90 text-white w-full">
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
