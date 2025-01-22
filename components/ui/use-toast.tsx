"use client";

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";

export const useToast = () => {
  const [open, setOpen] = React.useState(false);
  const showToast = (message: string) => {
    setOpen(true);
    setTimeout(() => setOpen(false), 3000); // Auto-close after 3 seconds
  };

  return { open, setOpen, showToast };
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => (
  <Toast.Provider swipeDirection="right">{children}</Toast.Provider>
);

export const ToastContainer = ({ message }: { message: string }) => (
  <Toast.Root open={true} onOpenChange={() => {}}>
    <Toast.Title>{message}</Toast.Title>
    <Toast.Action
  asChild
  altText="Dismiss the toast"
>
  <button>Dismiss</button>
</Toast.Action>

  </Toast.Root>
);
