import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
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
  _id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

export type EventCreate = Omit<Event, '_id'>;
export type EventUpdate = Partial<Event>;

export const apiEventToUIEvent = (event: Event) => ({
  id: event._id,
  ...event,
});

export const uiEventToAPIEvent = (event: UIEvent) => ({
  _id: event.id,
  ...event,
});

export interface UIEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
}

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
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData: EventCreate): Promise<Event> => {
  const response = await api.post("/events", eventData);
  return response.data;
};

export const updateEvent = async (id: string, eventData: EventUpdate): Promise<Event> => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};