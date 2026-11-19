# Mural da comunidade (Leonida Atlas)

O visitante publica uma descoberta em `/<lang>/log` (botao "Publicar publicamente", separado do "Salvar no navegador"). Nada fica publico sem aprovacao humana. Mural: `/<lang>/community/`. Ficha: `/<lang>/community/item/?id=...`. Moderacao: `/admin-review/` (noindex, sem link no menu).

## O que o dono precisa fazer no painel da Cloudflare (uma vez)

1. **Criar as tabelas.** Opcao A (terminal, exige login do wrangler):
   `npx wrangler d1 execute leonida-community --remote --file=migrations/0001_init.sql`
   Opcao B: painel Cloudflare > Storage & Databases > D1 > `leonida-community` > Console > colar o conteudo de `migrations/0001_init.sql` e executar.
2. **Bindings** (Workers & Pages > leonida-atlas > Settings > Bindings, em Production e Preview):
   - D1 database: variavel `DB` -> `leonida-community`
   - Workers AI: variavel `AI`
   (o `wrangler.toml` ja declara os dois, mas confira no painel se o projeto usa o arquivo ou os bindings do painel.)
3. **Secret `ADMIN_TOKEN`** (Settings > Variables and Secrets > tipo Secret): uma senha longa (12+ caracteres). Sem ela, `/api/admin/*` responde 401 sempre.
4. Opcional: Secret `IP_SALT` (texto aleatorio, reforca o hash do IP).
5. Opcional, Turnstile: criar o widget em Cloudflare > Turnstile, colocar a *site key* em `src/data/site.js` (`turnstileSiteKey`) e a *secret key* como Secret `TURNSTILE_SECRET`. O servidor so exige o token quando `TURNSTILE_SECRET` existe; o widget so carrega quando `turnstileSiteKey` nao esta vazio.
6. Publicar (git push). O build continua `npm run build` -> `dist`; a pasta `functions/` e publicada junto automaticamente.

## Como moderar
Abra `/admin-review/`, digite o token (fica so na memoria da aba), veja as abas Pendentes, Bloqueados pela IA e Aprovados. "Aprovar" publica; "Rejeitar" apaga a imagem e esconde o post. Item denunciado 3 vezes volta para Pendentes sozinho.

## Como funciona
- Cliente: redimensiona a imagem (max 1280 px, WebP/JPEG, remove EXIF, max 600 KB) e envia JSON para `POST /api/submit`.
- Servidor (`functions/api/submit.js`): valida campos, bloqueia HTML/links/termos ofensivos, exige consentimento, limita 3 envios/hora e 10/dia por hash de IP (SHA-256 de IP + sal diario; o IP nunca e gravado; hashes com mais de 7 dias sao apagados), confere magic bytes (JPEG/PNG/WebP). Se houver imagem, o Workers AI classifica (modelo em `functions/_lib/moderate.js`, constante `VISION_MODEL`): qualquer risco ou falha da IA => `blocked` e a imagem NAO e gravada. Limpo => `pending`.
- Publico: `GET /api/community`, `/api/community/<id>`, `/api/image/<id>` (so `approved`). Denuncia: `POST /api/report`.
- `sitemap-community.xml` (dinamico) lista so aprovados "ricos" (imagem ou nota com 60+ caracteres) e esta no `robots.txt` e no `sitemap-index.xml`. Fichas finas ganham `noindex` pelo proprio JavaScript da pagina.
- Video: somente link do YouTube (embed `youtube-nocookie`); nada de upload de video.

## Testes
`npm test` (node --test, sem login): validacao, filtros, magic bytes, rate limit, hash, token, veredito da IA e os handlers de envio/admin com D1 e IA simulados. A IA real (llava) so pode ser testada no ar; se ela devolver JSON fora do formato com frequencia, trocar `VISION_MODEL` ou afrouxar `parseVerdict`.
