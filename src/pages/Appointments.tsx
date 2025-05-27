
import AppointmentScheduler from "@/components/AppointmentScheduler";

const Appointments = () => {
  return (
    <div className="bg-salon-light py-16">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Book Your <span className="text-salon-gold">Appointment</span>
          </h1>
          <p className="text-salon-muted">
            Schedule your next visit with our talented stylists and enjoy a 
            personalized salon experience tailored to your unique needs.
          </p>
        </div>
        
        <AppointmentScheduler />
        
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <h2 className="text-2xl font-serif font-bold mb-4 text-salon-dark">
            Appointment Policies
          </h2>
          
          <div className="space-y-4 text-salon-muted">
            <p>
              <span className="font-medium text-salon-dark">Cancellations:</span> We require 24 hours notice for all cancellations to avoid a cancellation fee.
            </p>
            <p>
              <span className="font-medium text-salon-dark">Late Arrivals:</span> If you arrive late, your service may be shortened to accommodate the next client's scheduled appointment.
            </p>
            <p>
              <span className="font-medium text-salon-dark">Deposits:</span> Certain services require a deposit at the time of booking, which will be applied to your service total.
            </p>
            <p>
              <span className="font-medium text-salon-dark">Children:</span> For safety reasons, children should not be left unattended in the salon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
