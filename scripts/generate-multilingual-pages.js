import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const strategyPath = path.join(__dirname, '../content-strategy.json');
const pagesDir = path.join(__dirname, '../src/pages');

const strategy = JSON.parse(fs.readFileSync(strategyPath, 'utf-8'));

// Helper to ensure directory exists
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// SEO 2025 Optimized French Content Generator
const generateFR = (page) => {
  const alternateLinks = JSON.stringify({
    en: page.slug_en,
    he: page.slug_he,
    fr: page.slug_fr
  });

  // Dynamic content based on focus type
  const focusContent = {
    airport: {
      intro: `Arrivée ou départ depuis l'<strong>aéroport Nice Côte d'Azur</strong> ? Notre service de transfert VTC premium vous garantit une prise en charge ponctuelle et un trajet confortable vers votre destination finale.`,
      benefits: [
        'Suivi en temps réel de votre vol',
        'Accueil personnalisé en zone arrivée avec panneau nominatif',
        'Attente gratuite jusqu à 60 minutes après l atterrissage',
        'Aide aux bagages incluse',
        'Sièges bébé disponibles sur demande'
      ],
      pricing: 'À partir de 45€ pour les trajets centre-ville'
    },
    city_transfer: {
      intro: `Profitez d'un transfert <strong>confortable et sécurisé</strong> entre les plus belles destinations de la Côte d'Azur. Notre connaissance locale vous garantit les meilleurs itinéraires.`,
      benefits: [
        'Connaissance parfaite des axes routiers locaux',
        'Flexibilité des horaires (24h/24)',
        'Possibilité d arrêts photos en cours de route',
        'Bouteilles d eau fraîche à disposition',
        'WiFi gratuit dans tous nos véhicules'
      ],
      pricing: 'Tarif fixe garanti, sans surprise'
    },
    tour: {
      intro: `Découvrez les trésors de la <strong>Riviera française</strong> avec nos circuits sur mesure. Nos chauffeurs sont aussi vos guides locaux.`,
      benefits: [
        'Circuits personnalisables selon vos envies',
        'Recommandations restaurants et activités',
        'Guides parlant français, anglais et hébreu',
        'Durée flexible (demi-journée à journée complète)',
        'Tarifs dégressifs pour groupes'
      ],
      pricing: 'Demi-journée à partir de 250€'
    },
    hebrew: {
      intro: `Service <strong>exclusif pour les voyageurs israéliens</strong> avec chauffeurs parlant hébreu. Nous comprenons vos besoins spécifiques.`,
      benefits: [
        'Chauffeurs natifs parlant hébreu',
        'Connaissance des restaurants casher de la région',
        'Respect des horaires du Shabbat',
        'Accompagnement pour les fêtes juives',
        'Transferts vers les synagogues locales'
      ],
      pricing: 'Devis personnalisé sur demande'
    },
    service: {
      intro: `Un service <strong>premium et flexible</strong> adapté à tous vos besoins de mobilité sur la Côte d'Azur.`,
      benefits: [
        'Mise à disposition à l heure ou à la journée',
        'Service conciergerie intégré',
        'Réservations restaurants et événements',
        'Discrétion et confidentialité garanties',
        'Facturation entreprise disponible'
      ],
      pricing: 'Mise à disposition à partir de 65€/heure'
    },
    business: {
      intro: `Transport <strong>professionnel haut de gamme</strong> pour vos déplacements d'affaires et congrès sur la Côte d'Azur.`,
      benefits: [
        'Véhicules executive (Classe S, Tesla)',
        'WiFi et chargeurs à disposition',
        'Facturation entreprise et notes de frais',
        'Ponctualité garantie pour vos rendez-vous',
        'Service navette pour groupes'
      ],
      pricing: 'Forfaits congrès sur mesure'
    },
    event: {
      intro: `Rendez votre événement <strong>inoubliable</strong> avec notre service de transport VIP pour mariages et occasions spéciales.`,
      benefits: [
        'Décoration du véhicule sur demande',
        'Coordination avec votre organisateur',
        'Champagne et rafraîchissements',
        'Photographe compatible',
        'Backup véhicule garanti'
      ],
      pricing: 'Forfait mariage à partir de 450€'
    }
  };

  const content = focusContent[page.focus] || focusContent.service;

  return `---
import BaseLayout from '../layouts/BaseLayout.astro';
import BookingWidget from '../components/BookingWidget.astro';

const title = "${page.title} | Galriviera VTC Premium Nice";
const description = "${page.title} - Service chauffeur privé haut de gamme sur la Côte d'Azur. ${page.keywords_fr}. Réservation 24/7, véhicules luxe, tarif transparent.";
const alternateLinks = ${alternateLinks};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Comment réserver un ${page.title} ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Réservez en 30 secondes via WhatsApp (+33 6 82 26 73 42) ou notre formulaire en ligne. Confirmation immédiate garantie."
      }
    },
    {
      "@type": "Question",
      "name": "Quel est le tarif pour ${page.title} ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "${content.pricing}. Tarif fixe et transparent, sans frais cachés. Devis gratuit sur demande."
      }
    },
    {
      "@type": "Question",
      "name": "Quels véhicules proposez-vous ?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Flotte premium : Mercedes Classe S, Classe E, Classe V (7 places), et Tesla Model S. Tous nos véhicules ont moins de 2 ans."
      }
    }
  ]
};
---

<BaseLayout title={title} description={description} currentLang="fr" alternateLinks={alternateLinks}>
  <!-- Hero Section -->
  <section class="hero-banner" style="min-height: 65vh;">
    <div class="hero-image-container">
      <div class="hero-overlay"></div>
      <img src="/assets/img/hero/hero-riviera.webp" alt="${page.title}" class="hero-background-image" loading="eager" onerror="this.src='https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop'"/>
    </div>
    <div class="hero-content" data-aos="fade-up">
      <span class="text-gold text-sm uppercase tracking-wider mb-2 block">VTC Premium Côte d'Azur</span>
      <h1 class="hero-title text-4xl md:text-5xl font-bold mb-4">${page.title}</h1>
      <p class="text-xl text-white/90 mb-6">Chauffeur privé professionnel • Véhicules luxe • Service 24/7</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="https://wa.me/33682267342" class="hero-cta-button bg-green-500 hover:bg-green-600">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
          Réserver sur WhatsApp
        </a>
        <a href="/contact" class="hero-cta-button bg-transparent border-2 border-white hover:bg-white hover:text-blue-900">
          Demander un devis
        </a>
      </div>
    </div>
  </section>

  <!-- Booking Widget -->
  <div class="container relative z-20 -mt-16">
    <BookingWidget currentLang="fr" />
  </div>

  <!-- Breadcrumb SEO -->
  <nav class="container mx-auto px-4 py-4 text-sm" aria-label="Breadcrumb">
    <ol class="flex items-center space-x-2 text-gray-500" itemscope itemtype="https://schema.org/BreadcrumbList">
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <a href="/" itemprop="item" class="hover:text-gold"><span itemprop="name">Accueil</span></a>
        <meta itemprop="position" content="1" />
      </li>
      <li class="mx-2">/</li>
      <li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
        <span itemprop="name" class="text-blue-900 font-medium">${page.title}</span>
        <meta itemprop="position" content="2" />
      </li>
    </ol>
  </nav>

  <!-- Main Content Section -->
  <article class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        <!-- Main Content -->
        <div class="lg:col-span-2" data-aos="fade-right">
          <!-- Reading Time Badge -->
          <div class="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span>Temps de lecture : 3 min</span>
          </div>

          <h2 class="text-3xl font-bold text-blue-900 mb-6">${page.title} : Votre Transport VTC Premium</h2>
          
          <p class="text-lg text-gray-700 mb-6 leading-relaxed">
            ${content.intro}
          </p>

          <p class="text-gray-700 mb-6">
            Chez <strong>Galriviera</strong>, nous sommes spécialisés dans les <strong>${page.keywords_fr}</strong>. Basés à Valbonne, au cœur de la technopole Sophia Antipolis, nous couvrons l'ensemble de la <strong>Côte d'Azur</strong> : Nice, Cannes, Monaco, Antibes, Saint-Tropez et au-delà.
          </p>

          <!-- Benefits List -->
          <div class="bg-gradient-to-r from-blue-50 to-gold/10 p-6 rounded-xl mb-8 border-l-4 border-gold">
            <h3 class="text-xl font-bold text-blue-900 mb-4">✨ Nos avantages exclusifs</h3>
            <ul class="space-y-3">
              ${content.benefits.map(b => `<li class="flex items-start gap-3">
                <span class="text-gold font-bold">✓</span>
                <span class="text-gray-700">${b}</span>
              </li>`).join('\n              ')}
            </ul>
          </div>

          <!-- Our Fleet Section -->
          <h3 class="text-2xl font-bold text-blue-900 mb-4">🚗 Notre flotte de véhicules premium</h3>
          <p class="text-gray-700 mb-4">
            Nous mettons à votre disposition une gamme de véhicules récents et parfaitement entretenus :
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div class="bg-gray-50 p-4 rounded-lg">
              <strong class="text-blue-900">Mercedes Classe S</strong>
              <p class="text-sm text-gray-600">Berline de luxe, 3 passagers max</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <strong class="text-blue-900">Mercedes Classe E</strong>
              <p class="text-sm text-gray-600">Berline affaires, 3 passagers max</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <strong class="text-blue-900">Mercedes Classe V</strong>
              <p class="text-sm text-gray-600">Van luxe, jusqu'à 7 passagers</p>
            </div>
            <div class="bg-gray-50 p-4 rounded-lg">
              <strong class="text-blue-900">Tesla Model S</strong>
              <p class="text-sm text-gray-600">100% électrique, premium</p>
            </div>
          </div>

          <!-- Why Us Section -->
          <h3 class="text-2xl font-bold text-blue-900 mb-4">💎 Pourquoi choisir Galriviera ?</h3>
          <p class="text-gray-700 mb-4">
            Avec plus de <strong>500 clients satisfaits</strong> et une note de <strong>4.9/5 sur Google</strong>, nous sommes la référence du transport VTC premium sur la Côte d'Azur. Notre équipe de chauffeurs professionnels est formée aux standards de l'hôtellerie de luxe.
          </p>
          <p class="text-gray-700 mb-6">
            Que vous soyez un <strong>touriste israélien</strong> à la recherche d'un chauffeur parlant hébreu, un <strong>homme d'affaires</strong> participant au MIPIM ou au Festival de Cannes, ou une <strong>famille en vacances</strong>, nous adaptons notre service à vos besoins spécifiques.
          </p>

          <!-- Call to Action -->
          <div class="bg-blue-900 text-white p-6 rounded-xl text-center">
            <h3 class="text-xl font-bold mb-3">Prêt à réserver ?</h3>
            <p class="mb-4 opacity-90">${content.pricing}</p>
            <a href="https://wa.me/33682267342" class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Obtenir un devis gratuit →
            </a>
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="lg:col-span-1" data-aos="fade-left">
          <!-- Quick Contact Card -->
          <div class="bg-gray-50 p-6 rounded-xl shadow-lg sticky top-24">
            <h3 class="text-xl font-bold text-blue-900 mb-4">📞 Contact rapide</h3>
            <div class="space-y-4">
              <a href="tel:+33682267342" class="flex items-center gap-3 text-gray-700 hover:text-gold transition-colors">
                <span class="bg-gold/10 p-2 rounded-full">📱</span>
                +33 6 82 26 73 42
              </a>
              <a href="https://wa.me/33682267342" class="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors">
                <span class="bg-green-100 p-2 rounded-full">💬</span>
                WhatsApp 24/7
              </a>
              <a href="mailto:vtctransportsig@gmail.com" class="flex items-center gap-3 text-gray-700 hover:text-gold transition-colors">
                <span class="bg-gold/10 p-2 rounded-full">✉️</span>
                Email
              </a>
            </div>

            <hr class="my-6 border-gray-200">

            <!-- Related Services -->
            <h4 class="font-bold text-blue-900 mb-3">Services similaires</h4>
            <ul class="space-y-2 text-sm">
              <li><a href="/vtc-nice-aeroport-transfert" class="text-gray-600 hover:text-gold">→ Transfert Aéroport Nice</a></li>
              <li><a href="/vtc-nice-monaco-monte-carlo" class="text-gray-600 hover:text-gold">→ VTC Nice Monaco</a></li>
              <li><a href="/vtc-nice-cannes-festival" class="text-gray-600 hover:text-gold">→ VTC Nice Cannes</a></li>
              <li><a href="/chauffeur-prive-parlant-hebreu-nice" class="text-gray-600 hover:text-gold">→ Chauffeur Hébreu</a></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  </article>

  <!-- FAQ Section with Schema -->
  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-blue-900 mb-12">❓ Questions Fréquentes</h2>
      <div class="max-w-3xl mx-auto space-y-4" itemscope itemtype="https://schema.org/FAQPage">
        <div class="bg-white p-6 rounded-lg shadow-sm" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 class="font-bold text-lg mb-2" itemprop="name">Comment réserver mon ${page.title} ?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p class="text-gray-600" itemprop="text">Réservez en 30 secondes via WhatsApp (+33 6 82 26 73 42) ou notre formulaire en ligne. Confirmation immédiate garantie. Nous recommandons de réserver au moins 24h à l'avance pour garantir la disponibilité.</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 class="font-bold text-lg mb-2" itemprop="name">Les chauffeurs parlent-ils anglais ou hébreu ?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p class="text-gray-600" itemprop="text">Oui, tous nos chauffeurs parlent couramment français et anglais. Nous disposons également de chauffeurs parlant hébreu pour nos clients israéliens, sur demande lors de la réservation.</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 class="font-bold text-lg mb-2" itemprop="name">Quels sont vos tarifs ?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p class="text-gray-600" itemprop="text">${content.pricing}. Nos tarifs sont fixes et transparents, sans frais cachés ni supplément pour les bagages. Demandez votre devis gratuit et personnalisé en quelques secondes.</p>
          </div>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
          <h3 class="font-bold text-lg mb-2" itemprop="name">Proposez-vous des sièges bébé ?</h3>
          <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
            <p class="text-gray-600" itemprop="text">Absolument ! Nous fournissons gratuitement des sièges auto adaptés à l'âge de votre enfant (nacelle, siège coque, rehausseur). Précisez-le simplement lors de votre réservation.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Trust Badges -->
  <section class="py-8 bg-white border-t border-gray-100">
    <div class="container mx-auto px-4">
      <div class="flex flex-wrap justify-center items-center gap-8 text-center text-sm text-gray-500">
        <div class="flex items-center gap-2">
          <span class="text-gold text-xl">⭐</span>
          <span><strong>4.9/5</strong> sur Google</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gold text-xl">🏆</span>
          <span><strong>500+</strong> clients satisfaits</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gold text-xl">🚗</span>
          <span>Véhicules <strong>-2 ans</strong></span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-gold text-xl">⏰</span>
          <span>Service <strong>24/7</strong></span>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .text-gold { color: #d4af37; }
  .border-gold { border-color: #d4af37; }
  .bg-gold\\/10 { background-color: rgba(212, 175, 55, 0.1); }
</style>
`;
};

