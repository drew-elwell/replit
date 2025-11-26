import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@assets/Annotation+2020-07-01+172007-289w.png";

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateAndScroll = (path: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocation(path);
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
  ];

  const serviceItems = [
    { href: "/investment-management", label: "Investment Management" },
    { href: "/real-estate-exchanges", label: "Real Estate Exchanges" },
    { href: "/retirement-planning", label: "Retirement Planning" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-effect shadow-premium border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div 
              onClick={() => navigateAndScroll("/")}
              className="flex items-center cursor-pointer hover:opacity-80 transition-all duration-300 transform hover:scale-105"
            >
              <img 
                src={logoImage}
                alt="BennCo Advisors Logo"
                className="h-12 w-auto"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <span
                  key={item.href}
                  onClick={() => navigateAndScroll(item.href)}
                  className={`px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer rounded-full relative group ${
                    location === item.href
                      ? "text-bennco-navy bg-bennco-beige"
                      : "text-warm-gray hover:text-bennco-green hover:bg-white/50"
                  }`}
                >
                  {item.label}
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-premium group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                </span>
              ))}
              
              {/* Services Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <span className={`px-4 py-3 text-sm font-semibold transition-all duration-300 cursor-pointer rounded-full relative group flex items-center ${
                    serviceItems.some(service => location === service.href)
                      ? "text-bennco-navy bg-bennco-beige"
                      : "text-warm-gray hover:text-bennco-green hover:bg-white/50"
                  }`}>
                    Services
                    <ChevronDown className="ml-1 h-4 w-4" />
                    <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-premium group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
                  </span>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 glass-effect border border-white/20">
                  {serviceItems.map((service) => (
                    <DropdownMenuItem
                      key={service.href}
                      onClick={() => navigateAndScroll(service.href)}
                      className="cursor-pointer hover:bg-white/10 focus:bg-white/10"
                    >
                      {service.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => navigateAndScroll("/contact")}
              className="bg-gradient-premium hover:shadow-2xl text-white px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >Get in Contact</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-bennco-navy hover:text-bennco-green"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-3 glass-effect border-t border-white/20 animate-fade-in-up">
            {navItems.map((item) => (
              <div key={item.href}>
                <span
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    navigateAndScroll(item.href);
                  }}
                  className={`block px-4 py-3 text-base font-semibold cursor-pointer rounded-xl transition-all duration-300 ${
                    location === item.href
                      ? "text-bennco-navy bg-bennco-beige"
                      : "text-warm-gray hover:text-bennco-green hover:bg-white/50"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            ))}
            
            {/* Services Section */}
            <div className="pt-2">
              <div className="px-4 py-2 text-sm font-medium text-bennco-navy uppercase tracking-wide">
                Services
              </div>
              {serviceItems.map((service) => (
                <div key={service.href} className="ml-4">
                  <span
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigateAndScroll(service.href);
                    }}
                    className={`block px-4 py-3 text-base font-semibold cursor-pointer rounded-xl transition-all duration-300 ${
                      location === service.href
                        ? "text-bennco-navy bg-bennco-beige"
                        : "text-warm-gray hover:text-bennco-green hover:bg-white/50"
                    }`}
                  >
                    {service.label}
                  </span>
                </div>
              ))}
            </div>
            
            <Button
              onClick={() => {
                setIsMobileMenuOpen(false);
                navigateAndScroll("/contact");
              }}
              className="w-full bg-gradient-premium text-white px-4 py-3 rounded-xl text-base font-semibold mt-6 shadow-lg"
            >Get in Contact</Button>
          </div>
        </div>
      )}
    </nav>
  );
}
