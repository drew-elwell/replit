import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { X, Calendar, Clock, User } from "lucide-react";

interface AvailabilityFormProps {
  isOpen: boolean;
  onClose: () => void;
  clientEmail: string;
  clientName: string;
}

// Generate time slots with 30-minute intervals from 8:30 AM to 4:30 PM
const generateTimeSlots = () => {
  const times = [];
  for (let hour = 8; hour <= 16; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      // Skip 8:00 AM (start at 8:30 AM)
      if (hour === 8 && minute === 0) continue;
      // Skip times after 4:30 PM
      if (hour === 16 && minute > 30) continue;
      
      const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
      times.push({ value: time12, label: time12 });
    }
  }
  return times;
};

const TIME_SLOTS = generateTimeSlots();

export default function AvailabilityForm({ isOpen, onClose, clientEmail, clientName }: AvailabilityFormProps) {
  const [formData, setFormData] = useState({
    preferredDates: "",
    preferredTimes: "",
    meetingType: "In-person",
    additionalNotes: ""
  });

  const { toast } = useToast();

  const submitAvailabilityMutation = useMutation({
    mutationFn: async (data: typeof formData & { clientEmail: string; clientName: string }) => {
      const response = await apiRequest("POST", "/api/availability", data);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Availability Sent!",
        description: "Marie has received your availability. She will contact you soon to confirm your appointment.",
      });
      onClose();
      setFormData({
        preferredDates: "",
        preferredTimes: "",
        meetingType: "In-person",
        additionalNotes: ""
      });
    },
    onError: (error) => {
      console.error("Error sending availability:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your availability. Please try again or call us directly.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.preferredDates || !formData.preferredTimes) {
      toast({
        title: "Missing Information",
        description: "Please provide your preferred dates and times.",
        variant: "destructive",
      });
      return;
    }

    submitAvailabilityMutation.mutate({
      ...formData,
      clientEmail,
      clientName
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
          <CardTitle className="text-2xl text-center text-bennco-navy flex items-center justify-center gap-2">
            <Calendar className="h-6 w-6" />
            Share Your Availability
          </CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Let us know when you're available and Marie will contact you to schedule your consultation.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Info Display */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <User className="h-4 w-4 text-bennco-green" />
                <span className="font-medium text-gray-700">Contact Information</span>
              </div>
              <p className="text-sm text-gray-600">Name: {clientName}</p>
              <p className="text-sm text-gray-600">Email: {clientEmail}</p>
            </div>

            {/* Preferred Dates */}
            <div>
              <Label htmlFor="preferredDates" className="text-base font-medium">
                Preferred Dates *
              </Label>
              <Textarea
                id="preferredDates"
                value={formData.preferredDates}
                onChange={(e) => handleInputChange("preferredDates", e.target.value)}
                placeholder="Please list your preferred dates (e.g., Monday Jan 15th, Wednesday Jan 17th, Friday Jan 19th)"
                className="mt-1 min-h-[80px]"
                required
              />
            </div>

            {/* Preferred Times */}
            <div>
              <Label htmlFor="preferredTimes" className="text-base font-medium">
                Preferred Times *
              </Label>
              <select
                id="preferredTimes"
                value={formData.preferredTimes}
                onChange={(e) => handleInputChange("preferredTimes", e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bennco-green"
                required
              >
                <option value="">Select your preferred time</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value}>
                    {slot.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Meeting Type */}
            <div>
              <Label htmlFor="meetingType" className="text-base font-medium">
                Meeting Preference
              </Label>
              <select
                id="meetingType"
                value={formData.meetingType}
                onChange={(e) => handleInputChange("meetingType", e.target.value)}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bennco-green"
              >
                <option value="In-person">In-person at our Colorado Springs office</option>
                <option value="Video call">Video call (Zoom/Teams)</option>
                <option value="Phone call">Phone call</option>
                <option value="Either">Either in-person or virtual</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="additionalNotes" className="text-base font-medium">
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                placeholder="Any additional information or special requests..."
                className="mt-1 min-h-[60px]"
              />
            </div>

            {/* Contact Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800">What happens next?</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Marie will review your availability and contact you within 1 business day to confirm your appointment. 
                    If you have scheduling conflicts, you can always call us directly at{" "}
                    <a href="tel:719-577-0099" className="font-medium underline">
                      (719) 577-0099
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={submitAvailabilityMutation.isPending}
              className="w-full bg-bennco-green hover:bg-green-700 text-white py-3 text-lg font-semibold"
            >
              {submitAvailabilityMutation.isPending ? "Sending..." : "Send My Availability"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}