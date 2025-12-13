/**
 * Script pour générer les icônes PWA (192x192 et 512x512)
 * Nécessite sharp: npm install sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const logoPath = path.join(__dirname, '../public/assets/img/logo-galriviera.png');
const outputDir = path.join(__dirname, '../public/assets/img/favicon');

// Créer le dossier si nécessaire
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const sizes = [192, 512];

async function generateIcons() {
  try {
    console.log('🔄 Génération des icônes PWA...');
    
    for (const size of sizes) {
      const outputPath = path.join(outputDir, `android-chrome-${size}x${size}.png`);
      
      await sharp(logoPath)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 10, g: 10, b: 10, alpha: 1 } // Fond noir (#0a0a0a)
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ Icône ${size}x${size} générée: ${outputPath}`);
    }
    
    console.log('✨ Toutes les icônes PWA ont été générées avec succès!');
  } catch (error) {
    console.error('❌ Erreur lors de la génération des icônes:', error);
    process.exit(1);
  }
}

generateIcons();

