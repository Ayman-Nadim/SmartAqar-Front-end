import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Building2, Users, Zap, Target, BarChart3, Mail, CheckCircle, Star, Check } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit bg-gradient-to-r from-primary to-secondary text-white">
                  <Zap className="w-3 h-3 mr-1" />
                  Automated Property Marketing
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight font-serif">
                  Revolutionize Your Property Catalogs with{" "}
                  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Smart Automation
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Transform how real estate agencies manage properties with intelligent prospect matching, automated
                  campaigns, and comprehensive catalog management.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="text-lg px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 bg-transparent border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Schedule Demo
                </Button>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  14-day free trial
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  No credit card required
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative p-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-2xl">
                <img
                  src="/modern-real-estate-office.png"
                  alt="Real Estate SaaS Platform Dashboard"
                  className="rounded-xl shadow-2xl w-full"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by Real Estate Professionals Section */}
      <section className="py-16 bg-gradient-to-r from-muted/30 to-muted/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground font-serif">
              Trusted by Real Estate Professionals
            </h2>
            <p className="text-lg text-muted-foreground">See our platform in action across different property types</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/luxury-villa-pool-garden.jpg"
                  alt="Luxury Villa Properties"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Luxury Villas</h3>
                  <p className="text-sm opacity-90">Premium residential properties</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/modern-apartment-balconies.jpeg"
                  alt="Modern Apartments"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Modern Apartments</h3>
                  <p className="text-sm opacity-90">Urban living solutions</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src="/retail-space-glass.jpg"
                  alt="Commercial Properties"
                  className="w-full h-64 object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">Commercial Spaces</h3>
                  <p className="text-sm opacity-90">Business opportunities</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">
              Everything You Need to Scale Your Agency
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From property catalog creation to automated prospect matching, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-lg transition-all hover:shadow-primary/10 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif">Smart Property Catalogs</CardTitle>
                <CardDescription>
                  Create comprehensive catalogs for villas, apartments, and commercial properties with advanced
                  filtering and detailed specifications.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:shadow-secondary/10 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif">Automated Prospect Matching</CardTitle>
                <CardDescription>
                  Instantly match new properties with interested prospects based on their preferences and automatically
                  notify them.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:shadow-accent/10 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif">Campaign Management</CardTitle>
                <CardDescription>
                  Launch weekly campaigns to showcase new properties to targeted prospect segments based on their
                  interests.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:shadow-primary/10 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif">Prospect Database</CardTitle>
                <CardDescription>
                  Maintain detailed prospect profiles with preferences, budget ranges, and interaction history for
                  better targeting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:shadow-secondary/10 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif">Analytics & Insights</CardTitle>
                <CardDescription>
                  Track property performance, prospect engagement, and campaign effectiveness with detailed analytics.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-lg transition-all hover:shadow-accent/10 group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="font-serif">Real-time Notifications</CardTitle>
                <CardDescription>
                  Get instant alerts when prospects show interest or when new matching opportunities arise.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">
              Trusted by Leading Real Estate Agencies
            </h2>
            <p className="text-xl text-muted-foreground">See how SMARTAQAR is transforming property marketing</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "SMARTAQAR has revolutionized how we manage our property listings. The automated matching saves us
                  hours every week."
                </p>
                <div className="flex items-center">
                  <img
                    src="/professional-real-estate-agent.png"
                    alt="Sarah Johnson"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">CEO, Premium Properties</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The campaign management feature has increased our lead conversion by 40%. It's a game-changer for our
                  agency."
                </p>
                <div className="flex items-center">
                  <img
                    src="/professional-real-estate-broker.png"
                    alt="Michael Chen"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Director, Urban Realty</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <CardContent className="pt-6 relative">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally, a platform that understands real estate. The prospect matching is incredibly accurate and
                  saves us so much time."
                </p>
                <div className="flex items-center">
                  <img
                    src="/professional-real-estate-manager.png"
                    alt="Emma Rodriguez"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className="font-semibold text-foreground">Emma Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Manager, Coastal Estates</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground font-serif">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect plan for your real estate agency. All plans include our core features.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter Plan */}
            <Card className="border-border hover:shadow-lg transition-all relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-serif">Starter</CardTitle>
                <CardDescription>Perfect for small agencies</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">299 DH</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Up to 50 properties</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">100 prospects database</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Basic automated matching</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Weekly campaigns</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Email support</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-primary hover:shadow-lg transition-all relative shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-1">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8 pt-8">
                <CardTitle className="text-2xl font-serif">Professional</CardTitle>
                <CardDescription>Ideal for growing agencies</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">599 DH</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Up to 200 properties</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">500 prospects database</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Advanced automated matching</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Daily campaigns</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Analytics & insights</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Custom branding</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                  Get Started
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-border hover:shadow-lg transition-all relative">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-serif">Enterprise</CardTitle>
                <CardDescription>For large agencies & networks</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">1299 DH</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Unlimited properties</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Unlimited prospects</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">AI-powered matching</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Real-time campaigns</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">24/7 dedicated support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">API access</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-4 w-4 text-primary mr-3" />
                    <span className="text-sm">Multi-agency management</span>
                  </li>
                </ul>
                <Button className="w-full mt-6 bg-transparent" variant="outline">
                  Contact Sales
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              All plans include 14-day free trial • No setup fees • Cancel anytime
            </p>
            <div className="flex justify-center items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                SSL Security
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Data Backup
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                99.9% Uptime
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold font-serif">Ready to Transform Your Real Estate Business?</h2>
            <p className="text-xl opacity-90">
              Join hundreds of agencies already using SMARTAQAR to automate their property marketing and boost sales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-primary hover:bg-white/90">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary bg-transparent"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
