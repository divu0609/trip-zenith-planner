
export interface Activity {
  id: string;
  title: string;
  description: string;
  time: string;
  imageUrl?: string;
  location: string;
}

export interface ItineraryDay {
  dayNumber: number;
  activities: Activity[];
}

export interface Itinerary {
  id: string;
  destinationId: string;
  days: ItineraryDay[];
  interests: string[];
}

export const itineraries: Itinerary[] = [
  {
    id: "1",
    destinationId: "1", // Bali
    days: [
      {
        dayNumber: 1,
        activities: [
          {
            id: "1-1-1",
            title: "Uluwatu Temple",
            description: "Visit the stunning cliff-top temple with ocean views",
            time: "10:00 AM - 12:00 PM",
            imageUrl: "https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Uluwatu, Bali"
          },
          {
            id: "1-1-2",
            title: "Lunch at Single Fin",
            description: "Enjoy lunch with panoramic views of Uluwatu surf break",
            time: "12:30 PM - 2:00 PM",
            location: "Uluwatu, Bali"
          },
          {
            id: "1-1-3",
            title: "Relaxation at Padang Padang Beach",
            description: "Swim and relax at this stunning beach",
            time: "2:30 PM - 5:00 PM",
            imageUrl: "https://images.unsplash.com/photo-1577096275185-099579651fb3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Padang Padang, Bali"
          }
        ]
      },
      {
        dayNumber: 2,
        activities: [
          {
            id: "1-2-1",
            title: "Ubud Monkey Forest",
            description: "Visit the sacred sanctuary with hundreds of monkeys",
            time: "9:00 AM - 11:00 AM",
            imageUrl: "https://images.unsplash.com/photo-1584550618372-d95d808a8736?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Ubud, Bali"
          },
          {
            id: "1-2-2",
            title: "Lunch at Locavore",
            description: "Experience fine dining with locally sourced ingredients",
            time: "12:00 PM - 2:00 PM",
            location: "Ubud, Bali"
          },
          {
            id: "1-2-3",
            title: "Tegallalang Rice Terraces",
            description: "Marvel at the stunning stepped rice paddies",
            time: "2:30 PM - 4:30 PM",
            imageUrl: "https://images.unsplash.com/photo-1531342291877-1f8ce30e5c16?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Tegallalang, Bali"
          },
          {
            id: "1-2-4",
            title: "Yoga Class",
            description: "Relax with an evening yoga class",
            time: "5:30 PM - 7:00 PM",
            location: "Ubud, Bali"
          }
        ]
      },
      {
        dayNumber: 3,
        activities: [
          {
            id: "1-3-1",
            title: "Sunrise at Mount Batur",
            description: "Early morning hike to watch the sunrise from this active volcano",
            time: "4:00 AM - 9:00 AM",
            imageUrl: "https://images.unsplash.com/photo-1519638831568-d9897f54ed69?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Mount Batur, Bali"
          },
          {
            id: "1-3-2",
            title: "Hot Springs Visit",
            description: "Relax in natural hot springs after the hike",
            time: "9:30 AM - 11:00 AM",
            location: "Kintamani, Bali"
          },
          {
            id: "1-3-3",
            title: "Traditional Balinese Massage",
            description: "Pamper yourself with a relaxing massage",
            time: "3:00 PM - 4:30 PM",
            location: "Ubud, Bali"
          },
          {
            id: "1-3-4",
            title: "Dinner and Cultural Show",
            description: "Experience traditional Balinese dance while enjoying dinner",
            time: "7:00 PM - 9:00 PM",
            location: "Ubud, Bali"
          }
        ]
      }
    ],
    interests: ["1", "3", "7", "10"] // Beaches, History, Adventure, Relaxation
  },
  {
    id: "2",
    destinationId: "2", // Paris
    days: [
      {
        dayNumber: 1,
        activities: [
          {
            id: "2-1-1",
            title: "Eiffel Tower",
            description: "Visit the iconic symbol of Paris",
            time: "10:00 AM - 12:00 PM",
            imageUrl: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Champ de Mars, Paris"
          },
          {
            id: "2-1-2",
            title: "Lunch at Les Ombres",
            description: "Dine with stunning views of the Eiffel Tower",
            time: "12:30 PM - 2:00 PM",
            location: "Quai Branly, Paris"
          },
          {
            id: "2-1-3",
            title: "Seine River Cruise",
            description: "See Paris from the water on a relaxing boat tour",
            time: "3:00 PM - 4:30 PM",
            imageUrl: "https://images.unsplash.com/photo-1499856871958-5b9357976b82?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Seine River, Paris"
          },
          {
            id: "2-1-4",
            title: "Dinner at Chez Francis",
            description: "Enjoy classic French cuisine with Eiffel Tower views",
            time: "7:30 PM - 9:30 PM",
            location: "Place de l'Alma, Paris"
          }
        ]
      },
      {
        dayNumber: 2,
        activities: [
          {
            id: "2-2-1",
            title: "Louvre Museum",
            description: "Explore one of the world's largest art museums",
            time: "9:00 AM - 1:00 PM",
            imageUrl: "https://images.unsplash.com/photo-1565099824688-e93eb20fe622?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Rue de Rivoli, Paris"
          },
          {
            id: "2-2-2",
            title: "Lunch at Café Marly",
            description: "Dine overlooking the Louvre Pyramid",
            time: "1:30 PM - 2:30 PM",
            location: "Louvre Museum, Paris"
          },
          {
            id: "2-2-3",
            title: "Shopping on Champs-Élysées",
            description: "Stroll down Paris's famous shopping avenue",
            time: "3:00 PM - 6:00 PM",
            imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Champs-Élysées, Paris"
          },
          {
            id: "2-2-4",
            title: "Dinner at L'Avenue",
            description: "Enjoy chic dining at this popular restaurant",
            time: "8:00 PM - 10:00 PM",
            location: "Avenue Montaigne, Paris"
          }
        ]
      },
      {
        dayNumber: 3,
        activities: [
          {
            id: "2-3-1",
            title: "Montmartre and Sacré-Cœur",
            description: "Visit this historic district and its iconic basilica",
            time: "10:00 AM - 12:30 PM",
            imageUrl: "https://images.unsplash.com/photo-1550340499-a6c60fc8287c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Montmartre, Paris"
          },
          {
            id: "2-3-2",
            title: "Lunch at La Maison Rose",
            description: "Dine at this picturesque pink café",
            time: "1:00 PM - 2:30 PM",
            location: "Montmartre, Paris"
          },
          {
            id: "2-3-3",
            title: "Musée d'Orsay",
            description: "Explore impressionist and post-impressionist masterpieces",
            time: "3:30 PM - 5:30 PM",
            imageUrl: "https://images.unsplash.com/photo-1574203069114-1687e1b83276?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            location: "Rue de la Légion d'Honneur, Paris"
          },
          {
            id: "2-3-4",
            title: "Evening at Moulin Rouge",
            description: "Experience a show at the famous cabaret",
            time: "8:00 PM - 10:30 PM",
            location: "Pigalle, Paris"
          }
        ]
      }
    ],
    interests: ["3", "4", "5", "8"] // History, Food, Art, Shopping
  }
];

export const generateItinerary = (destinationId: string, interests: string[], days: number): Itinerary => {
  // For simplicity, we'll just return a predefined itinerary
  // In a real application, this would generate based on the parameters
  
  const existingItinerary = itineraries.find(it => it.destinationId === destinationId);
  
  if (existingItinerary) {
    // Create a copy with the requested number of days
    return {
      ...existingItinerary,
      days: existingItinerary.days.slice(0, days),
      interests: interests
    };
  }
  
  // Default placeholder itinerary
  return {
    id: "generated-" + Date.now(),
    destinationId: destinationId,
    interests: interests,
    days: Array.from({ length: days }, (_, i) => ({
      dayNumber: i + 1,
      activities: [
        {
          id: `gen-${i}-1`,
          title: "Explore the City",
          description: "Take a day to explore the main attractions",
          time: "9:00 AM - 5:00 PM",
          location: "City Center"
        },
        {
          id: `gen-${i}-2`,
          title: "Dinner at Local Restaurant",
          description: "Experience the local cuisine",
          time: "7:00 PM - 9:00 PM",
          location: "Restaurant District"
        }
      ]
    }))
  };
};
