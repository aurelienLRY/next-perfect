"use client";
import React from "react";
import { useNotification } from "@/hooks/useNotification";

export default function Template({ children }: { children: React.ReactNode }) {
  const { isSupported, isSubscribed, subscribe } = useNotification();

  React.useEffect(() => {
    if (isSupported && !isSubscribed) {
      subscribe();
    }
  }, [isSupported, isSubscribed, subscribe]);

  return <main className="">{children}</main>;
}
