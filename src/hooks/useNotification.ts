/**
 * Hook de gestion des notifications push
 *
 * Ce hook permet de gérer les notifications push dans une application Next.js PWA.
 * Il offre des fonctionnalités pour:
 * - Vérifier la compatibilité du navigateur avec les notifications push
 * - S'abonner aux notifications push
 * - Se désabonner des notifications push
 * - Envoyer des notifications push
 *
 * @returns {Object} Fonctions et états pour gérer les notifications
 */
"use client";
import { useState, useEffect } from "react";
import {
  subscribeUser,
  unsubscribeUser,
  sendNotification,
} from "@/lib/services/webPush.services";
import { toast } from "sonner";
import { PushSubscription } from "web-push";
import { NotificationContent } from "@/lib/types/notificationContent.type";

export function useNotification() {
  // État pour suivre si les notifications sont supportées par le navigateur
  const [isSupported, setIsSupported] = useState(false);
  // État pour suivre si l'utilisateur est abonné aux notifications
  const [isSubscribed, setIsSubscribed] = useState(false);
  // État pour stocker l'objet de souscription
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );

  /**
   * Vérifie si le navigateur supporte les notifications push
   * et enregistre le service worker au chargement du composant
   */
  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  /**
   * Enregistre le service worker et récupère la souscription existante
   */
  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
        updateViaCache: "none",
      });
      const sub = await registration.pushManager.getSubscription();
      setSubscription(sub?.toJSON() as PushSubscription);
      setIsSubscribed(!!sub);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement du service worker:",
        error
      );
    }
  }

  /**
   * Abonne l'utilisateur aux notifications push
   *
   * Cette fonction:
   * 1. Vérifie la compatibilité du navigateur
   * 2. Demande la permission à l'utilisateur
   * 3. Crée un abonnement avec les clés VAPID
   * 4. Envoie l'abonnement au serveur pour stockage
   *
   * @returns {Promise<boolean>} Succès ou échec de l'abonnement
   */
  const subscribe = async () => {
    if (!isSupported) return false;

    try {
      const registration = await navigator.serviceWorker.ready;

      // Demander la permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        throw new Error("Permission refusée");
      }

      // S'abonner avec les options VAPID
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      });
      const subToJSON = sub.toJSON() as PushSubscription;

      // Envoyer la souscription au serveur
      // Option 1: Utiliser le service interne
      await subscribeUser(subToJSON);

      // Option 2: Envoyer à l'API (décommentez pour utiliser)
      /*
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subToJSON),
      });
      */

      setSubscription(subToJSON);
      setIsSubscribed(true);

      return true;
    } catch (error) {
      console.error("Erreur lors de l'abonnement:", error);
      return false;
    }
  };

  /**
   * Désabonne l'utilisateur des notifications push
   *
   * Cette fonction:
   * 1. Vérifie si une souscription existe
   * 2. Supprime la souscription côté client
   * 3. Notifie le serveur pour supprimer la souscription
   *
   * @returns {Promise<boolean>} Succès ou échec du désabonnement
   */
  const unsubscribe = async () => {
    if (!subscription) return false;

    try {
      // Récupérer la souscription active
      const registration = await navigator.serviceWorker.ready;
      const activeSub = await registration.pushManager.getSubscription();

      // Désabonner côté client
      if (activeSub) {
        await activeSub.unsubscribe();
      }

      // Notifier le serveur
      // Option 1: Utiliser le service interne
      await unsubscribeUser();

      // Option 2: Envoyer à l'API (décommentez pour utiliser)
      /*
      await fetch('/api/subscribe', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });
      */

      setIsSubscribed(false);
      setSubscription(null);

      return true;
    } catch (error) {
      console.error("Erreur lors de la désinscription:", error);
      return false;
    }
  };

  /**
   * Envoie une notification push à l'utilisateur actuel
   *
   * @param {NotificationContent} notification - Contenu de la notification
   * @returns {Promise<boolean>} Succès ou échec de l'envoi
   */
  const pushMessage = async (notification: NotificationContent) => {
    if (!subscription) return false;
    try {
      // Option 1: Utiliser le service interne
      await sendNotification(subscription, notification);

      // Option 2: Envoyer via l'API (décommentez pour utiliser)
      /*
      await fetch('/api/notification-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subscription,
          notification,
        }),
      });
      */

      toast.success("Notification envoyée avec succès");
      return true;
    } catch (error) {
      console.error("Erreur lors de l'envoi de la notification:", error);
      toast.error("Échec de l'envoi de la notification");
      return false;
    }
  };

  return {
    isSupported, // Indique si le navigateur supporte les notifications push
    isSubscribed, // Indique si l'utilisateur est abonné aux notifications
    subscribe, // Fonction pour s'abonner aux notifications
    unsubscribe, // Fonction pour se désabonner des notifications
    pushMessage, // Fonction pour envoyer une notification
  };
}
