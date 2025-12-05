import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');
const outputDir = path.join(publicDir, 'assets/img/gallery');

// Ensure output dir exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Find all WhatsApp images in public root
const files = fs.readdirSync(publicDir).filter(file =>
    file.startsWith('IMG-') && (file.endsWith('.jpg') || file.endsWith('.jpeg'))
);

console.log(`Found ${files.length} images to process.`);

async function processImages() {
    for (const [index, file] of files.entries()) {
        const inputPath = path.join(publicDir, file);
        const newName = `galriviera-luxury-${index + 1}.webp`;
        const outputPath = path.join(outputDir, newName);

        try {
            await sharp(inputPath)
                .resize(1920, 1080, { // Standardize size for web
                    fit: 'inside',
                    withoutEnlargement: true
                })
                .webp({ quality: 80 })
                .toFile(outputPath);

            console.log(`Processed: ${file} -> ${newName}`);

            // Optional: Delete original
            // fs.unlinkSync(inputPath); 
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }
}

processImages();
