import { Event, UIEvent } from "@/lib/api"
import Link from "next/link"
import Image from "next/image"

interface EventCardProps {
  event: Event | UIEvent
  isApiEvent?: boolean
}

const bufferToBase64 = (buffer: Buffer) => {
  if (!buffer) return '';
  // Check if buffer is already a base64 string
  if (typeof buffer === 'string') return buffer;
  // Handle Buffer object
  try {
    return Buffer.from(buffer).toString('base64');
  } catch (error) {
    console.error('Error converting buffer to base64:', error);
    return '';
  }
}

const EventCard: React.FC<EventCardProps> = ({ event, isApiEvent = false }) => {
  const id = isApiEvent ? (event as Event)._id : (event as UIEvent).id
  
  console.log('Event image data:', event.image); // Debug log
  
  // Create image source from buffer data if available
  let imageSource = '/placeholder.svg';
  if (event.image?.data) {
    try {
      const base64String = bufferToBase64(event.image.data);
      imageSource = `data:${event.image.contentType};base64,${base64String}`;
      console.log('Generated image source:', imageSource.substring(0, 50) + '...'); // Debug log
    } catch (error) {
      console.error('Error creating image source:', error);
    }
  }
  
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative w-full h-48">
        <Image 
          src={imageSource}
          alt={event.name}
          fill
          className="object-cover"
          unoptimized={imageSource.startsWith('data:')} // Add this for base64 images
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{event.name}</h2>
        <p className="text-gray-600">{event.description.substring(0, 100)}...</p>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(event.date).toLocaleDateString()} at {event.time}
        </p>
        <p className="text-sm text-gray-500">{event.location}</p>
        <Link href={`/events/${id}`} className="block mt-2 text-blue-500 hover:underline">
          Learn More
        </Link>
      </div>
    </div>
  )
}

export default EventCard