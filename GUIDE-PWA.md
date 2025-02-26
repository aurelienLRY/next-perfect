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

## 9. Notifications Push

### Configuration des Notifications

Pour activer les notifications push dans votre PWA, vous devez :

1. Générer des clés VAPID pour l'authentification
2. Configurer le service worker pour recevoir les notifications
3. Implémenter un système d'abonnement côté client
4. Stocker les abonnements dans une base de données
5. Créer une API pour envoyer des notifications

### Génération des Clés VAPID

```bash
npx web-push generate-vapid-keys
```

Ajoutez les clés à votre fichier `.env.local` :

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=votre_clé_publique
VAPID_PRIVATE_KEY=votre_clé_privée
WEB_PUSH_EMAIL=votre_email@exemple.com
```

### Implémentation de l'API d'Envoi de Notifications

L'API `/api/notification-push` permet d'envoyer des notifications push aux utilisateurs abonnés. Cette API nécessite une base de données pour stocker les abonnements des utilisateurs.

#### Exemple d'Implémentation avec Base de Données SQL

Voici un exemple d'implémentation qui utilise une base de données SQL avec des rôles utilisateur :

```typescript
// src/app/api/notification-push/route.ts
import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { db } from "@/lib/db"; // Connexion à votre base de données

// Configuration des clés VAPID
webpush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { title, message, role } = await req.json();

    // Validation des données
    if (!title || !message || !role) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Récupérer les abonnements des utilisateurs avec le rôle spécifié
    const subscriptions = await db.subscription.findMany({
      where: {
        user: {
          roles: {
            some: {
              name: role,
            },
          },
        },
      },
      select: {
        endpoint: true,
        p256dh: true,
        auth: true,
      },
    });

    // Envoyer la notification à chaque abonné
    const results = await Promise.allSettled(
      subscriptions.map((sub) => {
        const pushSubscription = {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        };

        return webpush.sendNotification(
          pushSubscription,
          JSON.stringify({
            title,
            message,
            icon: "/icons/PWA/android/android-launchericon-144-144.png",
          })
        );
      })
    );

    // Compter les succès et les échecs
    const succeeded = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    return NextResponse.json({
      success: true,
      sent: succeeded,
      failed,
      total: subscriptions.length,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi des notifications:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
```

### Stockage des Abonnements

Lors de l'abonnement d'un utilisateur aux notifications, vous devez stocker sa subscription dans la base de données :

```typescript
// src/app/api/subscribe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    // Vérifier l'authentification
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const subscription = await req.json();

    // Valider la subscription
    if (
      !subscription?.endpoint ||
      !subscription?.keys?.p256dh ||
      !subscription?.keys?.auth
    ) {
      return NextResponse.json(
        { error: "Données d'abonnement invalides" },
        { status: 400 }
      );
    }

    // Stocker ou mettre à jour l'abonnement
    await db.subscription.upsert({
      where: {
        userIdAndEndpoint: {
          userId: session.user.id,
          endpoint: subscription.endpoint,
        },
      },
      update: {
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
      create: {
        userId: session.user.id,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'abonnement:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
```

### Exemple de Schéma de Base de Données

Voici un exemple de schéma Prisma pour gérer les abonnements et les rôles :

```prisma
// prisma/schema.prisma
model User {
  id            String         @id @default(cuid())
  name          String?
  email         String         @unique
  // Autres champs utilisateur...

  subscriptions Subscription[]
  userRoles     UserRole[]
}

model Role {
  id        String     @id @default(cuid())
  name      String     @unique
  users     UserRole[]
}

model UserRole {
  id        String   @id @default(cuid())
  userId    String
  roleId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  role      Role     @relation(fields: [roleId], references: [id], onDelete: Cascade)

  @@unique([userId, roleId])
}

model Subscription {
  id        String   @id @default(cuid())
  userId    String
  endpoint  String
  p256dh    String
  auth      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([userId, endpoint], name: "userIdAndEndpoint")
}
```

### Envoi de Notifications aux Modérateurs

Pour envoyer une notification à tous les modérateurs, vous pouvez utiliser l'API comme suit :

```typescript
// Exemple d'utilisation côté client
async function notifyModerators(title: string, message: string) {
  try {
    const response = await fetch("/api/notification-push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        message,
        role: "moderator", // Cibler les utilisateurs avec le rôle modérateur
      }),
    });

    const data = await response.json();
    console.log(`Notifications envoyées: ${data.sent}/${data.total}`);
    return data;
  } catch (error) {
    console.error("Erreur:", error);
    throw error;
  }
}
```

### Notes Importantes

- Cette implémentation est un exemple et doit être adaptée à votre structure de base de données.
- Assurez-vous de gérer correctement les erreurs et les cas où les abonnements ne sont plus valides.
- Testez les notifications sur différents navigateurs et appareils.
- Respectez les bonnes pratiques en matière de notifications (fréquence, pertinence, etc.).
