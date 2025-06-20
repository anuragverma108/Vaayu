"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Wind, MapPin } from "lucide-react"

interface AQIData {
  location: string
  aqi: number
  level: "Good" | "Moderate" | "Unhealthy for Sensitive Groups" | "Unhealthy" | "Very Unhealthy" | "Hazardous"
  recommendation: string
}

interface AQIAlertCardProps {
  data?: AQIData
  className?: string
}

export function AQIAlertCard({ data, className }: AQIAlertCardProps) {
  // Mock data if none provided
  const mockData: AQIData = {
    location: "San Francisco, CA",
    aqi: 85,
    level: "Moderate",
    recommendation: "Consider reducing outdoor activities if you have respiratory conditions.",
  }

  const aqiData = data || mockData

  const getAQIColor = (level: string) => {
    switch (level) {
      case "Good":
        return "bg-green-500"
      case "Moderate":
        return "bg-yellow-500"
      case "Unhealthy for Sensitive Groups":
        return "bg-orange-500"
      case "Unhealthy":
        return "bg-red-500"
      case "Very Unhealthy":
        return "bg-purple-500"
      case "Hazardous":
        return "bg-red-800"
      default:
        return "bg-gray-500"
    }
  }

  const shouldShowAlert = aqiData.aqi > 50

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Wind className="w-5 h-5" />
            Air Quality Index
          </CardTitle>
          {shouldShowAlert && <AlertTriangle className="w-5 h-5 text-orange-500" />}
        </div>
        <CardDescription className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {aqiData.location}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-bold">{aqiData.aqi}</div>
          <Badge variant="secondary" className={`${getAQIColor(aqiData.level)} text-white`}>
            {aqiData.level}
          </Badge>
        </div>

        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Recommendation:</strong> {aqiData.recommendation}
          </p>
        </div>

        <div className="text-xs text-muted-foreground">Last updated: {new Date().toLocaleTimeString()}</div>
      </CardContent>
    </Card>
  )
}
