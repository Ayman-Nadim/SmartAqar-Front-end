import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Zap, Shield, Globe, Webhook } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function APIPage() {
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
              <Link href="/api" className="text-primary font-medium">
                API
              </Link>
              <Link href="/integrations" className="text-muted-foreground hover:text-foreground">
                Integrations
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
          <Badge className="mb-4">Developer API</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Build with SMARTAQAR API
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Integrate SMARTAQAR's powerful real estate features into your applications with our comprehensive REST API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/documentation">View Documentation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/signup">Get API Key</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">API Capabilities</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to build powerful real estate applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Property Management</CardTitle>
                <CardDescription>
                  Full CRUD operations for properties, including listings, photos, and specifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  GET /api/properties
                  <br />
                  POST /api/properties
                  <br />
                  PUT /api/properties/:id
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Code className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Prospect Management</CardTitle>
                <CardDescription>
                  Manage contacts, preferences, and matching algorithms programmatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  GET /api/prospects
                  <br />
                  POST /api/prospects
                  <br />
                  GET /api/matches/:id
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Webhook className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>
                  Real-time notifications for property updates, new matches, and campaign events.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  property.created
                  <br />
                  match.found
                  <br />
                  campaign.sent
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Campaign API</CardTitle>
                <CardDescription>
                  Trigger and manage email campaigns, track performance, and analyze results.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  POST /api/campaigns
                  <br />
                  GET /api/campaigns/:id
                  <br />
                  GET /api/analytics
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Authentication</CardTitle>
                <CardDescription>
                  Secure API access with OAuth 2.0, API keys, and role-based permissions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  Bearer Token
                  <br />
                  API Key
                  <br />
                  OAuth 2.0
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Globe className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Global Access</CardTitle>
                <CardDescription>
                  99.9% uptime SLA with global CDN and rate limiting for reliable performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-3 rounded text-sm font-mono">
                  Rate Limit: 1000/hour
                  <br />
                  Global CDN
                  <br />
                  99.9% Uptime SLA
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Quick Start Example</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with the SMARTAQAR API in minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Create a Property Listing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-6 rounded-lg overflow-x-auto text-sm">
                  {`curl -X POST https://api.smartaqar.com/v1/properties \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Luxury Villa in Casablanca",
    "type": "villa",
    "price": 2500000,
    "currency": "MAD",
    "location": {
      "city": "Casablanca",
      "district": "Anfa"
    },
    "specifications": {
      "bedrooms": 4,
      "bathrooms": 3,
      "area": 350
    },
    "description": "Beautiful villa with garden and pool"
  }'`}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">API Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing based on your usage needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Developer</CardTitle>
                <CardDescription>Perfect for testing and small projects</CardDescription>
                <div className="text-3xl font-bold mt-4">Free</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>1,000 API calls/month</li>
                  <li>Basic support</li>
                  <li>Rate limit: 100/hour</li>
                </ul>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary">
              <CardHeader>
                <Badge className="w-fit mb-2">Most Popular</Badge>
                <CardTitle>Professional</CardTitle>
                <CardDescription>For growing applications and businesses</CardDescription>
                <div className="text-3xl font-bold mt-4">
                  299 DH<span className="text-sm font-normal">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>50,000 API calls/month</li>
                  <li>Priority support</li>
                  <li>Rate limit: 1,000/hour</li>
                  <li>Webhooks included</li>
                </ul>
                <Button className="w-full mt-6">Choose Plan</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Enterprise</CardTitle>
                <CardDescription>For large-scale applications</CardDescription>
                <div className="text-3xl font-bold mt-4">Custom</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Unlimited API calls</li>
                  <li>24/7 dedicated support</li>
                  <li>Custom rate limits</li>
                  <li>SLA guarantee</li>
                </ul>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Building Today</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Get your API key and start integrating SMARTAQAR into your applications.
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
              <Link href="/documentation">View Docs</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
