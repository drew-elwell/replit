import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Calendar, Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export default function StickyMobileCTA() {
  const [location, setLocation] = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useIsMobile();

  // Show CTA after user scrolls down a bit
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleQuickConsultation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  const handleCallNow = () => {
    window.location.href = "tel:719-577-0099";
  };

  // Don't show on contact, questionnaire, or admin pages
  const hiddenPages = ['/contact', '/questionnaire', '/admin'];
  if (hiddenPages.includes(location) || !isMobile || !isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex gap-2">
      <Button
        onClick={handleQuickConsultation}
        className="flex-1 bg-bennco-green hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-lg"
      >
        <Calendar className="w-4 h-4 mr-2" />
        Schedule
      </Button>
      <Button
        onClick={handleCallNow}
        variant="outline"
        className="bg-white border-2 border-bennco-green text-bennco-green hover:bg-bennco-green hover:text-white font-semibold py-3 px-4 rounded-lg shadow-lg"
      >
        <Phone className="w-4 h-4" />
      </Button>
    </div>
  );
}