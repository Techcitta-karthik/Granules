const fs = require('fs');
const zlib = require('zlib');

// Read the original uncropped backup if exists, or current bw-logo
const buf = fs.readFileSync('public/assets/media/bw-logo.png');
let pos = 8;
const chunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.slice(pos + 4, pos + 8).toString('ascii');
  const data = buf.slice(pos + 8, pos + 8 + len);
  chunks.push({ type, data, len });
  pos += 12 + len;
}

const idatData = Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data));
const raw = zlib.inflateSync(idatData);

const ihdr = chunks.find(c => c.type === 'IHDR').data;
const width = ihdr.readUInt32BE(0);
const height = ihdr.readUInt32BE(4);
const bpp = 4;
const pixels = Buffer.alloc(width * height * 4);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let srcPos = 0;
for (let y = 0; y < height; y++) {
  const filterType = raw[srcPos++];
  const rowStart = y * width * 4;
  const prevRowStart = (y - 1) * width * 4;
  for (let x = 0; x < width * 4; x++) {
    const val = raw[srcPos++];
    const a = x >= bpp ? pixels[rowStart + x - bpp] : 0;
    const b = y > 0 ? pixels[prevRowStart + x] : 0;
    const c = (x >= bpp && y > 0) ? pixels[prevRowStart + x - bpp] : 0;
    let decoded = 0;
    if (filterType === 0) decoded = val;
    else if (filterType === 1) decoded = (val + a) & 0xff;
    else if (filterType === 2) decoded = (val + b) & 0xff;
    else if (filterType === 3) decoded = (val + Math.floor((a + b) / 2)) & 0xff;
    else if (filterType === 4) decoded = (val + paeth(a, b, c)) & 0xff;
    pixels[rowStart + x] = decoded;
  }
}

// Find actual non-white bounding box in current image
let minX = width, maxX = 0, minY = height, maxY = 0;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const idx = (y * width + x) * 4;
    const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2], a = pixels[idx+3];
    if (a > 30 && (r < 240 || g < 240 || b < 240)) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}
console.log('Current Bounds:', { minX, maxX, minY, maxY, width: maxX - minX, height: maxY - minY });

const contentWidth = maxX - minX;
const contentHeight = maxY - minY;
const centerX = (minX + maxX) / 2;
const centerY = (minY + maxY) / 2;

// We want the logo to tightly fit the box:
// Margin of just ~6px on the wider side (width), making it fill ~94% of the container box!
const cropSize = Math.round(contentWidth + 14); // 7px margin on each side
const startX = Math.round(centerX - cropSize / 2);
const startY = Math.round(centerY - cropSize / 2);

const croppedPixels = Buffer.alloc(cropSize * cropSize * 4);
for (let cy = 0; cy < cropSize; cy++) {
  for (let cx = 0; cx < cropSize; cx++) {
    const origX = startX + cx;
    const origY = startY + cy;
    let r = 255, g = 255, b = 255, a = 255;
    if (origX >= 0 && origX < width && origY >= 0 && origY < height) {
      const idx = (origY * width + origX) * 4;
      r = pixels[idx];
      g = pixels[idx + 1];
      b = pixels[idx + 2];
      a = pixels[idx + 3];
    }
    const cidx = (cy * cropSize + cx) * 4;
    croppedPixels[cidx] = r;
    croppedPixels[cidx + 1] = g;
    croppedPixels[cidx + 2] = b;
    croppedPixels[cidx + 3] = a;
  }
}

// Encode to PNG with filter type 0
const rawCropped = Buffer.alloc(cropSize * (1 + cropSize * 4));
let cropRawPos = 0;
for (let y = 0; y < cropSize; y++) {
  rawCropped[cropRawPos++] = 0;
  const rowStart = y * cropSize * 4;
  croppedPixels.copy(rawCropped, cropRawPos, rowStart, rowStart + cropSize * 4);
  cropRawPos += cropSize * 4;
}

const compressed = zlib.deflateSync(rawCropped);

function makeCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}
const crcTable = makeCrcTable();
function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  typeBuf.copy(chunk, 4);
  data.copy(chunk, 8);
  const toCrc = Buffer.concat([typeBuf, data]);
  chunk.writeUInt32BE(crc32(toCrc), 8 + len);
  return chunk;
}

const pngSig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const ihdrData = Buffer.alloc(13);
ihdrData.writeUInt32BE(cropSize, 0);
ihdrData.writeUInt32BE(cropSize, 4);
ihdrData[8] = 8;
ihdrData[9] = 6;
ihdrData[10] = 0;
ihdrData[11] = 0;
ihdrData[12] = 0;

const outIhdr = makeChunk('IHDR', ihdrData);
const outIdat = makeChunk('IDAT', compressed);
const outIend = makeChunk('IEND', Buffer.alloc(0));

const outPng = Buffer.concat([pngSig, outIhdr, outIdat, outIend]);
fs.writeFileSync('public/assets/media/bw-logo.png', outPng);
console.log('SUCCESS! Tight crop to ' + cropSize + 'x' + cropSize + ' bytes: ' + outPng.length);
