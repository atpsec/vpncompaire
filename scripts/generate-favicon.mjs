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
const STROKE_WIDTH = 2.25;
const SHIELD = [
  [16, 3.5],
  [25, 7],
  [25, 14.3],
  [24.8, 17.4],
  [23.6, 20.2],
  [21.8, 22.9],
  [19.2, 25.5],
  [16, 27.5],
  [12.8, 25.5],
  [10.2, 22.9],
  [8.4, 20.2],
  [7.2, 17.4],
  [7, 14.3],
  [7, 7],
  [16, 3.5],
];
const CHECK = [
  [11.5, 15.6],
  [14.5, 18.6],
  [20.5, 12.6],
];

function distanceToSegment(x, y, [ax, ay], [bx, by]) {
  const dx = bx - ax;
  const dy = by - ay;
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared === 0
    ? 0
    : Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / lengthSquared));
  const closestX = ax + t * dx;
  const closestY = ay + t * dy;
  return Math.hypot(x - closestX, y - closestY);
}

function nearPolyline(x, y, points) {
  return points.slice(0, -1).some((point, index) =>
    distanceToSegment(x, y, point, points[index + 1]) <= STROKE_WIDTH / 2,
  );
}

function pixel(x, y) {
  const centerX = x + 0.5;
  const centerY = y + 0.5;
  if (nearPolyline(centerX, centerY, SHIELD) || nearPolyline(centerX, centerY, CHECK)) {
    return BRAND;
  }
  return [0, 0, 0, 0];
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
