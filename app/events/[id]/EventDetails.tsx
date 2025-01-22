"use client"

import Link from "next/link"
import { ArrowLeft, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Image from "next/image"

interface Event {
  id: string
  name: string
  date: string
  time: string
  location: string
  description: string
  imageUrl: string
  image?: {
    data: Buffer
    contentType: string
  }
}

interface EventDetailsProps {
  event: Event
}

export default function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="aspect-video relative overflow-hidden rounded-lg">
              <Image 
                src={event.imageUrl}
                alt={event.name}
                fill
                className="object-cover"
                unoptimized={event.imageUrl.startsWith('data:')}
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{event.name}</h1>
              <div className="space-y-2">
                <p>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {event.time}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
              </div>
              <p className="text-muted-foreground">{event.description}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-6">
          <Button className="w-full sm:w-auto">Register for Event</Button>
          <Button variant="outline" className="ml-2">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}