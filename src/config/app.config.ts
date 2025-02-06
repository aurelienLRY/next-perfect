/**
 * Configuration globale de l'application
 * Ce fichier centralise tous les paramètres de l'application utilisés dans le manifest et les métadonnées
 */
export const appConfig = {
  // Informations de base de l'application
  name: "NextPerfect", // Nom complet de l'application
  shortName: "NextPerfect", // Nom court pour l'icône sur l'écran d'accueil
  description: "Le Guide des Meilleures Pratiques pour Next.js 2025", // Description de l'application
  url: "/", // URL de base de l'application
  display: "standalone", // Mode d'affichage de la PWA (standalone, fullscreen, minimal-ui, browser)
  orientation: "portrait" as const, // Orientation préférée de l'application

  // Catégorisation et localisation
  categories: ["education", "development", "productivity"], // Catégories pour les stores d'applications
  lang: "fr", // Langue principale de l'application
  dir: "ltr" as const, // Direction du texte (ltr: gauche à droite, rtl: droite à gauche)

  // Configuration PWA
  preferRelatedApplications: false, // Ne pas suggérer d'applications natives similaires
  scope: "/", // Portée de l'application PWA

  // Thème et couleurs
  colors: {
    background: "#ffffff", // Couleur de fond de l'application
    theme: "#3b82f6", // Couleur principale du thème
  },

  // Captures d'écran pour la fenêtre d'installation
  screenshots: [
    {
      src: "/screenshots/desktop-1.jpg",
      sizes: "1920x1080",
      type: "image/jpg",
      label: "Vue d'ensemble de NextPerfect",
      form_factor: "wide", // Format bureau
    },
    {
      src: "/screenshots/mobile-1.jpg",
      sizes: "1170x2532",
      type: "image/jpg",
      label: "Interface mobile de NextPerfect",
      form_factor: "narrow", // Format mobile
    },
  ],

  // Raccourcis rapides pour l'application
  shortcuts: [
    {
      name: "Documentation",
      url: "/docs",
      description: "Accéder à la documentation",
      icons: [
        {
          src: "/icons/PWA/android/android-launchericon-96-96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    },
    {
      name: "Guide PWA",
      url: "/guide-pwa",
      description: "Guide d'utilisation PWA",
      icons: [
        {
          src: "/icons/PWA/android/android-launchericon-96-96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
    },
  ],

  // Applications associées (vide car pas d'applications natives)
  related_applications: [],

  // Fonctionnalités principales de l'application (utilisé pour la documentation)
  features: [
    "Guide complet des meilleures pratiques Next.js",
    "Documentation interactive",
    "Exemples de code détaillés",
    "Mode hors ligne disponible",
  ],

  // Informations sur l'auteur
  author: {
    name: "Leroy Aurélien",
    url: "https://www.linkedin.com/in/aur%C3%A9lien-leroy-8304a9284/",
  },

  // Configuration de l'affichage
  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    viewportFit: "cover" as const,
  },

  // Configuration spécifique pour iOS
  appleWebApp: {
    capable: true, // Indique que l'app peut fonctionner comme une PWA sur iOS
    statusBarStyle: "default" as const,
    title: "NextPerfect",
  },

  // Configuration de la détection de format
  formatDetection: {
    telephone: false, // Désactive la détection automatique des numéros de téléphone
  },
} as const; // Garantit l'immutabilité de la configuration
