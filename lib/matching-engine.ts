interface Property {
  id: string
  title: string
  type: "villa" | "apartment" | "commercial"
  price: number
  location: string
  status: "available" | "sold" | "pending"
  bedrooms?: number
  bathrooms?: number
  area: number
  features?: string[]
}

interface Prospect {
  id: string
  name: string
  email: string
  preferences: {
    budget: { min: number | null; max: number | null }
    propertyTypes: string[]
    locations: string[]
    bedrooms: number | null
    bathrooms: number | null
    area: { min: number | null; max: number | null }
    features: string[]
  }
  status: string
}

interface Match {
  propertyId: string
  prospectId: string
  score: number
  reasons: string[]
  createdAt: string
  status: "pending" | "sent" | "viewed" | "interested" | "rejected"
}

export class MatchingEngine {
  static calculateMatch(property: Property, prospect: Prospect): { score: number; reasons: string[] } {
    let score = 0
    const reasons: string[] = []
    const maxScore = 100

    // Skip if property is not available
    if (property.status !== "available") {
      return { score: 0, reasons: ["Property not available"] }
    }

    // Skip if prospect is not active
    if (prospect.status !== "active" && prospect.status !== "interested") {
      return { score: 0, reasons: ["Prospect not active"] }
    }

    // Property type matching (25 points)
    if (prospect.preferences.propertyTypes.includes(property.type)) {
      score += 25
      reasons.push(`Property type matches (${property.type})`)
    } else {
      return { score: 0, reasons: ["Property type doesn't match preferences"] }
    }

    // Budget matching (25 points)
    const { min: minBudget, max: maxBudget } = prospect.preferences.budget
    if (minBudget && maxBudget) {
      if (property.price >= minBudget && property.price <= maxBudget) {
        score += 25
        reasons.push(`Price within budget (${this.formatPrice(property.price)})`)
      } else if (property.price < minBudget) {
        // Property is cheaper than minimum - still good but lower score
        score += 15
        reasons.push(`Price below minimum budget (good value)`)
      } else {
        // Property is more expensive - significant penalty
        score -= 10
        reasons.push(`Price above maximum budget`)
      }
    } else if (minBudget && property.price >= minBudget) {
      score += 20
      reasons.push(`Price above minimum budget`)
    } else if (maxBudget && property.price <= maxBudget) {
      score += 20
      reasons.push(`Price within maximum budget`)
    }

    // Location matching (20 points)
    const propertyLocation = property.location.toLowerCase()
    const matchingLocations = prospect.preferences.locations.filter(
      (loc) => propertyLocation.includes(loc.toLowerCase()) || loc.toLowerCase().includes(propertyLocation),
    )

    if (matchingLocations.length > 0) {
      score += 20
      reasons.push(`Location matches preferences (${matchingLocations.join(", ")})`)
    } else if (prospect.preferences.locations.length === 0) {
      score += 10
      reasons.push("No specific location preference")
    }

    // Bedrooms matching (10 points)
    if (prospect.preferences.bedrooms && property.bedrooms) {
      if (property.bedrooms === prospect.preferences.bedrooms) {
        score += 10
        reasons.push(`Exact bedroom match (${property.bedrooms})`)
      } else if (property.bedrooms > prospect.preferences.bedrooms) {
        score += 5
        reasons.push(`More bedrooms than required (${property.bedrooms} vs ${prospect.preferences.bedrooms})`)
      } else {
        score -= 5
        reasons.push(`Fewer bedrooms than required`)
      }
    }

    // Bathrooms matching (5 points)
    if (prospect.preferences.bathrooms && property.bathrooms) {
      if (property.bathrooms >= prospect.preferences.bathrooms) {
        score += 5
        reasons.push(`Sufficient bathrooms (${property.bathrooms})`)
      } else {
        score -= 3
        reasons.push(`Insufficient bathrooms`)
      }
    }

    // Area matching (10 points)
    const { min: minArea, max: maxArea } = prospect.preferences.area
    if (minArea && maxArea) {
      if (property.area >= minArea && property.area <= maxArea) {
        score += 10
        reasons.push(`Area within range (${property.area}m²)`)
      } else if (property.area > maxArea) {
        score += 5
        reasons.push(`Larger than preferred area`)
      } else {
        score -= 5
        reasons.push(`Smaller than minimum area`)
      }
    } else if (minArea && property.area >= minArea) {
      score += 8
      reasons.push(`Area above minimum requirement`)
    }

    // Features matching (5 points)
    if (prospect.preferences.features.length > 0 && property.features) {
      const matchingFeatures = prospect.preferences.features.filter((feature) => property.features?.includes(feature))

      if (matchingFeatures.length > 0) {
        const featureScore = Math.min(5, (matchingFeatures.length / prospect.preferences.features.length) * 5)
        score += featureScore
        reasons.push(`${matchingFeatures.length} matching features: ${matchingFeatures.join(", ")}`)
      }
    }

    // Ensure score doesn't exceed maximum or go below 0
    score = Math.max(0, Math.min(maxScore, score))

    return { score: Math.round(score), reasons }
  }

  static findMatches(properties: Property[], prospects: Prospect[], minScore = 50): Match[] {
    const matches: Match[] = []

    for (const property of properties) {
      for (const prospect of prospects) {
        const { score, reasons } = this.calculateMatch(property, prospect)

        if (score >= minScore) {
          matches.push({
            propertyId: property.id,
            prospectId: prospect.id,
            score,
            reasons,
            createdAt: new Date().toISOString(),
            status: "pending",
          })
        }
      }
    }

    // Sort by score descending
    return matches.sort((a, b) => b.score - a.score)
  }

  static getMatchesForProperty(propertyId: string, matches: Match[]): Match[] {
    return matches.filter((match) => match.propertyId === propertyId).sort((a, b) => b.score - a.score)
  }

  static getMatchesForProspect(prospectId: string, matches: Match[]): Match[] {
    return matches.filter((match) => match.prospectId === prospectId).sort((a, b) => b.score - a.score)
  }

  static getMatchingScore(propertyId: string, prospectId: string, matches: Match[]): number {
    const match = matches.find((m) => m.propertyId === propertyId && m.prospectId === prospectId)
    return match?.score || 0
  }

  private static formatPrice(price: number): string {
    return new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      minimumFractionDigits: 0,
    }).format(price)
  }
}
