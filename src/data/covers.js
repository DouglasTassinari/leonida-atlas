// Original neon-sunset cover art (no third-party artwork). Returns an SVG string, 1200x630.
const base = (id, motif) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<defs>
<linearGradient id="sk${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d0a3d"/><stop offset=".45" stop-color="#8a2d9c"/><stop offset=".75" stop-color="#ff4fa3"/><stop offset="1" stop-color="#ff9a3c"/></linearGradient>
<linearGradient id="su${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe29a"/><stop offset=".5" stop-color="#ff9a3c"/><stop offset="1" stop-color="#ff4fa3"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#sk${id})"/>
<circle cx="600" cy="470" r="230" fill="url(#su${id})" opacity=".55"/>
<g fill="#ff4fa3" opacity=".45"><rect x="330" y="455" width="540" height="8"/><rect x="350" y="480" width="500" height="12"/><rect x="380" y="510" width="440" height="16"/></g>
<g fill="#1b0a33"><path d="M0 630V500h50v-60h40v60h36V400h46v100h40v-40h50v40h36V430h40v70h50v-70h46v70h40V630z"/><path d="M850 630V490h44v-50h36v50h40V380h44v110h46v-70h50v70h40v-40h50v40h50V450h50v180z"/></g>
<g fill="#0b0316"><path d="M60 630C58 540 66 470 76 410l12 0C80 470 76 540 80 630z"/><path d="M82 410C50 380 10 392 -10 440 26 412 56 408 82 410z"/><path d="M82 410C114 380 154 392 174 440 138 412 108 408 82 410z"/><path d="M82 410C66 370 36 358 6 366 38 376 62 388 82 410z"/><path d="M82 410C98 370 128 358 158 366 126 376 102 388 82 410z"/>
<path d="M1120 630C1118 540 1126 470 1136 410l12 0C1140 470 1136 540 1140 630z"/><path d="M1142 410C1110 380 1070 392 1050 440 1086 412 1116 408 1142 410z"/><path d="M1142 410C1174 380 1214 392 1234 440 1198 412 1168 408 1142 410z"/><path d="M1142 410C1126 370 1096 358 1066 366 1098 376 1122 388 1142 410z"/><path d="M1142 410C1158 370 1188 358 1218 366 1186 376 1162 388 1142 410z"/><rect x="0" y="610" width="1200" height="20"/></g>
<g fill="none" stroke-linecap="round" stroke-linejoin="round">${motif}</g>
</svg>`;
const N = '#2ee6d6', P = '#ff4fa3', O = '#ff9a3c', W = '#f6f0ff', D = '#12081f';
const glow = (c) => `stroke="${c}" stroke-width="10"`;
const bubble = (x, y, w, h, c) => `<path d="M${x} ${y}h${w}a22 22 0 0 1 22 22v${h}a22 22 0 0 1-22 22H${x + w * 0.45}l-40 36v-36H${x}a22 22 0 0 1-22-22V${y + 22}a22 22 0 0 1 22-22z" fill="${D}" ${glow(c)}/><path d="M${x + 24} ${y + 32}h${w - 40}M${x + 24} ${y + 60}h${w * 0.55}" stroke="${c}" stroke-width="8"/>`;
const pad = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M-120 -40C-150 -40-170 40-160 80 -150 110 -110 100-90 60H90C110 100 150 110 160 80 170 40 150 -40 120 -40z" fill="${D}" ${glow(c)}/><path d="M-90 -10v40M-110 10h40" stroke="${c}" stroke-width="10"/><circle cx="80" cy="-5" r="10" fill="${P}" stroke="none"/><circle cx="105" cy="20" r="10" fill="${O}" stroke="none"/></g>`;
const cell = (x, y, w = 50) => `<rect x="${x}" y="${y}" width="${w}" height="40" rx="6"/>`;
const motifs = {
  languages: `${bubble(330, 190, 250, 90, N)}${bubble(640, 250, 250, 90, P)}${bubble(470, 370, 200, 70, O)}`,
  'brazilian-portuguese': `<path d="M600 160L880 300 600 440 320 300z" fill="${D}" ${glow(O)}/><circle cx="600" cy="300" r="82" fill="${D}" ${glow(N)}/><path d="M530 290C580 260 630 270 672 310" ${glow(P)}/>`,
  platforms: `${pad(480, 330, N)}<rect x="740" y="200" width="250" height="160" rx="14" fill="${D}" ${glow(P)}/><path d="M830 390h70M865 360v30" ${glow(P)}/><rect x="760" y="220" width="210" height="120" rx="6" fill="${P}" opacity=".25" stroke="none"/>`,
  editions: `<path d="M360 400h110V320H360zM520 400h110V250H520zM680 400h110V180H680z" fill="${D}" ${glow(N)}/><path d="M735 120l14 30 33 4-24 22 6 32-29-16-29 16 6-32-24-22 33-4z" fill="${O}" stroke="${O}" stroke-width="4"/><path d="M340 430h470" ${glow(P)}/>`,
  'download-size': `<path d="M600 140v190M520 260l80 80 80-80" ${glow(N)}/><path d="M440 380v40h320v-40" ${glow(P)}/><rect x="430" y="460" width="340" height="26" rx="13" fill="${D}" ${glow(O)}/><rect x="436" y="466" width="210" height="14" rx="7" fill="${O}" stroke="none"/>`,
  'preload-guide': `<circle cx="600" cy="300" r="140" fill="${D}" ${glow(N)}/><path d="M600 300V210M600 300l60 40" ${glow(P)}/><path d="M770 230a190 190 0 0 1 20 100" ${glow(O)}/><path d="M770 200v50h-50" ${glow(O)}/>`,
  'release-date': `<rect x="400" y="170" width="400" height="300" rx="20" fill="${D}" ${glow(N)}/><path d="M400 250h400M480 140v50M720 140v50" ${glow(N)}/><g fill="${P}" stroke="none" opacity=".55">${cell(430, 280)}${cell(505, 280)}${cell(580, 280)}${cell(655, 280)}${cell(730, 280, 40)}${cell(430, 345)}${cell(505, 345)}${cell(655, 345)}</g><rect x="580" y="345" width="50" height="40" rx="6" fill="${O}" stroke="${W}" stroke-width="4"/>`,
  'physical-edition': `<rect x="330" y="170" width="250" height="320" rx="14" fill="${D}" ${glow(P)}/><path d="M360 220h190M360 255h120" stroke="${P}" stroke-width="8"/><circle cx="760" cy="330" r="150" fill="${D}" ${glow(N)}/><circle cx="760" cy="330" r="48" fill="none" ${glow(O)}/><circle cx="760" cy="330" r="14" fill="${N}" stroke="none"/><path d="M690 230a120 120 0 0 1 90-30" stroke="${W}" stroke-width="6" opacity=".7"/>`,
  cheats: `${pad(520, 340, P)}<path d="M770 190c0-40 70-40 70 0 0 30-35 36-35 70M805 300v6" ${glow(N)}/><path d="M900 180l10 24 24 10-24 10-10 24-10-24-24-10 24-10z" fill="${O}" stroke="none"/>`,
  news: `<rect x="360" y="170" width="480" height="300" rx="18" fill="${D}" ${glow(N)}/><rect x="392" y="204" width="150" height="110" rx="8" fill="${P}" opacity=".45" stroke="none"/><path d="M570 214h240M570 250h200M570 286h230M392 350h418M392 390h340M392 430h270" ${glow(O)}/><circle cx="800" cy="150" r="10" fill="${P}" stroke="none"/><path d="M830 120a60 60 0 0 1 0 60M860 100a90 90 0 0 1 0 100" ${glow(P)}/>`,
  index: `${bubble(330, 180, 200, 80, N)}<circle cx="700" cy="250" r="86" fill="${D}" ${glow(P)}/><path d="M700 250V196M700 250l34 24" ${glow(P)}/><rect x="560" y="340" width="190" height="130" rx="14" fill="${D}" ${glow(O)}/><path d="M560 380h190" ${glow(O)}/><path d="M860 200v120M820 290l40 36 40-36" ${glow(N)}/>`,
};
export const coverSlugs = Object.keys(motifs);
export const coverSvg = (slug) => base(slug.replace(/[^a-z]/g, ''), motifs[slug] ?? motifs.index);
