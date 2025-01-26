# NextPerfect - Le Guide des Meilleures Pratiques pour Next.js 2025

## Introduction

**NextPerfect** est un projet conçu pour regrouper et illustrer les meilleures pratiques en matière de développement avec Next.js 15, TypeScript, et Tailwind CSS. Ce projet sert de référence pour des applications robustes, évolutives et maintenables, en suivant des standards professionnels de 2025.

Ce README décrit la structure du projet, les conventions adoptées, et les outils utilisés pour garantir une qualité optimale.

---

## Objectifs

- Fournir une base solide pour les projets Next.js.
- Promouvoir les bonnes pratiques en matière d'architecture, de typage TypeScript et de stylisation avec Tailwind CSS.
- Offrir des exemples concrets de gestion d'état, de conception de composants, de hooks personnalisés, et bien plus.
- Centraliser les meilleures pratiques pour chaque fonctionnalité courante grâce à une organisation par branches.

---

## Fonctionnalité Principale : Organisation par Branches

Pour chaque fonctionnalité de bonnes pratiques, une branche dédiée est créée. Cela permet de centraliser et de maintenir les meilleures pratiques pour chaque cas d'utilisation spécifique. Voici comment cela fonctionne :

### Processus pour Ajouter une Nouvelle Fonctionnalité

1. **Créer une branche dédiée** :

   ```bash
   git checkout -b your-feature-name
   ```

   Exemple : `theme-colors` pour intégrer les meilleures pratiques liées à la gestion des thèmes de couleurs.

2. **Ajouter la fonctionnalité** :
   Implémentez les bonnes pratiques pour la fonctionnalité dans cette branche. Ajoutez des exemples, de la documentation et du code réutilisable.

3. **Tester la fonctionnalité** :
   Écrivez des tests pour garantir que la fonctionnalité est stable et conforme aux standards.

4. **Soumettre une Pull Request** :
   Une fois prêt, créez une Pull Request pour intégrer la fonctionnalité dans la branche principale (ou une autre branche dédiée).

### Exemples de Branches Fonctionnelles

- `theme-colors` : Meilleures pratiques pour gérer des thèmes de couleurs avec Tailwind CSS.
- `pwa` : Implémentation des meilleures pratiques pour une Progressive Web App.
- `authentication` : Gestion avancée de l'authentification avec Next.js et TypeScript.
- `accessibility` : Bonnes pratiques pour l'accessibilité (a11y).

Cette organisation permet à chaque fonctionnalité d’évoluer de manière indépendante tout en assurant une documentation et des exemples clairs.

---

## Structure Générale du Projet

Voici la structure du projet :

```plaintext
my-next-app/
├── src/
│   ├── app/
│   │   ├── (public-pages)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── (protected-pages)/
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── error.tsx
│   │   ├── loading.tsx
│   │   └── global-error.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   └── Button.tsx
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   └── shared/
│   │       └── Card.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   └── ...
│   ├── styles/
│   │   └── globals.css
│   └── ...
├── public/
│   ├── images/
│   └── ...
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── next.config.js
├── package.json
└── tsconfig.json
```

### Détails des Dossiers

#### **src/app/**

- **(public-pages)** : Pages accessibles à tous les utilisateurs.
- **(protected-pages)** : Pages nécessitant une authentification.
- **api/** : Routes API pour gérer les endpoints RESTful.
  - Exemple : `src/app/api/users/route.ts` pour gérer les requêtes sur `/api/users`.
- **layout.tsx** : Définit le layout global (header, footer, providers).
- **page.tsx** : Définit la page d'accueil.
- **error.tsx** : Gestion des erreurs locales.
- **loading.tsx** : Gestion des états de chargement.
- **global-error.tsx** : Gestion des erreurs globales.

#### **src/components/**

- **ui/** : Composants UI réutilisables (ex. : boutons, formulaires).
- **layout/** : Composants liés à l'architecture (header, footer).
- **shared/** : Composants partagés comme les cartes, badges, etc.

#### **src/lib/**

- Fonctions utilitaires pour la logique métier (ex. : `auth.ts`, `db.ts`).

#### **src/hooks/**

- Hooks React personnalisés (ex. : `useAuth.ts`).

#### **src/context/**

- Providers React pour l'état global (ex. : `AuthContext.tsx`).

#### **src/styles/**

- Fichiers CSS ou SCSS globaux.

#### **public/**

- Contient les fichiers statiques comme les images et les favicons.

#### **tests/**

- **unit/** : Tests unitaires des composants.
- **integration/** : Tests d'intégration.
- **e2e/** : Tests de bout en bout.

---

## Conventions de Nommage

### Fichiers et Dossiers

- **Dossiers pour les pages** : Utilisez le **kebab-case** (ex. : `(public-pages)`).
- **Fichiers** : Utilisez le **PascalCase** pour les composants (ex. : `Button.tsx`).
- **Variables** :
  - Variables locales en **camelCase** (ex. : `userName`).
  - Variables globales en **MAJUSCULES_AVEC_UNDERSCORE** (ex. : `API_URL`).
- **Server Actions** :
  - Fonctions en **camelCase** avec des noms descriptifs (ex. : `getUserData`).
  - Fichiers en **camelCase** (ex. : `fetchUsers.ts`).

### Types TypeScript

- Interfaces et types en **PascalCase** (ex. : `interface User { id: number; name: string; }`).

---

## Bonnes Pratiques

1. **Structure modulaire** : Regroupez les fonctionnalités connexes dans des dossiers dédiés.
2. **TypeScript** : Typage strict pour éviter les erreurs.
3. **Tailwind CSS** : Utilisez des classes utilitaires pour une meilleure lisibilité.
4. **Accessibilité** : Respectez les normes a11y (ex. : `aria-label`).
5. **Gestion des erreurs** : Centralisez les erreurs pour un meilleur debugging.
6. **Tests** : Organisez vos tests en dossiers `unit`, `integration` et `e2e`.

---

## Commandes de Développement

### Installation des Dépendances

```bash
npm install
```

### Lancer le Serveur de Développement

```bash
npm run dev
```

### Générer une Version de Production

```bash
npm run build
```

### Lancer les Tests

```bash
npm test
```

---

## Contribution

1. Forkez ce dépôt.
2. Créez une nouvelle branche :
   ```bash
   git checkout -b your-feature-name
   ```
3. Faites vos modifications et commitez :
   ```bash
   git commit -m "Add awesome feature"
   ```
4. Poussez la branche :
   ```bash
   git push origin your-feature-name
   ```
5. Ouvrez une Pull Request.

---

## Licence

Ce projet est sous licence **MIT**.

---

## Contact

Pour toute question, contactez-nous à **leroyaurelien11@gmail.com**.
