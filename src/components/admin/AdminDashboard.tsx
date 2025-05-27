import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface Appointment {
  _id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  selected_salon: string;
  status: 'pending' | 'accepted' | 'rejected';
  created_at: string;
}

export function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, token } = useAuth();

  useEffect(() => {
    fetchAppointments();
  }, [token]);

  const fetchAppointments = async () => {
    if (!token) return;
    
    try {
      const response = await fetch('http://localhost:5000/salon_appointment', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }
      
      const data = await response.json();
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
      toast.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (appointmentId: string, status: 'accepted' | 'rejected') => {
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/salon_appointment/${appointmentId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed to update appointment status');
      }

      toast.success(`Appointment ${status} successfully`);
      // Refresh appointments after update
      fetchAppointments();
    } catch (err) {
      setError('Failed to update appointment status');
      toast.error('Failed to update appointment status');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'accepted':
        return <Badge variant="success">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading appointments...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  const filteredAppointments = user?.role === 'stylist' 
    ? appointments.filter(apt => apt.stylist === user.name)
    : appointments;

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        {user?.role === 'admin' ? 'Admin Dashboard' : 'Stylist Dashboard'} - Appointment Management
      </h1>
      {filteredAppointments.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          No appointments found
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client Name</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment._id}>
                  <TableCell>{appointment.name}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>{format(new Date(appointment.date), 'PPP')}</TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  <TableCell>
                    <div>
                      <div>{appointment.email}</div>
                      <div>{appointment.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    {appointment.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-500 text-white hover:bg-green-600"
                          onClick={() => updateAppointmentStatus(appointment._id, 'accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => updateAppointmentStatus(appointment._id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
} 