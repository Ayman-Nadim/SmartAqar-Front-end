"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

const productLinks = [
  {
    title: "Product Overview",
    href: "/product",
    description: "Complete real estate solution overview",
  },
  {
    title: "Features",
    href: "/features",
    description: "All platform features and capabilities",
  },
  {
    title: "Pricing",
    href: "/pricing",
    description: "Simple, transparent pricing plans",
  },
  {
    title: "API",
    href: "/api",
    description: "Developer API and integrations",
  },
  {
    title: "Integrations",
    href: "/integrations",
    description: "Connect with your favorite tools",
  },
]

const companyLinks = [
  {
    title: "About Us",
    href: "/about",
    description: "Our mission and team",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "Latest insights and updates",
  },
  {
    title: "Careers",
    href: "/careers",
    description: "Join our growing team",
  },
  {
    title: "Contact",
    href: "/contact",
    description: "Get in touch with us",
  },
]

const supportLinks = [
  {
    title: "Support Center",
    href: "/support",
    description: "Get help when you need it",
  },
  {
    title: "Help Center",
    href: "/help-center",
    description: "Browse help articles and guides",
  },
  {
    title: "Documentation",
    href: "/documentation",
    description: "Technical documentation and API reference",
  },
  {
    title: "System Status",
    href: "/status",
    description: "Real-time system status and uptime",
  },
]

const legalLinks = [
  {
    title: "Privacy Policy",
    href: "/privacy",
    description: "How we protect your data",
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 p-4">
            <Image src="/smartaqar-logo.png" alt="SMARTAQAR Logo" width={64} height={64} className="h-16 w-16" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-primary">SmartAqar</span>
              <span className="text-sm text-muted-foreground">by 1Confirmed</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Product</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {productLinks.map((link) => (
                      <ListItem key={link.title} title={link.title} href={link.href}>
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Company</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {companyLinks.map((link) => (
                      <ListItem key={link.title} title={link.title} href={link.href}>
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Support</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {supportLinks.map((link) => (
                      <ListItem key={link.title} title={link.title} href={link.href}>
                        {link.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signin">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">Product</h3>
                  <div className="space-y-2">
                    {productLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Company</h3>
                  <div className="space-y-2">
                    {companyLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Support</h3>
                  <div className="space-y-2">
                    {supportLinks.map((link) => (
                      <Link
                        key={link.title}
                        href={link.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-md transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="space-y-2">
                    <Link href="/signin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full bg-transparent">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

const ListItem = ({ className, title, children, href, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50 focus:text-blue-600 dark:hover:bg-blue-950 dark:hover:text-blue-400 dark:focus:bg-blue-950 dark:focus:text-blue-400",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
