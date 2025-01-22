import Link from "next/link"
import { Button } from "@/components/ui/button"
import  EventCard  from "@/components/event-card"
import { ArrowRight } from "lucide-react"
import { UIEvent } from "@/lib/api"


interface FeaturedEventsProps {
    events: UIEvent[]
  }
  
  export function FeaturedEvents({ events, isLoading }: FeaturedEventsProps & { isLoading?: boolean }) {
    if (isLoading) {
      return <div>Loading events...</div>;
    }
  
    if (!events.length) {
      return <div>No events found</div>;
    }
    return (
      <section className="py-12 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">Featured Events</h2>
            <Button asChild variant="ghost">
              <Link href="/events">
                View all
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} isApiEvent={false} />
            ))}
          </div>
        </div>
      </section>
    )
  }

