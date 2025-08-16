import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle, Clock, Activity, Server, Database, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function StatusPage() {
  const systemStatus = "operational" // operational, degraded, outage

  const services = [
    {
      name: "API Services",
      status: "operational",
      uptime: "99.99%",
      responseTime: "45ms",
      icon: Server,
    },
    {
      name: "Database",
      status: "operational",
      uptime: "99.98%",
      responseTime: "12ms",
      icon: Database,
    },
    {
      name: "Web Application",
      status: "operational",
      uptime: "99.99%",
      responseTime: "120ms",
      icon: Globe,
    },
    {
      name: "Email Services",
      status: "operational",
      uptime: "99.97%",
      responseTime: "2.1s",
      icon: Activity,
    },
  ]

  const incidents = [
    {
      id: 1,
      title: "Scheduled Maintenance - Database Optimization",
      status: "completed",
      date: "March 10, 2024",
      time: "02:00 - 04:00 UTC",
      description: "Routine database maintenance to improve performance and reliability.",
      updates: [
        {
          time: "04:00 UTC",
          message: "Maintenance completed successfully. All services are fully operational.",
        },
        {
          time: "02:00 UTC",
          message: "Maintenance started. Some services may experience brief interruptions.",
        },
      ],
    },
    {
      id: 2,
      title: "API Response Time Degradation",
      status: "resolved",
      date: "March 5, 2024",
      time: "14:30 - 15:45 UTC",
      description: "Increased API response times due to high traffic volume.",
      updates: [
        {
          time: "15:45 UTC",
          message: "Issue resolved. API response times have returned to normal levels.",
        },
        {
          time: "15:20 UTC",
          message: "Implementing additional server capacity to handle increased load.",
        },
        {
          time: "14:30 UTC",
          message: "Investigating reports of slower API response times.",
        },
      ],
    },
  ]

  const metrics = [
    {
      title: "Overall Uptime",
      value: "99.99%",
      period: "Last 30 days",
    },
    {
      title: "Average Response Time",
      value: "89ms",
      period: "Last 24 hours",
    },
    {
      title: "Incidents Resolved",
      value: "100%",
      period: "Last 90 days",
    },
    {
      title: "Mean Time to Recovery",
      value: "12 min",
      period: "Average",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "degraded":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "outage":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-green-600 bg-green-100"
      case "degraded":
        return "text-yellow-600 bg-yellow-100"
      case "outage":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/smartaqar-logo.png" alt="SMARTAQAR" width={40} height={40} />
              <span className="text-xl font-bold text-primary">SMARTAQAR</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/product" className="text-muted-foreground hover:text-foreground">
                Product
              </Link>
              <Link href="/features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link href="/status" className="text-primary font-medium">
                Status
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/signin">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button>Get Started</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4">System Status</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            SMARTAQAR Status
          </h1>
          <div className="flex items-center justify-center gap-3 mb-8">
            {getStatusIcon(systemStatus)}
            <span className="text-xl font-medium">
              {systemStatus === "operational" && "All Systems Operational"}
              {systemStatus === "degraded" && "Some Systems Experiencing Issues"}
              {systemStatus === "outage" && "System Outage"}
            </span>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real-time status and performance metrics for all SMARTAQAR services.
          </p>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Current Status</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Live status of all SMARTAQAR services and components
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <service.icon className="h-6 w-6 text-primary" />
                      <CardTitle>{service.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(service.status)}
                      <Badge className={getStatusColor(service.status)}>
                        {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Uptime</p>
                      <p className="font-semibold">{service.uptime}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Response Time</p>
                      <p className="font-semibold">{service.responseTime}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Performance Metrics</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Key performance indicators for our platform reliability
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardHeader>
                  <CardTitle className="text-3xl font-bold text-primary">{metric.value}</CardTitle>
                  <CardDescription className="text-lg font-medium">{metric.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{metric.period}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Incidents</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Latest updates on system incidents and maintenance
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {incidents.map((incident) => (
              <Card key={incident.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{incident.title}</CardTitle>
                      <CardDescription>
                        {incident.date} • {incident.time}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusColor(incident.status)}>
                      {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{incident.description}</p>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Updates:</h4>
                    {incident.updates.map((update, index) => (
                      <div key={index} className="flex gap-3 text-sm">
                        <span className="text-muted-foreground font-mono">{update.time}</span>
                        <span>{update.message}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe to Updates */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Informed</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to status updates and get notified about incidents and maintenance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md border border-input bg-background max-w-md"
              />
              <Button>Subscribe to Updates</Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              You can also follow us on{" "}
              <Link href="#" className="text-primary hover:underline">
                Twitter
              </Link>{" "}
              for real-time updates.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Help?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            If you're experiencing issues not reflected on this page, please contact our support team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/support">Contact Support</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/help-center">Help Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
