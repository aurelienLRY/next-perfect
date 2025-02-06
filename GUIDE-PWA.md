# Guide d'Implémentation PWA pour Next.js

Ce guide explique comment configurer, personnaliser et maintenir la Progressive Web App (PWA) dans notre projet Next.js.

## 1. Structure des Fichiers

```plaintext
src/
├── app/
│   ├── manifest.ts        # Métadonnées de la PWA
│   ├── layout.tsx         # Layout principal avec métadonnées
│   └── metadata.ts        # Configuration des métadonnées globales
├── components/
│   └── ui/
│       └── PWAInstallPrompt.tsx  # Composant d'installation
├── hooks/
│   └── usePWA.ts         # Hook de gestion PWA
├── config/
│   └── pwa.config.ts     # Configuration de la PWA
└── styles/
    └── globals.css       # Styles globaux

public/
├── manifest.json         # Manifeste de la PWA
├── sw.js                # Service Worker
└── icons/
    └── PWA/             # Icônes de la PWA
        ├── android/     # Icônes Android
        ├── ios/         # Icônes iOS
        └── windows/     # Icônes Windows
```

## 2. Configuration de Base

### Installation des Dépendances

```bash
npm install next-pwa
```

### Configuration Next.js (next.config.ts)

```typescript
import withPWA from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
```

### Options de Configuration PWA

- `dest`: Dossier de destination pour les fichiers PWA (généralement "public")
- `register`: Active l'enregistrement automatique du service worker
- `skipWaiting`: Active la mise à jour immédiate du service worker
- `disable`: Désactive la PWA en développement pour éviter les problèmes de cache

## 3. Personnalisation

### Configuration PWA (src/config/pwa.config.ts)

```typescript
export const pwaConfig = {
  // Activer/désactiver la personnalisation
  customInstallPrompt: true,

  // Délai avant l'affichage (ms)
  promptDelay: 1000,

  // Nombre maximum d'invites
  maxPrompts: 2,

  // Intervalle entre les invites (heures)
  promptInterval: 24,

  // Messages personnalisés
  messages: {
    title: "Installer NextPerfect",
    description:
      "Installez notre application pour un accès rapide et hors ligne",
    installButton: "Installer",
    cancelButton: "Plus tard",
  },

  // Style
  style: {
    primaryColor: "#3b82f6",
    darkMode: true,
  },
};
```

### Métadonnées PWA (src/app/metadata.ts)

```typescript
export const metadata: Metadata = {
  title: "Next Perfect",
  description: "Description de l'application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NextPerfect",
  },
  // ... autres métadonnées
};
```

## 4. Icônes Requises

Les icônes doivent être placées dans `/public/icons/PWA/` avec les tailles suivantes :

### Génération des Icônes

Pour générer facilement toutes les tailles d'icônes nécessaires, vous pouvez utiliser :
[PWA Image Generator](https://www.pwabuilder.com/imageGenerator)

1. Téléchargez une image source de haute qualité (idéalement 512x512 ou plus)
2. Utilisez le générateur en ligne
3. Téléchargez le package d'icônes généré
4. Placez les icônes dans les dossiers correspondants :

### Android

- 48x48
- 72x72
- 96x96
- 144x144
- 192x192
- 512x512

### iOS

- 120x120
- 152x152
- 167x167
- 180x180
- 192x192
- 512x512

### Windows

- 44x44
- 50x50
- 150x150

## 5. Personnalisation de l'Invite d'Installation

Le composant `PWAInstallPrompt` peut être personnalisé de plusieurs manières :

1. **Messages** : Modifiez les textes dans `pwa.config.ts`
2. **Style** : Ajustez les couleurs et le thème
3. **Timing** : Configurez le délai et la fréquence d'affichage
4. **Conditions** : Modifiez la logique dans `usePWA.ts`

## 6. Service Worker

Le service worker (`public/sw.js`) gère :

- La mise en cache des ressources
- Les stratégies de mise à jour
- Le fonctionnement hors ligne

Pour modifier le comportement du cache :

1. Ajoutez/modifiez les ressources à mettre en cache
2. Ajustez les stratégies de mise en cache
3. Personnalisez les réponses hors ligne

## 7. Tests et Débogage

Pour tester la PWA :

1. Construisez l'application : `npm run build`
2. Démarrez en production : `npm start`
3. Ouvrez Chrome DevTools > Application
4. Vérifiez :
   - Le manifeste
   - Le service worker
   - Le stockage
   - L'installation

## 8. Bonnes Pratiques

1. **Performance**

   - Optimisez les images
   - Minimisez les ressources mises en cache
   - Utilisez le composant Image de Next.js
   - Utilisez PWA Builder pour générer des icônes optimisées

2. **Maintenance**

   - Documentez les changements
   - Testez sur différents appareils
   - Mettez à jour les icônes si nécessaire
   - Conservez l'image source originale des icônes (512x512 ou plus)

3. **Sécurité**
   - Utilisez HTTPS
   - Validez les entrées utilisateur
   - Sécurisez les données sensibles

## 9. Dépannage

### Problèmes Courants

1. **L'invite ne s'affiche pas**

   - Vérifiez les critères d'installation
   - Vérifiez la configuration du manifeste
   - Testez en navigation privée

2. **Les icônes ne s'affichent pas**

   - Vérifiez les chemins
   - Validez les tailles d'icônes
   - Vérifiez le format des images

3. **Problèmes de cache**
   - Effacez le cache du service worker
   - Vérifiez les stratégies de mise en cache
   - Inspectez les requêtes réseau
