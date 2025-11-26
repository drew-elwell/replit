import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MapPin, Calendar, Star, CheckCircle } from "lucide-react";
import { useLocation } from "wouter";
import mountainLakeImage from '@assets/mountain-lake-about-hero.png';
import teamPhoto from '@assets/Team.jpg';

export default function About() {
  const [, setLocation] = useLocation();
  
  const handleScheduleMeeting = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  const highlights = [
    { label: "Founded in", value: "1998" },
    { label: "Families Served", value: "100+" },
    { label: "Years Combined Experience", value: "40+" }
  ];

  return (
    <div className="min-h-screen animate-page-enter">
      {/* Hero Section */}
      <section 
        className="relative py-20 lg:py-28 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${mountainLakeImage})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 drop-shadow-lg">
            Meet BennCo
          </h1>
          <p className="text-xl lg:text-2xl text-white leading-relaxed max-w-3xl mx-auto drop-shadow-md">
            Your neighbors in Colorado Springs, dedicated to making retirement planning feel less overwhelming and more achievable.
          </p>
        </div>
      </section>
      {/* Main Story Section - Two Column Layout */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left Column - Story */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-bennco-navy mb-6">Who We Are</h2>
                <p className="text-xl text-warm-gray leading-relaxed mb-6">We embrace the notion that finances are but one important aspect of life, and that wealth is merely a means to achieve life's larger purposes, not an end unto itself. Our mission is to help our clients understand and organize their financial options, and create solutions that free them to pursue the activities of life they value most.</p>
                <p className="text-xl text-warm-gray leading-relaxed">For over 20 years, BennCo Advisors has been a cornerstone of financial guidance in the Colorado Springs community. We understand that every family's financial journey is unique, which is why we take a personalized approach to wealth management and retirement planning.</p>
              </div>

              
            </div>

            {/* Right Column - Team Photo */}
            <div className="space-y-6">
              <div className="aspect-[4/3] rounded-2xl shadow-lg overflow-hidden">
                <img 
                  src={teamPhoto}
                  alt="The BennCo Advisors team in their Colorado Springs office"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-lg italic text-center leading-relaxed">
                The BennCo team in our Colorado Springs office
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Our Approach Section */}
      <section className="py-16 bg-bennco-beige/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-bennco-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-bennco-navy mb-4">Our Approach</h3>
              <p className="text-warm-gray leading-relaxed">
                We start by listening. Every family has unique goals, concerns, and dreams for retirement. Our job is to understand yours, then create a plan that fits your life.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-bennco-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-bennco-navy mb-4">How We Help</h3>
              <p className="text-warm-gray leading-relaxed">As fee-based advisors, we offer fee-based services and commissionable services, depending on your needs. Our goal is to provide transparent, objective guidance—without hidden fees—rooted in your best interest and long-term success.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-bennco-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-bennco-navy mb-4">Local Focus</h3>
              <p className="text-warm-gray leading-relaxed">Colorado Springs isn't just where we work—it's where we live, raise our families, and plan to retire. We understand the local landscape because we're part of it.</p>
            </div>
          </div>
        </div>
      </section>
      {/* What Makes Us Different Section */}
      <section className="py-20 bg-gradient-to-br from-bennco-beige to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-bennco-navy mb-6">What Makes Us Different</h2>
            <p className="text-xl text-warm-gray leading-relaxed">We believe retirement planning should be about more than just numbers—it's about creating the life you've always imagined.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-bennco-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <MapPin className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-bennco-navy mb-4">Community First</h3>
              <p className="text-warm-gray leading-relaxed">
                Supporting local charities, youth sports, and community events throughout Colorado Springs
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-bennco-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-bennco-navy mb-4">Local Specialists</h3>
              <p className="text-warm-gray leading-relaxed">
                Expertise in Colorado-specific retirement planning
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-bennco-green rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Heart className="text-white h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-bennco-navy mb-4">Personal Relationships</h3>
              <p className="text-warm-gray leading-relaxed">We know our clients by more than just their name—we understand their family stories.</p>
            </div>
          </div>

          <div className="text-center">
            <Button
              onClick={handleScheduleMeeting}
              className="bg-gradient-premium hover:shadow-2xl text-white px-10 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-premium"
            >
              Start Your Journey With Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
