import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { toast } from "sonner";

interface Appointment {
  _id: string;
  userId: string;
  stylistId: string;
  stylistName: string;
  date: string;
  time: string;
  service: string;
  status: string;
}

const UserDashboard = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/salon_appointment`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        } else {
          toast.error("Failed to fetch appointments");
        }
      } catch (error) {
        toast.error("Error fetching appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [token]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500";
      case "confirmed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>
      {appointments.length === 0 ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">No appointments found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {appointments.map((appointment) => (
            <Card key={appointment._id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{appointment.service}</span>
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Stylist:</span>{" "}
                    {appointment.stylistName}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {format(new Date(appointment.date), "MMMM d, yyyy")}
                  </p>
                  <p>
                    <span className="font-semibold">Time:</span>{" "}
                    {appointment.time}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserDashboard; 