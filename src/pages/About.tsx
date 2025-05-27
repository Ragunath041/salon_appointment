import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Facebook, 
  Instagram, 
  Twitter, 
  UserPlus,
  GraduationCap,
  HeartHandshake
} from "lucide-react";

const stylists = [
  {
    id: "stylist1",
    name: "Emma Johnson",
    role: "Master Stylist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Emma has over 10 years of experience and specializes in precision cuts and color techniques. She's passionate about continuing education and stays up-to-date with the latest hair trends and techniques.",
    specialties: ["Precision Cuts", "Color Correction", "Balayage"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "stylist2",
    name: "Michael Chen",
    role: "Color Specialist",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Michael is known for his innovative color work and ability to create personalized looks. He has a keen eye for detail and loves helping clients find their perfect hair color.",
    specialties: ["Creative Color", "Highlights", "Color Transformation"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "stylist3",
    name: "Sofia Rodriguez",
    role: "Senior Stylist",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Sofia excels in creating trending styles and specializes in hair treatments and extensions. Her clients appreciate her thorough consultations and dedication to hair health.",
    specialties: ["Extensions", "Keratin Treatments", "Textured Hair"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "stylist4",
    name: "James Wilson",
    role: "Artistic Director",
    image: "https://randomuser.me/api/portraits/men/78.jpg",
    bio: "As our Artistic Director, James brings 15 years of industry experience and has worked on numerous fashion shows and photo shoots. He specializes in avant-garde styles and editorial work.",
    specialties: ["Editorial Styling", "Avant-Garde", "Men's Grooming"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "stylist5",
    name: "Olivia Kim",
    role: "Texture Specialist",
    image: "https://randomuser.me/api/portraits/women/76.jpg",
    bio: "Olivia has dedicated her career to understanding and working with all hair textures. She's an expert in curly hair cutting techniques and natural hair care.",
    specialties: ["Curly Hair", "Natural Hair", "Textured Cuts"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
  {
    id: "stylist6",
    name: "David Thompson",
    role: "Barber & Men's Specialist",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "David combines traditional barbering techniques with modern styling to create the perfect look for his clients. He specializes in precision fades, beard sculpting, and men's styling.",
    specialties: ["Fades", "Beard Grooming", "Men's Styling"],
    social: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
    },
  },
];

const About = () => {
  return (
    <div className="bg-salon-light py-16">
      <div className="container mx-auto px-4">
        {/* About Us Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              About <span className="text-salon-gold">Elite Salon</span>
            </h1>
            <p className="text-salon-muted max-w-3xl mx-auto">
              Discover our story, our passion for beauty, and our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80" 
                alt="Salon interior" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div>
              <h2 className="text-2xl font-serif font-bold mb-4 text-salon-dark">
                Our Story
              </h2>
              <p className="text-salon-muted mb-4">
                Founded in 2010, Elite Salon was born from a passion for hair artistry and a vision to create a space where clients could transform their look in a welcoming, professional environment.
              </p>
              <p className="text-salon-muted mb-4">
                What started as a small studio has grown into a premier salon destination, known for exceptional service and stunning results. Our commitment to education ensures our team stays at the forefront of industry trends and techniques.
              </p>
              <p className="text-salon-muted">
                We believe that great hair can transform how you look and feel, boosting your confidence and enhancing your natural beauty. Every client who walks through our doors receives personalized attention and care to achieve their hair goals.
              </p>
            </div>
          </div>
        </div>
        
        {/* Our Philosophy Section */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-serif font-bold mb-6 text-center text-salon-dark">
              Our Philosophy
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="bg-salon-gold/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-6 w-6 text-salon-gold" />
                </div>
                <h3 className="font-serif font-bold mb-2">Client-Focused</h3>
                <p className="text-sm text-salon-muted">
                  We believe in building lasting relationships with our clients through trust, communication, and exceptional results.
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-salon-gold/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-6 w-6 text-salon-gold" />
                </div>
                <h3 className="font-serif font-bold mb-2">Continuous Learning</h3>
                <p className="text-sm text-salon-muted">
                  Our stylists regularly attend training and workshops to stay current with the latest techniques and trends.
                </p>
              </div>
              
              <div className="text-center p-4">
                <div className="bg-salon-gold/10 p-3 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <HeartHandshake className="h-6 w-6 text-salon-gold" />
                </div>
                <h3 className="font-serif font-bold mb-2">Quality & Care</h3>
                <p className="text-sm text-salon-muted">
                  We use only premium products and take pride in creating a welcoming, professional environment for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Team Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold mb-4">
              Meet Our <span className="text-salon-gold">Team</span>
            </h2>
            <p className="text-salon-muted max-w-3xl mx-auto">
              Our talented stylists bring years of experience, continuous education, and a passion for their craft to every client interaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stylists.map((stylist) => (
              <div
                key={stylist.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={stylist.image}
                  alt={stylist.name}
                  className="w-full h-72 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-serif font-bold text-salon-dark">
                    {stylist.name}
                  </h3>
                  <p className="text-salon-gold font-medium mb-3">{stylist.role}</p>
                  <p className="text-salon-muted mb-4">{stylist.bio}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-salon-dark mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {stylist.specialties.map((specialty, index) => (
                        <span 
                          key={index} 
                          className="bg-salon-gold/10 text-salon-gold text-xs px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex space-x-4 mt-4">
                    <a
                      href={stylist.social.instagram}
                      className="text-salon-dark hover:text-salon-gold transition-colors"
                    >
                      <Instagram size={18} />
                    </a>
                    <a
                      href={stylist.social.facebook}
                      className="text-salon-dark hover:text-salon-gold transition-colors"
                    >
                      <Facebook size={18} />
                    </a>
                    <a
                      href={stylist.social.twitter}
                      className="text-salon-dark hover:text-salon-gold transition-colors"
                    >
                      <Twitter size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button
              asChild
              className="bg-salon-gold hover:bg-salon-gold/90 text-white px-8"
            >
              <Link to="/appointments">
                <Calendar className="mr-2 h-4 w-4" />
                Book With Our Team
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
