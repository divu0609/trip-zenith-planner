
export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  popular: boolean;
}

export const destinations: Destination[] = [
  {
    id: "1",
    name: "Bali",
    country: "Indonesia",
    description: "Tropical paradise with stunning beaches, lush rice terraces, and spiritual temples.",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3",
    popular: true
  },
  {
    id: "2",
    name: "Paris",
    country: "France",
    description: "City of love, art, and culture with iconic landmarks and world-class cuisine.",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3",
    popular: true
  },
  {
    id: "3",
    name: "Tokyo",
    country: "Japan",
    description: "Ultramodern metropolis blending traditional culture with futuristic technology.",
    imageUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3",
    popular: true
  },
  {
    id: "4",
    name: "New York",
    country: "United States",
    description: "The city that never sleeps, featuring towering skyscrapers and diverse cultures.",
    imageUrl: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    popular: true
  },
  {
    id: "5",
    name: "Rome",
    country: "Italy",
    description: "Ancient ruins, Renaissance art, and vibrant street life in the Eternal City.",
    imageUrl: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    popular: false
  },
  {
    id: "6",
    name: "Cape Town",
    country: "South Africa",
    description: "Stunning coastal city with iconic Table Mountain and diverse cultural experiences.",
    imageUrl: "https://images.unsplash.com/photo-1576485375220-158530450f5e?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3",
    popular: false
  }
];
