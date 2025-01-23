"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import EventCard from "@/components/event-card"
import { Loader } from "@/components/Loader"
import { fetchEvents, deleteEvent, type Event } from "@/lib/api"
import { toast } from "sonner"

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetchEvents()
      if (!response || !response.events) {
        throw new Error("Invalid response format")
      }
      setEvents(response.events)
    } catch (error) {
      console.error("Error fetching events:", error)
      setError("Failed to load events")
      toast.error("Failed to load events.")
    }
    setIsLoading(false)
  }

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id)
        toast.success("Event deleted successfully")
        loadEvents()
      } catch (error) {
        console.error("Error deleting event:", error)
        toast.error("Failed to delete event.")
      }
    }
  }

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
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/create">
            <Plus className="mr-2 h-4 w-4" />
            Create New Event
          </Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {events && events.length > 0 ? (
  events.map((event) => (
    <div key={event._id} className="relative">
      <EventCard 
        event={event} 
        hideDetailsButton 
        additionalActions={
          <>
            <Button asChild size="sm" variant="secondary">
              <Link href={`/dashboard/edit/${event._id}`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button 
              size="sm" 
              variant="destructive" 
              onClick={() => handleDeleteEvent(event._id)}
            >
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </>
        }
      />
    </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 mb-4">No events found</p>
            <Button asChild>
              <Link href="/dashboard/create">Create Your First Event</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}