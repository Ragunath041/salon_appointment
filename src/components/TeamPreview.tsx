
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";

const stylists = [
  {
    id: "stylist1",
    name: " Aalim Hakim",
    image: "https://thetop10spot.com/wp-content/uploads/2023/05/aalim-Hakin-768x512.jpg.webp",
    bio: "Aalim Hakim is a well-known and Famous hair stylist in India who has worked with many celebrities. He is known for his unique and creative hairstyles that have become a trend among the youth.",
    social: {
      instagram: "https://www.instagram.com/aalimhakim/"
    },
  },
  {
    id: "stylist2",
    name: "Amit Thakur",
    image: "https://thetop10spot.com/wp-content/uploads/2023/05/Amit-thakur.jpg",
    bio: "Amit Thakur is a famous hair stylist from India who has worked with top Bollywood stars such as Deepika Padukone, Alia Bhatt, Katrina Kaif, and Jhanvi Kapoor. He founded the Masters Hair Academy, which trains people who aspire to be hair artists.",
    social: {
      instagram: "https://www.instagram.com/manemastersacademy/",
    },
  },
  {
    id: "stylist3",
    name: "Adhuna Bhabani",
    image: "https://thetop10spot.com/wp-content/uploads/2023/05/Adhuna-Bhabani-768x468.jpg.webp",
    bio: "Adhuna Bhabani is a well-known Indian hairstylist and entrepreneur. She was born in Liverpool, England, but grew up in Mumbai, India. She began her career as a hairstylist in the early 1990s and quickly became famous in the Indian fashion world. In 1998, she co-founded B:Blunt, a popular hair salon chain, with her brother Osh Bhabani.",
    social: {
      instagram: "https://www.instagram.com/bbluntindia/",
    },
  },
];

const TeamPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Meet Our <span className="text-salon-gold">Team</span>
          </h2>
          <p className="text-salon-muted">
            Our talented stylists bring years of experience and passion to every client interaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="bg-salon-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={stylist.image}
                alt={stylist.name}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-salon-dark">
                  {stylist.name}
                </h3>
                <p className="text-salon-muted mb-4">{stylist.bio}</p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href={stylist.social.instagram}
                    className="text-salon-dark hover:text-salon-gold transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="text-center mt-12">
          <Button
            asChild
            className="bg-salon-gold hover:bg-salon-gold/90 text-white"
          >
            <Link to="/about">Meet The Full Team</Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default TeamPreview;
