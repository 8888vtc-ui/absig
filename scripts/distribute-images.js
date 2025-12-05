import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesDir = path.join(__dirname, '../src/pages');

// List of pages to update (excluding index.astro which I did manually)
// Actually, I should update all generated pages to use random hero images from the gallery
const galleryImages = [
    '/assets/img/gallery/galriviera-luxury-1.webp',
    '/assets/img/gallery/galriviera-luxury-2.webp',
    '/assets/img/gallery/galriviera-luxury-3.webp',
    '/assets/img/gallery/galriviera-luxury-4.webp',
    '/assets/img/gallery/galriviera-luxury-5.webp',
    '/assets/img/gallery/galriviera-luxury-6.webp',
    '/assets/img/gallery/galriviera-luxury-7.webp',
    '/assets/img/gallery/galriviera-luxury-8.webp',
    '/assets/img/gallery/galriviera-luxury-9.webp',
    '/assets/img/gallery/galriviera-luxury-10.webp',
    '/assets/img/gallery/galriviera-luxury-11.webp',
    '/assets/img/gallery/galriviera-luxury-12.webp',
];

function getRandomImage() {
    return galleryImages[Math.floor(Math.random() * galleryImages.length)];
}

function updatePageHero(filePath) {
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf-8');

    // Regex to find the hero image src
    // Looking for: src="/assets/img/hero/hero-riviera.webp"
    const heroRegex = /src="\/assets\/img\/hero\/hero-riviera\.webp"/g;

    if (heroRegex.test(content)) {
        const newImage = getRandomImage();
        const newContent = content.replace(heroRegex, `src="${newImage}"`);
        fs.writeFileSync(filePath, newContent);
        console.log(`Updated hero image in ${path.basename(filePath)} to ${newImage}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            processDirectory(filePath);
        } else if (file.endsWith('.astro') && file !== 'index.astro') {
            updatePageHero(filePath);
        }
    });
}

processDirectory(pagesDir);
