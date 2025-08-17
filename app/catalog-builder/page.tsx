"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Palette, Save, Upload, Globe, ArrowLeft, Type, Monitor, Smartphone, Tablet } from "lucide-react"
import Link from "next/link"
import { AuthService, type User } from "@/lib/auth"
import { CatalogPreview } from "@/components/catalog-preview"

interface CatalogConfig {
  // Branding
  agencyName: string
  logo?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string

  // Contact Info
  contactName: string
  email: string
  phone: string
  address: string
  website?: string

  // Content
  heroTitle: string
  heroSubtitle: string
  aboutText: string

  // Layout Options
  theme: "modern" | "classic" | "minimal" | "luxury"
  showHero: boolean
  showAbout: boolean
  showContact: boolean
  showTestimonials: boolean

  // SEO
  metaTitle: string
  metaDescription: string

  // Domain
  subdomain: string
}

const defaultConfig: CatalogConfig = {
  agencyName: "",
  primaryColor: "#007bff",
  secondaryColor: "#28a745",
  accentColor: "#ffc107",
  contactName: "",
  email: "",
  phone: "",
  address: "",
  heroTitle: "Find Your Dream Property",
  heroSubtitle: "Discover exceptional real estate opportunities with our expert team",
  aboutText:
    "We are a leading real estate agency committed to helping you find the perfect property. With years of experience and deep market knowledge, we provide personalized service to meet your unique needs.",
  theme: "modern",
  showHero: true,
  showAbout: true,
  showContact: true,
  showTestimonials: false,
  metaTitle: "",
  metaDescription: "",
  subdomain: "",
}

