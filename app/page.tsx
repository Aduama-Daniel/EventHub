"use client"

import { useEffect, useState } from "react"
import { HeroSection } from "@/components/HeroSection"
import { FeaturedEvents } from "@/components/FeaturedEvents"
import { fetchEvents } from "@/lib/api"
import { Loader } from "@/components/Loader"
import { apiEventToUIEvent } from "@/lib/api"
import type { UIEvent } from "@/lib/api"

export default function Home() {
  const [events, setEvents] = useState<UIEvent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true)
        const { events: apiEvents } = await fetchEvents(1, 3) // Fetch 3 featured events
        // Convert API events to UI events
        const uiEvents = apiEvents.map(event => ({
          id: event._id,
          name: event.name,
          date: event.date,
          time: event.time,
          location: event.location,
          description: event.description,
          image: event.image
        }))
        setEvents(uiEvents)
      } catch (err) {
        setError("Failed to load events")
      } finally {
        setIsLoading(false)
      }
    }

    loadEvents()
  }, [])

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <HeroSection />
        <div className="flex justify-center items-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader />
        </div>
      ) : (
        <FeaturedEvents events={events} />
      )}
    </div>
  )
}