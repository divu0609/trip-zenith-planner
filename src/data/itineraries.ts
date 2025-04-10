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
  // First check if we have a predefined itinerary
  const existingItinerary = itineraries.find(it => it.destinationId === destinationId);
  
  if (existingItinerary) {
    // Create a personalized copy with the requested number of days
    // If multiple days exist in the original, filter activities based on interests
    const personalizedDays = existingItinerary.days.slice(0, days).map(day => {
      // If the user has selected interests, prioritize activities that match those interests
      if (interests.length > 0) {
        // For demo purposes, we're simulating interest-based filtering
        // In a real app, each activity would have associated interest tags
        // We'll use the day number and interest IDs to simulate different activity sets
        
        // This is a simple simulation logic: 
        // - Keep all morning activities as they are usually "must-see" attractions
        // - For afternoon and evening activities, adjust them based on interests
        const morningActivities = day.activities.filter(a => 
          a.time.includes("AM") || a.time.startsWith("12"));
        
        // Activities that might be filtered or adjusted
        const otherActivities = day.activities.filter(a => 
          !a.time.includes("AM") || a.time.startsWith("12"));
        
        // For simplicity, we keep the original activities for the demo
        // But we would filter or change them based on interests in a real app
        return {
          ...day,
          // Add a note about personalization based on interests
          activities: [
            ...morningActivities,
            ...otherActivities
          ]
        };
      }
      
      return day;
    });
    
    return {
      id: "personalized-" + Date.now(),
      destinationId: destinationId,
      days: personalizedDays,
      interests: interests
    };
  }
  
  // Generate a new itinerary if no existing one is found
  return {
    id: "generated-" + Date.now(),
    destinationId: destinationId,
    interests: interests,
    days: Array.from({ length: days }, (_, i) => ({
      dayNumber: i + 1,
      activities: generateActivitiesBasedOnInterests(destinationId, interests, i + 1)
    }))
  };
};

// Helper function to generate activities based on interests
function generateActivitiesBasedOnInterests(destinationId: string, interests: string[], dayNumber: number): Activity[] {
  // Default activities if no interests are selected
  const defaultActivities = [
    {
      id: `gen-${dayNumber}-1`,
      title: "Explore the City",
      description: "Take a day to explore the main attractions",
      time: "9:00 AM - 12:00 PM",
      location: "City Center"
    },
    {
      id: `gen-${dayNumber}-2`,
      title: "Lunch at Local Restaurant",
      description: "Experience the local cuisine",
      time: "12:30 PM - 2:00 PM",
      location: "Restaurant District"
    },
    {
      id: `gen-${dayNumber}-3`,
      title: "Afternoon Sightseeing",
      description: "Visit the most iconic landmarks",
      time: "2:30 PM - 5:30 PM",
      location: "Various Locations"
    },
    {
      id: `gen-${dayNumber}-4`,
      title: "Dinner and Evening Relaxation",
      description: "Enjoy the local nightlife and cuisine",
      time: "7:00 PM - 9:00 PM",
      location: "Downtown"
    }
  ];

  // If no interests are selected, return default activities
  if (interests.length === 0) {
    return defaultActivities;
  }

  // Simulate personalized activities based on interests
  // This is a simplified approach; in a real app, each activity would have interest tags
  const activities: Activity[] = [];

  // Morning activity based on first interest
  if (interests.includes("3")) { // History
    activities.push({
      id: `gen-${dayNumber}-1`,
      title: "Historical Landmarks Tour",
      description: "Explore the rich history through significant landmarks",
      time: "9:00 AM - 12:00 PM",
      location: "Historical District"
    });
  } else if (interests.includes("5")) { // Art
    activities.push({
      id: `gen-${dayNumber}-1`,
      title: "Museum and Gallery Visit",
      description: "Immerse yourself in local art and culture",
      time: "9:00 AM - 12:00 PM",
      location: "Arts District"
    });
  } else if (interests.includes("1")) { // Beaches
    activities.push({
      id: `gen-${dayNumber}-1`,
      title: "Morning Beach Time",
      description: "Relax and enjoy the beautiful beaches",
      time: "9:00 AM - 12:00 PM",
      location: "Local Beach"
    });
  } else {
    activities.push(defaultActivities[0]);
  }
  
  // Lunch activity - food interest takes priority
  if (interests.includes("4")) { // Food
    activities.push({
      id: `gen-${dayNumber}-2`,
      title: "Culinary Experience",
      description: "Taste the local specialties at a renowned restaurant",
      time: "12:30 PM - 2:00 PM",
      location: "Culinary District"
    });
  } else {
    activities.push(defaultActivities[1]);
  }
  
  // Afternoon activity - vary based on interests
  if (interests.includes("7")) { // Adventure
    activities.push({
      id: `gen-${dayNumber}-3`,
      title: "Adventure Activity",
      description: "Engage in an exciting outdoor adventure",
      time: "2:30 PM - 5:30 PM",
      location: "Adventure Zone"
    });
  } else if (interests.includes("8")) { // Shopping
    activities.push({
      id: `gen-${dayNumber}-3`,
      title: "Shopping Experience",
      description: "Explore local markets and shopping districts",
      time: "2:30 PM - 5:30 PM",
      location: "Shopping District"
    });
  } else if (interests.includes("9")) { // Wildlife
    activities.push({
      id: `gen-${dayNumber}-3`,
      title: "Wildlife Tour",
      description: "Observe local wildlife in their natural habitat",
      time: "2:30 PM - 5:30 PM",
      location: "Nature Reserve"
    });
  } else {
    activities.push(defaultActivities[2]);
  }
  
  // Evening activity
  if (interests.includes("6")) { // Nightlife
    activities.push({
      id: `gen-${dayNumber}-4`,
      title: "Nightlife Experience",
      description: "Enjoy the vibrant nightlife scene",
      time: "7:00 PM - 10:00 PM",
      location: "Entertainment District"
    });
  } else if (interests.includes("10")) { // Relaxation
    activities.push({
      id: `gen-${dayNumber}-4`,
      title: "Relaxing Evening",
      description: "Wind down with a relaxing spa or wellness activity",
      time: "7:00 PM - 9:00 PM",
      location: "Wellness Center"
    });
  } else if (interests.includes("12")) { // Local Culture
    activities.push({
      id: `gen-${dayNumber}-4`,
      title: "Cultural Performance",
      description: "Experience local music, dance, or traditional performance",
      time: "7:00 PM - 9:00 PM",
      location: "Cultural Center"
    });
  } else {
    activities.push(defaultActivities[3]);
  }
  
  return activities;
}
