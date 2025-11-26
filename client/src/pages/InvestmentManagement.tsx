import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import coinStacksImg from "@assets/coin-stacks-final.png";

export default function InvestmentManagement() {
  const [, setLocation] = useLocation();
  const handleScheduleMeeting = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation("/contact");
  };

  return (
    <div className="min-h-screen animate-page-enter">
      {/* Hero Section */}
      <section 
        className="py-20 relative bg-cover bg-no-repeat"
        style={{ 
          backgroundImage: `url(${coinStacksImg})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Investment Management
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Time-tested investment strategies designed to protect and grow your retirement wealth.
          </p>
        </div>
      </section>
      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg mx-auto text-warm-gray mb-16">
            <p className="text-xl leading-relaxed mb-6">
              At BennCo Advisors, we believe the best way for our clients to achieve their long-term financial goals is through time-honored, proven, and basic principles of investing: asset allocation, diversification, quality, and patience.
            </p>
            
            <p className="text-xl leading-relaxed mb-6">
              Our investment philosophy centers on strategies that have been proven to work over long time periods. We focus on broad diversification, low costs, and disciplined rebalancing to help you achieve your retirement goals.
            </p>

            <p className="text-xl leading-relaxed">
              Unlike many investment advisors who rely on "one size fits all" investment models, we believe in building a custom investment approach matching your goals, investment needs, and risk profile.
            </p>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-20 bg-bennco-beige">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-bennco-navy text-center mb-12">
            Our Investment Management Services Include
          </h2>

          <div className="space-y-8">
            {/* Portfolio Construction */}
            <div>
              <h3 className="text-2xl font-bold text-bennco-navy mb-4">Portfolio Construction</h3>
              <p className="text-xl text-warm-gray leading-relaxed">Portfolios are diversified across asset classes, industries, and internationally. Focus is on meeting retirement income needs, followed by capital growth opportunities.</p>
            </div>

            {/* Risk Management */}
            <div>
              <h3 className="text-2xl font-bold text-bennco-navy mb-4">Risk Management</h3>
              <p className="text-xl text-warm-gray leading-relaxed">
                Diversification, strategic asset allocation, and portfolio supervision to balance long-term returns while minimizing downside risk.
              </p>
            </div>

            {/* Cost Efficiency */}
            <div>
              <h3 className="text-2xl font-bold text-bennco-navy mb-4">Cost Efficiency</h3>
              <p className="text-xl text-warm-gray leading-relaxed">We focus on building cost-effective portfolios designed to meet your needs.</p>
            </div>

            {/* Regular Rebalancing */}
            <div>
              <h3 className="text-2xl font-bold text-bennco-navy mb-4">Regular Rebalancing</h3>
              <p className="text-xl text-warm-gray leading-relaxed">
                Tactical rebalancing with attention to target allocations while optimizing market opportunities.
              </p>
            </div>

            {/* Active Monitoring */}
            <div>
              <h3 className="text-2xl font-bold text-bennco-navy mb-4">Active Monitoring</h3>
              <p className="text-xl text-warm-gray leading-relaxed">
                Ongoing monitoring and interactive portfolio review meetings allowing us to adjust investments based on changing market conditions and your evolving needs.
              </p>
            </div>

            {/* Tax Optimization */}
            <div>
              <h3 className="text-2xl font-bold text-bennco-navy mb-4">Tax Optimization</h3>
              <p className="text-xl text-warm-gray leading-relaxed">
                Tax-efficient investment strategies to minimize the impact of taxes on your portfolio. If taxes are a concern, we will structure portfolios that optimize after-tax performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Disclaimer */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Investment Disclosure</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Asset allocation alone cannot eliminate the risk of fluctuating prices and uncertain returns. There is no guarantee that a diversified portfolio will outperform a non-diversified portfolio in any given market environment. No investment strategy, such as asset allocation, can guarantee a profit or protect against loss in periods of declining values.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-bennco-beige text-center">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-bennco-navy mb-6">
            Ready to Build Your Investment Strategy?
          </h2>
          <p className="text-xl text-gray-700 mb-8">
            Schedule a consultation to discuss how our evidence-based approach can help you achieve your financial goals.
          </p>
          <Button
            onClick={handleScheduleMeeting}
            className="bg-bennco-green hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg font-semibold"
          >
            Schedule Your Consultation
          </Button>
        </div>
      </section>
    </div>
  );
}