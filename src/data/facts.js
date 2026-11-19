// Single source of truth for verified facts.
// Rule: a fact is added only with an official URL, the source publication date,
// the date we last checked it, a quoted passage proving it, and a status.
const RS = 'https://www.rockstargames.com/newswire/article';
const PRELOAD_URL = RS + '/k4ak9okk485712/grand-theft-auto-vi-pre-load-begins-on-november-10';
const PRICE_URL = 'https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi';
const NOW_URL = RS + '/39akk424a9oo53/grand-theft-auto-vi-now-available';
const TRAILER_URL = RS + '/517572321a549a/watch-the-grand-theft-auto-vi-launch-trailer';
const CHECKED = '2026-11-19';

export const facts = [
  {
    id: 'release-date',
    claim: 'Grand Theft Auto VI launched worldwide on November 19, 2026.',
    source: 'Rockstar Games Newswire - Grand Theft Auto VI Now Available (Nov 19, 2026)',
    quote: 'Grand Theft Auto VI is now available worldwide for PlayStation 5 and XBOX Series X|S.',
    url: NOW_URL, published: '2026-11-19', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'platforms',
    claim: 'Grand Theft Auto VI is on PlayStation 5 and Xbox Series X|S. Rockstar has not listed a PC version on these pages.',
    source: 'Rockstar Games Newswire - Grand Theft Auto VI Now Available (Nov 19, 2026)',
    quote: 'now available worldwide for PlayStation 5 and XBOX Series X|S',
    url: NOW_URL, published: '2026-11-19', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'setting',
    claim: 'Grand Theft Auto VI is set in the state of Leonida.',
    source: 'Rockstar Games Newswire - Launch Trailer (Oct 15, 2026)',
    quote: 'a criminal conspiracy stretching across the state of Leonida',
    url: TRAILER_URL, published: '2026-10-15', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'protagonists',
    claim: 'The protagonists are Jason and Lucia.',
    source: 'Rockstar Games Newswire - Launch Trailer (Oct 15, 2026)',
    quote: 'Jason and Lucia have always known the deck is stacked against them.',
    url: TRAILER_URL, published: '2026-10-15', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'trailer-date',
    claim: 'The official Launch Trailer was published on October 15, 2026.',
    source: 'Rockstar Games Newswire - Watch the Grand Theft Auto VI Launch Trailer',
    quote: 'Check out the new Launch Trailer, featuring new music from electronic duo Justice',
    url: TRAILER_URL, published: '2026-10-15', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'preload-start',
    claim: 'Digital pre-loading began on November 10, 2026 (PS5 at midnight local time, Xbox Series X|S at 12 a.m. GMT). Code-in-box versions were due from retailers from November 12.',
    source: 'Rockstar Games Newswire - Pre-Load Begins on November 10 (Nov 3, 2026)',
    quote: 'On XBOX Series X|S, pre-loading begins globally on Tuesday, November 10 at 12 a.m. GMT.',
    url: PRELOAD_URL, published: '2026-11-03', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'preload-size',
    claim: 'The pre-load file requires up to 212 GB, depending on the device.',
    source: 'Rockstar Games Newswire - Pre-Load Begins on November 10 (Nov 3, 2026)',
    quote: 'The pre-load file will require up to 212 GB depending on your device',
    url: PRELOAD_URL, published: '2026-11-03', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'map-poster',
    claim: 'Rockstar said it would add a printable cover art poster and a map of Leonida as a free digital download on the official site on November 19. We only link to it; we do not host or copy it.',
    source: 'Rockstar Games Newswire - Pre-Load Begins on November 10 (Nov 3, 2026)',
    quote: 'On November 19 we will be adding an official printable Grand Theft Auto VI cover art poster and map of Leonida as a free digital download to the official site.',
    url: PRELOAD_URL, published: '2026-11-03', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'price-base',
    claim: 'The base edition was announced at US$79.99 (US price only).',
    source: 'Take-Two Interactive pre-order announcement (Jun 24, 2026)',
    quote: 'Launching November 19, 2026, ... for $79.99',
    url: PRICE_URL, published: '2026-06-24', checked: CHECKED, status: 'confirmed',
  },
  {
    id: 'price-ultimate',
    claim: 'The Ultimate Edition was announced at US$99.99 (US price only).',
    source: 'Take-Two Interactive pre-order announcement (Jun 24, 2026)',
    quote: 'The Grand Theft Auto VI: Ultimate Edition ... will be available for $99.99.',
    url: PRICE_URL, published: '2026-06-24', checked: CHECKED, status: 'confirmed',
  },
];

// Rumors must stay labeled as unverified. Starts empty on purpose.
export const rumors = [];
