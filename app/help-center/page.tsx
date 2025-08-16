import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, BookOpen, Play, FileText, Users, Settings, BarChart3, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HelpCenterPage() {
  const categories = [
    {
      icon: BookOpen,
      title: "Getting Started",
      description: "Learn the basics of SMARTAQAR",
      articles: 12,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Users,
      title: "Managing Prospects",
      description: "Organize and track your prospects",
      articles: 8,
      color: "bg-green-100 text-green-600",
    },
    {
      icon: Settings,
      title: "Property Management",
      description: "Add and manage your listings",
      articles: 15,
      color: "bg-purple-100 text-purple-600",
    },
    {
      icon: Zap,
      title: "Automation & Campaigns",
      description: "Set up automated workflows",
      articles: 10,
      color: "bg-orange-100 text-orange-600",
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Track your performance",
      articles: 6,
      color: "bg-red-100 text-red-600",
    },
    {
      icon: Settings,
      title: "Account Settings",
      description: "Manage your account and billing",
      articles: 9,
      color: "bg-gray-100 text-gray-600",
    },
  ]

  const featuredArticles = [
    {
      title: "Complete Setup Guide for New Users",
      description: "Everything you need to know to get started with SMARTAQAR",
      category: "Getting Started",
      readTime: "10 min read",
      type: "guide",
    },
    {
      title: "How to Create Your First Property Listing",
      description: "Step-by-step tutorial on adding properties to your catalog",
      category: "Property Management",
      readTime: "5 min read",
      type: "tutorial",
    },
    {
      title: "Setting Up Automated Email Campaigns",
      description: "Learn how to create campaigns that convert prospects into clients",
      category: "Automation",
      readTime: "8 min read",
      type: "video",
    },
    {
      title: "Understanding Prospect Matching Algorithm",
      description: "How SMARTAQAR matches properties with interested prospects",
      category: "Prospects",
      readTime: "6 min read",
      type: "guide",
    },
  ]

  const popularArticles = [
    "How to import existing property data?",
    "Setting up WhatsApp integration",
    "Customizing email templates",
    "Managing user permissions",
    "Exporting analytics reports",
    "Troubleshooting login issues",
    "API rate limits and usage",
    "Mobile app features overview",
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
              <Link href="/features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/support" className="text-muted-foreground hover:text-foreground">
                Support
              </Link>
              <Link href="/help-center" className="text-primary font-medium">
                Help Center
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
          <Badge className="mb-4">Help Center</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Find Your Answers
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Search our comprehensive knowledge base for guides, tutorials, and answers to common questions.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input placeholder="Search help articles..." className="pl-10 py-3 text-lg" />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2">Search</Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Find help articles organized by topic</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${category.color}`}>
                    <category.icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{category.articles} articles</span>
                    <Button variant="ghost" size="sm">
                      Browse →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Articles</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Essential guides to help you get the most out of SMARTAQAR
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredArticles.map((article, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{article.category}</Badge>
                    {article.type === "video" && <Play className="h-4 w-4 text-primary" />}
                    {article.type === "guide" && <BookOpen className="h-4 w-4 text-primary" />}
                    {article.type === "tutorial" && <FileText className="h-4 w-4 text-primary" />}
                  </div>
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <CardDescription>{article.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                    <Button variant="ghost" size="sm">
                      Read More →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-8">Popular Articles</h2>
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <span className="font-medium">{article}</span>
                    <Button variant="ghost" size="sm">
                      →
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-8">Quick Links</h2>
              <div className="space-y-4">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Video Tutorials</CardTitle>
                    <CardDescription>Watch step-by-step video guides for common tasks</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Tutorials
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">API Documentation</CardTitle>
                    <CardDescription>Technical documentation for developers</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/documentation">
                        <FileText className="h-4 w-4 mr-2" />
                        View Docs
                      </Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Support</CardTitle>
                    <CardDescription>Can't find what you're looking for?</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/support">Get Help</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our support team is here to help you succeed with SMARTAQAR.
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
              <Link href="/contact">Schedule Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
