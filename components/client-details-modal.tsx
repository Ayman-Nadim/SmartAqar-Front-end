"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Building2,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  TrendingUp,
  Crown,
  CheckCircle,
  Clock,
  AlertCircle,
  ExternalLink,
} from "lucide-react"

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

interface ClientDetailsModalProps {
  client: Client
  isOpen: boolean
  onClose: () => void
}

export function ClientDetailsModal({ client, isOpen, onClose }: ClientDetailsModalProps) {
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span>{client.agencyName}</span>
                <Badge className={`${getPlanColor(client.plan)} text-white`}>
                  {client.plan === "enterprise" && <Crown className="h-3 w-3 mr-1" />}
                  {client.plan.charAt(0).toUpperCase() + client.plan.slice(1)}
                </Badge>
                <Badge className={`${getStatusColor(client.status)} text-white`}>
                  {getStatusIcon(client.status)}
                  <span className="ml-1">{client.status.charAt(0).toUpperCase() + client.status.slice(1)}</span>
                </Badge>
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>Detailed information and analytics for this client</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{client.name}</p>
                    <p className="text-sm text-muted-foreground">Contact Person</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{client.email}</p>
                    <p className="text-sm text-muted-foreground">Email Address</p>
                  </div>
                </div>

                {client.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{client.phone}</p>
                      <p className="text-sm text-muted-foreground">Phone Number</p>
                    </div>
                  </div>
                )}

                {client.location && (
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{client.location}</p>
                      <p className="text-sm text-muted-foreground">Location</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{new Date(client.joinedDate).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">Joined Date</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{new Date(client.lastActive).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">Last Active</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{formatCurrency(client.monthlyRevenue)}</p>
                    <p className="text-sm text-muted-foreground">Monthly Revenue</p>
                  </div>
                </div>
              </div>

              {client.status === "trial" && client.trialEndsAt && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                    <div>
                      <p className="font-medium text-yellow-800">Trial Period</p>
                      <p className="text-sm text-yellow-700">
                        Ends on {new Date(client.trialEndsAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Usage Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building2 className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-primary">{client.propertiesCount}</div>
                  <p className="text-sm text-muted-foreground">Properties Listed</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-8 w-8 text-secondary" />
                  </div>
                  <div className="text-3xl font-bold text-secondary">{client.prospectsCount}</div>
                  <p className="text-sm text-muted-foreground">Prospects Managed</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-8 w-8 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-accent">{client.campaignsSent}</div>
                  <p className="text-sm text-muted-foreground">Campaigns Sent</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Catalog Information */}
          {client.catalogUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Client Catalog</CardTitle>
                <CardDescription>Public-facing property catalog for this client</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{client.catalogUrl}</p>
                      <p className="text-sm text-muted-foreground">Live catalog URL</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`https://${client.catalogUrl}`} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Catalog
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button>
              <TrendingUp className="h-4 w-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
