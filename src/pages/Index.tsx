
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DestinationCard from "@/components/DestinationCard";
import SearchForm from "@/components/SearchForm";
import ItineraryDisplay from "@/components/ItineraryDisplay";
import LocalEvents from "@/components/LocalEvents";
import DestinationRecommender from "@/components/DestinationRecommender";
import AttractionsDisplay from "@/components/AttractionsDisplay";
import WeatherDisplay from "@/components/WeatherDisplay";
import { destinations } from "@/data/destinations";
import { interests } from "@/data/interests";
import { generateItinerary, Itinerary } from "@/data/itineraries";
import { calculateTripCosts, TravelCosts, Currency } from "@/utils/costEstimator";

const Index = () => {
  const [selectedDestination, setSelectedDestination] = useState<typeof destinations[0] | null>(null);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [generatedItinerary, setGeneratedItinerary] = useState<Itinerary | null>(null);
  const [showEvents, setShowEvents] = useState(false);
  const [showAttractions, setShowAttractions] = useState(false);
  const [showWeather, setShowWeather] = useState(false);
  const [tripDuration, setTripDuration] = useState(3);
  const [tripCosts, setTripCosts] = useState<TravelCosts | null>(null);
  const [currency, setCurrency] = useState<Currency>('INR');

  const handleDestinationSelect = (destination: typeof destinations[0]) => {
    setSelectedDestination(destination);
    // Scroll to planner section
    const plannerSection = document.getElementById("planner");
    if (plannerSection) {
      plannerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleInterestChange = (interestIds: string[]) => {
    setSelectedInterests(interestIds);
  };

  const handleSearch = (destinationId: string, interestIds: string[], duration: number) => {
    // Find the selected destination to display its name in the itinerary
    const destination = destinations.find(d => d.id === destinationId);
    if (!destination) return;
    
    // Store the trip duration
    setTripDuration(duration);
    
    // Generate the cost estimate
    const costs = calculateTripCosts(destinationId, interestIds, duration, 'mid', currency);
    setTripCosts(costs);
    
    // Generate the itinerary
    const itinerary = generateItinerary(destinationId, interestIds, duration);
    setGeneratedItinerary(itinerary);
    
    // Reset view states
    setShowEvents(false);
    setShowAttractions(false);
    setShowWeather(false);
    
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById("results");
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleViewEvents = () => {
    setShowEvents(true);
    setShowAttractions(false);
    setShowWeather(false);
    // Scroll to events section
    setTimeout(() => {
      const eventsSection = document.getElementById("events");
      if (eventsSection) {
        eventsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleViewAttractions = () => {
    setShowAttractions(true);
    setShowEvents(false);
    setShowWeather(false);
    // Scroll to attractions section
    setTimeout(() => {
      const attractionsSection = document.getElementById("attractions");
      if (attractionsSection) {
        attractionsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleViewWeather = () => {
    setShowWeather(true);
    setShowEvents(false);
    setShowAttractions(false);
    // Scroll to weather section
    setTimeout(() => {
      const weatherSection = document.getElementById("weather");
      if (weatherSection) {
        weatherSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleCurrencyChange = (newCurrency: Currency) => {
    setCurrency(newCurrency);
    
    // Recalculate costs when currency changes
    if (selectedDestination && tripCosts) {
      const costs = calculateTripCosts(
        selectedDestination.id, 
        selectedInterests, 
        tripDuration, 
        'mid',
        newCurrency
      );
      setTripCosts(costs);
    }
  };

  const popularDestinations = destinations.filter(d => d.popular);

  const getDestinationName = () => {
    if (!generatedItinerary) return "";
    return destinations.find(d => d.id === generatedItinerary.destinationId)?.name || "";
  };

  const getDestinationCountry = () => {
    if (!generatedItinerary) return "";
    return destinations.find(d => d.id === generatedItinerary.destinationId)?.country || "";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-gradient pt-28 pb-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Your Perfect Trip
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Create personalized travel itineraries based on your interests and preferences
          </p>
          <Button 
            className="bg-travel-coral hover:bg-travel-teal text-white px-8 py-6 text-lg rounded-full"
            onClick={() => {
              const destinationsSection = document.getElementById("destinations");
              if (destinationsSection) {
                destinationsSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Start Planning
          </Button>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDestinations.slice(0, 4).map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                onClick={handleDestinationSelect}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
              onClick={() => {
                const plannerSection = document.getElementById("planner");
                if (plannerSection) {
                  plannerSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              See All Destinations
            </Button>
          </div>
        </div>
      </section>

      {/* Trip Planner */}
      <section id="planner" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Plan Your Trip
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <SearchForm
                destinations={destinations}
                interests={interests}
                selectedDestination={selectedDestination}
                onSearch={handleSearch}
                onInterestChange={handleInterestChange}
              />
            </div>
            <div className="lg:col-span-2">
              {selectedDestination ? (
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">
                      {selectedDestination.name}, {selectedDestination.country}
                    </h3>
                    <Button
                      variant="link"
                      onClick={() => setSelectedDestination(null)}
                      className="text-travel-blue"
                    >
                      Change Destination
                    </Button>
                  </div>
                  <div className="relative h-64 mb-6 overflow-hidden rounded-lg">
                    <img
                      src={selectedDestination.imageUrl}
                      alt={selectedDestination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-gray-700 mb-4">
                    {selectedDestination.description}
                  </p>
                  <p className="text-gray-700">
                    Select your interests and trip duration on the left to create your personalized itinerary.
                  </p>
                </div>
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-md h-full">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-4">Recommended Destinations</h3>
                    <p className="text-gray-700 mb-6">
                      Select your interests to get personalized destination recommendations.
                    </p>
                  </div>
                  <DestinationRecommender
                    destinations={destinations}
                    interests={selectedInterests}
                    onSelectDestination={handleDestinationSelect}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {generatedItinerary && (
        <section id="results" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ItineraryDisplay 
              itinerary={generatedItinerary} 
              destinationName={getDestinationName()}
              onViewLocalEvents={handleViewEvents}
              travelCosts={tripCosts || undefined}
              duration={tripDuration}
            />
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <Button
                variant="outline"
                className="border-travel-teal text-travel-teal hover:bg-travel-teal hover:text-white"
                onClick={handleViewAttractions}
              >
                View Attractions
              </Button>
              
              <Button
                variant="outline"
                className="border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white"
                onClick={handleViewWeather}
              >
                Check Weather
              </Button>
              
              <Button
                variant="outline"
                className="border-travel-coral text-travel-coral hover:bg-travel-coral hover:text-white"
                onClick={handleViewEvents}
              >
                Local Events
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Weather Section */}
      {showWeather && generatedItinerary && (
        <section id="weather" className="py-16">
          <div className="container mx-auto px-4">
            <WeatherDisplay 
              destinationName={getDestinationName()}
              country={getDestinationCountry()}
            />
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                onClick={() => {
                  setShowWeather(false);
                  const resultsSection = document.getElementById("results");
                  if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Back to Itinerary
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Attractions Section */}
      {showAttractions && generatedItinerary && (
        <section id="attractions" className="py-16">
          <div className="container mx-auto px-4">
            <AttractionsDisplay 
              destinationName={getDestinationName()}
            />
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                onClick={() => {
                  setShowAttractions(false);
                  const resultsSection = document.getElementById("results");
                  if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Back to Itinerary
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {showEvents && generatedItinerary && (
        <section id="events" className="py-16">
          <div className="container mx-auto px-4">
            <LocalEvents 
              destinationName={getDestinationName()}
            />
            <div className="mt-6 text-center">
              <Button
                variant="outline"
                className="border-travel-blue text-travel-blue hover:bg-travel-blue hover:text-white"
                onClick={() => {
                  setShowEvents(false);
                  const resultsSection = document.getElementById("results");
                  if (resultsSection) {
                    resultsSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Back to Itinerary
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About TripZenith</h2>
            <p className="text-lg text-gray-700 mb-8">
              TripZenith is your smart travel companion that helps you plan the perfect trip based on your personal interests and preferences. Say goodbye to generic travel itineraries and hello to personalized adventures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-travel-blue">🔍</div>
                <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
                <p className="text-gray-600">
                  Get recommendations tailored to your unique interests and travel style.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-travel-blue">📅</div>
                <h3 className="text-xl font-bold mb-2">Day-by-Day Planning</h3>
                <p className="text-gray-600">
                  Detailed daily itineraries that maximize your time at each destination.
                </p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-md">
                <div className="text-4xl mb-4 text-travel-blue">🌍</div>
                <h3 className="text-xl font-bold mb-2">Global Destinations</h3>
                <p className="text-gray-600">
                  Explore hundreds of destinations around the world with local insights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
