import type { Event, UIEvent } from "@/lib/api"
import Link from "next/link"
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react"

interface EventCardProps {
  event: Event | UIEvent
  isApiEvent?: boolean
}

const EventCard: React.FC<EventCardProps> = ({ event, isApiEvent = false }) => {
  const id = isApiEvent ? (event as Event)._id : (event as UIEvent).id

  // Generate a pseudorandom background color based on event name
  const getBackgroundColor = (name: string) => {
    const colors = [
      'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30',
      'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30',
      'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30',
      'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/30',
      'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30'
    ]
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length
    return colors[index]
  }

  const firstLetter = event.name.charAt(0).toUpperCase()
  const bgColorClass = getBackgroundColor(event.name)

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className={`h-48 ${bgColorClass} relative flex flex-col items-center justify-center`}>
        <div className="z-10 flex flex-col items-center">
          <span className="text-4xl font-bold text-gray-600 dark:text-gray-300 mb-2">
            {firstLetter}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center px-4">
            {event.name}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{event.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {event.description.length > 100 
            ? `${event.description.substring(0, 100)}...`
            : event.description}
        </p>
        <div className="space-y-2">
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <CalendarIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <ClockIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-gray-400">
            <MapPinIcon className="w-5 h-5 mr-2 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <div className="mt-6">
          <Link
            href={`/events/${id}`}
            className="inline-block w-full text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventCard