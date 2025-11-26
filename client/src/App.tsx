import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import Home from "@/pages/Home";
import About from "@/pages/About";
import InvestmentManagement from "@/pages/InvestmentManagement";
import EstatePlanning from "@/pages/EstatePlanning";
import RetirementPlanning from "@/pages/RetirementPlanning";
import RealEstateExchanges from "@/pages/RealEstateExchanges";
import Contact from "@/pages/Contact";
import Admin from "@/pages/Admin";
import Questionnaire from "@/pages/Questionnaire";
import Sitemap from "@/pages/Sitemap";
import TeamBio from "@/pages/TeamBio";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <ErrorBoundary>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/investment-management" component={InvestmentManagement} />
            <Route path="/estate-planning" component={EstatePlanning} />
            <Route path="/retirement-planning" component={RetirementPlanning} />
            <Route path="/real-estate-exchanges" component={RealEstateExchanges} />
            <Route path="/contact" component={Contact} />
            <Route path="/admin-secure-access-panel" component={Admin} />
            <Route path="/questionnaire" component={Questionnaire} />
            <Route path="/sitemap" component={Sitemap} />
            <Route path="/team/:member" component={TeamBio} />
            <Route component={NotFound} />
          </Switch>
        </ErrorBoundary>
      </main>
      <Footer />
      <StickyMobileCTA />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
