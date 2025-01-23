Event Planner Application

Overview

This project is a web application for managing events, built as part of a coding challenge for FusionEdge Technologies. It consists of a Next.js frontend and an Express.js backend. Users can create, view, edit, delete events, and access features like sorting and pagination.

Features

Homepage:

Displays "Featured Events" as a preview for users.

Events Page:

Shows all events with pagination.

Sorting functionality by Event Name or Date.

Dashboard:

Allows users to:

Create new events.

Edit existing events.

Delete events.

Tech Stack

Frontend: Next.js (React-based framework).

Backend: Express.js with MongoDB.

Language: TypeScript.

Setup Instructions

Backend Setup

Clone the repository:

git clone <repository_url>
cd backend

Install dependencies:

npm install

Set up the environment variables:

Create a .env file in the backend directory and add the following:

PORT=5000
MONGO_URI=<your_mongodb_connection_string>

Start the backend server:

npm run dev

The server will start at http://localhost:5000.

Frontend Setup

Navigate to the frontend directory:

cd frontend

Install dependencies:

npm install

Set up the environment variables:

Create a .env.local file in the frontend directory and add:

NEXT_PUBLIC_API_URL=http://localhost:5000

Start the frontend development server:

npm run dev

The app will be available at http://localhost:3000.

How to Run the Application

Start the backend server (http://localhost:5000).

Start the frontend server (http://localhost:3000).

Visit the frontend URL to access the application.

Functionalities

Homepage:

Displays a list of "Featured Events" as a preview.

Events Page:

Users can:

View all events in a paginated list.

Sort events by name or date.

Dashboard Page:

Users can:

Create a new event by filling out a form.

Edit an existing event.

Delete an event.

Event Details:

View details of a single event.