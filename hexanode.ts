import { createCanvas } from 'canvas';
import sharp from 'sharp';
import Color from './lib/color';
import hexagon from './lib/hexagon';
import { clamp } from 'lodash-es';
import dotenv from 'dotenv';

dotenv.config();
const dx = process.env.DX ? parseFloat(process.env.DX) : 48.0;

const color = (pixels: Array<number>, x: number, y: number, w: number) => {
    const h = pixels.length / 3.0 / w;
    const [xx, yy] = [clamp(x, 0, w - 1), clamp(y, 0, h - 1)];
    const offset = (yy * w + xx) * 3;
    return new Color(pixels[offset], pixels[offset + 1], pixels[offset + 2]);
}

const input = sharp('input.jpg');
const { info, data } = await input.raw().toBuffer({ resolveWithObject: true });

const { width, height } = info;
const pixels = Array.from(data);

const canvas = createCanvas(width, height);
const context = canvas.getContext('2d');

//  Point-topped hexagonal grid

const w = dx;
const r = w / Math.sqrt(3.0) + 1.0;
const h = r;
const dy = 3.0 * r;

for( let x = 0.0; x < dx + width; x += dx) {
    for (let y = 0.0; y < dy + height; y += dy) {
        hexagon(context, x, y, r, color(pixels, Math.floor(x), Math.floor(y), width));

        const [xo, yo] = [x + 0.5 * w, y + 1.5 * h];
        hexagon(context, xo, yo, r, color(pixels, Math.floor(xo), Math.floor(yo), width));
    }
}

const output = sharp(canvas.toBuffer());
await output.png({compressionLevel: 9, progressive: true}).toFile('output.png');
await output.avif({quality: 50}).toFile('output.avif');