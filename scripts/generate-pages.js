import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const strategyPath = path.join(__dirname, '../content-strategy.json');
const pagesDir = path.join(__dirname, '../src/pages');

const strategy = JSON.parse(fs.readFileSync(strategyPath, 'utf-8'));

const generatePageContent = (page) => {
    return `---
import BaseLayout from '../layouts/BaseLayout.astro';

const title = "${page.title} | Galriviera";
const description = "Service VTC Premium : ${page.title}. Chauffeur privé bilingue, véhicules luxe. ${page.keywords_fr}.";
---

<BaseLayout title={title} description={description}>
  <section class="hero-banner" style="min-height: 60vh;">
    <div class="hero-image-container">
      <div class="hero-overlay"></div>
      <img src="/assets/img/hero/hero-riviera.webp" alt="${page.title}" class="hero-background-image" onerror="this.src='https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1920&auto=format&fit=crop'"/>
    </div>
    <div class="hero-content">
      <h1 class="hero-title text-4xl md:text-6xl font-bold mb-4">${page.title}</h1>
      <h2 class="text-2xl text-gold mb-6">${page.title_en}</h2>
      <p class="text-xl text-white/90 font-hebrew" dir="rtl">${page.title_he}</p>
      <div class="mt-8">
        <a href="https://wa.me/33616552811" class="hero-cta-button">Réserver / Book Now</a>
      </div>
    </div>
  </section>

  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="text-3xl font-bold text-blue-900 mb-6">Qui sommes-nous ? – Votre service VTC premium sur la Côte d’Azur</h2>
          <p class="mb-4 text-gray-700">
            Notre société de transport VTC <strong>Galriviera</strong> est spécialisée dans les <strong>${page.keywords_fr}</strong> et les circuits touristiques personnalisés en région PACA. Fiabilité, ponctualité et qualité de service sont au cœur de notre engagement.
          </p>
          <p class="mb-4 text-gray-700">
            Grâce à une connaissance approfondie de la Côte d’Azur, nous vous offrons plus qu’un simple trajet : une véritable expérience sur mesure, adaptée à vos besoins spécifiques : <em>${page.keywords_en}</em>.
          </p>
          
          <div class="bg-gray-50 p-6 rounded-lg border-l-4 border-gold mt-8">
            <h3 class="text-xl font-bold text-blue-900 mb-2">Service Spécial Israélien / Israeli Special Service</h3>
            <p class="text-gray-700 mb-2">We provide Hebrew speaking drivers and Kosher concierge services.</p>
            <p class="font-hebrew text-right text-lg text-blue-900" dir="rtl">
              אנו מספקים נהגים דוברי עברית ושירותי קונסיירז' כשר.
              ${page.keywords_he}.
            </p>
          </div>
        </div>
        
        <div class="space-y-6">
          <div class="bg-blue-900 text-white p-8 rounded-xl shadow-xl">
            <h3 class="text-2xl font-bold mb-4 text-gold">🚘 Un service professionnel, sûr et confortable</h3>
            <p class="mb-4">
              Nos chauffeurs expérimentés maîtrisent parfaitement la conduite dans toute la région. Leur priorité : votre sécurité, votre confort et votre tranquillité.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center gap-2">✓ Véhicules récents (Mercedes, Tesla)</li>
              <li class="flex items-center gap-2">✓ Badge d’accès aéroport Nice</li>
              <li class="flex items-center gap-2">✓ Prise en charge ports & gares</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 bg-gray-50">
    <div class="container mx-auto px-4">
      <h2 class="text-3xl font-bold text-center text-blue-900 mb-12">Pourquoi choisir notre service pour ${page.title} ?</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div class="text-4xl mb-4">🌴</div>
          <h3 class="text-xl font-bold mb-3">Expert Touristique</h3>
          <p class="text-gray-600">
            Nous connaissons les meilleurs spots, restaurants et lieux incontournables.
            Que vous soyez en escale ou en séjour, nous construisons votre itinéraire sur mesure.
          </p>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div class="text-4xl mb-4">💼</div>
          <h3 class="text-xl font-bold mb-3">Service Flexible & Bilingue</h3>
          <p class="text-gray-600">
            Nous parlons français, anglais et hébreu. Prestations adaptées aux familles, groupes et voyageurs d'affaires.
            <strong>${page.keywords_en}</strong>.
          </p>
        </div>

        <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <div class="text-4xl mb-4">⭐</div>
          <h3 class="text-xl font-bold mb-3">Excellence & Confort</h3>
          <p class="text-gray-600">
            Ponctualité exemplaire, chauffeurs courtois, véhicules haut de gamme.
            Tarifs raisonnables et transparents pour <strong>${page.keywords_fr}</strong>.
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="py-16 bg-blue-900 text-white">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold mb-6">Réservez votre ${page.title}</h2>
      <p class="text-xl mb-8 max-w-2xl mx-auto">
        Disponible 24/7 pour tous vos déplacements sur la Côte d'Azur.
        Service client en Français, Anglais et Hébreu.
      </p>
      <div class="flex justify-center gap-4 flex-wrap">
        <a href="https://wa.me/33616552811" class="btn bg-green-500 hover:bg-green-600 text-white border-none">
          WhatsApp Direct
        </a>
        <a href="/contact" class="btn bg-gold text-blue-900 hover:bg-yellow-500 border-none">
          Devis Gratuit / Quote
        </a>
      </div>
    </div>
  </section>
</BaseLayout>

<style>
  .font-hebrew {
    font-family: 'Rubik', sans-serif;
  }
  .text-gold {
    color: #d4af37;
  }
  .bg-gold {
    background-color: #d4af37;
  }
  .border-gold {
    border-color: #d4af37;
  }
</style>
`;
};

// Ensure directory exists
if (!fs.existsSync(pagesDir)) {
    fs.mkdirSync(pagesDir, { recursive: true });
}

// Generate pages
strategy.forEach(page => {
    const fileName = page.slug + '.astro';
    const filePath = path.join(pagesDir, fileName);
    const content = generatePageContent(page);

    fs.writeFileSync(filePath, content);
    console.log('Generated ' + fileName);
});

console.log('Successfully generated ' + strategy.length + ' pages.');
