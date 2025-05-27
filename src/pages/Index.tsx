import Hero from "@/components/Hero";

const Index = () => {
  return (
    <div>
      <Hero />
      
      {/* Why Choose Us Section */}
      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Why Choose <span className="text-salon-gold">Elite Salon</span>
            </h2>
            <p className="text-salon-muted">
              We combine expert artistry, premium products, and personalized service to create an exceptional salon experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-salon-gold/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Scissors className="h-8 w-8 text-salon-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Expert Stylists</h3>
              <p className="text-salon-muted">
                Our team of professionals stays on top of the latest trends and techniques to deliver exceptional results.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-salon-gold/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-salon-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Premium Products</h3>
              <p className="text-salon-muted">
                We use only the highest quality products and tools to ensure your hair looks and feels its best.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-salon-gold/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-salon-gold" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-3">Personalized Service</h3>
              <p className="text-salon-muted">
                Every client receives a consultation to create a look that complements their unique style and features.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <ServicesPreview />
      <TeamPreview />
      <Testimonials />
       */}
      {/* Contact & Location Section */}
      {/* <section className="py-16 bg-salon-light">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Find <span className="text-salon-gold">Us</span>
            </h2>
            <p className="text-salon-muted">
              Visit our salon or book your appointment today
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <SalonMap className="h-[450px]" />
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-serif font-bold mb-6 text-salon-dark">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-salon-gold mt-1" />
                  <div>
                    <h4 className="font-medium text-salon-dark">Address</h4>
                    <p className="text-salon-muted">123 Style Street, Beauty City, BC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-5 w-5 text-salon-gold mt-1" />
                  <div>
                    <h4 className="font-medium text-salon-dark">Opening Hours</h4>
                    <p className="text-salon-muted">Monday - Friday: 9am - 7pm</p>
                    <p className="text-salon-muted">Saturday: 9am - 6pm</p>
                    <p className="text-salon-muted">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-5 w-5 text-salon-gold mt-1" />
                  <div>
                    <h4 className="font-medium text-salon-dark">Phone</h4>
                    <p className="text-salon-muted">(123) 456-7890</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-5 w-5 text-salon-gold mt-1" />
                  <div>
                    <h4 className="font-medium text-salon-dark">Email</h4>
                    <p className="text-salon-muted">info@elitesalon.com</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Button
                  asChild
                  className="bg-salon-gold hover:bg-salon-gold/90 text-white w-full"
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
      </section> */}
    </div>
  );
};

export default Index;
