import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileText, Users, Calculator, Heart, Briefcase } from "lucide-react";
import { useLocation } from "wouter";

export default function EstatePlanning() {
  const [, setLocation] = useLocation();
  
  const handleScheduleMeeting = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  const estateServices = [
    {
      icon: Shield,
      title: "Legacy Protection",
      description: "Comprehensive strategies to protect your wealth and ensure it transfers efficiently to your beneficiaries."
    },
    {
      icon: FileText,
      title: "Document Coordination",
      description: "Working with qualified estate planning attorneys to ensure all legal documents align with your financial plan."
    },
    {
      icon: Users,
      title: "Beneficiary Planning",
      description: "Strategic planning for how your assets will be distributed to family members and charitable organizations."
    },
    {
      icon: Calculator,
      title: "Tax Minimization",
      description: "Advanced strategies to minimize estate taxes and maximize the wealth passed to your heirs."
    },
    {
      icon: Heart,
      title: "Charitable Giving",
      description: "Tax-efficient charitable giving strategies that support causes you care about while reducing tax burden."
    },
    {
      icon: Briefcase,
      title: "Trust Strategies",
      description: "Implementation of various trust structures to protect assets and provide for multiple generations."
    }
  ];

  return (
    <div className="min-h-screen animate-page-enter">
      {/* Hero Section */}
      <section className="bg-bennco-beige py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-bennco-navy mb-6">
            Estate Planning
          </h1>
          <p className="text-xl text-warm-gray leading-relaxed">
            Protecting your legacy and ensuring your wealth transfers efficiently to your beneficiaries.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-warm-gray mb-16">
            <p className="text-xl leading-relaxed mb-6">
              Proper estate planning ensures your wealth transfers efficiently to your beneficiaries while minimizing taxes and legal complications. We work closely with qualified estate planning attorneys to help you create comprehensive plans that protect your legacy.
            </p>
            
            <p className="text-xl leading-relaxed mb-6">
              Our estate planning services include beneficiary planning, trust strategies, tax-efficient wealth transfer techniques, and coordination with your existing legal documents to ensure all aspects of your financial plan work together seamlessly.
            </p>

            <p className="text-xl leading-relaxed">
              Estate planning is not just about what happens after you're gone—it's about protecting your family and assets during your lifetime as well. We help you plan for incapacity, long-term care needs, and other contingencies that could affect your financial security.
            </p>
          </div>
        </div>
      </section>

      {/* Estate Planning Services */}
      <section className="py-20 bg-bennco-beige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bennco-navy text-center mb-16">
            Our Estate Planning Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {estateServices.map((service) => (
              <Card key={service.title} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="w-12 h-12 bg-bennco-green rounded-lg flex items-center justify-center mb-4">
                    <service.icon className="text-white h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-bennco-navy mb-3 text-lg">{service.title}</h3>
                  <p className="text-warm-gray text-sm flex-grow">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estate Planning Process */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bennco-navy text-center mb-12">
            Our Estate Planning Process
          </h2>
          
          <div className="space-y-8">
            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">1. Assessment & Goals</h3>
              <p className="text-warm-gray leading-relaxed">
                We begin by understanding your family situation, assets, and goals for wealth transfer. 
                This includes identifying potential estate tax liabilities and planning opportunities.
              </p>
            </div>

            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">2. Strategy Development</h3>
              <p className="text-warm-gray leading-relaxed">
                Based on your unique situation, we develop a comprehensive estate planning strategy 
                that may include wills, trusts, beneficiary designations, and tax-efficient gifting strategies.
              </p>
            </div>

            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">3. Implementation & Coordination</h3>
              <p className="text-warm-gray leading-relaxed">
                We coordinate with your attorney, tax professional, and other advisors to implement 
                your estate plan and ensure all documents and strategies work together effectively.
              </p>
            </div>

            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">4. Ongoing Review</h3>
              <p className="text-warm-gray leading-relaxed">
                Estate planning is not a one-time event. We regularly review your plan to ensure 
                it remains current with changes in your life, tax laws, and family circumstances.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleScheduleMeeting}
              className="bg-bennco-green hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Start Planning Your Legacy
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
