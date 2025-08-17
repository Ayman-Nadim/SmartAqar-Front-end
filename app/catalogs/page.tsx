"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Building2, Search, ExternalLink, MapPin, Phone, Mail, Eye } from "lucide-react"
import Link from "next/link"

interface CatalogListing {
  id: string
  agencyName: string
  location: string
  description: string
  subdomain: string
  theme: string
  propertiesCount: number
  contactEmail: string
  contactPhone?: string
  primaryColor: string
  isActive: boolean
}

export default function CatalogsPage() {
  const [catalogs, setCatalogs] = useState<CatalogListing[]>([])
  const [filteredCatalogs, setFilteredCatalogs] = useState<CatalogListing[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Mock catalog listings - in real app, fetch from API
    const mockCatalogs: CatalogListing[] = [
      {
        id: "casablanca-premium",
        agencyName: "Casablanca Premium Properties",
        location: "Casablanca, Morocco",
        description:
          "Luxury real estate in Morocco's economic capital. Specializing in premium villas and modern apartments.",
        subdomain: "casablanca-premium",
        theme: "luxury",
        propertiesCount: 45,
        contactEmail: "ahmed@casablancapremium.com",
        contactPhone: "+212 6 12 34 56 78",
        primaryColor: "#1e40af",
        isActive: true,
      },
      {
        id: "rabat-elite",
        agencyName: "Rabat Elite Realty",
        location: "Rabat, Morocco",
        description: "Elite properties in Morocco's capital. Curated selection of luxury homes and commercial spaces.",
        subdomain: "rabat-elite",
        theme: "modern",
        propertiesCount: 32,
        contactEmail: "fatima@rabatelite.com",
        contactPhone: "+212 6 98 76 54 32",
        primaryColor: "#7c3aed",
        isActive: true,
      },
      {
        id: "marrakech-luxury",
        agencyName: "Marrakech Luxury Homes",
        location: "Marrakech, Morocco",
        description: "Discover luxury properties in the Red City. Traditional riads and modern villas.",
        subdomain: "marrakech-luxury",
        theme: "classic",
        propertiesCount: 28,
        contactEmail: "youssef@marrakechluxury.com",
        primaryColor: "#dc2626",
        isActive: true,
      },
      {
        id: "tangier-coastal",
        agencyName: "Tangier Coastal Properties",
        location: "Tangier, Morocco",
        description: "Coastal real estate with stunning Mediterranean views. Villas and apartments by the sea.",
        subdomain: "tangier-coastal",
        theme: "minimal",
        propertiesCount: 19,
        contactEmail: "laila@tangiercoastal.com",
        contactPhone: "+212 6 55 44 33 22",
        primaryColor: "#059669",
        isActive: true,
      },
      {
        id: "fez-heritage",
        agencyName: "Fez Heritage Properties",
        location: "Fez, Morocco",
        description: "Heritage properties in the cultural capital. Traditional houses and modern developments.",
        subdomain: "fez-heritage",
        theme: "classic",
        propertiesCount: 15,
        contactEmail: "omar@fezheritage.com",
        primaryColor: "#f59e0b",
        isActive: true,
      },
    ]

    setCatalogs(mockCatalogs)
    setFilteredCatalogs(mockCatalogs)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (searchTerm) {
      const filtered = catalogs.filter(
        (catalog) =>
          catalog.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          catalog.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          catalog.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredCatalogs(filtered)
    } else {
      setFilteredCatalogs(catalogs)
    }
  }, [searchTerm, catalogs])

  const getThemeBadgeColor = (theme: string) => {
    switch (theme) {
      case "luxury":
        return "bg-purple-500"
      case "modern":
        return "bg-blue-500"
      case "classic":
        return "bg-amber-500"
      case "minimal":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading catalogs...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/smartaqar-logo.png" alt="SMARTAQAR" className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold text-primary">SMARTAQAR</h1>
                <p className="text-sm text-muted-foreground">Property Catalog Directory</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-foreground">Discover Real Estate Catalogs</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Browse property catalogs from leading real estate agencies across Morocco. Find your perfect property with
            expert local guidance.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agencies or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catalogs Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCatalogs.map((catalog) => (
              <Card key={catalog.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                        style={{ backgroundColor: catalog.primaryColor }}
                      >
                        <Building2 className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{catalog.agencyName}</CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {catalog.location}
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getThemeBadgeColor(catalog.theme)} text-white`}>{catalog.theme}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">{catalog.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-muted-foreground">
                      <Building2 className="h-4 w-4 mr-1" />
                      {catalog.propertiesCount} properties
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      Active
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      {catalog.contactEmail}
                    </div>
                    {catalog.contactPhone && (
                      <div className="flex items-center text-muted-foreground">
                        <Phone className="h-4 w-4 mr-2" />
                        {catalog.contactPhone}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">{catalog.subdomain}.smartaqar.com</div>
                      <div className="flex items-center space-x-2">
                        <Link href={`/catalog/${catalog.id}`}>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Preview
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          asChild
                          style={{ backgroundColor: catalog.primaryColor }}
                          className="text-white"
                        >
                          <a
                            href={`https://${catalog.subdomain}.smartaqar.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Visit
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCatalogs.length === 0 && (
            <div className="text-center py-12">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No catalogs found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search terms or browse all available catalogs.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-secondary to-accent text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Own Catalog?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join hundreds of real estate agencies using SMARTAQAR to showcase their properties with beautiful,
            customizable catalogs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Start Free Trial
              </Button>
            </Link>
            <Link href="/features">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/smartaqar-logo.png" alt="SMARTAQAR" className="h-8 w-8" />
                <h3 className="text-xl font-bold">SMARTAQAR</h3>
              </div>
              <p className="text-gray-400 text-sm">
                The leading SaaS platform for real estate agencies to create beautiful property catalogs.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/features" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/catalogs" className="hover:text-white">
                    Browse Catalogs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-white">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help-center" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/documentation" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:text-white">
                    Contact Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 SMARTAQAR. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
