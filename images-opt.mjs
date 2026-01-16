import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ICONS_DIR = path.resolve("icons");

const files = await fs.readdir(ICONS_DIR);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));

for (const file of pngs) {
  const full = path.join(ICONS_DIR, file);

  const buf = await sharp(full)
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  await fs.writeFile(full, buf);

  const webpPath = full.replace(/\.png$/i, ".webp");
  const webpBuf = await sharp(full).webp({ quality: 85 }).toBuffer();
  await fs.writeFile(webpPath, webpBuf);
}

console.log("Imagens otimizadas em /icons (PNG regravado + WebP gerado).");
