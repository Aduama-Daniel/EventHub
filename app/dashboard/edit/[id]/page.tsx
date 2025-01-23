"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { toast } from "sonner"
import { fetchEventById } from "@/lib/api"
import { EventForm } from "@/components/CreateEventForm"
import { Loader } from "@/components/Loader"

export default function EditEventPage() {
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [eventData, setEventData] = useState<{
    name: string
    date: Date
    time: string
    location: string
    description: string
  } | null>(null)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const event = await fetchEventById(id as string)
        setEventData({
          name: event.name,
          date: new Date(event.date),
          time: event.time,
          location: event.location,
          description: event.description,
        })
      } catch (error) {
        console.error("Error fetching event:", error)
        toast.error("Failed to load event details.")
      }
      setIsLoading(false)
    }

    loadEvent()
  }, [id])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {eventData && (
        <EventForm 
          mode="edit"
          eventId={id as string}
          initialData={eventData}
        />
      )}
    </div>
  )
}