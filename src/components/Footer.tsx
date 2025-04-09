
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-travel-navy text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">TripZenith</h3>
            <p className="text-gray-300 mb-4">
              Your personalized travel companion for creating the perfect
              itinerary based on your interests.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-300 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#destinations" className="text-gray-300 hover:text-white">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#planner" className="text-gray-300 hover:text-white">
                  Trip Planner
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Popular Destinations</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Bali, Indonesia
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Paris, France
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Tokyo, Japan
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  New York, USA
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">📧</span> support@tripzenith.com
              </li>
              <li className="flex items-start">
                <span className="mr-2">📱</span> +1 (555) 123-4567
              </li>
              <li className="flex items-start">
                <span className="mr-2">🏢</span> 123 Travel Street, Adventure
                City, TC 98765
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} TripZenith. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
