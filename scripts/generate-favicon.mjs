/**
 * Generates the site's favicon family from the shield/check master mark.
 *
 * Backlink directories frequently ignore SVG favicons and enlarge
 * /favicon.ico. The previous ICO contained only one 32×32 bitmap, which
 * made the mark look soft or pixelated in those listings. Keep real PNG
 * frames at the requested sizes and embed all of them in the ICO.
 *
 * Run after changing the favicon SVG:
 *   node scripts/generate-favicon.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { deflateSync } from "node:zlib";

const ROOT = join(import.meta.dirname, "..");
const PUBLIC = join(ROOT, "public");

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

function pixel(x, y, size, background) {
  const samples = size >= 128 ? 4 : 8;
  let coverage = 0;
  for (let sy = 0; sy < samples; sy++) {
    for (let sx = 0; sx < samples; sx++) {
      const normalizedX = ((x + (sx + 0.5) / samples) / size) * 32;
      const normalizedY = ((y + (sy + 0.5) / samples) / size) * 32;
      if (
        nearPolyline(normalizedX, normalizedY, SHIELD) ||
        nearPolyline(normalizedX, normalizedY, CHECK)
      ) {
        coverage++;
      }
    }
  }

  const alpha = Math.round((coverage / (samples * samples)) * 255);
  if (alpha === 0) return background;
  if (!background || background[3] === 0) return [BRAND[0], BRAND[1], BRAND[2], alpha];

  const foregroundAlpha = alpha / 255;
  const backgroundAlpha = background[3] / 255;
  const outputAlpha = foregroundAlpha + backgroundAlpha * (1 - foregroundAlpha);
  return [
    Math.round((BRAND[0] * foregroundAlpha + background[0] * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha),
    Math.round((BRAND[1] * foregroundAlpha + background[1] * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha),
    Math.round((BRAND[2] * foregroundAlpha + background[2] * backgroundAlpha * (1 - foregroundAlpha)) / outputAlpha),
    Math.round(outputAlpha * 255),
  ];
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

function buildPng(size, background = [0, 0, 0, 0]) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  for (let y = 0; y < size; y++) {
    const row = y * (size * 4 + 1);
    raw[row] = 0;
    for (let x = 0; x < size; x++) {
      const [r, g, b, a] = pixel(x, y, size, background);
      const i = row + 1 + x * 4;
      raw[i] = r;
      raw[i + 1] = g;
      raw[i + 2] = b;
      raw[i + 3] = a;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
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

function buildIco(frames) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(frames.length, 4);

  const entries = [];
  const payloads = [];
  let offset = 6 + frames.length * 16;
  for (const frame of frames) {
    const entry = Buffer.alloc(16);
    entry[0] = frame.size >= 256 ? 0 : frame.size;
    entry[1] = frame.size >= 256 ? 0 : frame.size;
    entry[2] = 0;
    entry[3] = 0;
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(frame.png.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    payloads.push(frame.png);
    offset += frame.png.length;
  }

  return Buffer.concat([header, ...entries, ...payloads]);
}

// Touch SVG mtime so CI knows source exists
readFileSync(join(PUBLIC, "favicon.svg"));

const transparent = [0, 0, 0, 0];
const white = [255, 255, 255, 255];
const faviconSizes = [16, 32, 48, 64, 128, 256];
const pngOutputs = [
  [16, "favicon-16.png", transparent],
  [32, "favicon-32.png", transparent],
  [48, "favicon-48.png", transparent],
  [180, "apple-touch-icon.png", white],
  [192, "icon-192.png", white],
  [512, "icon-512.png", white],
];

for (const [size, filename, background] of pngOutputs) {
  writeFileSync(join(PUBLIC, filename), buildPng(size, background));
}

const icoFrames = faviconSizes.map((size) => ({ size, png: buildPng(size) }));
const icoPath = join(PUBLIC, "favicon.ico");
writeFileSync(icoPath, buildIco(icoFrames));

console.log(`Wrote ${pngOutputs.length} PNG assets and ${icoFrames.length} ICO frames.`);
