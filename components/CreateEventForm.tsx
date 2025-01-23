"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { createEvent, updateEvent } from "@/lib/api"
import { Calendar } from "@/components/ui/calendar"
import { TimePicker } from "@/components/ui/time-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  date: z.date({
    required_error: "A date is required.",
  }),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Please enter a valid time in HH:MM format.",
  }),
  location: z.string().min(2, {
    message: "Location must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
})

export type EventFormData = z.infer<typeof formSchema>

interface EventFormProps {
  mode: 'create' | 'edit';
  eventId?: string;
  initialData?: {
    name: string;
    date: Date;
    time: string;
    location: string;
    description: string;
  };
  onSuccess?: () => void;
  className?: string;
}

export function EventForm({ mode, eventId, initialData, onSuccess, className }: EventFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<EventFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      date: initialData?.date || new Date(),
      time: initialData?.time || "",
      location: initialData?.location || "",
      description: initialData?.description || "",
    },
  })

  const onSubmit = async (values: EventFormData) => {
    setIsSubmitting(true)
    try {
      const eventData = {
        name: values.name,
        date: values.date.toISOString(),
        time: values.time,
        location: values.location,
        description: values.description,
      }
      
      if (mode === 'edit' && eventId) {
        await updateEvent(eventId, eventData)
        toast.success("Event updated successfully!")
      } else {
        await createEvent(eventData)
        toast.success("Event created successfully!")
      }
      
      onSuccess?.()
      router.push("/dashboard")
    } catch (error) {
      console.error(`Error ${mode === 'edit' ? 'updating' : 'creating'} event:`, error)
      toast.error(`Failed to ${mode === 'edit' ? 'update' : 'create'} event. Please try again.`)
    }
    setIsSubmitting(false)
  }

  return (
    <Card className={cn("max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          {mode === 'edit' ? 'Edit Event' : 'Create New Event'}
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <TimePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter event location" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} {...field} className="resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting 
                ? (mode === 'edit' ? 'Updating...' : 'Creating...') 
                : (mode === 'edit' ? 'Update Event' : 'Create Event')}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}