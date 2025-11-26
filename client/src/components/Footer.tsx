import { Link } from "wouter";
import { Facebook, Linkedin } from "lucide-react";
import logoImage from "@assets/Annotation+2020-07-01+172007-289w.png";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-bennco-navy to-gray-900 text-white py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="w-40 h-40 bg-bennco-green rounded-full absolute top-10 right-20 animate-float"></div>
        <div className="w-24 h-24 bg-white rounded-full absolute bottom-20 left-20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-6">
              <img 
                src={logoImage}
                alt="BennCo Advisors Logo"
                className="h-16 w-auto mr-4 bg-white rounded-lg p-2"
              />
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed text-xl font-medium">
              We embrace the notion that finances are but one important aspect of life, and that wealth is merely a means to achieve life's larger purposes, not an end unto itself.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-bennco-green transition-all duration-300 transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-2xl font-bold mb-8 text-gray-400">Quick Links</h4>
            <ul className="space-y-5 text-gray-400">
              <li>
                <Link href="/about">
                  <span className="hover:text-bennco-green transition-colors cursor-pointer text-xl font-semibold hover:translate-x-2 transform duration-300 inline-block">About</span>
                </Link>
              </li>
              <li>
                <Link href="/investment-management">
                  <span className="hover:text-bennco-green transition-colors cursor-pointer text-xl font-semibold hover:translate-x-2 transform duration-300 inline-block">Investment Management</span>
                </Link>
              </li>
              <li>
                <Link href="/real-estate-exchanges">
                  <span className="hover:text-bennco-green transition-colors cursor-pointer text-xl font-semibold hover:translate-x-2 transform duration-300 inline-block">Real Estate Exchanges</span>
                </Link>
              </li>
              <li>
                <Link href="/retirement-planning">
                  <span className="hover:text-bennco-green transition-colors cursor-pointer text-xl font-semibold hover:translate-x-2 transform duration-300 inline-block">Retirement Planning</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-2xl font-bold mb-8 text-gray-400">Contact</h4>
            <div className="space-y-4 text-gray-400">
              <p className="text-xl font-semibold">731 N. Tejon St.</p>
              <p className="text-xl font-medium">Colorado Springs, CO 80903</p>
              <p className="text-xl font-semibold text-bennco-green">(719) 577-0099</p>
              <div className="space-y-2">
                <p className="text-xl font-semibold text-bennco-green">taylor@bennco.com</p>
                <p className="text-xl font-semibold text-bennco-green">roland@bennco.com</p>
                <p className="text-xl font-semibold text-bennco-green">brian@bennco.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-16 pt-12">
          <div className="max-w-6xl mx-auto">
            {/* Securities Disclosure */}
            <div className="mb-8 text-sm text-gray-400 leading-relaxed space-y-4">
              <p>
                Securities and Advisory Services offered through The Strategic Financial Alliance, Inc., member FINRA/SIPC (678-954-4000). Brian Bennett is a registered representative and investment adviser representative of SFA. Financial planning and consulting services offered through BennCo Advisors, which is otherwise unaffiliated with SFA. Supervisory office (678) 954-4000.
              </p>
              <p>
                Business may only be transacted in a state if first registered. Individualized responses to persons in a state that involve transactions in securities or personalized investment advice for compensation, will not be made absent compliance with state registration requirements or applicable exemption.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <a 
                  href="https://thesfa.net/disclosures/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-bennco-green hover:text-white transition-colors underline"
                >
                  Visit The Strategic Financial Alliance, Inc. for additional disclosures.
                </a>
                <a 
                  href="https://brokercheck.finra.org/individual/summary/4450921" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-bennco-green hover:text-white transition-colors underline"
                >
                  Check the background of this investment professional on FINRA BrokerCheck.
                </a>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="text-center border-t border-white/10 pt-8">
              <p className="text-lg text-gray-400">
                &copy; 2024 BennCo Advisors. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
