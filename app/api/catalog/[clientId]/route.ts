import { type NextRequest, NextResponse } from "next/server"

// Mock client configurations - in real app, this would be from database
const CLIENT_CONFIGS = {
  "casablanca-premium": {
    id: "casablanca-premium",
    agencyName: "Casablanca Premium Properties",
    logo: "/smartaqar-logo.png",
    primaryColor: "#1e40af",
    secondaryColor: "#059669",
    accentColor: "#f59e0b",
    contactName: "Ahmed Benali",
    email: "ahmed@casablancapremium.com",
    phone: "+212 6 12 34 56 78",
    address: "Boulevard Mohammed V, Casablanca, Morocco",
    website: "https://casablancapremium.com",
    heroTitle: "Discover Premium Properties in Casablanca",
    heroSubtitle: "Your trusted partner for luxury real estate in Morocco's economic capital",
    aboutText:
      "With over 15 years of experience in Casablanca's real estate market, we specialize in premium properties that match your lifestyle and investment goals. Our expert team provides personalized service to help you find the perfect property.",
    theme: "luxury",
    showHero: true,
    showAbout: true,
    showContact: true,
    showTestimonials: true,
    metaTitle: "Casablanca Premium Properties - Luxury Real Estate",
    metaDescription:
      "Discover premium real estate properties in Casablanca with our expert team. Luxury villas, modern apartments, and commercial spaces.",
    subdomain: "casablanca-premium",
    properties: [
      {
        id: "1",
        title: "Luxury Villa Anfa",
        price: 4500000,
        location: "Anfa, Casablanca",
        image: "/luxury-villa-pool.png",
        bedrooms: 6,
        bathrooms: 5,
        area: 650,
        type: "villa",
        status: "available",
        description: "Exceptional luxury villa in the prestigious Anfa district with panoramic ocean views.",
        features: ["Ocean View", "Swimming Pool", "Garden", "Garage", "Security System"],
      },
      {
        id: "2",
        title: "Modern Penthouse Marina",
        price: 2800000,
        location: "Marina, Casablanca",
        image: "/modern-downtown-apartment.png",
        bedrooms: 4,
        bathrooms: 3,
        area: 280,
        type: "apartment",
        status: "available",
        description: "Stunning penthouse with marina views and premium finishes.",
        features: ["Marina View", "Terrace", "Elevator", "Parking", "Concierge"],
      },
    ],
  },
  "rabat-elite": {
    id: "rabat-elite",
    agencyName: "Rabat Elite Realty",
    logo: "/smartaqar-logo.png",
    primaryColor: "#7c3aed",
    secondaryColor: "#059669",
    accentColor: "#dc2626",
    contactName: "Fatima El Mansouri",
    email: "fatima@rabatelite.com",
    phone: "+212 6 98 76 54 32",
    address: "Avenue Mohammed V, Rabat, Morocco",
    heroTitle: "Elite Properties in Morocco's Capital",
    heroSubtitle: "Discover exceptional real estate opportunities in Rabat with our expert guidance",
    aboutText:
      "Rabat Elite Realty is your premier destination for luxury properties in Morocco's capital. We offer a curated selection of villas, apartments, and commercial spaces in the most sought-after neighborhoods.",
    theme: "modern",
    showHero: true,
    showAbout: true,
    showContact: true,
    showTestimonials: false,
    metaTitle: "Rabat Elite Realty - Premium Real Estate in Rabat",
    metaDescription:
      "Find your dream property in Rabat with Rabat Elite Realty. Premium villas, luxury apartments, and commercial properties.",
    subdomain: "rabat-elite",
    properties: [
      {
        id: "3",
        title: "Villa Souissi Prestige",
        price: 3200000,
        location: "Souissi, Rabat",
        image: "/luxury-villa-pool.png",
        bedrooms: 5,
        bathrooms: 4,
        area: 480,
        type: "villa",
        status: "available",
        description: "Magnificent villa in the diplomatic quarter with elegant architecture.",
        features: ["Diplomatic Quarter", "Garden", "Swimming Pool", "Garage", "Security"],
      },
    ],
  },
}

export async function GET(request: NextRequest, { params }: { params: { clientId: string } }) {
  try {
    const clientId = params.clientId
    const config = CLIENT_CONFIGS[clientId as keyof typeof CLIENT_CONFIGS]

    if (!config) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      config,
    })
  } catch (error) {
    console.error("Error fetching client config:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
