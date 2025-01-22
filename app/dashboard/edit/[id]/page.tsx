"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader } from "@/components/Loader"
import { fetchEventById, updateEvent } from "@/lib/api"
import Image from "next/image"

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Please enter a valid date.",
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
  image: z
    .any()
    .optional()
    .refine((files) => {
      if (files?.length) {
        return files[0].size <= MAX_FILE_SIZE
      }
      return true
    }, `Max file size is 5MB.`)
    .refine((files) => {
      if (files?.length) {
        return ACCEPTED_IMAGE_TYPES.includes(files[0].type)
      }
      return true
    }, "Only .jpg, .jpeg, .png and .webp files are accepted.")
})

const bufferToBase64 = (buffer: Buffer) => {
  return buffer.toString('base64');
}

export default function EditEventPage() {
  const { id } = useParams()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      time: "",
      location: "",
      description: "",
      image: undefined,
    },
  })

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const event = await fetchEventById(id as string)
        form.reset({
          name: event.name,
          date: new Date(event.date).toISOString().split("T")[0],
          time: event.time,
          location: event.location,
          description: event.description,
        })
        // Set preview if event has an image
        if (event.image?.data) {
          const base64Image = `data:${event.image.contentType};base64,${bufferToBase64(event.image.data)}`
          setPreviewImage(base64Image)
        }
      } catch (error) {
        console.error("Error fetching event:", error)
        toast.error("Failed to load event details.")
      }
      setIsLoading(false)
    }

    loadEvent()
  }, [id, form])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      // Update form
      form.setValue("image", e.target.files, {
        shouldValidate: true,
      })
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("name", values.name)
      formData.append("date", values.date)
      formData.append("time", values.time)
      formData.append("location", values.location)
      formData.append("description", values.description)
      if (values.image?.[0]) {
        formData.append("image", values.image[0])
      }

      await updateEvent(id as string, formData)
      toast.success("Event updated successfully!")
      router.push("/dashboard")
    } catch (error) {
      console.error("Error updating event:", error)
      toast.error("Failed to update event. Please try again.")
    }
    setIsSubmitting(false)
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
      <Card>
        <CardHeader>
          <CardTitle>Edit Event</CardTitle>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Event Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
  control={form.control}
  name="image"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Event Image</FormLabel>
      <FormControl>
        <Input
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          onChange={handleImageChange}
          ref={fileInputRef}
        />
      </FormControl>
      {previewImage && (
        <div className="mt-2 relative w-full h-48">
          <Image
            src={previewImage}
            alt="Event preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      <FormMessage />
    </FormItem>
  )}
/>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Event"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}