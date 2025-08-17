"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Building2,
  Users,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  TrendingUp,
  Mail,
  MapPin,
  Crown,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ClientDetailsModal } from "@/components/client-details-modal"
import Link from "next/link"

interface Client {
  id: string
  name: string
  agencyName: string
  email: string
  phone?: string
  location?: string
  plan: "starter" | "professional" | "enterprise"
  status: "active" | "trial" | "suspended" | "cancelled"
  joinedDate: string
  trialEndsAt?: string
  lastActive: string
  propertiesCount: number
  prospectsCount: number
  campaignsSent: number
  monthlyRevenue: number
  catalogUrl?: string
}

export default function ClientManagementPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [filteredClients, setFilteredClients] = useState<Client[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [planFilter, setPlanFilter] = useState<string>("all")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  useEffect(() => {
    // Mock client data - in real app, fetch from API
    const mockClients: Client[] = [
      {
        id: "1",
        name: "Ahmed Benali",
        agencyName: "Casablanca Premium Properties",
        email: "ahmed@casablancapremium.com",
        phone: "+212 6 12 34 56 78",
        location: "Casablanca, Morocco",
        plan: "professional",
        status: "active",
        joinedDate: "2024-01-15",
        lastActive: "2024-01-20",
        propertiesCount: 45,
        prospectsCount: 120,
        campaignsSent: 8,
        monthlyRevenue: 599,
        catalogUrl: "casablanca-premium.smartaqar.com",
      },
      {
        id: "2",
        name: "Fatima El Mansouri",
        agencyName: "Rabat Elite Realty",
        email: "fatima@rabatelite.com",
        phone: "+212 6 98 76 54 32",
        location: "Rabat, Morocco",
        plan: "enterprise",
        status: "active",
        joinedDate: "2023-11-20",
        lastActive: "2024-01-19",
        propertiesCount: 180,
        prospectsCount: 450,
        campaignsSent: 25,
        monthlyRevenue: 1299,
        catalogUrl: "rabat-elite.smartaqar.com",
      },
      {
        id: "3",
        name: "Youssef Alami",
        agencyName: "Marrakech Luxury Homes",
        email: "youssef@marrakechluxury.com",
        location: "Marrakech, Morocco",
        plan: "starter",
        status: "trial",
        joinedDate: "2024-01-10",
        trialEndsAt: "2024-01-24",
        lastActive: "2024-01-18",
        propertiesCount: 12,
        prospectsCount: 35,
        campaignsSent: 2,
        monthlyRevenue: 0,
        catalogUrl: "marrakech-luxury.smartaqar.com",
      },
      {
        id: "4",
        name: "Laila Benjelloun",
        agencyName: "Tangier Coastal Properties",
        email: "laila@tangiercoastal.com",
        phone: "+212 6 55 44 33 22",
        location: "Tangier, Morocco",
        plan: "professional",
        status: "suspended",
        joinedDate: "2023-08-12",
        lastActive: "2024-01-05",
        propertiesCount: 67,
        prospectsCount: 89,
        campaignsSent: 12,
        monthlyRevenue: 0,
        catalogUrl: "tangier-coastal.smartaqar.com",
      },
      {
        id: "5",
        name: "Omar Tazi",
        agencyName: "Fez Heritage Properties",
        email: "omar@fezheritage.com",
        location: "Fez, Morocco",
        plan: "starter",
        status: "active",
        joinedDate: "2024-01-08",
        lastActive: "2024-01-20",
        propertiesCount: 28,
        prospectsCount: 65,
        campaignsSent: 4,
        monthlyRevenue: 299,
        catalogUrl: "fez-heritage.smartaqar.com",
      },
    ]

    setClients(mockClients)
    setFilteredClients(mockClients)
  }, [])

  useEffect(() => {
    let filtered = [...clients]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((client) => client.status === statusFilter)
    }

    // Plan filter
    if (planFilter !== "all") {
      filtered = filtered.filter((client) => client.plan === planFilter)
    }

    setFilteredClients(filtered)
  }, [clients, searchTerm, statusFilter, planFilter])

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "starter":
        return "bg-blue-500"
      case "professional":
        return "bg-green-500"
      case "enterprise":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "trial":
        return "bg-yellow-500"
      case "suspended":
        return "bg-red-500"
      case "cancelled":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4" />
      case "trial":
        return <Clock className="h-4 w-4" />
      case "suspended":
        return <AlertCircle className="h-4 w-4" />
      case "cancelled":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const totalRevenue = clients.reduce((sum, client) => sum + client.monthlyRevenue, 0)
  const activeClients = clients.filter((client) => client.status === "active").length
  const trialClients = clients.filter((client) => client.status === "trial").length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="/smartaqar-logo.png" alt="SMARTAQAR" className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold text-primary">SMARTAQAR Admin</h1>
                <p className="text-sm text-muted-foreground">Client Management Dashboard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/admin/analytics">
                <Button variant="outline" size="sm">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <Link href="/admin/settings">
                <Button variant="outline" size="sm">
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{clients.length}</div>
              <p className="text-xs text-muted-foreground">Registered agencies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeClients}</div>
              <p className="text-xs text-muted-foreground">Paying customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Trial Users</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{trialClients}</div>
              <p className="text-xs text-muted-foreground">Free trial period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{formatCurrency(totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">Current month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Client Management</CardTitle>
            <CardDescription>Manage all registered agencies and their subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="search">Search clients</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name, agency, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <div>
                  <Label htmlFor="status-filter">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="plan-filter">Plan</Label>
                  <Select value={planFilter} onValueChange={setPlanFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Plans</SelectItem>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Clients Table */}
            <div className="space-y-4">
              {filteredClients.map((client) => (
                <Card key={client.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-lg">{client.agencyName}</h3>
                            <Badge className={`${getPlanColor(client.plan)} text-white`}>
                              {client.plan === "enterprise" && <Crown className="h-3 w-3 mr-1" />}
                              {client.plan.charAt(0).toUpperCase() + client.plan.slice(1)}
                            </Badge>
                            <Badge className={`${getStatusColor(client.status)} text-white`}>
                              {getStatusIcon(client.status)}
                              <span className="ml-1">
                                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
                              </span>
                            </Badge>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Users className="h-4 w-4 mr-1" />
                              {client.name}
                            </span>
                            <span className="flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {client.email}
                            </span>
                            {client.location && (
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {client.location}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{client.propertiesCount}</div>
                          <div className="text-xs text-muted-foreground">Properties</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-secondary">{client.prospectsCount}</div>
                          <div className="text-xs text-muted-foreground">Prospects</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-accent">{client.campaignsSent}</div>
                          <div className="text-xs text-muted-foreground">Campaigns</div>
                        </div>

                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary">{formatCurrency(client.monthlyRevenue)}</div>
                          <div className="text-xs text-muted-foreground">Monthly</div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedClient(client)
                                setIsDetailsModalOpen(true)
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            {client.catalogUrl && (
                              <DropdownMenuItem asChild>
                                <Link href={`https://${client.catalogUrl}`} target="_blank">
                                  <Building2 className="mr-2 h-4 w-4" />
                                  View Catalog
                                </Link>
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Client
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Suspend Account
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {client.status === "trial" && client.trialEndsAt && (
                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                          <span className="text-sm text-yellow-800">
                            Trial ends on {new Date(client.trialEndsAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}

              {filteredClients.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-muted-foreground mb-2">No clients found</h3>
                  <p className="text-sm text-muted-foreground">
                    {clients.length === 0 ? "No clients have registered yet" : "Try adjusting your search or filters"}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client Details Modal */}
      {selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false)
            setSelectedClient(null)
          }}
        />
      )}
    </div>
  )
}
