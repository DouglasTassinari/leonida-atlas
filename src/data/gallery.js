// Fan gallery items. We never copy or host the images: each item is a public post that is
// shown through the platform's own embed, with credit, a link to the original and a date.
// Only add a post after opening it and confirming it exists, is dated on/after 2026-11-19,
// shows released-game content, and has no story spoilers, leaks, adult/graphic content,
// personal data or AI images posing as official. Never invent URLs.
// url must be the canonical post URL; author is the public handle; date is the post date (UTC-3 as displayed to us).
export const gallery = [
  {
    id: 'imPatrickT-photo-mode',
    platform: 'x',
    url: 'https://x.com/imPatrickT/status/2123324085425881340',
    author: '@imPatrickT',
    date: '2026-11-19',
    description: 'Night-time photo-mode shots made with the custom lighting and editing tools (several images).',
    verified: '2026-11-19',
  },
  {
    id: 'pkredits-photo-mode',
    platform: 'x',
    url: 'https://x.com/pkredits/status/2123332718486491276',
    author: '@pkredits',
    date: '2026-11-19',
    description: 'Black-and-white and night photo-mode shots, posted as a reply to @imPatrickT (3 images).',
    verified: '2026-11-19',
  },
  {
    id: 'senpaii070-photo-mode',
    platform: 'x',
    url: 'https://x.com/senpaii070/status/2123351161722024413',
    author: '@senpaii070',
    date: '2026-11-19',
    description: 'Daytime photo-mode shots of cars and street scenes (6 images).',
    verified: '2026-11-19',
  },
  {
    id: 'drewharwell-manatee-mailboxes',
    platform: 'x',
    url: 'https://x.com/drewharwell/status/2123410674571202581',
    author: '@drewharwell',
    date: '2026-11-19',
    description: 'Screenshots of manatee-shaped mailboxes in a Florida-style neighbourhood, with the author’s comment on how familiar it feels.',
    verified: '2026-11-19',
  },
];

export const removalUrl = 'https://github.com/DouglasTassinari/leonida-atlas/issues';
export const trailer = { id: 'rz1B4B2yBZY', newswire: 'https://www.rockstargames.com/newswire/article/517572321a549a/watch-the-grand-theft-auto-vi-launch-trailer' };
export const platformName = { x: 'X', reddit: 'Reddit', youtube: 'YouTube' };
