"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Search, Mail, Phone, MapPin, DollarSign, Eye, Edit, MessageSquare, TrendingUp } from "lucide-react"
import { AddProspectModal } from "@/components/add-prospect-modal"
import Link from "next/link"

interface User {
  email: string
  name: string
  role: string
}

interface Prospect {
  id: string
  name: string
  email: string
  phone: string
  preferences: {
    budget: { min: number | null; max: number | null }
    propertyTypes: string[]
    locations: string[]
    bedrooms: number | null
    bathrooms: number | null
    area: { min: number | null; max: number | null }
    features: string[]
  }
  notes: string
  status: string
  source: string
  addedDate: string
  lastContact: string | null
  matchedProperties: string[]
}

export default function ProspectsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [filteredProspects, setFilteredProspects] = useState<Prospect[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sourceFilter, setSourceFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("smartaqar_user")
    if (!userData) {
      router.push("/signin")
      return
    }

    setUser(JSON.parse(userData))

    // Load sample prospects
    const sampleProspects: Prospect[] = [
      {
        id: "1",
        name: "Ahmed Benali",
        email: "ahmed.benali@email.com",
        phone: "+212 6 12 34 56 78",
        preferences: {
          budget: { min: 800000, max: 1500000 },
          propertyTypes: ["apartment", "villa"],
          locations: ["Casablanca", "Rabat"],
          bedrooms: 3,
          bathrooms: 2,
          area: { min: 120, max: 200 },
          features: ["Swimming Pool", "Garage", "Security System"],
        },
        notes: "Looking for a family home, prefers modern amenities",
        status: "active",
        source: "website",
        addedDate: "2024-01-15",
        lastContact: "2024-01-20",
        matchedProperties: ["1", "2"],
      },
      {
        id: "2",
        name: "Fatima Alaoui",
        email: "fatima.alaoui@email.com",
        phone: "+212 6 87 65 43 21",
        preferences: {
          budget: { min: 2000000, max: 3500000 },
          propertyTypes: ["villa"],
          locations: ["Marrakech", "Agadir"],
          bedrooms: 4,
          bathrooms: 3,
          area: { min: 300, max: 500 },
          features: ["Swimming Pool", "Garden", "Sea View"],
        },
        notes: "High-end luxury properties only, cash buyer",
        status: "interested",
        source: "referral",
        addedDate: "2024-01-10",
        lastContact: null,
        matchedProperties: ["1"],
      },
      {
        id: "3",
        name: "Omar Tazi",
        email: "omar.tazi@email.com",
        phone: "+212 6 55 44 33 22",
        preferences: {
          budget: { min: 500000, max: 900000 },
          propertyTypes: ["apartment"],
          locations: ["Casablanca"],
          bedrooms: 2,
          bathrooms: 1,
          area: { min: 80, max: 120 },
          features: ["Elevator", "Parking", "City View"],
        },
        notes: "First-time buyer, needs financing assistance",
        status: "contacted",
        source: "social-media",
        addedDate: "2024-01-08",
        lastContact: "2024-01-18",
        matchedProperties: ["2"],
      },
    ]

    setProspects(sampleProspects)
    setFilteredProspects(sampleProspects)
  }, [router])

  useEffect(() => {
    let filtered = [...prospects]

    if (searchTerm) {
      filtered = filtered.filter(
        (prospect) =>
          prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prospect.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prospect.phone.includes(searchTerm),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((prospect) => prospect.status === statusFilter)
    }

    if (sourceFilter !== "all") {
      filtered = filtered.filter((prospect) => prospect.source === sourceFilter)
    }

    setFilteredProspects(filtered)
  }, [prospects, searchTerm, statusFilter, sourceFilter])

  const handleAddProspect = (newProspect: Prospect) => {
    const updatedProspects = [...prospects, newProspect]
    setProspects(updatedProspects)
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
      case "active":
        return "bg-green-500"
      case "contacted":
        return "bg-blue-500"
      case "interested":
        return "bg-yellow-500"
      case "converted":
        return "bg-purple-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSourceColor = (source: string) => {
    switch (source) {
      case "website":
        return "bg-blue-100 text-blue-800"
      case "referral":
        return "bg-green-100 text-green-800"
      case "social-media":
        return "bg-pink-100 text-pink-800"
      case "advertisement":
        return "bg-orange-100 text-orange-800"
      case "walk-in":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <img src="/smartaqar-logo.png" alt="SMARTAQAR" className="h-8 w-8" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-primary">Prospect Management</h1>
                <p className="text-sm text-muted-foreground">Manage your potential clients</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Prospects</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{prospects.length}</div>
              <p className="text-xs text-muted-foreground">In your database</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Prospects</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {prospects.filter((p) => p.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interested</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {prospects.filter((p) => p.status === "interested").length}
              </div>
              <p className="text-xs text-muted-foreground">Showing interest</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Converted</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {prospects.filter((p) => p.status === "converted").length}
              </div>
              <p className="text-xs text-muted-foreground">Successful conversions</p>
            </CardContent>
          </Card>
        </div>

        {/* Prospects Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Prospect Database</CardTitle>
                <CardDescription>
                  Manage your potential clients - {filteredProspects.length} of {prospects.length} prospects
                </CardDescription>
              </div>
              <AddProspectModal onAddProspect={handleAddProspect} />
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search prospects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All sources" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="advertisement">Advertisement</SelectItem>
                  <SelectItem value="walk-in">Walk-in</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProspects.map((prospect) => (
                <Card key={prospect.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{prospect.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getStatusColor(prospect.status)}>{prospect.status}</Badge>
                          <Badge variant="secondary" className={getSourceColor(prospect.source)}>
                            {prospect.source}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>Added {new Date(prospect.addedDate).toLocaleDateString()}</div>
                        {prospect.lastContact && (
                          <div>Last contact {new Date(prospect.lastContact).toLocaleDateString()}</div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {prospect.email}
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        {prospect.phone}
                      </div>
                      {prospect.preferences.budget.min && prospect.preferences.budget.max && (
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatPrice(prospect.preferences.budget.min)} -{" "}
                          {formatPrice(prospect.preferences.budget.max)}
                        </div>
                      )}
                      {prospect.preferences.locations.length > 0 && (
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                          {prospect.preferences.locations.join(", ")}
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="text-sm text-muted-foreground mb-2">Property Types:</div>
                      <div className="flex flex-wrap gap-1">
                        {prospect.preferences.propertyTypes.map((type, index) => (
                          <Badge key={index} variant="outline" className="text-xs capitalize">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {prospect.preferences.features.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm text-muted-foreground mb-2">Desired Features:</div>
                        <div className="flex flex-wrap gap-1">
                          {prospect.preferences.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {prospect.preferences.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{prospect.preferences.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {prospect.matchedProperties.length > 0 && (
                      <div className="mt-3">
                        <div className="text-sm text-muted-foreground mb-1">
                          {prospect.matchedProperties.length} matched properties
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProspects.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No prospects found</h3>
                <p className="text-sm text-muted-foreground">
                  {prospects.length === 0
                    ? "Start by adding your first prospect to the database"
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
