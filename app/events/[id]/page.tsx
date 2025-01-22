import type { Metadata } from "next"
import { notFound } from "next/navigation"
import EventDetails from "./EventDetails"
import { fetchEventById, apiEventToUIEvent } from "@/lib/api"
import type { Event } from "@/lib/api"

interface EventPageProps {
  params: { id: string }
}

const bufferToBase64 = (buffer: Buffer) => {
  if (!buffer) return '';
  try {
    return Buffer.from(buffer).toString('base64');
  } catch (error) {
    console.error('Error converting buffer to base64:', error);
    return '';
  }
}

const createImageUrl = (image?: { data: Buffer; contentType: string }) => {
  if (!image?.data) return '/placeholder.svg';
  try {
    const base64String = bufferToBase64(image.data);
    return `data:${image.contentType};base64,${base64String}`;
  } catch (error) {
    console.error('Error creating image URL:', error);
    return '/placeholder.svg';
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  try {
    const event = await fetchEventById(params.id)
    const imageUrl = createImageUrl(event.image);
    
    return {
      title: `${event.name} | Your Event Platform`,
      description: event.description,
      openGraph: {
        title: event.name,
        description: event.description,
        images: [{ url: imageUrl }],
      },
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
    
    const eventWithImageUrl = {
      ...uiEvent,
      imageUrl: createImageUrl(uiEvent.image)
    }
    
    return <EventDetails event={eventWithImageUrl} />
  } catch (error) {
    notFound()
  }
}