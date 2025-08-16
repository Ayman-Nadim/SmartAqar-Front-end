"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Upload, X } from "lucide-react"

interface AddPropertyModalProps {
  onAddProperty: (property: any) => void
}

export function AddPropertyModal({ onAddProperty }: AddPropertyModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    price: "",
    location: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    features: [] as string[],
    images: [] as string[],
  })

  const [newFeature, setNewFeature] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const property = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type as "villa" | "apartment" | "commercial",
      price: Number.parseInt(formData.price),
      location: formData.location,
      description: formData.description,
      bedrooms: formData.bedrooms ? Number.parseInt(formData.bedrooms) : undefined,
      bathrooms: formData.bathrooms ? Number.parseInt(formData.bathrooms) : undefined,
      area: Number.parseInt(formData.area),
      features: formData.features,
      status: "available" as const,
      image: formData.images[0] || "/real-estate-property.png",
      addedDate: new Date().toISOString().split("T")[0],
    }

    onAddProperty(property)
    setOpen(false)

    // Reset form
    setFormData({
      title: "",
      type: "",
      price: "",
      location: "",
      description: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      features: [],
      images: [],
    })
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  const removeFeature = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((f) => f !== feature),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
          <Plus className="h-4 w-4 mr-2" />
          Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
          <DialogDescription>Create a new property listing for your catalog</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Property Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Luxury Villa with Pool"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Property Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (MAD)</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                placeholder="e.g., 2500000"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g., Casablanca, Morocco"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area (m²)</Label>
              <Input
                id="area"
                type="number"
                value={formData.area}
                onChange={(e) => setFormData((prev) => ({ ...prev, area: e.target.value }))}
                placeholder="e.g., 450"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms (optional)</Label>
              <Input
                id="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                placeholder="e.g., 5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms (optional)</Label>
              <Input
                id="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
                placeholder="e.g., 4"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the property features, location benefits, etc."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Features</Label>
            <div className="flex space-x-2">
              <Input
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature (e.g., Swimming Pool)"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" onClick={addFeature} variant="outline">
                Add
              </Button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-secondary/20 text-secondary px-2 py-1 rounded-md text-sm flex items-center"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(feature)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Property Images</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Click to upload images or drag and drop</p>
              <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB each</p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-secondary">
              Add Property
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
