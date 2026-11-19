# Translation status

Source language: English (`en.json`, written by the project author).
Every other locale is a machine-written draft: it needs review by a native speaker before it is called final.

| Locale | File | Status | Notes |
| --- | --- | --- | --- |
| en | en.json | source | Reference text. Quoted source passages stay in English everywhere. |
| fr | fr.json | draft-machine | needs native review |
| de | de.json | draft-machine | needs native review |
| it | it.json | draft-machine | needs native review |
| ko | ko.json | draft-machine | needs native review |
| pl | pl.json | draft-machine | needs native review |
| pt-br | pt-br.json | draft-machine | needs native review |
| ru | ru.json | draft-machine | needs native review |
| zh-hans | zh-hans.json | draft-machine | needs native review |
| zh-hant | zh-hant.json | draft-machine | written by hand from zh-hans wording; check Taiwan/Hong Kong terms |
| es-mx | es-mx.json | draft-machine | needs native review |
| es-es | es-es.json | draft-machine | derived from es-mx with a few Spain-specific swaps (decimal comma, "Añadir", ...); needs native review |

## Rules

- A locale appears in the language selector, hreflang and sitemap only if it has every key that `en.json` has (`src/i18n/index.js` checks this at build time and warns about gaps). Today all 12 are complete.
- To hide an unfinished locale, delete keys or its file import; it drops out automatically.
- Add or change a fact only in `src/data/facts.js` (official URL, quote, date checked). Per-locale `facts.<id>` strings are translations of the English `claim`.
- Never translate quoted source passages; they stay in English.
