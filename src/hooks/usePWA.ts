import { useState, useEffect } from "react";
import { pwaConfig } from "@/config/pwa.config";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface PWAStatus {
  isInstallable: boolean;
  isInstalled: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  promptCount: number;
  lastPromptTime: number | null;
}

const PWA_STORAGE_KEY = "pwa-status";

const getInitialState = (): PWAStatus => ({
  isInstallable: false,
  isInstalled: false,
  deferredPrompt: null,
  promptCount: 0,
  lastPromptTime: null,
});

export function usePWA() {
  const [status, setStatus] = useState<PWAStatus>(getInitialState());
  const [isClient, setIsClient] = useState(false);

  // Marquer que nous sommes côté client
  useEffect(() => {
    setIsClient(true);

    // Charger l'état depuis le localStorage
    const savedStatus = localStorage.getItem(PWA_STORAGE_KEY);
    if (savedStatus) {
      try {
        const parsed = JSON.parse(savedStatus);
        setStatus((prev) => ({
          ...prev,
          promptCount: parsed.promptCount || 0,
          lastPromptTime: parsed.lastPromptTime || null,
        }));
      } catch (error) {
        console.error("Erreur lors du chargement de l'état PWA:", error);
      }
    }
  }, []);

  // Sauvegarder l'état dans le localStorage
  useEffect(() => {
    if (!isClient) return;

    const stateToSave = {
      promptCount: status.promptCount,
      lastPromptTime: status.lastPromptTime,
    };
    localStorage.setItem(PWA_STORAGE_KEY, JSON.stringify(stateToSave));
  }, [isClient, status.promptCount, status.lastPromptTime]);

  useEffect(() => {
    if (!isClient || !pwaConfig.customInstallPrompt) return;

    // Vérifier si l'app est déjà installée
    const isInstalled = window.matchMedia("(display-mode: standalone)").matches;
    if (isInstalled) {
      setStatus((prev) => ({ ...prev, isInstalled }));
    }

    // Vérifier si on peut afficher l'invite
    const checkPromptConditions = (currentStatus: PWAStatus): boolean => {
      if (!pwaConfig.customInstallPrompt) return false;
      if (currentStatus.promptCount >= pwaConfig.maxPrompts) return false;

      if (currentStatus.lastPromptTime) {
        const hoursSinceLastPrompt =
          (Date.now() - currentStatus.lastPromptTime) / (1000 * 60 * 60);
        if (hoursSinceLastPrompt < pwaConfig.promptInterval) return false;
      }

      return true;
    };

    // Écouter l'événement beforeinstallprompt
    const handleInstallPrompt = (e: Event) => {
      e.preventDefault();
      const canPrompt = checkPromptConditions(status);

      if (canPrompt) {
        setTimeout(() => {
          setStatus((prev) => ({
            ...prev,
            isInstallable: true,
            deferredPrompt: e as BeforeInstallPromptEvent,
          }));
        }, pwaConfig.promptDelay);
      }
    };

    // Écouter l'événement appinstalled
    const handleAppInstalled = () => {
      setStatus((prev) => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
      }));
    };

    window.addEventListener("beforeinstallprompt", handleInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, [isClient, status.promptCount, status.lastPromptTime]);

  const promptInstall = async () => {
    if (!status.deferredPrompt) return;

    // Mettre à jour le compteur et l'horodatage
    setStatus((prev) => ({
      ...prev,
      promptCount: prev.promptCount + 1,
      lastPromptTime: Date.now(),
    }));

    status.deferredPrompt.prompt();
    const { outcome } = await status.deferredPrompt.userChoice;

    if (outcome === "accepted") {
      setStatus((prev) => ({
        ...prev,
        isInstalled: true,
        isInstallable: false,
        deferredPrompt: null,
      }));
    }
  };

  return {
    isInstallable: isClient && status.isInstallable,
    isInstalled: isClient && status.isInstalled,
    promptInstall,
  };
}
