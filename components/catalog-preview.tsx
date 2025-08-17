"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Phone, Mail, MapPin, Globe, Star, ExternalLink } from "lucide-react"
import Link from "next/link"

interface CatalogConfig {
  agencyName: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  contactName: string
  email: string
  phone: string
  address: string
  website?: string
  heroTitle: string
  heroSubtitle: string
  aboutText: string
  theme: "modern" | "classic" | "minimal" | "luxury"
  showHero: boolean
  showAbout: boolean
  showContact: boolean
  showTestimonials: boolean
  metaTitle: string
  metaDescription: string
  subdomain: string
}

interface CatalogPreviewProps {
  config: CatalogConfig
}

export function CatalogPreview({ config }: CatalogPreviewProps) {
  const customStyles = {
    "--primary": config.primaryColor,
    "--secondary": config.secondaryColor,
    "--accent": config.accentColor,
  } as React.CSSProperties

  // Sample properties for preview
  const sampleProperties = [
    {
      id: 1,
      title: "Luxury Villa with Pool",
      price: "2,500,000 MAD",
      location: "Casablanca",
      image: "/luxury-villa-pool.png",
      bedrooms: 5,
      bathrooms: 4,
      area: 450,
    },
    {
      id: 2,
      title: "Modern Downtown Apartment",
      price: "850,000 MAD",
      location: "Rabat",
      image: "/modern-downtown-apartment.png",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
    },
    {
      id: 3,
      title: "Commercial Retail Space",
      price: "1,200,000 MAD",
      location: "Marrakech",
      image: "/commercial-retail-space.png",
      area: 200,
    },
  ]

  return (
    <div className="h-full overflow-y-auto" style={customStyles}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {config.logo ? (
                <img src={config.logo || "/placeholder.svg"} alt={config.agencyName} className="h-8 w-8" />
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Building2 className="h-4 w-4" />
                </div>
              )}
              <h1 className="text-xl font-bold" style={{ color: config.primaryColor }}>
                {config.agencyName || "Your Agency"}
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6 text-sm">
              <a href="#properties" className="hover:opacity-70">
                Properties
              </a>
              {config.showAbout && (
                <a href="#about" className="hover:opacity-70">
                  About
                </a>
              )}
              {config.showContact && (
                <a href="#contact" className="hover:opacity-70">
                  Contact
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Preview Banner */}
      <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <span className="text-yellow-800">Preview Mode - This is how your catalog will look to visitors</span>
          {config.subdomain && (
            <Link
              href={`/catalog/${config.subdomain}`}
              target="_blank"
              className="text-yellow-800 hover:text-yellow-900 flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-1" />
              View Live Catalog
            </Link>
          )}
        </div>
      </div>

      {/* Hero Section */}
      {config.showHero && (
        <section className="relative py-20 px-4" style={{ backgroundColor: `${config.primaryColor}10` }}>
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4" style={{ color: config.primaryColor }}>
              {config.heroTitle || "Find Your Dream Property"}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {config.heroSubtitle || "Discover exceptional real estate opportunities with our expert team"}
            </p>
            <Button className="text-white" style={{ backgroundColor: config.secondaryColor }}>
              View Properties
            </Button>
          </div>
        </section>
      )}

      {/* Properties Section */}
      <section id="properties" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: config.primaryColor }}>
            Featured Properties
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-gray-200 relative">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2 text-white" style={{ backgroundColor: config.accentColor }}>
                    Featured
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                  <p className="text-2xl font-bold mb-2" style={{ color: config.secondaryColor }}>
                    {property.price}
                  </p>
                  <p className="text-gray-600 mb-3 flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.area}m²</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {config.showAbout && (
        <section id="about" className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8" style={{ color: config.primaryColor }}>
                About {config.agencyName || "Our Agency"}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                {config.aboutText ||
                  "We are a leading real estate agency committed to helping you find the perfect property."}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {config.showTestimonials && (
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: config.primaryColor }}>
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" style={{ color: config.accentColor }} />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">
                      "Excellent service and professional team. They helped us find our dream home!"
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                      <div>
                        <p className="font-semibold">Client {i}</p>
                        <p className="text-sm text-gray-500">Happy Customer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {config.showContact && (
        <section id="contact" className="py-16 px-4" style={{ backgroundColor: `${config.primaryColor}05` }}>
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12" style={{ color: config.primaryColor }}>
              Contact Us
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" style={{ color: config.secondaryColor }} />
                  <span>{config.phone || "+212 6 XX XX XX XX"}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" style={{ color: config.secondaryColor }} />
                  <span>{config.email || "contact@agency.com"}</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 mt-1" style={{ color: config.secondaryColor }} />
                  <span>{config.address || "Your agency address"}</span>
                </div>
                {config.website && (
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5" style={{ color: config.secondaryColor }} />
                    <span>{config.website}</span>
                  </div>
                )}
              </div>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Send us a message</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-md" />
                    <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-md" />
                    <textarea placeholder="Your Message" rows={4} className="w-full p-3 border rounded-md"></textarea>
                    <Button className="w-full text-white" style={{ backgroundColor: config.primaryColor }}>
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 {config.agencyName || "Your Agency"}. All rights reserved.</p>
          {config.subdomain && (
            <p className="text-sm text-gray-400 mt-2">Visit us at: {config.subdomain}.smartaqar.com</p>
          )}
        </div>
      </footer>
    </div>
  )
}
