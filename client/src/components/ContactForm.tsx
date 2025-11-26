import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { sendEmail, type EmailData } from "@/lib/emailjs";

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    preferredDateTime: "",
    mainFocus: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Try EmailJS first (browser-based email sending)
      const emailData: EmailData = {
        to_email: "marie@bennco.com",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        preferred_datetime: formData.preferredDateTime,
        main_focus: formData.mainFocus
      };

      const emailSent = await sendEmail(emailData);
      
      if (emailSent) {
        console.log("Email sent via EmailJS successfully");
        setIsSubmitted(true);
      } else {
        // Fallback to server-side email
        console.log("EmailJS failed, trying server fallback");
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error("Both email methods failed");
        }
        setIsSubmitted(true);
      }

      // Reset form after success
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          preferredDateTime: "",
          mainFocus: ""
        });
      }, 3000);

    } catch (error) {
      console.error("Error submitting contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 pt-8">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto mt-4">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-bennco-navy">Contact Marie</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-green-700">
                  Thank you for contacting us. Marie will review your message and get back to you soon.
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-base font-medium">
                    Full Name *
                  </Label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bennco-green"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Email Address *
                  </Label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bennco-green"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="text-base font-medium">
                  Phone Number
                </Label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bennco-green"
                />
              </div>

              <div>
                <Label htmlFor="subject" className="text-base font-medium">
                  Subject *
                </Label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bennco-green"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>

              <div>
                <Label htmlFor="preferredDateTime" className="text-base font-medium">
                  Preferred Date and Time *
                </Label>
                <Textarea
                  id="preferredDateTime"
                  value={formData.preferredDateTime}
                  onChange={(e) => handleInputChange("preferredDateTime", e.target.value)}
                  className="mt-1 min-h-[80px]"
                  placeholder="When would you like to meet? (e.g., Next Tuesday afternoon, This Friday at 2 PM, etc.)"
                  required
                />
              </div>

              <div>
                <Label htmlFor="mainFocus" className="text-base font-medium">
                  Main Focus *
                </Label>
                <Textarea
                  id="mainFocus"
                  value={formData.mainFocus}
                  onChange={(e) => handleInputChange("mainFocus", e.target.value)}
                  className="mt-1 min-h-[100px]"
                  placeholder="What is your main focus for this meeting? (e.g., Retirement planning, Investment strategy, Tax planning, etc.)"
                  required
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Email:</strong> marie@bennco.com<br />
                  Your message will be sent directly to Marie, who will respond within 1 business day.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-bennco-green hover:bg-green-700 text-white py-3 text-lg font-semibold"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-6 py-3"
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}