export default function CatalogBuilderPage() {
  const [user, setUser] = useState<User | null>(null)
  const [config, setConfig] = useState<CatalogConfig>(defaultConfig)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [activeTab, setActiveTab] = useState("branding")
  const router = useRouter()

  useEffect(() => {
    const loadUserAndConfig = async () => {
      try {
        const userData = await AuthService.getCurrentUser()
        if (!userData) {
          router.push("/signin")
          return
        }
        setUser(userData)

        // Load existing config or set defaults
        const existingConfig = { ...defaultConfig }
        existingConfig.agencyName = userData.agencyName || ""
        existingConfig.contactName = userData.name || ""
        existingConfig.email = userData.email || ""
        existingConfig.metaTitle = `${userData.agencyName} - Real Estate Properties`
        existingConfig.metaDescription = `Discover premium real estate properties with ${userData.agencyName}. Find your dream home today.`
        existingConfig.subdomain =
          userData.agencyName
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") || ""

        setConfig(existingConfig)
      } catch (error) {
        router.push("/signin")
      } finally {
        setIsLoading(false)
      }
    }

    loadUserAndConfig()
  }, [router])

  const handleConfigChange = (key: keyof CatalogConfig, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // In real app, save to API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log("Saving catalog config:", config)
      // Show success message
    } catch (error) {
      console.error("Failed to save:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    await handleSave()
    // In real app, trigger site generation
    console.log("Publishing catalog...")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading catalog builder...</p>
        </div>
      </div>
    )
  }

  if (!user) return null

  const themes = [
    { id: "modern", name: "Modern", description: "Clean and contemporary design" },
    { id: "classic", name: "Classic", description: "Traditional and elegant" },
    { id: "minimal", name: "Minimal", description: "Simple and focused" },
    { id: "luxury", name: "Luxury", description: "Premium and sophisticated" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="h-6 w-px bg-border"></div>
              <div>
                <h1 className="text-xl font-bold text-primary">Catalog Builder</h1>
                <p className="text-sm text-muted-foreground">Customize your property catalog</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
                <Button
                  variant={previewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="outline" onClick={handleSave} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? "Saving..." : "Save Draft"}
              </Button>

              <Button onClick={handlePublish} disabled={isSaving}>
                <Globe className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Configuration Panel */}
        <div className="w-80 border-r bg-card/30 overflow-y-auto">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="branding" className="text-xs">
                  <Palette className="h-4 w-4 mr-1" />
                  Design
                </TabsTrigger>
                <TabsTrigger value="content" className="text-xs">
                  <Type className="h-4 w-4 mr-1" />
                  Content
                </TabsTrigger>
              </TabsList>

              <TabsContent value="branding" className="space-y-6 mt-6">
                {/* Theme Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Theme</CardTitle>
                    <CardDescription className="text-xs">Choose your catalog style</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Select value={config.theme} onValueChange={(value: any) => handleConfigChange("theme", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {themes.map((theme) => (
                          <SelectItem key={theme.id} value={theme.id}>
                            <div>
                              <div className="font-medium">{theme.name}</div>
                              <div className="text-xs text-muted-foreground">{theme.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Colors */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Brand Colors</CardTitle>
                    <CardDescription className="text-xs">Customize your color scheme</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color" className="text-xs">
                        Primary Color
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="primary-color"
                          type="color"
                          value={config.primaryColor}
                          onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={config.primaryColor}
                          onChange={(e) => handleConfigChange("primaryColor", e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="secondary-color" className="text-xs">
                        Secondary Color
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="secondary-color"
                          type="color"
                          value={config.secondaryColor}
                          onChange={(e) => handleConfigChange("secondaryColor", e.target.value)}
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={config.secondaryColor}
                          onChange={(e) => handleConfigChange("secondaryColor", e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accent-color" className="text-xs">
                        Accent Color
                      </Label>
                      <div className="flex items-center space-x-2">
                        <input
                          id="accent-color"
                          type="color"
                          value={config.accentColor}
                          onChange={(e) => handleConfigChange("accentColor", e.target.value)}
                          className="w-8 h-8 rounded border"
                        />
                        <Input
                          value={config.accentColor}
                          onChange={(e) => handleConfigChange("accentColor", e.target.value)}
                          className="text-xs"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Logo Upload */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Logo</CardTitle>
                    <CardDescription className="text-xs">Upload your agency logo</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full bg-transparent">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Logo
                    </Button>
                  </CardContent>
                </Card>

                {/* Layout Options */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Sections</CardTitle>
                    <CardDescription className="text-xs">Choose which sections to display</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-hero" className="text-xs">
                        Hero Section
                      </Label>
                      <Switch
                        id="show-hero"
                        checked={config.showHero}
                        onCheckedChange={(checked) => handleConfigChange("showHero", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-about" className="text-xs">
                        About Section
                      </Label>
                      <Switch
                        id="show-about"
                        checked={config.showAbout}
                        onCheckedChange={(checked) => handleConfigChange("showAbout", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-contact" className="text-xs">
                        Contact Section
                      </Label>
                      <Switch
                        id="show-contact"
                        checked={config.showContact}
                        onCheckedChange={(checked) => handleConfigChange("showContact", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-testimonials" className="text-xs">
                        Testimonials
                      </Label>
                      <Switch
                        id="show-testimonials"
                        checked={config.showTestimonials}
                        onCheckedChange={(checked) => handleConfigChange("showTestimonials", checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-6 mt-6">
                {/* Agency Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Agency Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="agency-name" className="text-xs">
                        Agency Name
                      </Label>
                      <Input
                        id="agency-name"
                        value={config.agencyName}
                        onChange={(e) => handleConfigChange("agencyName", e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subdomain" className="text-xs">
                        Catalog URL
                      </Label>
                      <div className="flex items-center space-x-1">
                        <Input
                          id="subdomain"
                          value={config.subdomain}
                          onChange={(e) =>
                            handleConfigChange("subdomain", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                          }
                          className="text-xs"
                          placeholder="your-agency"
                        />
                        <span className="text-xs text-muted-foreground">.smartaqar.com</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name" className="text-xs">
                        Contact Person
                      </Label>
                      <Input
                        id="contact-name"
                        value={config.contactName}
                        onChange={(e) => handleConfigChange("contactName", e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-xs">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={config.email}
                        onChange={(e) => handleConfigChange("email", e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-xs">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={config.phone}
                        onChange={(e) => handleConfigChange("phone", e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-xs">
                        Address
                      </Label>
                      <Textarea
                        id="address"
                        value={config.address}
                        onChange={(e) => handleConfigChange("address", e.target.value)}
                        className="text-xs"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website" className="text-xs">
                        Website (Optional)
                      </Label>
                      <Input
                        id="website"
                        value={config.website || ""}
                        onChange={(e) => handleConfigChange("website", e.target.value)}
                        className="text-xs"
                        placeholder="https://your-website.com"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Content */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Page Content</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="hero-title" className="text-xs">
                        Hero Title
                      </Label>
                      <Input
                        id="hero-title"
                        value={config.heroTitle}
                        onChange={(e) => handleConfigChange("heroTitle", e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="hero-subtitle" className="text-xs">
                        Hero Subtitle
                      </Label>
                      <Textarea
                        id="hero-subtitle"
                        value={config.heroSubtitle}
                        onChange={(e) => handleConfigChange("heroSubtitle", e.target.value)}
                        className="text-xs"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="about-text" className="text-xs">
                        About Text
                      </Label>
                      <Textarea
                        id="about-text"
                        value={config.aboutText}
                        onChange={(e) => handleConfigChange("aboutText", e.target.value)}
                        className="text-xs"
                        rows={4}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* SEO */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">SEO Settings</CardTitle>
                    <CardDescription className="text-xs">Optimize for search engines</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="meta-title" className="text-xs">
                        Page Title
                      </Label>
                      <Input
                        id="meta-title"
                        value={config.metaTitle}
                        onChange={(e) => handleConfigChange("metaTitle", e.target.value)}
                        className="text-xs"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta-description" className="text-xs">
                        Meta Description
                      </Label>
                      <Textarea
                        id="meta-description"
                        value={config.metaDescription}
                        onChange={(e) => handleConfigChange("metaDescription", e.target.value)}
                        className="text-xs"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="flex-1 bg-muted/20">
          <div className="h-full flex items-center justify-center p-6">
            <div
              className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ${
                previewMode === "desktop"
                  ? "w-full h-full"
                  : previewMode === "tablet"
                    ? "w-[768px] h-[1024px]"
                    : "w-[375px] h-[667px]"
              }`}
            >
              <CatalogPreview config={config} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
