import { mkdir, readFile, writeFile, cp } from "node:fs/promises";
import { build } from "esbuild";
import { minify } from "html-minifier-terser";

await mkdir("dist", { recursive: true });

await build({
  entryPoints: ["script.js"],
  outfile: "dist/script.js",
  minify: true,
  bundle: false
});

await build({
  entryPoints: ["style.css"],
  outfile: "dist/style.css",
  minify: true,
  loader: { ".css": "css" }
});

await build({
  entryPoints: ["service-worker.js"],
  outfile: "dist/service-worker.js",
  minify: true,
  bundle: false
});

const html = await readFile("index.html", "utf8");
const htmlMin = await minify(html, {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeEmptyAttributes: true,
  minifyCSS: true,
  minifyJS: true,
  keepClosingSlash: true
});
await writeFile("dist/index.html", htmlMin);

await cp("manifest.json", "dist/manifest.json");
await cp("icons", "dist/icons", { recursive: true });
