/**
 * Generates public/favicon.ico from public/favicon.svg (32×32 PNG embedded in ICO).
 * Run once after changing the SVG: node scripts/generate-favicon.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const ROOT = join(import.meta.dirname, "..");
const OUT = join(ROOT, "public", "favicon.ico");

const SIZE = 32;
const BRAND = [0x25, 0x63, 0xeb, 0xff]; // #2563eb
const WHITE = [0xff, 0xff, 0xff, 0xff];

function inCheck(x, y) {
  // Stylized check matching favicon.svg proportions
  if (x >= 9 && x <= 13 && y >= 16 && y <= 20 && x - 9 <= y - 16) return true;
  if (x >= 14 && x <= 18 && y >= 16 && y <= 21 && 18 - x <= y - 16) return true;
  if (x >= 19 && x <= 22 && y >= 11 && y <= 16 && x - 19 <= 16 - y) return true;
  return false;
}

function pixel(x, y) {
  const inRound =
    (x < 6 || x >= SIZE - 6 || y < 6 || y >= SIZE - 6)
      ? !(
          (x < 6 && y < 6 && (x - 6) ** 2 + (y - 6) ** 2 > 36) ||
          (x >= SIZE - 6 && y < 6 && (x - (SIZE - 7)) ** 2 + (y - 6) ** 2 > 36) ||
          (x < 6 && y >= SIZE - 6 && (x - 6) ** 2 + (y - (SIZE - 7)) ** 2 > 36) ||
          (x >= SIZE - 6 &&
            y >= SIZE - 6 &&
            (x - (SIZE - 7)) ** 2 + (y - (SIZE - 7)) ** 2 > 36)
        )
      : true;

  if (!inRound) return [0, 0, 0, 0];
  if (inCheck(x, y)) return WHITE;
  return BRAND;
}

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return (c ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, "ascii");
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crc]);
}

function buildPng() {
  const raw = Buffer.alloc((SIZE * 4 + 1) * SIZE);
  for (let y = 0; y < SIZE; y++) {
    const row = y * (SIZE * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < SIZE; x++) {
      const [r, g, b, a] = pixel(x, y);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(SIZE, 0);
  ihdr.writeUInt32BE(SIZE, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    pngChunk("IHDR", ihdr),
    pngChunk("IDAT", deflateSync(raw)),
    pngChunk("IEND", Buffer.alloc(0)),
  ]);
}

function buildIco(png) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry[0] = SIZE;
  entry[1] = SIZE;
  entry[2] = 0;
  entry[3] = 0;
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(png.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, png]);
}

// Touch SVG mtime so CI knows source exists
readFileSync(join(ROOT, "public", "favicon.svg"));
writeFileSync(OUT, buildIco(buildPng()));
console.log(`Wrote ${OUT}`);
