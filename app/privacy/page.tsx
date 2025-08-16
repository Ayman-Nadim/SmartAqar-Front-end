import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, Lock, Database, Users, Globe } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PrivacyPage() {
  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Eye,
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: Users,
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
    },
    {
      id: "international-transfers",
      title: "International Transfers",
      icon: Globe,
    },
    {
      id: "your-rights",
      title: "Your Rights",
      icon: Shield,
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
              <Link href="/features" className="text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                Contact
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
          <Badge className="mb-4">Privacy Policy</Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Privacy Matters
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            We are committed to protecting your privacy and ensuring the security of your personal information.
          </p>
          <p className="text-sm text-muted-foreground">Last updated: March 15, 2024</p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Table of Contents</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sections.map((section, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <section.icon className="h-5 w-5 text-primary" />
                      <CardTitle className="text-sm">
                        <Link href={`#${section.id}`}>{section.title}</Link>
                      </CardTitle>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="space-y-12">
              {/* Introduction */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  SMARTAQAR ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                  how we collect, use, disclose, and safeguard your information when you use our real estate SaaS
                  platform and related services.
                </p>
                <p className="text-muted-foreground">
                  By using our services, you agree to the collection and use of information in accordance with this
                  policy.
                </p>
              </div>

              {/* Information We Collect */}
              <div id="information-collection">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Database className="h-8 w-8 text-primary" />
                  Information We Collect
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Personal Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Name, email address, and contact information</li>
                      <li>Company name and business information</li>
                      <li>Payment and billing information</li>
                      <li>Profile information and preferences</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Property and Prospect Data</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Property listings, photos, and specifications</li>
                      <li>Prospect contact information and preferences</li>
                      <li>Communication history and interactions</li>
                      <li>Campaign performance and analytics data</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Technical Information</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>IP address, browser type, and device information</li>
                      <li>Usage patterns and feature interactions</li>
                      <li>Log files and error reports</li>
                      <li>Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Use Your Information */}
              <div id="information-use">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Eye className="h-8 w-8 text-primary" />
                  How We Use Your Information
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">We use the information we collect to:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Provide, operate, and maintain our services</li>
                    <li>Process transactions and manage your account</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Improve our services and develop new features</li>
                    <li>Analyze usage patterns and optimize performance</li>
                    <li>Detect, prevent, and address technical issues</li>
                    <li>Comply with legal obligations and protect our rights</li>
                  </ul>
                </div>
              </div>

              {/* Information Sharing */}
              <div id="information-sharing">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Users className="h-8 w-8 text-primary" />
                  Information Sharing
                </h2>
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    We do not sell, trade, or otherwise transfer your personal information to third parties except in
                    the following circumstances:
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Service Providers</h3>
                    <p className="text-muted-foreground">
                      We may share information with trusted third-party service providers who assist us in operating our
                      platform, conducting business, or serving our users.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Legal Requirements</h3>
                    <p className="text-muted-foreground">
                      We may disclose information when required by law or to protect our rights, property, or safety, or
                      that of our users or others.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3">Business Transfers</h3>
                    <p className="text-muted-foreground">
                      In the event of a merger, acquisition, or sale of assets, user information may be transferred as
                      part of the transaction.
                    </p>
                  </div>
                </div>
              </div>

              {/* Data Security */}
              <div id="data-security">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Lock className="h-8 w-8 text-primary" />
                  Data Security
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    We implement appropriate technical and organizational security measures to protect your personal
                    information against unauthorized access, alteration, disclosure, or destruction.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>End-to-end encryption for data transmission</li>
                    <li>Secure data storage with regular backups</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Employee training on data protection practices</li>
                  </ul>
                </div>
              </div>

              {/* International Transfers */}
              <div id="international-transfers">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Globe className="h-8 w-8 text-primary" />
                  International Transfers
                </h2>
                <p className="text-muted-foreground mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure that
                  such transfers comply with applicable data protection laws and provide adequate protection for your
                  personal information.
                </p>
                <p className="text-muted-foreground">
                  When we transfer personal information outside of Morocco, we use appropriate safeguards such as
                  standard contractual clauses or adequacy decisions.
                </p>
              </div>

              {/* Your Rights */}
              <div id="your-rights">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  Your Rights
                </h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">You have the following rights regarding your personal data:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>
                      <strong>Access:</strong> Request access to your personal information
                    </li>
                    <li>
                      <strong>Rectification:</strong> Request correction of inaccurate or incomplete data
                    </li>
                    <li>
                      <strong>Erasure:</strong> Request deletion of your personal information
                    </li>
                    <li>
                      <strong>Portability:</strong> Request transfer of your data to another service
                    </li>
                    <li>
                      <strong>Restriction:</strong> Request limitation of processing activities
                    </li>
                    <li>
                      <strong>Objection:</strong> Object to certain types of processing
                    </li>
                  </ul>
                  <p className="text-muted-foreground">
                    To exercise these rights, please contact us at privacy@smartaqar.com.
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-muted p-6 rounded-lg">
                  <p className="font-semibold mb-2">SMARTAQAR Privacy Team</p>
                  <p className="text-muted-foreground">Email: privacy@smartaqar.com</p>
                  <p className="text-muted-foreground">Address: 123 Boulevard Mohammed V, Casablanca, Morocco</p>
                  <p className="text-muted-foreground">Phone: +212 5 22 XX XX XX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Our team is here to help you understand how we protect your data and respect your privacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              asChild
            >
              <Link href="/support">Get Support</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
