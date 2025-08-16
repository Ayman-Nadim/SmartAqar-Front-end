import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/smartaqar-logo.png" alt="SMARTAQAR Logo" width={24} height={24} className="h-6 w-6" />
              <span className="text-lg font-bold text-sidebar-foreground">SMARTAQAR</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Revolutionizing real estate with intelligent automation and prospect matching.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/product" className="hover:text-sidebar-foreground transition-colors">
                  Product Overview
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-sidebar-foreground transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-sidebar-foreground transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/api" className="hover:text-sidebar-foreground transition-colors">
                  API
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="hover:text-sidebar-foreground transition-colors">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-sidebar-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-sidebar-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-sidebar-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sidebar-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/support" className="hover:text-sidebar-foreground transition-colors">
                  Support Center
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="hover:text-sidebar-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="hover:text-sidebar-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/status" className="hover:text-sidebar-foreground transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-sidebar-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SMARTAQAR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
