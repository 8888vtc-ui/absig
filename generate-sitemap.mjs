
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://www.absig-consulting.fr';
const DIST_DIR = path.join(__dirname, 'dist');

function getAllFiles(dirPath, arrayOfFiles) {
    try {
        const files = fs.readdirSync(dirPath);

        arrayOfFiles = arrayOfFiles || [];

        files.forEach(function (file) {
            if (fs.statSync(dirPath + "/" + file).isDirectory()) {
                arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
            } else {
                if (file.endsWith('.html')) {
                    arrayOfFiles.push(path.join(dirPath, "/", file));
                }
            }
        });

        return arrayOfFiles;
    } catch (e) {
        console.error(`Error reading directory ${dirPath}:`, e);
        return arrayOfFiles || [];
    }
}

try {
    console.log(`Scanning ${DIST_DIR} for HTML files...`);

    if (!fs.existsSync(DIST_DIR)) {
        console.error(`Dist directory not found at ${DIST_DIR}`);
        process.exit(1);
    }

    const files = getAllFiles(DIST_DIR);

    if (files.length === 0) {
        console.warn("No HTML files found!");
    }

    const urls = files.map(file => {
        // Get relative path from dist
        let relativePath = path.relative(DIST_DIR, file);
        // Convert backslashes to forward slashes (Windows)
        let url = relativePath.replace(/\\/g, '/');

        // Remove index.html
        if (url.endsWith('index.html')) {
            url = url.replace('index.html', '');
        }

        // Ensure properly formatted URL path
        // If it's empty (homepage), keep empty
        // If it ends with .html (non-index file), keep .html? Or remove if clean URLs
        // Astro static build usually keeps .html for non-index files unless mapped to directory

        // Remove trailing slash if desired, or ensure for consistency.
        // Let's ensure trailing slash for directories (empty url means homepage)

        let fullUrl = `${SITE_URL}/${url}`;

        // Normalize slashes
        fullUrl = fullUrl.replace(/([^:]\/)\/+/g, "$1");

        return fullUrl;
    });

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === SITE_URL + '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapContent);
    console.log(`✅ Sitemap generated at ${path.join(DIST_DIR, 'sitemap.xml')} with ${urls.length} URLs.`);

} catch (e) {
    console.error("Error generating sitemap:", e);
    process.exit(1);
}
