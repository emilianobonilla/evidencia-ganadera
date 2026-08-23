import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir)) {
    if (entry.startsWith(".")) continue;
    const path = join(dir, entry);
    const info = await stat(path);
    if (info.isDirectory()) out.push(...await walk(path));
    else if (path.endsWith(".html")) out.push(path);
  }
  return out;
}

const files = await walk(root);
const cache = new Map();
const errors = [];

for (const file of files) {
  const html = await readFile(file, "utf8");
  cache.set(file, html);
  if (!/^<!doctype html>/i.test(html)) errors.push(`${file}: falta doctype`);
  if (!/<html lang="es">/i.test(html)) errors.push(`${file}: falta lang=es`);
  if (!/<meta name="viewport"/i.test(html)) errors.push(`${file}: falta viewport`);
  if (!/<title>[^<]+<\/title>/i.test(html)) errors.push(`${file}: falta title`);
  if (/turn\d+(?:search|view|fetch|academia)/i.test(html)) errors.push(`${file}: expone un ID interno de búsqueda`);
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
  const seen = new Set();
  for (const id of ids) {
    if (seen.has(id)) errors.push(`${file}: id duplicado #${id}`);
    seen.add(id);
  }
}

for (const [file, html] of cache) {
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const raw = match[1];
    if (/^(?:https?:|mailto:|tel:|data:|javascript:)/i.test(raw)) continue;
    const [relative, fragment] = raw.split("#", 2);
    const target = relative ? resolve(dirname(file), relative) : file;
    try {
      const info = await stat(target);
      if (!info.isFile()) errors.push(`${file}: destino no es archivo ${raw}`);
    } catch {
      errors.push(`${file}: enlace local roto ${raw}`);
      continue;
    }
    if (fragment && target.endsWith(".html")) {
      const targetHtml = cache.get(target) ?? await readFile(target, "utf8");
      if (!new RegExp(`\\sid=["']${fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']`).test(targetHtml)) {
        errors.push(`${file}: fragmento inexistente ${raw}`);
      }
    }
  }
}

const itemFiles = files.filter(file => dirname(file) === join(root, "items"));
if (itemFiles.length !== 15) errors.push(`Se esperaban 15 fichas; se encontraron ${itemFiles.length}`);

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`OK: ${files.length} HTML, ${itemFiles.length} fichas, enlaces locales e IDs válidos.`);
}
