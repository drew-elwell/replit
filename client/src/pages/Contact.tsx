import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [showContactForm, setShowContactForm] = useState(false);
  
  const handleGetInContact = () => {
    setShowContactForm(true);
    // Scroll to top of page when opening contact form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectSchedule = () => {
    window.open("https://calendly.com/drew-bennco", "_blank");
  };

  return (
    <div className="min-h-screen animate-page-enter">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-bennco-navy mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Ready to take the next step in your financial journey? We're here to help.
          </p>
        </div>
      </section>
      {/* Contact Information & Map */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-gray-600 text-xl mr-4 mt-1 h-5 w-5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                    <p className="text-gray-600">
                      731 N. Tejon St.<br />
                      Colorado Springs, CO 80903
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-gray-600 text-xl mr-4 mt-1 h-5 w-5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                    <p className="text-gray-600">(719) 577-0099</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-gray-600 text-xl mr-4 mt-1 h-5 w-5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-gray-600 text-xl mr-4 mt-1 h-5 w-5" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <div className="space-y-1 text-gray-600">
                      <p>marie@bennco.com</p>
                      <p>taylor@bennco.com</p>
                      <p>roland@bennco.com</p>
                      <p>brian@bennco.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 space-y-3">
                <Button
                  onClick={handleGetInContact}
                  className="bg-bennco-green hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors text-[20px]"
                >
                  Get In Contact
                </Button>
                
                <p className="text-sm text-gray-600">
                  Or call us directly at (719) 577-0099
                </p>
              </div>

              {/* What to Expect Section */}
              <div className="mt-12">
                <h3 className="font-semibold text-gray-800 mb-4">What to Expect</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Initial consultation is always complimentary</li>
                  <li>• We'll discuss your financial goals and current situation</li>
                  <li>• No obligation or pressure to become a client</li>
                  <li>• Clear explanation of our services and fee structure</li>
                </ul>
              </div>
            </div>
            
            {/* Map Integration */}
            <div className="relative">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Visit Our Office</h2>
              
              {/* Google Maps Embed */}
              <div className="relative rounded-lg overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.1234567890!2d-104.8196!3d38.8397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s731%20N%20Tejon%20St%2C%20Colorado%20Springs%2C%20CO%2080903!5e0!3m2!1sen!2sus!4v1644332143043!5m2!1sen!2sus"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="BennCo Advisors Location - Colorado Springs, CO"
                  className="w-full h-96"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Enhanced Call to Action */}
      <section className="py-24 bg-gradient-to-br from-bennco-navy to-gray-800 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 translate-x-full animate-pulse"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Main Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your 
            <span className="text-bennco-green"> Financial Future?</span>
          </h2>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">We’ve had the privilege of helping hundreds of clients navigate their financial lives. Your complimentary consultation is just one click away.</p>

          {/* Trust Indicators */}
          <div className="flex justify-center items-center space-x-8 mb-10 text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-bennco-green rounded-full"></div>
              <span className="text-sm">No Cost Consultation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-bennco-green rounded-full"></div>
              <span className="text-sm">49+ Years Experience</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-bennco-green rounded-full"></div>
              <span className="text-sm">Personalized Approach</span>
            </div>
          </div>

          {/* Large CTA Button */}
          <div className="space-y-6">
            <Button
              onClick={handleGetInContact}
              className="bg-bennco-green hover:bg-green-600 text-white px-16 py-6 rounded-xl text-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-green-500/25"
            >
              Get Your Free Consultation Today
            </Button>
            
            <p className="text-gray-300 text-lg">
              Takes less than 3 minutes to get started
            </p>
          </div>

          {/* Secondary Contact Options */}
          <div className="mt-12 pt-8 border-t border-gray-600">
            <p className="text-gray-300 mb-4 text-lg">
              Prefer to speak with us directly?
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <a 
                href="tel:719-577-0099" 
                className="flex items-center space-x-2 text-bennco-green hover:text-green-400 transition-colors text-xl font-semibold"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>(719) 577-0099</span>
              </a>
              <div className="text-gray-400">
                Available Monday - Friday, 9 AM - 5 PM MT
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Message Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-8 z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 m-4 max-w-md w-full mt-4 max-h-[85vh] overflow-y-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-bennco-navy mb-6">Contact Marie</h2>
              
              <div className="space-y-4 text-left">
                <p className="text-gray-700">
                  Please contact Marie directly at:
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <a 
                    href="mailto:marie@bennco.com" 
                    className="text-bennco-green hover:text-green-700 font-semibold text-lg"
                  >
                    marie@bennco.com
                  </a>
                </div>
                
                <p className="text-gray-700">
                  Please let her know:
                </p>
                
                <ul className="list-disc list-inside space-y-2 text-gray-700 bg-gray-50 p-4 rounded-lg">
                  <li>What date and time works best for you</li>
                  <li>What the main focus of the meeting will be</li>
                </ul>
                
                <div className="pt-4">
                  <button
                    onClick={() => setShowContactForm(false)}
                    className="w-full bg-bennco-navy hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
