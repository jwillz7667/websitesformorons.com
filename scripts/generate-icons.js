/**
 * PWA Icon Generator Script
 *
 * This script generates all required PWA icons from the base SVG.
 *
 * To use with sharp (recommended):
 * 1. npm install sharp --save-dev
 * 2. node scripts/generate-icons.js
 *
 * Alternatively, use an online tool like:
 * - https://realfavicongenerator.net/
 * - https://www.pwabuilder.com/imageGenerator
 *
 * Required icon sizes for PWA:
 * - 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512
 * - Apple touch icon: 180x180
 * - Favicon: 16x16, 32x32, 48x48
 * - Maskable icons: 192x192, 512x512 (with safe zone padding)
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
  sharp = require('sharp');
} catch {
  console.log('Sharp not installed. Install with: npm install sharp --save-dev');
  console.log('');
  console.log('For now, creating placeholder SVG icons...');
  createPlaceholderIcons();
  process.exit(0);
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconDir = path.join(__dirname, '../public/icons');
const svgPath = path.join(__dirname, '../public/icon.svg');

async function generateIcons() {
  // Ensure icons directory exists
  if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
  }

  const svgBuffer = fs.readFileSync(svgPath);

  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(iconDir, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  // Generate Apple Touch Icon (180x180)
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconDir, 'apple-touch-icon.png'));
  console.log('Generated apple-touch-icon.png');

  // Generate favicon sizes
  await sharp(svgBuffer)
    .resize(16, 16)
    .png()
    .toFile(path.join(iconDir, 'favicon-16x16.png'));
  console.log('Generated favicon-16x16.png');

  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(iconDir, 'favicon-32x32.png'));
  console.log('Generated favicon-32x32.png');

  // Generate maskable icons with padding (for safe zone)
  for (const size of [192, 512]) {
    const padding = Math.floor(size * 0.1); // 10% padding for safe zone
    const innerSize = size - (padding * 2);

    await sharp(svgBuffer)
      .resize(innerSize, innerSize)
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 10, g: 10, b: 10, alpha: 1 }
      })
      .png()
      .toFile(path.join(iconDir, `icon-maskable-${size}.png`));
    console.log(`Generated icon-maskable-${size}.png`);
  }

  console.log('\\nAll icons generated successfully!');
}

function createPlaceholderIcons() {
  const iconDir = path.join(__dirname, '../public/icons');

  if (!fs.existsSync(iconDir)) {
    fs.mkdirSync(iconDir, { recursive: true });
  }

  // Create SVG-based placeholder for each size
  const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

  sizes.forEach(size => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.floor(size * 0.1875)}" fill="#0a0a0a"/>
  <path d="M${size * 0.25} ${size * 0.3125} L${size * 0.3828} ${size * 0.6875} L${size * 0.5} ${size * 0.4375} L${size * 0.6172} ${size * 0.6875} L${size * 0.75} ${size * 0.3125}" stroke="url(#grad)" stroke-width="${Math.max(2, size * 0.0625)}" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <circle cx="${size * 0.25}" cy="${size * 0.3125}" r="${Math.max(2, size * 0.03125)}" fill="#06b6d4"/>
  <circle cx="${size * 0.75}" cy="${size * 0.3125}" r="${Math.max(2, size * 0.03125)}" fill="#f97316"/>
</svg>`;

    const filename = size === 180 ? 'apple-touch-icon.svg' : `icon-${size}.svg`;
    fs.writeFileSync(path.join(iconDir, filename), svg);
    console.log(`Created placeholder ${filename}`);
  });

  // Copy main icon.svg for reference
  console.log('\\nPlaceholder icons created!');
  console.log('\\nTo generate PNG icons, install sharp and run this script again:');
  console.log('npm install sharp --save-dev && node scripts/generate-icons.js');
}

generateIcons().catch(console.error);
