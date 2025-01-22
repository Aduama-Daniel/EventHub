import axios from "axios"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
})


// In lib/api.ts
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (axios.isAxiosError(error)) {
        // Handle specific error cases
        if (error.response?.status === 404) {
          throw new Error('Resource not found');
        }
        if (error.response?.status === 401) {
          // Handle unauthorized
        }
      }
      throw error;
    }
  );



  export interface Event {
    _id: string
    name: string
    date: string
    time: string
    location: string
    description: string
    image?: {
      data: Buffer
      contentType: string
    }
  }
  
  export type EventCreate = Omit<Event, '_id'>
export type EventUpdate = Partial<Event>


  // Helper function to convert API event to UI event if needed
  export const apiEventToUIEvent = (event: Event) => ({
    id: event._id,
    ...event
  })
  
  // Helper function to convert UI event back to API event
  export const uiEventToAPIEvent = (event: UIEvent) => ({
    _id: event.id,
    ...event
  })
  
  // UI-specific event interface
  export interface UIEvent {
    id: string
    name: string
    date: string
    time: string
    location: string
    description: string
    image?: {
      data: Buffer
      contentType: string
    }
  }

// In lib/api.ts
export const fetchEvents = async (page = 1, limit = 6): Promise<{ events: Event[]; total: number }> => {
    try {
      const response = await api.get(`/events?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch events');
      }
      throw error;
    }
  }

export const fetchEventById = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`)
  return response.data
}

export const createEvent = async (eventData: FormData): Promise<Event> => {
  const response = await api.post("/events", eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateEvent = async (id: string, eventData: FormData): Promise<Event> => {
  const response = await api.put(`/events/${id}`, eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`)
}