// English Content Generator (SEO 2025 Optimized)
const generateEN = (page) => {
  const alternateLinks = JSON.stringify({
    en: page.slug_en,
    he: page.slug_he,
    fr: page.slug_fr
  });

  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BookingWidget from '../../components/BookingWidget.astro';

const title = "${page.title_en} | Galriviera Premium Chauffeur Nice";
const description = "${page.title_en} - Luxury private driver service on the French Riviera. ${page.keywords_en}. 24/7 booking, premium vehicles, transparent pricing.";
const alternateLinks = ${alternateLinks};
---

<BaseLayout title={title} description={description} currentLang="en" alternateLinks={alternateLinks}>
  <section class="hero-banner" style="min-height: 65vh;">
    <div class="hero-image-container">
      <div class="hero-overlay"></div>
      <img src="/assets/img/hero/hero-riviera.webp" alt="${page.title_en}" class="hero-background-image" loading="eager" onerror="this.src='https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop'"/>
    </div>
    <div class="hero-content" data-aos="fade-up">
      <span class="text-gold text-sm uppercase tracking-wider mb-2 block">Premium VTC French Riviera</span>
      <h1 class="hero-title text-4xl md:text-5xl font-bold mb-4">${page.title_en}</h1>
      <p class="text-xl text-white/90 mb-6">Professional Private Driver • Luxury Vehicles • 24/7 Service</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="https://wa.me/33682267342" class="hero-cta-button bg-green-500 hover:bg-green-600">
          Book on WhatsApp
        </a>
        <a href="/contact" class="hero-cta-button bg-transparent border-2 border-white hover:bg-white hover:text-blue-900">
          Get a Quote
        </a>
      </div>
    </div>
  </section>

  <div class="container relative z-20 -mt-16">
    <BookingWidget currentLang="en" />
  </div>

  <article class="py-12 bg-white">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-blue-900 mb-6">${page.title_en}: Your Premium VTC Service</h2>
        
        <p class="text-lg text-gray-700 mb-6">
          <strong>Galriviera</strong> specializes in <strong>${page.keywords_en}</strong> and personalized tours on the French Riviera. Based in Valbonne, we cover the entire Côte d'Azur: Nice, Cannes, Monaco, Antibes, Saint-Tropez and beyond.
        </p>

        <div class="bg-gradient-to-r from-blue-50 to-gold/10 p-6 rounded-xl mb-8 border-l-4 border-gold">
          <h3 class="text-xl font-bold text-blue-900 mb-4">✨ Why Choose Us?</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>Bilingual drivers (English, French, Hebrew available)</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>Premium vehicles (Mercedes S-Class, V-Class, Tesla)</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>24/7 availability with instant confirmation</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>Fixed pricing with no hidden fees</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>Child seats available on request</span></li>
          </ul>
        </div>

        <p class="text-gray-700 mb-6">
          Whether you're an <strong>Israeli tourist</strong> looking for a Hebrew-speaking driver, a <strong>business traveler</strong> attending MIPIM or the Cannes Festival, or a <strong>family on vacation</strong>, we tailor our service to your specific needs.
        </p>

        <div class="bg-blue-900 text-white p-6 rounded-xl text-center">
          <h3 class="text-xl font-bold mb-3">Ready to Book?</h3>
          <p class="mb-4 opacity-90">Get your free quote in seconds</p>
          <a href="https://wa.me/33682267342" class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors">
            Book Now on WhatsApp →
          </a>
        </div>
      </div>
    </div>
  </article>

  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-blue-900 mb-12">❓ Frequently Asked Questions</h2>
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-bold text-lg mb-2">How do I book my ${page.title_en}?</h3>
          <p class="text-gray-600">Book in 30 seconds via WhatsApp (+33 6 82 26 73 42) or our online form. Instant confirmation guaranteed. We recommend booking at least 24 hours in advance.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-bold text-lg mb-2">Do drivers speak English or Hebrew?</h3>
          <p class="text-gray-600">Yes! All our drivers are fluent in French and English. We also have Hebrew-speaking drivers available for our Israeli clients upon request.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-bold text-lg mb-2">What vehicles do you offer?</h3>
          <p class="text-gray-600">Premium fleet: Mercedes S-Class, E-Class, V-Class (7 seats), and Tesla Model S. All vehicles are less than 2 years old and impeccably maintained.</p>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .text-gold { color: #d4af37; }
  .border-gold { border-color: #d4af37; }
</style>
`;
};

// Hebrew Content Generator (SEO 2025 Optimized)
const generateHE = (page) => {
  const alternateLinks = JSON.stringify({
    en: page.slug_en,
    he: page.slug_he,
    fr: page.slug_fr
  });

  return `---
import BaseLayout from '../../layouts/BaseLayout.astro';
import BookingWidget from '../../components/BookingWidget.astro';

const title = "${page.title_he} | Galriviera נהג פרטי יוקרתי";
const description = "${page.title_he} - שירות נהג פרטי יוקרתי בריביירה הצרפתית. ${page.keywords_he}. הזמנה 24/7, רכבי יוקרה, מחירים שקופים.";
const alternateLinks = ${alternateLinks};
---

<BaseLayout title={title} description={description} currentLang="he" alternateLinks={alternateLinks}>
  <section class="hero-banner" style="min-height: 65vh;">
    <div class="hero-image-container">
      <div class="hero-overlay"></div>
      <img src="/assets/img/hero/hero-riviera.webp" alt="${page.title_he}" class="hero-background-image" loading="eager" onerror="this.src='https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop'"/>
    </div>
    <div class="hero-content" data-aos="fade-up">
      <span class="text-gold text-sm uppercase tracking-wider mb-2 block">VTC יוקרתי בריביירה הצרפתית</span>
      <h1 class="hero-title text-4xl md:text-5xl font-bold mb-4 font-hebrew" dir="rtl">${page.title_he}</h1>
      <p class="text-xl text-white/90 mb-6 font-hebrew" dir="rtl">נהג פרטי מקצועי • רכבי יוקרה • שירות 24/7</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="https://wa.me/33682267342" class="hero-cta-button bg-green-500 hover:bg-green-600 font-hebrew">
          הזמן בוואטסאפ
        </a>
        <a href="/contact" class="hero-cta-button bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 font-hebrew">
          קבל הצעת מחיר
        </a>
      </div>
    </div>
  </section>

  <div class="container relative z-20 -mt-16">
    <BookingWidget currentLang="he" />
  </div>

  <article class="py-12 bg-white">
    <div class="container mx-auto px-4" dir="rtl">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-blue-900 mb-6 font-hebrew">${page.title_he}: שירות VTC יוקרתי</h2>
        
        <p class="text-lg text-gray-700 mb-6 font-hebrew">
          <strong>Galriviera</strong> מתמחה ב<strong>${page.keywords_he}</strong> וטיולים מותאמים אישית בריביירה הצרפתית. אנו מבוססים בוולבון ומכסים את כל החוף האזורי: ניס, קאן, מונקו, אנטיב, סן טרופה ומעבר.
        </p>

        <div class="bg-gradient-to-r from-blue-50 to-gold/10 p-6 rounded-xl mb-8 border-r-4 border-gold">
          <h3 class="text-xl font-bold text-blue-900 mb-4 font-hebrew">✨ למה לבחור בנו?</h3>
          <ul class="space-y-3 font-hebrew">
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>נהגים דוברי עברית, אנגלית וצרפתית</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>רכבי יוקרה (מרצדס S-Class, V-Class, טסלה)</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>זמינות 24/7 עם אישור מיידי</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>ידע מעמיק במסעדות כשרות באזור</span></li>
            <li class="flex items-start gap-3"><span class="text-gold font-bold">✓</span><span>כיסאות בטיחות לילדים ללא תוספת</span></li>
          </ul>
        </div>

        <p class="text-gray-700 mb-6 font-hebrew">
          אנו מבינים את הצרכים הייחודיים של <strong>התייר הישראלי</strong>. בין אם אתם מחפשים מסעדה כשרה, צריכים להגיע לבית כנסת לשבת, או רוצים לסייר באתרי המורשת היהודית של ניס - אנחנו כאן בשבילכם.
        </p>

        <div class="bg-blue-900 text-white p-6 rounded-xl text-center">
          <h3 class="text-xl font-bold mb-3 font-hebrew">מוכנים להזמין?</h3>
          <p class="mb-4 opacity-90 font-hebrew">קבלו הצעת מחיר חינם תוך שניות</p>
          <a href="https://wa.me/33682267342" class="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors font-hebrew">
            הזמינו עכשיו בוואטסאפ ←
          </a>
        </div>
      </div>
    </div>
  </article>

  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4" dir="rtl">
      <h2 class="text-3xl font-bold text-center text-blue-900 mb-12 font-hebrew">❓ שאלות נפוצות</h2>
      <div class="max-w-3xl mx-auto space-y-4">
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-bold text-lg mb-2 font-hebrew">איך מזמינים ${page.title_he}?</h3>
          <p class="text-gray-600 font-hebrew">הזמינו תוך 30 שניות דרך וואטסאפ (+33 6 82 26 73 42) או טופס האתר. אישור מיידי מובטח. אנו ממליצים להזמין לפחות 24 שעות מראש.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-bold text-lg mb-2 font-hebrew">האם הנהגים דוברים עברית?</h3>
          <p class="text-gray-600 font-hebrew">כן! יש לנו נהגים דוברי עברית שילועיים זמינים לפי בקשה. כל הנהגים שלנו דוברים גם אנגלית וצרפתית.</p>
        </div>
        <div class="bg-white p-6 rounded-lg shadow-sm">
          <h3 class="font-bold text-lg mb-2 font-hebrew">אלו סוגי רכבים מציעים?</h3>
          <p class="text-gray-600 font-hebrew">צי יוקרתי: מרצדס S-Class, E-Class, V-Class (7 מושבים), וטסלה Model S. כל הרכבים בני פחות משנתיים ומתוחזקים בצורה מושלמת.</p>
        </div>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .text-gold { color: #d4af37; }
  .border-gold { border-color: #d4af37; }
  .font-hebrew { font-family: 'Rubik', sans-serif; }
</style>
`;
};

// Main execution
const enDir = path.join(pagesDir, 'en');
const heDir = path.join(pagesDir, 'he');

ensureDir(enDir);
ensureDir(heDir);

strategy.forEach(page => {
  // Generate FR (Root) using slug_fr
  fs.writeFileSync(path.join(pagesDir, `${page.slug_fr}.astro`), generateFR(page));

  // Generate EN using slug_en
  fs.writeFileSync(path.join(enDir, `${page.slug_en}.astro`), generateEN(page));

  // Generate HE using slug_he
  fs.writeFileSync(path.join(heDir, `${page.slug_he}.astro`), generateHE(page));

  console.log(`Generated SEO-optimized pages for: ${page.slug_fr}`);
});

console.log('SEO 2025 Optimized generation complete!');
