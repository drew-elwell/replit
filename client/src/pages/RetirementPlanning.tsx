import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PiggyBank, TrendingUp, Calculator, Shield, Clock, RefreshCw, Building2 } from "lucide-react";
import { useLocation } from "wouter";
import flyFishingImg from "@assets/retirement-fly-fishing-hero.png";

export default function RetirementPlanning() {
  const [, setLocation] = useLocation();
  
  const handleScheduleMeeting = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  const retirementServices = [
    {
      icon: PiggyBank,
      title: "Income Planning",
      description: "Creating sustainable income streams from your retirement savings, Social Security, and other sources."
    },
    {
      icon: TrendingUp,
      title: "Withdrawal Strategies",
      description: "Tax-efficient withdrawal strategies to help maximize the longevity of your retirement savings."
    },
    {
      icon: Calculator,
      title: "Social Security Optimization",
      description: "Analyzing claiming strategies to help maximize your lifetime Social Security benefits."
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Protecting your retirement income from market volatility, inflation, and unexpected expenses."
    },
    {
      icon: Clock,
      title: "Longevity Planning",
      description: "Strategies designed to manage your retirement savings to last throughout your lifetime."
    },
    {
      icon: RefreshCw,
      title: "401(k) Rollovers",
      description: "Seamless rollover services to consolidate and optimize your retirement accounts when changing jobs or retiring."
    },
    {
      icon: Building2,
      title: "401(k) Management",
      description: "Strategic guidance on 401(k) contributions, investment selections, and employer match optimization."
    }
  ];

  return (
    <div className="min-h-screen animate-page-enter">
      {/* Hero Section */}
      <section 
        className="py-20 relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${flyFishingImg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Retirement Planning
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">Comprehensive strategies designed to help you navigate retirement with confidence and purpose.</p>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-warm-gray mb-16">
            <p className="text-xl leading-relaxed mb-6">Retirement planning is our major specialty. Our experience and investment expertise allows us to create investment portfolios that optimize retirement income without invading the principal. We build portfolios that generate income from dividends and interest. You will be living off your income, not capital withdrawals. </p>
            
            <p className="text-xl leading-relaxed mb-6">Our planning process includes detailed cash flow analysis, Social Security optimization, and incorporates tax-efficient withdrawal strategies. We also will integrate your income portfolio with other household financial assets to ensure your retirement years are financially secure.</p>

            <p className="text-xl leading-relaxed mb-6">Included in our services are ongoing portfolio monitoring and performance reviews, to make sure that you stay on target through strategic capital management of your investment portfolio.</p>

            <p className="text-xl leading-relaxed">
              Whether you're decades away from retirement or already enjoying your golden years, we provide the expertise and guidance you need to make the most of this important life stage. Our goal is to help you retire with dignity and financial confidence.
            </p>
          </div>
        </div>
      </section>
      {/* Retirement Planning Services */}
      <section className="py-20 bg-bennco-beige">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bennco-navy text-center mb-16">
            Our Retirement Planning Services
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {retirementServices.map((service) => (
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
      {/* 401K and Rollover Services */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bennco-navy text-center mb-12">
            401(k) Rollovers & Management
          </h2>
          
          <div className="space-y-8">
            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Direct & Indirect Rollovers</h3>
              <p className="text-warm-gray leading-relaxed">Whether you're changing jobs or retiring, we can guide you through the rollover process to consolidate your retirement accounts to help avoid unexpected tax penalties. We help you evaluate alternatives so you can make the choice that fits you best and ensure your funds transfer seamlessly to maintain your retirement savings momentum.</p>
            </div>

            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">401(k) Optimization</h3>
              <p className="text-warm-gray leading-relaxed">
                We can help you maximize your employer's 401(k) benefits through strategic contribution planning, 
                investment selection guidance, and employer match optimization. We help you make 
                the most of this powerful retirement savings tool.
              </p>
            </div>

            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">IRA Conversions</h3>
              <p className="text-warm-gray leading-relaxed">
                Strategic Roth IRA conversions can provide tax-free growth and flexibility in retirement. 
                We analyze your situation to determine optimal conversion timing and amounts to minimize 
                tax impact while maximizing long-term benefits.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Retirement Planning Approach */}
      <section className="py-20 bg-bennco-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bennco-navy text-center mb-12">
            Our Retirement Planning Approach
          </h2>
          
          <div className="space-y-8">
            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Comprehensive Analysis</h3>
              <p className="text-warm-gray leading-relaxed">
                We conduct a thorough analysis of your current financial situation, retirement goals, 
                and potential income sources to create a detailed retirement roadmap tailored to your needs.
              </p>
            </div>

            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Ongoing Adjustments</h3>
              <p className="text-warm-gray leading-relaxed">
                Retirement planning doesn't end when you retire. We continuously monitor your plan 
                and make adjustments as needed to keep you on track for your long-term goals.
              </p>
            </div>

            <div className="bg-bennco-beige p-8 rounded-lg">
              <h3 className="text-xl font-semibold text-bennco-navy mb-4">Peace of Mind</h3>
              <p className="text-warm-gray leading-relaxed">Our goal is to support your confidence and peace of mind by providing a comprehensive approach to retirement planning.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              onClick={handleScheduleMeeting}
              className="bg-bennco-green hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Plan Your Retirement Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
