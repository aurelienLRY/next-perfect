"use server";
import webpush, { PushSubscription } from "web-push";
import { NotificationContent } from "@/lib/types/notificationContent.type";

webpush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`!,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

/**
 * Subscribe a user
 * @param _sub - The subscription of the user
 * @returns { success: boolean }
 */
export async function subscribeUser(_sub: PushSubscription) {
  console.log("sub", _sub);
  // Dans un environnement de production, vous voudriez stocker la subscription dans une base de données
  // Par exemple : await db.subscriptions.create({ data: convertSubscription(sub) })
  return { success: true };
}
/**
 * Unsubscribe a user
 * @returns { success: boolean }
 */
export async function unsubscribeUser() {
  return { success: true };
}

/**
 * Send a notification to a user
 * @param sub - The subscription of the user
 * @param notification - The notification to send
 * @returns { success: boolean }
 */
export async function sendNotification(
  sub: PushSubscription,
  notification: NotificationContent
) {
  try {
    const icon =
      typeof notification.icon === "string"
        ? notification.icon
        : "/icons/PWA/android/android-launchericon-144-144.png";

    await webpush.sendNotification(
      sub,
      JSON.stringify({
        title: notification.title,
        message: notification.message,
        icon,
      })
    );

    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
