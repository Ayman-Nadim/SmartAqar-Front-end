import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Code, Book, Zap, Database, Globe, Shield, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function DocumentationPage() {
  const apiSections = [
    {
      icon: Database,
      title: "Properties API",
      description: "Manage property listings, photos, and specifications",
      endpoints: 8,
      path: "/properties",
    },
    {
      icon: Code,
      title: "Prospects API",
      description: "Handle prospect data and matching algorithms",
      endpoints: 6,
      path: "/prospects",
    },
    {
      icon: Zap,
      title: "Campaigns API",
      description: "Create and manage automated email campaigns",
      endpoints: 5,
      path: "/campaigns",
    },
    {
      icon: Shield,
      title: "Authentication",
      description: "Secure API access with OAuth 2.0 and API keys",
      endpoints: 4,
      path: "/auth",
    },
    {
      icon: Globe,
      title: "Webhooks",
      description: "Real-time notifications for events and updates",
      endpoints: 3,
      path: "/webhooks",
    },
    {
      icon: FileText,
      title: "Analytics API",
      description: "Access performance metrics and reporting data",
      endpoints: 7,
      path: "/analytics",
    },
  ]

  const quickStart = [
    {
      step: 1,
      title: "Get Your API Key",
      description: "Sign up for a SMARTAQAR account and generate your API key from the dashboard.",
      code: "curl -H 'Authorization: Bearer YOUR_API_KEY'",
    },
    {
      step: 2,
      title: "Make Your First Request",
      description: "Test the API by fetching your property listings.",
      code: "curl https://api.smartaqar.com/v1/properties",
    },
    {
      step: 3,
      title: "Create a Property",
      description: "Add a new property listing to your catalog.",
      code: `curl -X POST https://api.smartaqar.com/v1/properties \\
  -H "Content-Type: application/json" \\
  -d '{"title": "Luxury Villa", "price": 2500000}'`,
    },
  ]

  const sdks = [
    {
      name: "JavaScript/Node.js",
      description: "Official SDK for JavaScript and Node.js applications",
      install: "npm install @smartaqar/sdk",
      github: "https://github.com/smartaqar/js-sdk",
    },
    {
      name: "Python",
      description: "Python SDK for backend applications and data analysis",
      install: "pip install smartaqar-python",
      github: "https://github.com/smartaqar/python-sdk",
    },
    {
      name: "PHP",
      description: "PHP SDK for web applications and WordPress plugins",
      install: "composer require smartaqar/php-sdk",
      github: "https://github.com/smartaqar/php-sdk",
    },
  ]

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
              <Link href="/api" className="text-muted-foreground hover:text-foreground">
                API
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link href="/documentation" className="text-primary font-medium">
                Documentation
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
          <Badge className="mb-4">API Documentation</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Developer Resources
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Complete API documentation, SDKs, and guides to help you integrate SMARTAQAR into your applications.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input placeholder="Search documentation..." className="pl-10 py-3 text-lg" />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Search</Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start Guide</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get up and running with the SMARTAQAR API in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {quickStart.map((item, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{item.code}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">API Reference</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive documentation for all API endpoints
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apiSections.map((section, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{section.endpoints} endpoints</span>
                    <Button variant="ghost" size="sm">
                      View Docs →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Official SDKs</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Use our official SDKs to integrate SMARTAQAR in your preferred language
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {sdks.map((sdk, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    {sdk.name}
                  </CardTitle>
                  <CardDescription>{sdk.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-3 rounded text-sm font-mono">{sdk.install}</div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Get Started
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={sdk.github} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Code Examples</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real-world examples to help you get started quickly
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Create and Match Properties
                </CardTitle>
                <CardDescription>Example showing how to create a property and find matching prospects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-6 rounded-lg overflow-x-auto">
                  <pre className="text-sm">
                    <code>{`// Create a new property
const property = await smartaqar.properties.create({
  title: "Modern Apartment in Casablanca",
  type: "apartment",
  price: 1200000,
  currency: "MAD",
  location: {
    city: "Casablanca",
    district: "Maarif"
  },
  specifications: {
    bedrooms: 3,
    bathrooms: 2,
    area: 120
  }
});

// Find matching prospects
const matches = await smartaqar.prospects.findMatches(property.id);

// Send notifications to matched prospects
for (const match of matches) {
  await smartaqar.campaigns.send({
    prospectId: match.prospectId,
    propertyId: property.id,
    template: "new_property_match"
  });
}`}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Developer Support</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Get help when you need it most</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Book className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Guides & Tutorials</CardTitle>
                <CardDescription>Step-by-step guides for common integration patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Browse Guides
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Community Forum</CardTitle>
                <CardDescription>Connect with other developers and share solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent">
                  Join Forum
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Technical Support</CardTitle>
                <CardDescription>Direct access to our engineering team for complex issues</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/support">Get Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Building?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get your API key and start integrating SMARTAQAR into your applications today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/signup">Get API Key</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/api">View API Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
