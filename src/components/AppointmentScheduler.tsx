import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { toast } from "sonner";
import Map from "./Map";
import { useAuth } from "@/contexts/AuthContext";

const API_BASE_URL = 'https://salon-appointment-1.onrender.com';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Please enter a valid phone number."),
  service: z.string().min(1, "Please select a service"),
  stylist: z.string().min(1, "Please select a stylist"),
  date: z.string().optional(),
  time: z.string().optional(),
  selected_salon: z.string().optional(),
  notes: z.string().optional(),
});

interface Stylist {
  _id: string;
  name: string;
  email: string;
}

const AppointmentScheduler = () => {
  const { user, token } = useAuth();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState<string | undefined>();
  const [showMap, setShowMap] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<string | null>(null);
  const [stylists, setStylists] = useState<Stylist[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", notes: "", selected_salon: "" },
  });

  useEffect(() => {
    // Pre-fill form with user data if logged in
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  useEffect(() => {
    // Fetch stylists from backend
    const fetchStylists = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/stylists`);
        if (!response.ok) throw new Error('Failed to fetch stylists');
        const data = await response.json();
        setStylists(data);
      } catch (error) {
        console.error('Error fetching stylists:', error);
        toast.error('Failed to load stylists');
      }
    };

    fetchStylists();
  }, []);

  const services = [
    // Haircuts & Styling
    { id: "womens-haircut", name: "Women's Haircut & Style", price: "$45+" },
    { id: "mens-haircut", name: "Men's Haircut & Style", price: "$35+" },
    { id: "childrens-haircut", name: "Children's Haircut (12 & under)", price: "$25+" },
    { id: "shampoo-blowout", name: "Shampoo & Blowout", price: "$35+" },
    { id: "special-occasion", name: "Special Occasion Style", price: "$95+" },
    { id: "bridal-trial", name: "Bridal Hair Trial", price: "$85+" },

    // Hair Color Services
    { id: "single-process", name: "Single Process Color", price: "$85+" },
    { id: "double-process", name: "Double Process Color", price: "$125+" },
    { id: "partial-highlights", name: "Partial Highlights", price: "$95+" },
    { id: "full-highlights", name: "Full Highlights", price: "$120+" },
    { id: "balayage", name: "Balayage", price: "$140+" },
    { id: "ombre", name: "Ombré", price: "$130+" },
    { id: "color-correction", name: "Color Correction", price: "Consultation Required" },

    // Hair Treatments
    { id: "deep-conditioning", name: "Deep Conditioning Treatment", price: "$35+" },
    { id: "keratin-smoothing", name: "Keratin Smoothing Treatment", price: "$250+" },
    { id: "scalp-treatment", name: "Scalp Treatment", price: "$45+" },
    { id: "hair-scalp-mask", name: "Hair & Scalp Mask", price: "$55+" },
    { id: "olaplex", name: "Olaplex Treatment", price: "$65+" },

    // Hair Extensions
    { id: "tape-in-full", name: "Tape-In Extensions (Full)", price: "$450+" },
    { id: "tape-in-partial", name: "Tape-In Extensions (Partial)", price: "$300+" },
    { id: "extension-removal", name: "Extension Removal", price: "$75+" },
    { id: "extension-maintenance", name: "Extension Maintenance", price: "$100+" },

    // Texturizing Services
    { id: "permanent-wave", name: "Permanent Wave", price: "$95+" },
    { id: "relaxer", name: "Relaxer", price: "$85+" },
    { id: "brazilian-blowout", name: "Brazilian Blowout", price: "$275+" },
    { id: "perm-rod-set", name: "Perm Rod Set", price: "$95+" },

    // Additional Services
    { id: "bang-trim", name: "Bang Trim", price: "$15" },
    { id: "neck-trim", name: "Neck Trim", price: "$10" },
    { id: "beard-trim", name: "Beard Trim & Shape", price: "$20+" },
    { id: "makeup-application", name: "Makeup Application", price: "$75+" },
    { id: "makeup-lesson", name: "Makeup Lesson", price: "$95+" }
  ];

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM"];

  const salonLocations = [
    "Downtown Salon",
    "Uptown Studio",
    "West End Beauty",
    "East Side Style",
  ];

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!date || !time || !selectedSalon) {
      toast.error("Please select a date, time, and salon location for your appointment.");
      return;
    }

    setLoading(true);

    const appointmentData = {
      ...values,
      date: format(date, "yyyy-MM-dd"),
      time,
      selected_salon: selectedSalon,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/salon_appointment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(appointmentData),
      });

      if (!response.ok) {
        throw new Error("Failed to schedule appointment");
      }

      toast.success("Appointment scheduled successfully!", {
        description: `Your appointment is booked for ${format(date, "MMMM d, yyyy")} at ${time}`,
      });
      form.reset();
      setDate(new Date());
      setTime(undefined);
      setSelectedSalon(null);
    } catch (error) {
      console.error("Error scheduling appointment:", error);
      toast.error("Failed to schedule appointment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSalonSelect = (salonName: string) => {
    setSelectedSalon(salonName);
    form.setValue("selected_salon", salonName);
    setShowMap(false);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-serif">Book Your Appointment</CardTitle>
        <CardDescription>Select your preferred date, time, and service.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="Your email" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl><Input placeholder="Your phone number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="service" render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="_choose" disabled>Choose a service...</SelectItem>
                    
                    {/* Haircuts & Styling */}
                    <SelectItem value="_haircuts" disabled className="font-bold text-primary border-t">
                      --- Haircuts & Styling ---
                    </SelectItem>
                    {services.slice(0, 6).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} ({service.price})
                      </SelectItem>
                    ))}

                    {/* Hair Color Services */}
                    <SelectItem value="_color" disabled className="font-bold text-primary border-t">
                      --- Hair Color Services ---
                    </SelectItem>
                    {services.slice(6, 13).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} ({service.price})
                      </SelectItem>
                    ))}

                    {/* Hair Treatments */}
                    <SelectItem value="_treatments" disabled className="font-bold text-primary border-t">
                      --- Hair Treatments ---
                    </SelectItem>
                    {services.slice(13, 18).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} ({service.price})
                      </SelectItem>
                    ))}

                    {/* Hair Extensions */}
                    <SelectItem value="_extensions" disabled className="font-bold text-primary border-t">
                      --- Hair Extensions ---
                    </SelectItem>
                    {services.slice(18, 22).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} ({service.price})
                      </SelectItem>
                    ))}

                    {/* Texturizing Services */}
                    <SelectItem value="_texturizing" disabled className="font-bold text-primary border-t">
                      --- Texturizing Services ---
                    </SelectItem>
                    {services.slice(22, 26).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} ({service.price})
                      </SelectItem>
                    ))}

                    {/* Additional Services */}
                    <SelectItem value="_additional" disabled className="font-bold text-primary border-t">
                      --- Additional Services ---
                    </SelectItem>
                    {services.slice(26).map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        {service.name} ({service.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="stylist" render={({ field }) => (
              <FormItem>
                <FormLabel>Stylist</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a stylist" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {stylists.map((stylist) => (
                      <SelectItem key={stylist._id} value={stylist.name}>
                        {stylist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <div className="space-y-4">
              <div>
                <h3 className="mb-2 font-medium">Select Date</h3>
                <Calendar 
                  mode="single" 
                  selected={date} 
                  onSelect={(newDate) => {
                    setDate(newDate || new Date());
                    form.setValue("date", newDate ? format(newDate, "yyyy-MM-dd") : "");
                  }}
                  disabled={(date) => date < new Date()} // Disable past dates
                  className="rounded-md border"
                />
              </div>

              <div>
                <h3 className="mb-2 font-medium">Select Time</h3>
                <Select 
                  onValueChange={(newTime) => {
                    setTime(newTime);
                    form.setValue("time", newTime);
                  }} 
                  value={time}
                >
                  <SelectTrigger><SelectValue placeholder="Select available time" /></SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {date && time && (
                <p className="text-sm text-muted-foreground">
                  Selected: {format(date, "MMMM d, yyyy")} at {time}
                </p>
              )}
            </div>

            <FormField control={form.control} name="notes" render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Any special requests or notes for your appointment" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <div className="space-x-4">
              <Button type="button" onClick={() => setShowMap(true)}>
                {selectedSalon ? `Selected: ${selectedSalon}` : "Select Location"}
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Scheduling..." : "Book Appointment"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p>You'll receive a confirmation email once your appointment is confirmed.</p>
      </CardFooter>

      {showMap && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <h2 className="text-xl font-bold mb-4">Select Location</h2>
            <Map onSelect={handleSalonSelect} />
            <Button className="mt-4" onClick={() => setShowMap(false)}>Close</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default AppointmentScheduler;