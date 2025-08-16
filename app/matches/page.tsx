"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Target,
  Search,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Building2,
  Users,
  TrendingUp,
  Eye,
  Send,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react"
import { MatchingEngine } from "@/lib/matching-engine"
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
  status: string
  source: string
  addedDate: string
}

interface Match {
  propertyId: string
  prospectId: string
  score: number
  reasons: string[]
  createdAt: string
  status: "pending" | "sent" | "viewed" | "interested" | "rejected"
}

export default function MatchesPage() {
  const [user, setUser] = useState<User | null>(null)
  const [properties, setProperties] = useState<Property[]>([])
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [minScoreFilter, setMinScoreFilter] = useState("50")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("smartaqar_user")
    if (!userData) {
      router.push("/signin")
      return
    }

    setUser(JSON.parse(userData))

    // Load sample data
    const sampleProperties: Property[] = [
      {
        id: "1",
        title: "Luxury Villa with Pool",
        type: "villa",
        price: 2500000,
        location: "Casablanca, Morocco",
        status: "available",
        image: "/luxury-villa-pool.png",
        bedrooms: 5,
        bathrooms: 4,
        area: 450,
        addedDate: "2024-01-15",
        features: ["Swimming Pool", "Garden", "Garage", "Security System"],
      },
      {
        id: "2",
        title: "Modern Apartment Downtown",
        type: "apartment",
        price: 850000,
        location: "Rabat, Morocco",
        status: "available",
        image: "/modern-downtown-apartment.png",
        bedrooms: 3,
        bathrooms: 2,
        area: 120,
        addedDate: "2024-01-10",
        features: ["City View", "Balcony", "Elevator", "Parking"],
      },
      {
        id: "3",
        title: "Commercial Space - Retail",
        type: "commercial",
        price: 1200000,
        location: "Marrakech, Morocco",
        status: "available",
        image: "/commercial-retail-space.png",
        area: 200,
        addedDate: "2024-01-08",
        features: ["High Traffic", "Corner Location", "Large Windows", "Storage"],
      },
    ]

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
        status: "active",
        source: "website",
        addedDate: "2024-01-15",
      },
      {
        id: "2",
        name: "Fatima Alaoui",
        email: "fatima.alaoui@email.com",
        phone: "+212 6 87 65 43 21",
        preferences: {
          budget: { min: 2000000, max: 3500000 },
          propertyTypes: ["villa"],
          locations: ["Casablanca", "Marrakech"],
          bedrooms: 4,
          bathrooms: 3,
          area: { min: 300, max: 500 },
          features: ["Swimming Pool", "Garden", "Security System"],
        },
        status: "active",
        source: "referral",
        addedDate: "2024-01-10",
      },
      {
        id: "3",
        name: "Omar Tazi",
        email: "omar.tazi@email.com",
        phone: "+212 6 55 44 33 22",
        preferences: {
          budget: { min: 500000, max: 900000 },
          propertyTypes: ["apartment"],
          locations: ["Rabat"],
          bedrooms: 2,
          bathrooms: 1,
          area: { min: 80, max: 120 },
          features: ["Elevator", "Parking", "City View"],
        },
        status: "active",
        source: "social-media",
        addedDate: "2024-01-08",
      },
    ]

    setProperties(sampleProperties)
    setProspects(sampleProspects)

    // Generate matches
    const generatedMatches = MatchingEngine.findMatches(sampleProperties, sampleProspects, 30)
    setMatches(generatedMatches)
    setFilteredMatches(generatedMatches)
  }, [router])

  useEffect(() => {
    let filtered = [...matches]

    if (searchTerm) {
      filtered = filtered.filter((match) => {
        const property = properties.find((p) => p.id === match.propertyId)
        const prospect = prospects.find((p) => p.id === match.prospectId)
        return (
          property?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prospect?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          property?.location.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((match) => match.status === statusFilter)
    }

    if (minScoreFilter !== "all") {
      const minScore = Number.parseInt(minScoreFilter)
      filtered = filtered.filter((match) => match.score >= minScore)
    }

    setFilteredMatches(filtered)
  }, [matches, searchTerm, statusFilter, minScoreFilter, properties, prospects])

  const handleUpdateMatchStatus = (matchIndex: number, newStatus: Match["status"]) => {
    const updatedMatches = [...matches]
    const filteredIndex = filteredMatches.findIndex((m, i) => i === matchIndex)
    const originalIndex = matches.findIndex(
      (m) =>
        m.propertyId === filteredMatches[filteredIndex].propertyId &&
        m.prospectId === filteredMatches[filteredIndex].prospectId,
    )

    if (originalIndex !== -1) {
      updatedMatches[originalIndex].status = newStatus
      setMatches(updatedMatches)
    }
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (status: Match["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "sent":
        return <Send className="h-4 w-4 text-blue-500" />
      case "viewed":
        return <Eye className="h-4 w-4 text-purple-500" />
      case "interested":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: Match["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sent":
        return "bg-blue-100 text-blue-800"
      case "viewed":
        return "bg-purple-100 text-purple-800"
      case "interested":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
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
                <h1 className="text-xl font-bold text-primary">Smart Matching</h1>
                <p className="text-sm text-muted-foreground">Automated property-prospect matching</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/prospects">
                <Button variant="outline">Prospects</Button>
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
              <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{matches.length}</div>
              <p className="text-xs text-muted-foreground">Generated matches</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">High Score Matches</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{matches.filter((m) => m.score >= 80).length}</div>
              <p className="text-xs text-muted-foreground">Score ≥ 80%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Matches</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {matches.filter((m) => m.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Interested</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {matches.filter((m) => m.status === "interested").length}
              </div>
              <p className="text-xs text-muted-foreground">Positive responses</p>
            </CardContent>
          </Card>
        </div>

        {/* Matches Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Property-Prospect Matches</CardTitle>
                <CardDescription>
                  AI-powered matching results - {filteredMatches.length} of {matches.length} matches
                </CardDescription>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search matches..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="viewed">Viewed</SelectItem>
                  <SelectItem value="interested">Interested</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={minScoreFilter} onValueChange={setMinScoreFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Min score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Scores</SelectItem>
                  <SelectItem value="80">80%+</SelectItem>
                  <SelectItem value="60">60%+</SelectItem>
                  <SelectItem value="40">40%+</SelectItem>
                  <SelectItem value="20">20%+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {filteredMatches.map((match, index) => {
                const property = properties.find((p) => p.id === match.propertyId)
                const prospect = prospects.find((p) => p.id === match.prospectId)

                if (!property || !prospect) return null

                return (
                  <Card key={`${match.propertyId}-${match.prospectId}`} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className={`text-2xl font-bold ${getScoreColor(match.score)}`}>{match.score}%</div>
                            <div className="text-xs text-muted-foreground">Match Score</div>
                          </div>
                          <Progress value={match.score} className="w-20" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(match.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(match.status)}
                              <span className="capitalize">{match.status}</span>
                            </div>
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {new Date(match.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Property Info */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Building2 className="h-4 w-4 text-primary" />
                            <h3 className="font-semibold text-primary">Property</h3>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <h4 className="font-medium mb-2">{property.title}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {property.location}
                              </div>
                              <div className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {formatPrice(property.price)}
                              </div>
                              <div className="flex items-center space-x-4">
                                {property.bedrooms && <span>{property.bedrooms} bed</span>}
                                {property.bathrooms && <span>{property.bathrooms} bath</span>}
                                <span>{property.area}m²</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Prospect Info */}
                        <div className="space-y-3">
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-secondary" />
                            <h3 className="font-semibold text-secondary">Prospect</h3>
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4">
                            <h4 className="font-medium mb-2">{prospect.name}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {prospect.email}
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {prospect.phone}
                              </div>
                              {prospect.preferences.budget.min && prospect.preferences.budget.max && (
                                <div className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {formatPrice(prospect.preferences.budget.min)} -{" "}
                                  {formatPrice(prospect.preferences.budget.max)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Match Reasons */}
                      <div className="mt-4">
                        <h4 className="font-medium mb-2 text-sm">Match Reasons:</h4>
                        <div className="flex flex-wrap gap-1">
                          {match.reasons.map((reason, reasonIndex) => (
                            <Badge key={reasonIndex} variant="outline" className="text-xs">
                              {reason}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </div>
                        <div className="flex items-center space-x-2">
                          {match.status === "pending" && (
                            <Button
                              size="sm"
                              onClick={() => handleUpdateMatchStatus(index, "sent")}
                              className="bg-gradient-to-r from-primary to-secondary"
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send to Prospect
                            </Button>
                          )}
                          {match.status === "sent" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateMatchStatus(index, "interested")}
                                className="text-green-600 border-green-600 hover:bg-green-50"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Mark Interested
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateMatchStatus(index, "rejected")}
                                className="text-red-600 border-red-600 hover:bg-red-50"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Mark Rejected
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {filteredMatches.length === 0 && (
              <div className="text-center py-12">
                <Target className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No matches found</h3>
                <p className="text-sm text-muted-foreground">
                  {matches.length === 0
                    ? "Add properties and prospects to generate matches"
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
