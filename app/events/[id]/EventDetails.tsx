"use client";

import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

interface EventDetailsProps {
  event: Event;
}

export default function EventDetails({ event }: EventDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/events">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Link>
      </Button>
      <Card className="dark:bg-gray-800 dark:border-gray-700">
        <CardContent className="p-6 dark:bg-gray-800 dark:text-gray-100">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-400 dark:text-gray-300">
                {event.name.charAt(0).toUpperCase()}
              </span>
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
              <p className="text-muted-foreground dark:text-gray-400">
                {event.description}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/50 dark:bg-gray-800 dark:border-t dark:border-gray-700 p-6">
          <Button variant="outline" className="ml-2 dark:border-gray-600 dark:text-gray-100">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
