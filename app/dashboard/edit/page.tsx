"use client";

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import { Loader } from "@/components/Loader"
import { fetchEvents, deleteEvent } from "@/lib/api"
import { Event, apiEventToUIEvent } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setIsLoading(true)
      const { events: fetchedEvents } = await fetchEvents(1, 10)
      setEvents(fetchedEvents)
      setError(null)
    } catch (err) {
      setError("Failed to load events")
      showToast("Failed to load events. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id)
      setEvents(events.filter(event => event._id !== id))
      showToast("Event deleted successfully")
    } catch (err) {
      showToast("Failed to delete event. Please try again.")
    }
  }

  // Rest of your component remains the same...
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={loadEvents}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Event
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event._id} className="relative">
            <EventCard event={event} isApiEvent={true} />
            <div className="absolute top-2 right-2 space-x-2">
              <Button asChild size="sm" variant="secondary">
                <Link href={`/dashboard/edit/${event._id}`}>Edit</Link>
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}