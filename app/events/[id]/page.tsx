import type { Metadata } from "next"
import { notFound } from "next/navigation"
import EventDetails from "./EventDetails"
import { fetchEventById, apiEventToUIEvent } from "@/lib/api"

interface EventPageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  try {
    const event = await fetchEventById(params.id)
    
    return {
      title: `${event.name} | Your Event Platform`,
      description: event.description,
    }
  } catch (error) {
    return {
      title: "Event Not Found | Your Event Platform",
      description: "The requested event could not be found.",
    }
  }
}

export default async function EventPage({ params }: EventPageProps) {
  try {
    const apiEvent = await fetchEventById(params.id)
    const uiEvent = apiEventToUIEvent(apiEvent)
    
    return <EventDetails event={uiEvent} />
  } catch (error) {
    notFound()
  }
}