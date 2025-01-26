# Dossier `public/`

## Utilisation

Ce dossier contient tous les fichiers statiques accessibles publiquement dans l'application.

## Conventions de nommage

- Images : `kebab-case.{png|jpg|svg}`
- Icônes : `icon-*.{svg|png}`
- Autres assets : `kebab-case.{extension}`

## Structure

```plaintext
public/
├── images/        # Images et photos
├── icons/         # Icônes
├── fonts/         # Polices personnalisées
└── locales/       # Fichiers de traduction
```

## Exemple d'organisation

```plaintext
public/
├── images/
│   ├── hero-banner.jpg
│   └── about-image.png
├── icons/
│   ├── icon-menu.svg
│   └── icon-close.svg
└── favicon.ico
```

## Bonnes pratiques

- Optimiser les images avant de les ajouter
- Utiliser des SVG pour les icônes quand possible
- Nommer les fichiers de manière descriptive
- Organiser les fichiers dans des sous-dossiers thématiques
