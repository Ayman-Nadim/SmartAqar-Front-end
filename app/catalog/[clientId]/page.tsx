"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Phone, Mail, MapPin, Globe, Star, Bed, Bath, Square, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Property {
  id: string
  title: string
  price: number
  location: string
  image: string
  bedrooms?: number
  bathrooms?: number
  area: number
  type: string
  status: string
  description: string
  features: string[]
}

interface ClientConfig {
  id: string
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
  theme: string
  showHero: boolean
  showAbout: boolean
  showContact: boolean
  showTestimonials: boolean
  metaTitle: string
  metaDescription: string
  subdomain: string
  properties: Property[]
}

export default function ClientCatalogPage() {
  const params = useParams()
  const clientId = params.clientId as string
  const [config, setConfig] = useState<ClientConfig | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchClientConfig = async () => {
      try {
        const response = await fetch(`/api/catalog/${clientId}`)
        const data = await response.json()

        if (data.success) {
          setConfig(data.config)
          // Update document title and meta description
          document.title = data.config.metaTitle
          const metaDescription = document.querySelector('meta[name="description"]')
          if (metaDescription) {
            metaDescription.setAttribute("content", data.config.metaDescription)
          }
        } else {
          setError(data.error || "Failed to load catalog")
        }
      } catch (err) {
        setError("Failed to load catalog")
      } finally {
        setIsLoading(false)
      }
    }

    if (clientId) {
      fetchClientConfig()
    }
  }, [clientId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading catalog...</p>
        </div>
      </div>
    )
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold text-foreground mb-2">Catalog Not Found</h1>
          <p className="text-muted-foreground mb-4">
            {error || "This catalog does not exist or is no longer available."}
          </p>
          <Link href="/">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const customStyles = {
    "--primary": config.primaryColor,
    "--secondary": config.secondaryColor,
    "--accent": config.accentColor,
  } as React.CSSProperties

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getThemeClasses = (theme: string) => {
    switch (theme) {
      case "luxury":
        return "font-serif"
      case "minimal":
        return "font-light"
      case "classic":
        return "font-serif"
      default:
        return "font-sans"
    }
  }

  return (
    <div className={`min-h-screen bg-background ${getThemeClasses(config.theme)}`} style={customStyles}>
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {config.logo ? (
                <img src={config.logo || "/placeholder.svg"} alt={config.agencyName} className="h-10 w-10" />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  <Building2 className="h-5 w-5" />
                </div>
              )}
              <h1 className="text-2xl font-bold" style={{ color: config.primaryColor }}>
                {config.agencyName}
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
              <a href="#properties" className="hover:opacity-70 transition-opacity">
                Properties
              </a>
              {config.showAbout && (
                <a href="#about" className="hover:opacity-70 transition-opacity">
                  About
                </a>
              )}
              {config.showContact && (
                <a href="#contact" className="hover:opacity-70 transition-opacity">
                  Contact
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {config.showHero && (
        <section className="relative py-24 px-4" style={{ backgroundColor: `${config.primaryColor}08` }}>
          <div className="container mx-auto text-center">
            <h2 className="text-5xl font-bold mb-6" style={{ color: config.primaryColor }}>
              {config.heroTitle}
            </h2>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">{config.heroSubtitle}</p>
            <Button
              size="lg"
              className="text-white px-8 py-3 text-lg"
              style={{ backgroundColor: config.secondaryColor }}
            >
              View Properties
            </Button>
          </div>
        </section>
      )}

      {/* Properties Section */}
      <section id="properties" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: config.primaryColor }}>
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600">Discover our carefully selected premium properties</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {config.properties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge
                    className="absolute top-4 right-4 text-white font-medium"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    {property.status === "available" ? "Available" : property.status}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-3">{property.title}</h3>
                  <p className="text-3xl font-bold mb-4" style={{ color: config.secondaryColor }}>
                    {formatPrice(property.price)}
                  </p>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {property.location}
                  </p>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    {property.bedrooms && (
                      <span className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        {property.bedrooms} bed
                      </span>
                    )}
                    {property.bathrooms && (
                      <span className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        {property.bathrooms} bath
                      </span>
                    )}
                    <span className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.area}m²
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{property.description}</p>

                  {property.features && property.features.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {property.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {property.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{property.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button className="w-full text-white font-medium" style={{ backgroundColor: config.primaryColor }}>
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      {config.showAbout && (
        <section id="about" className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8" style={{ color: config.primaryColor }}>
                About {config.agencyName}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">{config.aboutText}</p>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {config.showTestimonials && (
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: config.primaryColor }}>
              What Our Clients Say
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-current" style={{ color: config.accentColor }} />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">
                      "Exceptional service and expertise. They helped us find our dream property with professionalism
                      and care."
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                      <div>
                        <p className="font-semibold">Client {i}</p>
                        <p className="text-sm text-gray-500">Property Owner</p>
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
        <section id="contact" className="py-20 px-4" style={{ backgroundColor: `${config.primaryColor}05` }}>
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16" style={{ color: config.primaryColor }}>
              Contact Us
            </h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Phone</p>
                    <p className="text-gray-600">{config.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Email</p>
                    <p className="text-gray-600">{config.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: config.secondaryColor }}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-lg">Address</p>
                    <p className="text-gray-600">{config.address}</p>
                  </div>
                </div>

                {config.website && (
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                      style={{ backgroundColor: config.secondaryColor }}
                    >
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">Website</p>
                      <a href={config.website} className="text-gray-600 hover:underline">
                        {config.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <Card className="p-8">
                <CardContent className="p-0">
                  <h3 className="font-bold text-xl mb-6">Send us a message</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ "--tw-ring-color": config.primaryColor } as React.CSSProperties}
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ "--tw-ring-color": config.primaryColor } as React.CSSProperties}
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                      style={{ "--tw-ring-color": config.primaryColor } as React.CSSProperties}
                    ></textarea>
                    <Button
                      className="w-full text-white font-medium py-3"
                      style={{ backgroundColor: config.primaryColor }}
                    >
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
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            {config.logo ? (
              <img src={config.logo || "/placeholder.svg"} alt={config.agencyName} className="h-8 w-8" />
            ) : (
              <Building2 className="h-8 w-8" />
            )}
            <h3 className="text-xl font-bold">{config.agencyName}</h3>
          </div>
          <p className="text-gray-400 mb-4">&copy; 2024 {config.agencyName}. All rights reserved.</p>
          <p className="text-sm text-gray-500">Powered by SMARTAQAR - Real Estate SaaS Platform</p>
        </div>
      </footer>
    </div>
  )
}
