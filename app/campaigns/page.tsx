"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Mail,
  Search,
  Plus,
  Calendar,
  TrendingUp,
  Eye,
  Edit,
  Play,
  Pause,
  BarChart3,
  Clock,
  CheckCircle,
  Send,
} from "lucide-react"
import Link from "next/link"

interface User {
  email: string
  name: string
  role: string
}

interface Campaign {
  id: string
  name: string
  subject: string
  type: "weekly_newsletter" | "new_property_alert" | "custom" | "match_notification"
  status: "draft" | "scheduled" | "active" | "paused" | "completed"
  targetAudience: {
    propertyTypes: string[]
    locations: string[]
    budgetRange: { min: number | null; max: number | null }
    prospectStatus: string[]
  }
  schedule: {
    frequency: "once" | "weekly" | "monthly"
    dayOfWeek?: number
    time: string
    nextRun?: string
  }
  stats: {
    sent: number
    delivered: number
    opened: number
    clicked: number
    converted: number
  }
  createdAt: string
  lastRun?: string
  template: string
}

export default function CampaignsPage() {
  const [user, setUser] = useState<User | null>(null)
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const router = useRouter()

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem("smartaqar_user")
    if (!userData) {
      router.push("/signin")
      return
    }

    setUser(JSON.parse(userData))

    // Load sample campaigns
    const sampleCampaigns: Campaign[] = [
      {
        id: "1",
        name: "Weekly Property Newsletter",
        subject: "New Properties This Week - SMARTAQAR",
        type: "weekly_newsletter",
        status: "active",
        targetAudience: {
          propertyTypes: ["villa", "apartment", "commercial"],
          locations: ["Casablanca", "Rabat", "Marrakech"],
          budgetRange: { min: null, max: null },
          prospectStatus: ["active", "interested"],
        },
        schedule: {
          frequency: "weekly",
          dayOfWeek: 1, // Monday
          time: "09:00",
          nextRun: "2024-01-22T09:00:00Z",
        },
        stats: {
          sent: 156,
          delivered: 152,
          opened: 89,
          clicked: 23,
          converted: 3,
        },
        createdAt: "2024-01-01",
        lastRun: "2024-01-15T09:00:00Z",
        template: "weekly_newsletter",
      },
      {
        id: "2",
        name: "Luxury Villa Alerts",
        subject: "New Luxury Villa Available - Perfect Match!",
        type: "new_property_alert",
        status: "active",
        targetAudience: {
          propertyTypes: ["villa"],
          locations: ["Casablanca", "Marrakech"],
          budgetRange: { min: 2000000, max: null },
          prospectStatus: ["active", "interested"],
        },
        schedule: {
          frequency: "once",
          time: "immediate",
        },
        stats: {
          sent: 12,
          delivered: 12,
          opened: 8,
          clicked: 5,
          converted: 1,
        },
        createdAt: "2024-01-10",
        lastRun: "2024-01-18T14:30:00Z",
        template: "property_alert",
      },
      {
        id: "3",
        name: "Apartment Seekers Campaign",
        subject: "Modern Apartments in Rabat - Your Dream Home Awaits",
        type: "custom",
        status: "scheduled",
        targetAudience: {
          propertyTypes: ["apartment"],
          locations: ["Rabat"],
          budgetRange: { min: 500000, max: 1500000 },
          prospectStatus: ["active"],
        },
        schedule: {
          frequency: "once",
          time: "2024-01-25T10:00:00Z",
          nextRun: "2024-01-25T10:00:00Z",
        },
        stats: {
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          converted: 0,
        },
        createdAt: "2024-01-18",
        template: "custom_template",
      },
      {
        id: "4",
        name: "Match Notifications",
        subject: "We Found Perfect Properties for You!",
        type: "match_notification",
        status: "active",
        targetAudience: {
          propertyTypes: ["villa", "apartment", "commercial"],
          locations: [],
          budgetRange: { min: null, max: null },
          prospectStatus: ["active", "interested"],
        },
        schedule: {
          frequency: "once",
          time: "immediate",
        },
        stats: {
          sent: 45,
          delivered: 44,
          opened: 32,
          clicked: 18,
          converted: 4,
        },
        createdAt: "2024-01-05",
        lastRun: "2024-01-19T16:45:00Z",
        template: "match_notification",
      },
    ]

    setCampaigns(sampleCampaigns)
    setFilteredCampaigns(sampleCampaigns)
  }, [router])

  useEffect(() => {
    let filtered = [...campaigns]

    if (searchTerm) {
      filtered = filtered.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          campaign.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((campaign) => campaign.status === statusFilter)
    }

    if (typeFilter !== "all") {
      filtered = filtered.filter((campaign) => campaign.type === typeFilter)
    }

    setFilteredCampaigns(filtered)
  }, [campaigns, searchTerm, statusFilter, typeFilter])

  if (!user) {
    return <div>Loading...</div>
  }

  const getStatusColor = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "completed":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return <Play className="h-3 w-3" />
      case "scheduled":
        return <Clock className="h-3 w-3" />
      case "paused":
        return <Pause className="h-3 w-3" />
      case "draft":
        return <Edit className="h-3 w-3" />
      case "completed":
        return <CheckCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const getTypeColor = (type: Campaign["type"]) => {
    switch (type) {
      case "weekly_newsletter":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "new_property_alert":
        return "bg-green-50 text-green-700 border-green-200"
      case "match_notification":
        return "bg-purple-50 text-purple-700 border-purple-200"
      case "custom":
        return "bg-orange-50 text-orange-700 border-orange-200"
      default:
        return "bg-gray-50 text-gray-700 border-gray-200"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const calculateOpenRate = (campaign: Campaign) => {
    return campaign.stats.sent > 0 ? Math.round((campaign.stats.opened / campaign.stats.sent) * 100) : 0
  }

  const calculateClickRate = (campaign: Campaign) => {
    return campaign.stats.opened > 0 ? Math.round((campaign.stats.clicked / campaign.stats.opened) * 100) : 0
  }

  const calculateConversionRate = (campaign: Campaign) => {
    return campaign.stats.sent > 0 ? Math.round((campaign.stats.converted / campaign.stats.sent) * 100) : 0
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
                <h1 className="text-xl font-bold text-primary">Campaign Management</h1>
                <p className="text-sm text-muted-foreground">Automated email marketing campaigns</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/prospects">
                <Button variant="outline">Prospects</Button>
              </Link>
              <Link href="/matches">
                <Button variant="outline">Matches</Button>
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
              <CardTitle className="text-sm font-medium">Total Campaigns</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{campaigns.length}</div>
              <p className="text-xs text-muted-foreground">All campaigns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
              <Play className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {campaigns.filter((c) => c.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently running</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">
                {campaigns.reduce((sum, c) => sum + c.stats.sent, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Emails sent</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Open Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {Math.round(
                  campaigns.reduce((sum, c) => sum + calculateOpenRate(c), 0) / Math.max(campaigns.length, 1),
                )}
                %
              </div>
              <p className="text-xs text-muted-foreground">Email opens</p>
            </CardContent>
          </Card>
        </div>

        {/* Campaigns Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Email Campaigns</CardTitle>
                <CardDescription>
                  Manage your automated marketing campaigns - {filteredCampaigns.length} of {campaigns.length} campaigns
                </CardDescription>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>

            {/* Filters */}
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex-1 max-w-sm">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search campaigns..."
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
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="weekly_newsletter">Weekly Newsletter</SelectItem>
                  <SelectItem value="new_property_alert">Property Alert</SelectItem>
                  <SelectItem value="match_notification">Match Notification</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-6">
              {filteredCampaigns.map((campaign) => (
                <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-semibold text-lg">{campaign.name}</h3>
                          <Badge className={getStatusColor(campaign.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(campaign.status)}
                              <span className="capitalize">{campaign.status}</span>
                            </div>
                          </Badge>
                          <Badge variant="outline" className={getTypeColor(campaign.type)}>
                            {campaign.type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{campaign.subject}</p>
                      </div>

                      <div className="text-right text-sm text-muted-foreground">
                        <div>Created {new Date(campaign.createdAt).toLocaleDateString()}</div>
                        {campaign.lastRun && <div>Last run {formatDate(campaign.lastRun)}</div>}
                        {campaign.schedule.nextRun && (
                          <div className="text-primary font-medium">
                            Next run {formatDate(campaign.schedule.nextRun)}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Campaign Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{campaign.stats.sent}</div>
                        <div className="text-xs text-muted-foreground">Sent</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{campaign.stats.delivered}</div>
                        <div className="text-xs text-muted-foreground">Delivered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">{calculateOpenRate(campaign)}%</div>
                        <div className="text-xs text-muted-foreground">Open Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{calculateClickRate(campaign)}%</div>
                        <div className="text-xs text-muted-foreground">Click Rate</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-secondary">{calculateConversionRate(campaign)}%</div>
                        <div className="text-xs text-muted-foreground">Conversion</div>
                      </div>
                    </div>

                    {/* Target Audience */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm">Target Audience:</h4>
                      <div className="flex flex-wrap gap-2">
                        {campaign.targetAudience.propertyTypes.map((type, index) => (
                          <Badge key={index} variant="secondary" className="text-xs capitalize">
                            {type}
                          </Badge>
                        ))}
                        {campaign.targetAudience.locations.map((location, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {location}
                          </Badge>
                        ))}
                        {campaign.targetAudience.budgetRange.min && campaign.targetAudience.budgetRange.max && (
                          <Badge variant="outline" className="text-xs">
                            {new Intl.NumberFormat("fr-MA", {
                              style: "currency",
                              currency: "MAD",
                              minimumFractionDigits: 0,
                            }).format(campaign.targetAudience.budgetRange.min)}{" "}
                            -{" "}
                            {new Intl.NumberFormat("fr-MA", {
                              style: "currency",
                              currency: "MAD",
                              minimumFractionDigits: 0,
                            }).format(campaign.targetAudience.budgetRange.max)}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Schedule Info */}
                    <div className="mb-4">
                      <h4 className="font-medium mb-2 text-sm">Schedule:</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {campaign.schedule.frequency === "weekly"
                            ? `Every ${["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][campaign.schedule.dayOfWeek || 0]} at ${campaign.schedule.time}`
                            : campaign.schedule.frequency === "monthly"
                              ? `Monthly at ${campaign.schedule.time}`
                              : "One-time campaign"}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-1" />
                          Analytics
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2">
                        {campaign.status === "active" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-yellow-600 border-yellow-600 bg-transparent"
                          >
                            <Pause className="h-4 w-4 mr-1" />
                            Pause
                          </Button>
                        )}
                        {campaign.status === "paused" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 border-green-600 bg-transparent"
                          >
                            <Play className="h-4 w-4 mr-1" />
                            Resume
                          </Button>
                        )}
                        {(campaign.status === "draft" || campaign.status === "scheduled") && (
                          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                            <Send className="h-4 w-4 mr-1" />
                            {campaign.status === "draft" ? "Send Now" : "Send Early"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCampaigns.length === 0 && (
              <div className="text-center py-12">
                <Mail className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No campaigns found</h3>
                <p className="text-sm text-muted-foreground">
                  {campaigns.length === 0
                    ? "Create your first email campaign to start marketing to prospects"
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
