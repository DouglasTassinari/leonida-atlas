import en from './en.json';
import fr from './fr.json';
import de from './de.json';
import it from './it.json';
import ko from './ko.json';
import pl from './pl.json';
import ptbr from './pt-br.json';
import ru from './ru.json';
import zhhans from './zh-hans.json';
import zhhant from './zh-hant.json';
import esmx from './es-mx.json';
import eses from './es-es.json';

export const defaultLocale = 'en';
export const locales = ['en', 'fr', 'de', 'it', 'ko', 'pl', 'pt-br', 'ru', 'zh-hans', 'zh-hant', 'es-mx', 'es-es'];

// native = name shown in the language selector; html = value of <html lang> and hreflang; og = og:locale
export const meta = {
  en: { native: 'English', html: 'en', og: 'en_US' },
  fr: { native: 'Français', html: 'fr', og: 'fr_FR' },
  de: { native: 'Deutsch', html: 'de', og: 'de_DE' },
  it: { native: 'Italiano', html: 'it', og: 'it_IT' },
  ko: { native: '한국어', html: 'ko', og: 'ko_KR' },
  pl: { native: 'Polski', html: 'pl', og: 'pl_PL' },
  'pt-br': { native: 'Português (Brasil)', html: 'pt-BR', og: 'pt_BR' },
  ru: { native: 'Русский', html: 'ru', og: 'ru_RU' },
  'zh-hans': { native: '简体中文', html: 'zh-Hans', og: 'zh_CN' },
  'zh-hant': { native: '繁體中文', html: 'zh-Hant', og: 'zh_TW' },
  'es-mx': { native: 'Español (México)', html: 'es-MX', og: 'es_MX' },
  'es-es': { native: 'Español (España)', html: 'es-ES', og: 'es_ES' },
};

const dict = { en, fr, de, it, ko, pl, 'pt-br': ptbr, ru, 'zh-hans': zhhans, 'zh-hant': zhhant, 'es-mx': esmx, 'es-es': eses };

// A locale is "complete" when every key present in English exists in it.
// Only complete locales are offered in the selector, hreflang and sitemap.
function missing(base, other, prefix = '') {
  const out = [];
  for (const k of Object.keys(base)) {
    if (!(k in other)) { out.push(prefix + k); continue; }
    if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) out.push(...missing(base[k], other[k], prefix + k + '.'));
    else if (Array.isArray(base[k]) && other[k].length !== base[k].length) out.push(prefix + k + '[]');
  }
  return out;
}
export const gaps = Object.fromEntries(locales.map((l) => [l, missing(en, dict[l])]));
export const completeLocales = locales.filter((l) => gaps[l].length === 0);
for (const l of locales) if (gaps[l].length) console.warn(`[i18n] ${l} is incomplete and is hidden from the selector: ${gaps[l].slice(0, 5).join(', ')}`);

export const t = (l) => dict[l] || dict[defaultLocale];
export const fmt = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
export const staticLocales = () => completeLocales.map((lang) => ({ params: { lang } }));
// URL for a page in a locale. p is '' (home) or like '/log'. Always ends with a slash.
export const url = (l, p = '') => `/${l}${p}/`;

export const guideSlugs = ['languages', 'brazilian-portuguese', 'platforms', 'editions', 'download-size', 'preload-guide', 'release-date', 'physical-edition', 'cheats'];
export const guideFacts = {
  languages: ['languages'],
  'brazilian-portuguese': ['languages'],
  platforms: ['platforms', 'release-date'],
  editions: ['price-base', 'price-ultimate'],
  'download-size': ['preload-size', 'preload-start'],
  'preload-guide': ['preload-start', 'preload-size', 'map-poster'],
  'release-date': ['release-date', 'preload-start', 'trailer-date'],
  'physical-edition': ['preload-start'],
  cheats: [],
};
export const guideRelated = {
  languages: ['brazilian-portuguese', 'platforms', 'release-date'],
  'brazilian-portuguese': ['languages', 'platforms'],
  platforms: ['release-date', 'editions', 'download-size'],
  editions: ['physical-edition', 'platforms', 'release-date'],
  'download-size': ['preload-guide', 'platforms'],
  'preload-guide': ['download-size', 'release-date', 'physical-edition'],
  'release-date': ['preload-guide', 'platforms', 'editions'],
  'physical-edition': ['preload-guide', 'editions', 'release-date'],
  cheats: ['release-date', 'platforms'],
};
// Official table: [Intl language tag, voice]. Text is supported for every row.
export const langTable = [['en', true], ['fr'], ['de'], ['it'], ['ko'], ['pl'], ['pt-BR'], ['ru'], ['zh-Hans'], ['es-MX'], ['es-ES'], ['zh-Hant']];
const officialEn = { en: 'English', fr: 'French', de: 'German', it: 'Italian', ko: 'Korean', pl: 'Polish', 'pt-BR': 'Portuguese (Brazil)', ru: 'Russian', 'zh-Hans': 'Simplified Chinese', 'zh-Hant': 'Traditional Chinese', 'es-MX': 'Spanish (Mexico)', 'es-ES': 'Spanish (Spain)' };
export function langName(tag, ui) {
  if (ui === 'en') return officialEn[tag];
  const n = new Intl.DisplayNames([ui], { type: 'language', languageDisplay: 'standard' }).of(tag);
  return n.charAt(0).toLocaleUpperCase(ui) + n.slice(1);
}
