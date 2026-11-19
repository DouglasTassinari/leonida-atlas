import sharp from 'sharp';
import { coverSvg, coverSlugs } from '../../data/covers.js';
export function getStaticPaths() { return coverSlugs.map((slug) => ({ params: { slug } })); }
export async function GET({ params }: { params: { slug: string } }) {
  const png = await sharp(Buffer.from(coverSvg(params.slug))).resize(1200, 630).png().toBuffer();
  return new Response(png, { headers: { 'Content-Type': 'image/png' } });
}
