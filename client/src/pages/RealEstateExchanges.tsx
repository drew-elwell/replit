import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Shield, Clock, DollarSign, Building2, FileText } from "lucide-react";
import { useLocation } from "wouter";
import realEstateHeroImg from "@assets/real-estate-1031-hero.png";

export default function RealEstateExchanges() {
  const [, setLocation] = useLocation();
  const handleScheduleMeeting = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  const exchangeServices = [
    {
      icon: Building2,
      title: "1031 Exchange Consultation",
      description: "Expert guidance through the entire like-kind exchange process"
    },
    {
      icon: TrendingUp,
      title: "Property Identification",
      description: "Strategic assistance in identifying replacement properties"
    },
    {
      icon: DollarSign,
      title: "Tax Deferral Strategies",
      description: "Maximizing tax benefits through proper exchange structuring"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Comprehensive analysis of exchange risks and mitigation strategies"
    },
    {
      icon: Clock,
      title: "Timeline Management",
      description: "Ensuring compliance with critical 45-day and 180-day deadlines"
    },
    {
      icon: FileText,
      title: "Documentation Support",
      description: "Complete preparation and review of all required exchange documentation"
    }
  ];

  return (
    <div className="min-h-screen animate-page-enter">
      {/* Hero Section */}
      <section 
        className="py-20 relative bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${realEstateHeroImg})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Real Estate Exchanges & 1031 Services
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Maximize your real estate investment potential by deferring taxes through a 1031 Real Estate Exchange.
          </p>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-warm-gray mb-16">
            <p className="text-xl leading-relaxed mb-6">
              The Delaware Statutory Trust (DST) investment structure provides the opportunity to invest alongside other investors and benefit from:
            </p>

            <ul className="text-lg leading-relaxed mb-8 space-y-3">
              <li>No management responsibilities – just collect your rent payments</li>
              <li>Access to institutional-quality properties—ownership in major properties otherwise out of reach to most through fractional ownership</li>
              <li>Diversification: Investors can divide their investment among multiple properties, property types and geographic regions</li>
              <li>Reduce personal liability—loans are non-recourse to the investor</li>
              <li>Legacy planning—Exchange investments receive a step-up in basis at death, so heirs will not inherit capital gains tax liabilities.</li>
              <li>Low minimum investments, typically $100,000</li>
            </ul>

            <p className="text-xl leading-relaxed mb-6">
              1031 like-kind exchanges offer real estate investors a powerful tool to defer capital gains taxes and depreciation recapture taxes, which can possibly account for 30% of proceeds, while building wealth through strategic property exchanges. Our team can guide you through every step of the exchange process.
            </p>

            <p className="text-xl leading-relaxed mb-6">
              From initial consultation through final closing, we will coach you through all IRS requirements while maximizing the tax and investment benefits of your exchange.
            </p>

            <p className="text-xl leading-relaxed">
              Whether you're looking to upgrade your investment portfolio, diversify geographically, or consolidate multiple properties, we'll help you navigate the complexities of 1031 exchanges to achieve your real estate investment and tax deferral goals.
            </p>
          </div>
        </div>
      </section>
      {/* Real Estate Exchange Services */}
      <section className="py-20 bg-bennco-beige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bennco-navy text-center mb-16">
            Our Real Estate Exchange Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exchangeServices.map((service) => (
              <Card key={service.title} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-premium rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <service.icon className="text-white h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-bennco-navy mb-3">{service.title}</h3>
                  <p className="text-warm-gray leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-bennco-navy to-purple-900 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Explore Your 1031 Exchange Options?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Schedule a consultation to discuss how real estate exchanges can help you build wealth while deferring taxes.
          </p>
          <Button
            onClick={handleScheduleMeeting}
            className="bg-gradient-premium hover:shadow-2xl text-white px-10 py-6 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-premium"
          >
            Schedule Your Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}