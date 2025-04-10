
import { toast } from "sonner";

// OpenTripMap API configuration
const API_KEY = "YOUR_OPENTRIPMAP_API_KEY"; // Replace with your actual API key
const BASE_URL = "https://api.opentripmap.com/0.1/en";

export interface Attraction {
  id: string;
  name: string;
  kinds: string;
  dist?: number;
  rate?: number;
  osm?: string;
  wikidata?: string;
  point: {
    lon: number;
    lat: number;
  };
}

export interface AttractionDetail {
  xid: string;
  name: string;
  address?: {
    city?: string;
    road?: string;
    state?: string;
    suburb?: string;
    country?: string;
    postcode?: string;
    country_code?: string;
  };
  rate?: string;
  osm?: string;
  wikidata?: string;
  kinds?: string;
  image?: string;
  preview?: {
    source: string;
    height: number;
    width: number;
  };
  wikipedia_extracts?: {
    title: string;
    text: string;
    html: string;
  };
  point: {
    lon: number;
    lat: number;
  };
  otm?: string;
  wikipedia?: string;
  url?: string;
  description?: string;
}

/**
 * Fetch attractions near a location by radius
 * @param lat Latitude
 * @param lon Longitude
 * @param radius Radius in meters
 * @param limit Maximum number of results
 * @returns Array of attractions
 */
export const getAttractionsByRadius = async (
  lat: number,
  lon: number,
  radius: number = 5000,
  limit: number = 10
): Promise<Attraction[]> => {
  try {
    // For demo purposes, we'll use mockAttractions if no API key is provided
    if (API_KEY === "YOUR_OPENTRIPMAP_API_KEY") {
      console.log("Using mock attractions data (no API key provided)");
      return mockAttractions;
    }

    const response = await fetch(
      `${BASE_URL}/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&rate=3&format=json&limit=${limit}&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching attractions:", error);
    toast.error("Failed to load attractions", {
      description: "Please try again later",
    });
    return mockAttractions; // Fallback to mock data on error
  }
};

/**
 * Fetch attraction details by XID
 * @param xid Attraction XID
 * @returns Attraction details
 */
export const getAttractionDetails = async (xid: string): Promise<AttractionDetail | null> => {
  try {
    // For demo purposes, we'll use mockAttractionDetails if no API key is provided
    if (API_KEY === "YOUR_OPENTRIPMAP_API_KEY") {
      console.log("Using mock attraction details (no API key provided)");
      const mock = mockAttractionDetails.find(a => a.xid === xid);
      return mock || mockAttractionDetails[0];
    }

    const response = await fetch(
      `${BASE_URL}/places/xid/${xid}?apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching attraction details:", error);
    toast.error("Failed to load attraction details", {
      description: "Please try again later",
    });
    return null;
  }
};

// Mock attractions data for testing or when API key is not available
const mockAttractions: Attraction[] = [
  {
    id: "1",
    name: "Taj Mahal",
    kinds: "historic,architecture,cultural",
    rate: 8,
    point: { lon: 78.0422, lat: 27.1751 }
  },
  {
    id: "2",
    name: "Red Fort",
    kinds: "historic,architecture,fort",
    rate: 7,
    point: { lon: 77.2410, lat: 28.6562 }
  },
  {
    id: "3",
    name: "Gateway of India",
    kinds: "historic,architecture,monument",
    rate: 7.5,
    point: { lon: 72.8347, lat: 18.9220 }
  },
  {
    id: "4",
    name: "Qutub Minar",
    kinds: "historic,architecture,tower",
    rate: 7.2,
    point: { lon: 77.1855, lat: 28.5244 }
  },
  {
    id: "5",
    name: "Jaipur City Palace",
    kinds: "historic,architecture,palace",
    rate: 7.8,
    point: { lon: 75.8268, lat: 26.9255 }
  }
];

// Mock attraction details
const mockAttractionDetails: AttractionDetail[] = [
  {
    xid: "1",
    name: "Taj Mahal",
    address: {
      city: "Agra",
      road: "Taj Road",
      state: "Uttar Pradesh",
      country: "India",
      postcode: "282001",
      country_code: "in"
    },
    rate: "8",
    kinds: "historic,architecture,cultural",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Taj_Mahal_in_India_-_Kristian_Bertel.jpg/800px-Taj_Mahal_in_India_-_Kristian_Bertel.jpg",
    wikipedia_extracts: {
      title: "Taj Mahal",
      text: "The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
      html: "<p>The Taj Mahal is an ivory-white marble mausoleum on the south bank of the Yamuna river in the Indian city of Agra.</p>"
    },
    point: { lon: 78.0422, lat: 27.1751 },
    url: "https://en.wikipedia.org/wiki/Taj_Mahal",
    description: "One of the most iconic buildings in the world and a UNESCO World Heritage Site."
  },
  {
    xid: "2",
    name: "Red Fort",
    address: {
      city: "Delhi",
      road: "Netaji Subhash Marg",
      state: "Delhi",
      country: "India",
      postcode: "110006",
      country_code: "in"
    },
    rate: "7",
    kinds: "historic,architecture,fort",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Delhi_Red_fort.jpg/800px-Delhi_Red_fort.jpg",
    wikipedia_extracts: {
      title: "Red Fort",
      text: "The Red Fort is a historic fort in the city of Delhi in India. It was the main residence of the emperors of the Mughal dynasty for nearly 200 years, until 1857.",
      html: "<p>The Red Fort is a historic fort in the city of Delhi in India.</p>"
    },
    point: { lon: 77.2410, lat: 28.6562 },
    url: "https://en.wikipedia.org/wiki/Red_Fort",
    description: "A UNESCO World Heritage Site and one of Delhi's most iconic landmarks."
  }
];
