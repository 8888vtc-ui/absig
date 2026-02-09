# 📦 Template Site Web Astro

Un template de site web moderne et personnalisable construit avec **Astro**.

## ✨ Fonctionnalités

- 🎨 **Design Premium** - Thème élégant bleu et or
- 📱 **Responsive** - Mobile-first avec navigation bottom bar
- 💬 **Chatbot intégré** - Assistant virtuel personnalisable
- 📲 **WhatsApp** - Bouton de contact flottant
- 🌍 **Multilingue** - Support FR/EN/HE (RTL)
- 🔍 **SEO Ready** - Meta tags, sitemap, schema.org
- ⚡ **Performance** - Animations AOS, lazy loading

## 📁 Structure

```
src/
├── components/
│   ├── Header.astro      # Navigation desktop + mobile
│   ├── Footer.astro      # Pied de page
│   ├── Logo.astro        # Logo (image ou texte)
│   ├── WhatsAppButton.astro  # Bouton WhatsApp flottant
│   ├── Chatbot.astro     # Assistant virtuel
│   └── Breadcrumb.astro  # Fil d'Ariane
├── layouts/
│   └── BaseLayout.astro  # Layout principal
├── pages/
│   ├── index.astro       # Accueil
│   ├── services.astro    # Services
│   ├── a-propos.astro    # À Propos
│   ├── contact.astro     # Contact
│   └── mentions-legales.astro  # Mentions légales
└── styles/
    ├── base.css          # Reset et typographie
    ├── menu.css          # Header et navigation
    ├── components.css    # Composants UI
    ├── chatbot.css       # Styles chatbot
    └── mobile-fixed.css  # Corrections mobile
```

## 🚀 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Construire pour la production
npm run build
```

## ⚙️ Personnalisation

### 1. Informations générales
Modifiez ces fichiers pour personnaliser vos informations :

- `src/components/Header.astro` - Numéro WhatsApp
- `src/components/Footer.astro` - Coordonnées, nom d'entreprise
- `src/components/WhatsAppButton.astro` - Numéro et message WhatsApp
- `src/components/Chatbot.astro` - Réponses automatiques
- `src/components/Logo.astro` - Logo (image ou texte)

### 2. Configuration du site
- `astro.config.mjs` - URL du site
- `public/robots.txt` - Sitemap URL

### 3. Couleurs et thème
Les couleurs principales sont définies dans les fichiers CSS :
- **Bleu foncé** : `#002366`
- **Or/Doré** : `#d4af37`

### 4. Pages
Modifiez les pages dans `src/pages/` selon vos besoins.

## 📝 À faire après installation

1. ✅ Remplacer le logo dans `Logo.astro`
2. ✅ Mettre à jour le numéro WhatsApp partout
3. ✅ Personnaliser les textes des pages
4. ✅ Ajouter vos images dans `public/assets/img/`
5. ✅ Configurer l'URL du site dans `astro.config.mjs`
6. ✅ Personnaliser les mentions légales
7. ✅ Connecter le formulaire de contact à votre backend

## 🛠️ Technologies

- [Astro](https://astro.build/) - Framework web
- [AOS](https://michalsnik.github.io/aos/) - Animations au scroll
- CSS Vanilla - Styles personnalisés

## 📄 Licence

MIT License - Libre d'utilisation et de modification.
