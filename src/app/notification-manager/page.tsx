"use client";
import React from "react";
import { useNotification } from "@/hooks/useNotification";
import Image from "next/image";

export default function NotificationManager() {
  const { pushMessage } = useNotification();

  const sendTestNotification = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.elements.namedItem(
      "title"
    ) as HTMLInputElement;
    const message = e.currentTarget.elements.namedItem(
      "message"
    ) as HTMLInputElement;
    await pushMessage({ title: title.value, message: message.value });
  };

  return (
    <section className="p-4 flex flex-col gap-4 justify-center items-center">
      <h3 className="text-2xl font-bold text-emerald-700">
        Notification Manager
      </h3>
      <form
        onSubmit={sendTestNotification}
        className="flex items-center gap-4 bg-slate-300  p-4 rounded-md shadow-lg min-w-[300px] max-w-[500px]"
      >
        <div>
          <Image
            src="/icons/PWA/android/android-launchericon-96-96.png"
            alt="Notification"
            width={72}
            height={72}
          />
        </div>
        <div className="flex flex-col gap-1 min-w-[70%]">
          <input
            type="text"
            name="title"
            placeholder="Entrez le titre de la notification"
            className="w-full p-1 rounded-md border "
          />

          <input
            type="text"
            name="message"
            placeholder="Entrez le message de la notification"
            className="w-full p-1 rounded-md border "
          />

          <button
            type="submit"
            className=" bg-emerald-600 text-white p-1 rounded-md text-sm mt-2"
          >
            Envoyer la notification
          </button>
        </div>
      </form>
    </section>
  );
}
