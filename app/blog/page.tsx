import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "The Future of Real Estate Marketing: AI-Powered Prospect Matching",
      excerpt:
        "Discover how artificial intelligence is revolutionizing the way real estate professionals connect with potential buyers and sellers.",
      author: "Ahmed Hassan",
      date: "March 15, 2024",
      category: "Technology",
      readTime: "5 min read",
      featured: true,
    },
    {
      id: 2,
      title: "5 Essential Features Every Real Estate CRM Should Have",
      excerpt:
        "Learn about the must-have features that can transform your real estate business and improve client relationships.",
      author: "Sarah Khalil",
      date: "March 10, 2024",
      category: "Best Practices",
      readTime: "7 min read",
      featured: false,
    },
    {
      id: 3,
      title: "Maximizing ROI with Automated Email Campaigns",
      excerpt: "A comprehensive guide to setting up automated email campaigns that convert prospects into clients.",
      author: "Youssef Benali",
      date: "March 5, 2024",
      category: "Marketing",
      readTime: "6 min read",
      featured: false,
    },
    {
      id: 4,
      title: "Morocco's Real Estate Market: Trends and Opportunities in 2024",
      excerpt:
        "An in-depth analysis of the current real estate landscape in Morocco and emerging opportunities for agents.",
      author: "Fatima Alaoui",
      date: "February 28, 2024",
      category: "Market Analysis",
      readTime: "8 min read",
      featured: false,
    },
    {
      id: 5,
      title: "Building Trust in Digital Real Estate Transactions",
      excerpt: "How to maintain client trust and security when conducting real estate business in the digital age.",
      author: "Omar Benjelloun",
      date: "February 20, 2024",
      category: "Security",
      readTime: "4 min read",
      featured: false,
    },
    {
      id: 6,
      title: "The Complete Guide to Property Photography for Listings",
      excerpt: "Professional tips and techniques for capturing stunning property photos that attract more prospects.",
      author: "Laila Mansouri",
      date: "February 15, 2024",
      category: "Photography",
      readTime: "9 min read",
      featured: false,
    },
  ]

  const categories = ["All", "Technology", "Marketing", "Best Practices", "Market Analysis", "Security", "Photography"]

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
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/blog" className="text-primary font-medium">
                Blog
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
          <Badge className="mb-4">Blog</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Real Estate Insights
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Stay ahead of the curve with expert insights, industry trends, and practical tips for real estate
            professionals.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className="bg-transparent"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Article</h2>
          </div>

          {blogPosts
            .filter((post) => post.featured)
            .map((post) => (
              <Card key={post.id} className="mb-12 overflow-hidden border-0 shadow-lg">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="aspect-video md:aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                      <p className="text-lg font-medium">Featured Article</p>
                    </div>
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-4">{post.category}</Badge>
                    <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
                    <p className="text-muted-foreground mb-6">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <Button className="w-fit" asChild>
                      <Link href={`/blog/${post.id}`}>
                        Read Article <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Latest Articles</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts
              .filter((post) => !post.featured)
              .map((post) => (
                <Card key={post.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-center">
                      {post.category === "Technology" && <Zap className="h-12 w-12 text-primary mx-auto mb-2" />}
                      {post.category === "Marketing" && <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />}
                      {post.category === "Best Practices" && <Users className="h-12 w-12 text-primary mx-auto mb-2" />}
                      {post.category === "Market Analysis" && (
                        <TrendingUp className="h-12 w-12 text-primary mx-auto mb-2" />
                      )}
                      {post.category === "Security" && <Users className="h-12 w-12 text-primary mx-auto mb-2" />}
                      {post.category === "Photography" && <Users className="h-12 w-12 text-primary mx-auto mb-2" />}
                      <p className="text-sm font-medium">{post.category}</p>
                    </div>
                  </div>
                  <CardHeader>
                    <Badge className="w-fit mb-2">{post.category}</Badge>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{post.readTime}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${post.id}`}>
                          Read More <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and never miss the latest real estate insights and platform updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md border border-input bg-background"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of real estate professionals who are already using SMARTAQAR to grow their business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/signup">Start Free Trial</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
