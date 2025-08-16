import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Building2, Users, Target, BarChart3, Zap, Mail, Filter, Camera, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function FeaturesPage() {
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
              <Link href="/features" className="text-primary font-medium">
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/api" className="text-muted-foreground hover:text-foreground">
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
          <Badge className="mb-4">All Features</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Everything You Need
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Discover all the powerful features that make SMARTAQAR the ultimate real estate management platform.
          </p>
        </div>
      </section>

      {/* Features Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Property Management */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Property Management</h2>
              <p className="text-lg text-muted-foreground">Complete control over your property listings</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Building2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Property Catalog</CardTitle>
                  <CardDescription>
                    Create detailed property listings with unlimited photos and specifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Unlimited property listings
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> High-resolution photo galleries
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Detailed property specifications
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Filter className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Advanced Filtering</CardTitle>
                  <CardDescription>Powerful search and filter options for easy property discovery</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Price range filtering
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Location-based search
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Property type categories
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Camera className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Media Management</CardTitle>
                  <CardDescription>Professional media handling for stunning property presentations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Photo optimization
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Virtual tour integration
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Video support
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Prospect Management */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Prospect Management</h2>
              <p className="text-lg text-muted-foreground">Intelligent prospect tracking and engagement</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Contact Database</CardTitle>
                  <CardDescription>Comprehensive prospect and client management system</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Unlimited contacts
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Detailed profiles
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Interaction history
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Target className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Smart Matching</CardTitle>
                  <CardDescription>AI-powered property-prospect matching algorithm</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Preference-based matching
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Automatic notifications
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Match scoring
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Calendar className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Activity Tracking</CardTitle>
                  <CardDescription>Track all interactions and follow-ups with prospects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Call logging
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Meeting scheduling
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Follow-up reminders
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Marketing Automation */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Marketing Automation</h2>
              <p className="text-lg text-muted-foreground">Automated campaigns that convert prospects into clients</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Mail className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Email Campaigns</CardTitle>
                  <CardDescription>Automated email marketing with personalized content</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Template library
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Personalization
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> A/B testing
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Trigger Automation</CardTitle>
                  <CardDescription>Set up automated workflows based on prospect behavior</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Behavior triggers
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Drip campaigns
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Custom workflows
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Campaign Analytics</CardTitle>
                  <CardDescription>Detailed insights into campaign performance and ROI</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Open rates
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Click tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-secondary" /> Conversion metrics
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience All Features</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start your free trial today and discover how SMARTAQAR can transform your real estate business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
