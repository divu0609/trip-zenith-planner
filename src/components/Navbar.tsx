
import React from "react";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 fixed w-full top-0 left-0 z-50">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl">
        <a href="/" className="flex items-center">
          <span className="text-2xl font-bold text-travel-teal">
            TripZenith
          </span>
        </a>
        <div className="flex items-center lg:order-2">
          <Button variant="outline" className="mr-2 hidden sm:inline-flex">
            Sign In
          </Button>
          <Button className="bg-travel-blue hover:bg-travel-teal">
            Get Started
          </Button>
        </div>
        <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1">
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <a
                href="/"
                className="block py-2 pr-4 pl-3 text-travel-navy hover:text-travel-teal rounded lg:p-0"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#destinations"
                className="block py-2 pr-4 pl-3 text-travel-navy hover:text-travel-teal rounded lg:p-0"
              >
                Destinations
              </a>
            </li>
            <li>
              <a
                href="#planner"
                className="block py-2 pr-4 pl-3 text-travel-navy hover:text-travel-teal rounded lg:p-0"
              >
                Planner
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 pr-4 pl-3 text-travel-navy hover:text-travel-teal rounded lg:p-0"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
