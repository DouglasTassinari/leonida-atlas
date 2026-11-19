// Ads are OFF by default. To enable: set adsEnabled=true and fill adsense.client (ca-pub-XXXX) and the slot ids.
// While adsEnabled is false nothing ad-related is rendered (no boxes, no scripts).
export const site = {
  adsEnabled: false,
  // Cloudflare Turnstile (optional). Leave empty to disable the widget. To enable, paste the site key (e.g. 0x4AAAAAAGJGoQ2uZkebknNM)
  // and also set the TURNSTILE_SECRET secret in the Cloudflare Pages dashboard (the server only demands a token when that secret exists).
  turnstileSiteKey: '',
  adsense: { client: '', slots: { rail: '', inline: '' } },
};
export const adLabel = {
  en: 'Advertisement', fr: 'Publicité', de: 'Werbung', it: 'Pubblicità', ko: '광고', pl: 'Reklama',
  'pt-br': 'Publicidade', ru: 'Реклама', 'zh-hans': '广告', 'zh-hant': '廣告', 'es-mx': 'Publicidad', 'es-es': 'Publicidad',
};
export const menuLabel = {
  en: 'Menu', fr: 'Menu', de: 'Menü', it: 'Menu', ko: '메뉴', pl: 'Menu',
  'pt-br': 'Menu', ru: 'Меню', 'zh-hans': '菜单', 'zh-hant': '選單', 'es-mx': 'Menú', 'es-es': 'Menú',
};
