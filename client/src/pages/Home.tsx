import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ConsultationForm from "@/components/ConsultationForm";
import { 
  ClipboardList, 
  Settings, 
  TrendingUp, 
  RotateCcw, 
  CheckCircle,
  DollarSign,
  University,
  Calendar,
  Award,
  Users
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import pikesPeakImage from "@assets/pexels-joetography-9043542-6438724.jpg";
import Brian from "@assets/Brian.jpg";
import Taylor from "@assets/Taylor.jpg";
import Roland from "@assets/Roland_1753982586022.jpg";
import Drew from "@assets/Drew.jpg";
import Marie from "@assets/Marie.jpg";



export default function Home() {
  const [, setLocation] = useLocation();
  const [isConsultationFormOpen, setIsConsultationFormOpen] = useState(false);

  const navigateAndScroll = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation(path);
  };

  const handleTeamMemberClick = (slug: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation(`/team/${slug}`);
  };

  const processSteps = [
    { icon: ClipboardList, title: "Map", description: "Comprehensive financial planning" },
    { icon: Settings, title: "Execute", description: "Implement your strategy" },
    { icon: TrendingUp, title: "Track", description: "Monitor your progress" },
    { icon: RotateCcw, title: "Refine", description: "Adapt to changes" },
  ];

  const whyBenncoFeatures = [
    {
      icon: CheckCircle,
      title: "Advice in Your Best Interest",
      description: "We are legally bound to act in your best interest"
    },
    {
      icon: CheckCircle,
      title: "Locally Owned",
      description: "Colorado Springs-based with deep community roots"
    },
    {
      icon: CheckCircle,
      title: "Investment Focused Planning",
      description: "Expertise in investment management strategies"
    },
    {
      icon: CheckCircle,
      title: "Fee-Based Advisors",
      description: "Transparent fee structure designed to fit your investment strategy"
    }
  ];
  const services = [
    {
      icon: DollarSign,
      title: "Investment Management",
      description: "Constructing a tailored portfolio",
      href: "/investment-management"
    },
    {
      icon: University,
      title: "1031 Exchanges",
      description: "Real estate exchange strategies",
      href: "/real-estate-exchanges"
    },
    {
      icon: Calendar,
      title: "Retirement Planning",
      description: "Helping secure your financial future",
      href: "/retirement-planning"
    }
  ];

  // Function to get the correct image for each team member
  const getTeamMemberImage = (memberName: string) => {
    switch (memberName) {
      case "Brian Bennett":
        return Brian;
      case "Taylor Willson":
        return Taylor;
      case "Roland Quast":
        return Roland;
      case "Drew Elwell":
        return Drew;
      case "Marie Patti":
        return Marie;
      default:
        return null;
    }
  };

  const teamMembers = [
    {
      name: "Brian Bennett",
      title: "President",
      slug: "brian-bennett",
      image: Brian
    },
    {
      name: "Roland Quast",
      title: "Chief Executive Officer",
      slug: "roland-quast",
      image: Roland
    },
    {
      name: "Taylor Willson",
      title: "Financial Advisor",
      slug: "taylor-wilson",
      image: Taylor
    },
    {
      name: "Marie Patti",
      title: "Client Service Manager",
      slug: "marie-patti",
      image: Marie
    },
    {
      name: "Drew Elwell",
      title: "Intern",
      slug: "drew-elwell",
      image: Drew
    }
  ];

  const handleScheduleMeeting = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  return (
    <div className="min-h-screen animate-page-enter">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <img 
          src={pikesPeakImage}
          alt="Pikes Peak Colorado Springs"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.1) saturate(1.05)'
          }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/60" />
        
        {/* Floating geometric elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-bennco-green/20 rounded-full animate-float" />
        <div className="absolute bottom-32 right-16 w-16 h-16 bg-bennco-purple/20 rounded-lg transform rotate-45 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-bennco-green/30 rounded-full animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-bennco-purple/25 rounded-full animate-float" style={{ animationDelay: '6s' }} />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight text-shadow">
            Your Retirement.<br />
            <span className="bg-gradient-to-r from-white to-green-200 bg-clip-text text-transparent">Our Priority.</span>
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-12 font-light leading-relaxed max-w-4xl mx-auto">
            Helping Colorado families understand and organize their financial options to pursue what they value most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={handleScheduleMeeting}
              className="bg-gradient-premium hover:shadow-2xl text-white px-10 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-premium"
            >First Consultation on Us</Button>
            <Button
              variant="outline"
              onClick={() => navigateAndScroll("/about")}
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/60 hover:bg-white hover:text-bennco-navy px-8 py-6 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      {/* Process Steps */}
      <section className="py-20 bg-gradient-to-br from-bennco-beige to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-10 left-10"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-20 left-32"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-32 left-16"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-16 right-20"></div>
          <div className="w-2 h-2 bg-gray-300 rounded-full absolute top-40 right-32"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-4">Our Process</h2>
            <p className="text-xl text-warm-gray max-w-2xl mx-auto">A systematic approach to help secure your financial future</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={step.title} className="text-center relative group">
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-premium rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium transform group-hover:scale-110 transition-all duration-300">
                    <step.icon className="text-white text-2xl h-10 w-10" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-premium opacity-20 rounded-3xl blur-xl group-hover:opacity-30 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-bold text-bennco-navy mb-3">{step.title}</h3>
                <p className="text-warm-gray leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why BennCo & Services */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Why BennCo Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">Why BennCo?</h2>
                <p className="text-xl text-warm-gray mb-12">Three pillars that set us apart in Colorado Springs</p>
              </div>
              <div className="space-y-8">
                {whyBenncoFeatures.map((feature, index) => (
                  <div key={feature.title} className="flex items-start group">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-gradient-premium rounded-xl flex items-center justify-center mr-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <feature.icon className="text-white h-7 w-7" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-bennco-navy mb-3">{feature.title}</h3>
                      <p className="text-warm-gray leading-relaxed text-lg">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Our Services Column */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold gradient-text mb-6">Our Services</h2>
                <p className="text-xl text-warm-gray mb-12">Comprehensive financial solutions tailored for you</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <Card key={`${service.title}-${index}`} className="border-0 shadow-premium hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 cursor-pointer" onClick={() => setLocation(service.href)}>
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gradient-premium rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                        <service.icon className="text-white h-8 w-8" />
                      </div>
                      <h3 className="text-lg font-bold text-bennco-navy mb-3">{service.title}</h3>
                      <p className="text-warm-gray leading-relaxed">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Meet the Team */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-6xl font-bold gradient-text mb-6">Meet the Team</h2>
            <p className="text-xl text-warm-gray max-w-3xl mx-auto">Colorado Springs professionals dedicated to your financial success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {teamMembers.map((member, index) => (
              <div 
                key={member.name} 
                className="text-center group cursor-pointer"
                onClick={() => handleTeamMemberClick(member.slug)}
              >
                <div className="relative mb-8">
                  <div className="absolute -inset-4 bg-gradient-premium opacity-20 rounded-full blur-xl group-hover:opacity-40 transition-opacity duration-300"></div>
                  {member.image ? (
                    <img 
                      src={member.image}
                      alt={member.name}
                      className={`w-56 h-56 rounded-full mx-auto object-cover shadow-premium relative z-10 transform group-hover:scale-105 transition-all duration-300 ${
                        member.name === "Marie Patti" ? "object-center" : "object-top"
                      }`}
                    />
                  ) : (
                    <div className="w-56 h-56 rounded-full mx-auto bg-gradient-to-br from-bennco-beige to-gray-200 shadow-premium relative z-10 transform group-hover:scale-105 transition-all duration-300 flex items-center justify-center">
                      <Users className="text-gray-400 h-24 w-24" />
                    </div>
                  )}
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-gradient-premium rounded-full flex items-center justify-center shadow-lg">
                    <Award className="text-white h-8 w-8" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-bennco-navy mb-2 group-hover:text-bennco-green transition-colors cursor-pointer">
                  {member.name}
                </h3>
                <p className="text-warm-gray text-lg">{member.title}</p>
                <p className="text-sm text-bennco-green mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to view bio →
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Consultation Form Modal */}
      <ConsultationForm 
        isOpen={isConsultationFormOpen}
        onClose={() => setIsConsultationFormOpen(false)}
      />
    </div>
  );
}
