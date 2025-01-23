"use client"

import { useState, useEffect } from "react"
import EventCard from "@/components/event-card"
import { Pagination } from "@/components/Pagination"
import { fetchEvents, type Event } from "@/lib/api"
import { Loader } from "@/components/Loader"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const ITEMS_PER_PAGE = 3

type SortOption = 'date-asc' | 'date-desc' | 'name-asc' | 'name-desc' | 'location-asc' | 'location-desc'

export default function EventsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [events, setEvents] = useState<Event[]>([])
  const [sortedEvents, setSortedEvents] = useState<Event[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [sortBy, setSortBy] = useState<SortOption>('date-asc')

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true)
      try {
        const { events, total } = await fetchEvents(currentPage, ITEMS_PER_PAGE)
        setEvents(events)
        setSortedEvents(sortEvents(events, sortBy))
        setTotalPages(Math.ceil(total / ITEMS_PER_PAGE))
      } catch (error) {
        console.error("Error fetching events:", error)
      }
      setIsLoading(false)
    }

    loadEvents()
  }, [currentPage])

  useEffect(() => {
    setSortedEvents(sortEvents(events, sortBy))
  }, [sortBy, events])

  const sortEvents = (events: Event[], sortOption: SortOption) => {
    const sortedEvents = [...events]
    
    switch (sortOption) {
      case 'date-asc':
        return sortedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      case 'date-desc':
        return sortedEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      case 'name-asc':
        return sortedEvents.sort((a, b) => a.name.localeCompare(b.name))
      case 'name-desc':
        return sortedEvents.sort((a, b) => b.name.localeCompare(a.name))
      case 'location-asc':
        return sortedEvents.sort((a, b) => a.location.localeCompare(b.location))
      case 'location-desc':
        return sortedEvents.sort((a, b) => b.location.localeCompare(a.location))
      default:
        return sortedEvents
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleSortChange = (value: string) => {
    setSortBy(value as SortOption)
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Upcoming Events</h1>
        <div className="w-64">
          <Select
            value={sortBy}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date-asc">Date (Earliest first)</SelectItem>
              <SelectItem value="date-desc">Date (Latest first)</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="location-asc">Location (A-Z)</SelectItem>
              <SelectItem value="location-desc">Location (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => (
          <EventCard key={event._id} event={event} isApiEvent={true} />
        ))}
      </div>
      
      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  )
}