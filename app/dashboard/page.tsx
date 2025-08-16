"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Users,
  TrendingUp,
  Mail,
  MapPin,
  DollarSign,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Target,
} from "lucide-react"
import { AddPropertyModal } from "@/components/add-property-modal"
import { PropertyFilters } from "@/components/property-filters"
import Link from "next/link"

interface User {
  email: string
  name: string
  role: string
}

interface Property {
  id: string
  title: string
  type: "villa" | "apartment" | "commercial"
  price: number
  location: string
  status: "available" | "sold" | "pending"
  image: string
  bedrooms?: number
  bathrooms?: number
  area: number
  addedDate: string
  description?: string
  features?: string[]
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("smartaqar_user")
    if (!userData) {
      router.push("/signin")
      return
    }

    setUser(JSON.parse(userData))

    // Load sample properties
    const sampleProperties = [
      {
        id: "1",
        title: "Luxury Villa with Pool",
        type: "villa" as const,
        price: 2500000,
        location: "Casablanca, Morocco",
        status: "available" as const,
        image: "/luxury-villa-pool.png",
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        addedDate: "2024-01-15",
        description: "Stunning luxury villa with private pool, garden, and modern amenities.",
        features: ["Swimming Pool", "Garden", "Garage", "Security System"],
      },
      {
        id: "2",
        title: "Modern Apartment Downtown",
        type: "apartment" as const,
        price: 850000,
        location: "Rabat, Morocco",
        status: "pending" as const,
        image: "/modern-downtown-apartment.png",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        addedDate: "2024-01-10",
        description: "Contemporary apartment in the heart of the city with city views.",
        features: ["City View", "Balcony", "Elevator", "Parking"],
      },
      {
        id: "3",
        title: "Commercial Space - Retail",
        type: "commercial" as const,
        price: 1200000,
        location: "Marrakech, Morocco",
        status: "available" as const,
        image: "/commercial-retail-space.png",
        area: 200,
        addedDate: "2024-01-08",
        description: "Prime retail location with high foot traffic and excellent visibility.",
        features: ["High Traffic", "Corner Location", "Large Windows", "Storage"],
      },
    ]

    setProperties(sampleProperties)
    setFilteredProperties(sampleProperties)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("smartaqar_user")
    router.push("/")
  }

  const handleAddProperty = (newProperty: Property) => {
    const updatedProperties = [...properties, newProperty]
    setProperties(updatedProperties)
    setFilteredProperties(updatedProperties)
  }

  const handleFiltersChange = (filters: any) => {
    let filtered = [...properties]

    if (filters.search) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          property.location.toLowerCase().includes(filters.search.toLowerCase()),
      )
    }

    if (filters.type) {
      filtered = filtered.filter((property) => property.type === filters.type)
    }

    if (filters.status) {
      filtered = filtered.filter((property) => property.status === filters.status)
    }

    if (filters.location) {
      filtered = filtered.filter((property) => property.location.toLowerCase().includes(filters.location.toLowerCase()))
    }

    if (filters.minPrice) {
      filtered = filtered.filter((property) => property.price >= Number.parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((property) => property.price <= Number.parseInt(filters.maxPrice))
    }

    setFilteredProperties(filtered)
  }

  if (!user) {
    return <div>Loading...</div>
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "sold":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/smartaqar-logo.png" alt="SMARTAQAR" className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold text-primary">SMARTAQAR</h1>
                <p className="text-sm text-muted-foreground">Real Estate Management</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/campaigns">
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Campaigns
                </Button>
              </Link>
              <Link href="/matches">
                <Button variant="outline" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Matches
                </Button>
              </Link>
              <Link href="/prospects">
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Prospects
                </Button>
              </Link>
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{properties.length}</div>
              <p className="text-xs text-muted-foreground">Active listings</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Prospects</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">24</div>
              <p className="text-xs text-muted-foreground">Interested buyers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Matches This Week</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">12</div>
              <p className="text-xs text-muted-foreground">Auto-matched properties</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Campaigns Sent</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">8</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Properties Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Property Catalog</CardTitle>
                <CardDescription>
                  Manage your real estate listings - {filteredProperties.length} of {properties.length} properties
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <PropertyFilters onFiltersChange={handleFiltersChange} />
                <AddPropertyModal onAddProperty={handleAddProperty} />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className={`absolute top-2 right-2 ${getStatusColor(property.status)}`}>
                      {property.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{property.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {property.location}
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {formatPrice(property.price)}
                      </div>
                      <div className="flex items-center space-x-4">
                        {property.bedrooms && <span>{property.bedrooms} bed</span>}
                        {property.bathrooms && <span>{property.bathrooms} bath</span>}
                        <span>{property.area}m²</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        Added {new Date(property.addedDate).toLocaleDateString()}
                      </div>
                    </div>

                    {property.features && property.features.length > 0 && (
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
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

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-1">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProperties.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No properties found</h3>
                <p className="text-sm text-muted-foreground">
                  {properties.length === 0
                    ? "Start by adding your first property to the catalog"
                    : "Try adjusting your filters to see more results"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
