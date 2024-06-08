import Color from './color';

const angle = Math.PI / 3.0;

export default (ctx: any, x: number, y: number, r: number, color: Color) => {
    ctx.beginPath();

    for ( let a = 0.0; a < Math.PI * 2; a += angle) {
        const aa = a + angle / 2.0;
        const sx = x + Math.cos(aa) * r;
        const sy = y + Math.sin(aa) * r;

        ctx.lineTo(sx, sy);
    }

    ctx.closePath();
    ctx.fillStyle = color.toString();
    ctx.fill();
};