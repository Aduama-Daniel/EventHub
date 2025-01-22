'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { Calendar, Home, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8 flex items-center space-x-2">
          <Calendar className="h-6 w-6" />
          <span className="text-lg font-bold">EventHub</span>
        </div>
        
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
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
              <Link href="/dashboard/new">
                Organize Event
              </Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}