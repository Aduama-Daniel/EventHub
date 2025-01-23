'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Calendar, Home, LayoutDashboard, Menu, X } from 'lucide-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container flex h-16 items-center">
          <div className="mr-8 flex items-center space-x-2">
            <Calendar className="h-6 w-6" />
            <span className="text-lg font-bold">EventHub</span>
          </div>
          
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto md:hidden"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          <div className="hidden md:flex flex-1 items-center justify-end space-x-6">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link href="/events" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link href="/dashboard" className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary">
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="default" asChild>
                <Link href="/dashboard/create">
                  Create Event
                </Link>
              </Button>
              <ModeToggle />
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="absolute top-16 left-0 right-0 border-b bg-background p-4 md:hidden shadow-lg">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              <Link 
                href="/events" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </Link>
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-2 text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <Button variant="default" asChild className="w-full">
                <Link href="/dashboard/create" onClick={() => setIsOpen(false)}>
                  Organize Event
                </Link>
              </Button>
              <div className="pt-2">
                <ModeToggle />
              </div>
            </div>
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  );
}