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

   Exemple : `pwa` pour intégrer les meilleures pratiques liées aux Progressive Web Apps.

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

```
NextPerfect/
├── app/
│   ├── (public-pages)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── (protected-pages)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── ...
│   ├── layout.tsx
│   ├── page.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   └── global-error.tsx
├── components/
│   ├── ui/
│   │   └── Button.tsx
│   └── ...
├── lib/
│   ├── db.ts
│   ├── auth.ts
│   └── ...
├── hooks/
│   ├── useAuth.ts
│   └── ...
├── context/
│   ├── AuthContext.tsx
│   └── ...
├── public/
│   ├── images/
│   └── ...
├── styles/
│   ├── globals.css
│   └── ...
├── tests/
│   ├── unit/
│   ├── integration/
│   └── ...
├── next.config.js
├── package.json
└── tsconfig.json
```

### Détails des Dossiers

#### **app/**

- **(public-pages)** : Pages accessibles à tous les utilisateurs.
- **(protected-pages)** : Pages nécessitant une authentification.
- **api/** : Routes API pour gérer les endpoints RESTful.
- **layout.tsx** : Définit le layout global (header, footer, providers).
- **error.tsx** : Gestion des erreurs locales.
- **loading.tsx** : Gestion des états de chargement.

#### **components/**

- **ui/** : Composants UI réutilisables (ex. : boutons, formulaires).

#### **lib/**

- Fonctions utilitaires pour la logique métier (ex. : `auth.ts`, `db.ts`).

#### **hooks/**

- Hooks React personnalisés (ex. : `useAuth.ts`).

#### **context/**

- Providers React pour l'état global (ex. : `AuthContext.tsx`).

#### **tests/**

- Séparation des tests unitaires, d’intégration et E2E.

---

## Conventions de Nommage

- **Dossiers** : `kebab-case` (ex. : `public-pages`).
- **Composants** : `PascalCase` (ex. : `Navbar.tsx`).
- **Variables** : `camelCase` (ex. : `const userName`).
- **Types** : `PascalCase` (ex. : `interface User {}`).

---

## Bonnes Pratiques

1. **Architecture modulaire** : Séparez clairement les responsabilités (UI, hooks, API, etc.).
2. **TypeScript** : Adoptez un typage strict pour éviter les erreurs.
3. **Tailwind CSS** : Regroupez les classes utilitaires pour une lisibilité accrue.
4. **Accessibilité** : Respectez les normes a11y (attributs ARIA, etc.).
5. **Gestion des erreurs** : Centralisez le traitement des erreurs dans les layouts.
6. **Tests** : Priorisez les tests unitaires et d’intégration pour garantir la stabilité.

---

## Outils et Configuration

### 1. ESLint et Prettier

- Configuration ESLint :
  ```json
  {
    "extends": ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"]
  }
  ```

### 2. Tailwind CSS

- Exemple de configuration (`tailwind.config.js`) :
  ```javascript
  module.exports = {
    content: ["./app/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {},
    },
    plugins: [],
  };
  ```

### 3. Tests

- **Jest** pour les tests unitaires.
- **Cypress** ou **Playwright** pour les tests E2E.

---

## Comment Contribuer

1. Forkez le dépôt.
2. Créez une branche : `git checkout -b feature/awesome-feature`.
3. Commitez vos modifications : `git commit -m 'Add awesome feature'`.
4. Poussez la branche : `git push origin feature/awesome-feature`.
5. Soumettez une Pull Request.

---

## License

Ce projet est sous licence **MIT**.

---

## Contact

Pour toute question ou suggestion, n'hésitez pas à ouvrir une issue ou à me contacter par email : **[leroyaurelien11@gmail.com](mailto:leroyaurelien11@gmail.com)**.
