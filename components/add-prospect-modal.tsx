"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, X } from "lucide-react"

interface AddProspectModalProps {
  onAddProspect: (prospect: any) => void
}

export function AddProspectModal({ onAddProspect }: AddProspectModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    minBudget: "",
    maxBudget: "",
    propertyTypes: [] as string[],
    locations: [] as string[],
    bedrooms: "",
    bathrooms: "",
    minArea: "",
    maxArea: "",
    features: [] as string[],
    notes: "",
    status: "active",
    source: "",
  })

  const [newLocation, setNewLocation] = useState("")
  const [newFeature, setNewFeature] = useState("")

  const propertyTypes = ["villa", "apartment", "commercial"]
  const commonFeatures = [
    "Swimming Pool",
    "Garden",
    "Garage",
    "Security System",
    "Balcony",
    "Elevator",
    "Parking",
    "City View",
    "Sea View",
    "Modern Kitchen",
    "Air Conditioning",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const prospect = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      preferences: {
        budget: {
          min: formData.minBudget ? Number.parseInt(formData.minBudget) : null,
          max: formData.maxBudget ? Number.parseInt(formData.maxBudget) : null,
        },
        propertyTypes: formData.propertyTypes,
        locations: formData.locations,
        bedrooms: formData.bedrooms ? Number.parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? Number.parseInt(formData.bathrooms) : null,
        area: {
          min: formData.minArea ? Number.parseInt(formData.minArea) : null,
          max: formData.maxArea ? Number.parseInt(formData.maxArea) : null,
        },
        features: formData.features,
      },
      notes: formData.notes,
      status: formData.status,
      source: formData.source,
      addedDate: new Date().toISOString().split("T")[0],
      lastContact: null,
      matchedProperties: [],
    }

    onAddProspect(prospect)
    setOpen(false)

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      budget: "",
      minBudget: "",
      maxBudget: "",
      propertyTypes: [],
      locations: [],
      bedrooms: "",
      bathrooms: "",
      minArea: "",
      maxArea: "",
      features: [],
      notes: "",
      status: "active",
      source: "",
    })
  }

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        propertyTypes: [...prev.propertyTypes, type],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        propertyTypes: prev.propertyTypes.filter((t) => t !== type),
      }))
    }
  }

  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, feature],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        features: prev.features.filter((f) => f !== feature),
      }))
    }
  }

  const addLocation = () => {
    if (newLocation.trim() && !formData.locations.includes(newLocation.trim())) {
      setFormData((prev) => ({
        ...prev,
        locations: [...prev.locations, newLocation.trim()],
      }))
      setNewLocation("")
    }
  }

  const removeLocation = (location: string) => {
    setFormData((prev) => ({
      ...prev,
      locations: prev.locations.filter((l) => l !== location),
    }))
  }

  const addCustomFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }))
      setNewFeature("")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-gradient-to-r from-secondary to-primary">
          <Plus className="h-4 w-4 mr-2" />
          Add Prospect
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Prospect</DialogTitle>
          <DialogDescription>Add a new prospect to your database with their preferences</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Ahmed Benali"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="e.g., ahmed@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                  placeholder="e.g., +212 6 12 34 56 78"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="source">Source</Label>
                <Select
                  value={formData.source}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, source: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="How did they find you?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="website">Website</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="walk-in">Walk-in</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Prospect status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="interested">Interested</SelectItem>
                    <SelectItem value="converted">Converted</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Property Preferences</h3>

            {/* Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="minBudget">Min Budget (MAD)</Label>
                <Input
                  id="minBudget"
                  type="number"
                  value={formData.minBudget}
                  onChange={(e) => setFormData((prev) => ({ ...prev, minBudget: e.target.value }))}
                  placeholder="e.g., 500000"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxBudget">Max Budget (MAD)</Label>
                <Input
                  id="maxBudget"
                  type="number"
                  value={formData.maxBudget}
                  onChange={(e) => setFormData((prev) => ({ ...prev, maxBudget: e.target.value }))}
                  placeholder="e.g., 2000000"
                />
              </div>
            </div>

            {/* Property Types */}
            <div className="space-y-2">
              <Label>Property Types</Label>
              <div className="flex space-x-6">
                {propertyTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={formData.propertyTypes.includes(type)}
                      onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
                    />
                    <Label htmlFor={type} className="capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="space-y-2">
              <Label>Preferred Locations</Label>
              <div className="flex space-x-2">
                <Input
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder="Add a location (e.g., Casablanca)"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLocation())}
                />
                <Button type="button" onClick={addLocation} variant="outline">
                  Add
                </Button>
              </div>
              {formData.locations.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.locations.map((location, index) => (
                    <div
                      key={index}
                      className="bg-primary/20 text-primary px-2 py-1 rounded-md text-sm flex items-center"
                    >
                      {location}
                      <button
                        type="button"
                        onClick={() => removeLocation(location)}
                        className="ml-2 text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bedrooms and Bathrooms */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bedrooms: e.target.value }))}
                  placeholder="e.g., 3"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bathrooms: e.target.value }))}
                  placeholder="e.g., 2"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minArea">Min Area (m²)</Label>
                <Input
                  id="minArea"
                  type="number"
                  value={formData.minArea}
                  onChange={(e) => setFormData((prev) => ({ ...prev, minArea: e.target.value }))}
                  placeholder="e.g., 100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxArea">Max Area (m²)</Label>
                <Input
                  id="maxArea"
                  type="number"
                  value={formData.maxArea}
                  onChange={(e) => setFormData((prev) => ({ ...prev, maxArea: e.target.value }))}
                  placeholder="e.g., 300"
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2">
              <Label>Desired Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {commonFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                    />
                    <Label htmlFor={feature} className="text-sm">
                      {feature}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="flex space-x-2 mt-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add custom feature"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomFeature())}
                />
                <Button type="button" onClick={addCustomFeature} variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Additional notes about the prospect's preferences or requirements..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-secondary to-primary">
              Add Prospect
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
