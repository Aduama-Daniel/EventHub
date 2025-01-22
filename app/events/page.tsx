"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import  EventCard  from "@/components/event-card"
import { Pagination } from "@/components/Pagination"
import { fetchEvents, type Event } from "@/lib/api"
import { Loader } from "@/components/Loader"

const ITEMS_PER_PAGE = 6

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [events, setEvents] = useState<Event[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      try {
        const { events, total } = await fetchEvents(currentPage, ITEMS_PER_PAGE)
        setEvents(events)
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE))
      } catch (error) {
        console.error("Error fetching events:", error)
      }
      setIsLoading(false)
    }

    loadEvents()
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Link key={event._id} href={`/events/${event._id}`}>
            <EventCard event={event} />
          </Link>
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}

