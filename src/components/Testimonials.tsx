
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Moore",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    rating: 5,
    text: "Absolutely love this salon! The stylists are true artists who listen to what you want and deliver results that exceed expectations. My go-to place for hair care.",
  },
  {
    id: 2,
    name: "David Wilson",
    image: "https://randomuser.me/api/portraits/men/58.jpg",
    rating: 5,
    text: "First-class service from the moment you walk in. The attention to detail and personalized approach made me feel valued as a client. Highly recommend!",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    image: "https://randomuser.me/api/portraits/women/64.jpg",
    rating: 5,
    text: "I've been to many salons, but none compare to this one. The stylists are knowledgeable and skilled, the atmosphere is relaxing, and I always leave feeling fantastic.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Client <span className="text-salon-gold">Testimonials</span>
          </h2>
          <p className="text-salon-muted">
            Don't just take our word for it. Here's what our clients have to say about their experiences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-salon-light p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-salon-gold text-salon-gold"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-salon-dark mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-medium text-salon-dark">{testimonial.name}</h4>
                  <p className="text-sm text-salon-muted">Satisfied Client</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
