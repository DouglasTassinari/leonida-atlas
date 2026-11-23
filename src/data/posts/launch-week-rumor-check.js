export default {
  slug: 'launch-week-rumor-check',
  publishAt: '2026-11-23T13:00:00-03:00',
  cover: 'news',
  title: {
    en: `How to Read GTA VI Launch-Week Rumors Without Getting Fooled`,
    'pt-br': `Como ler os boatos da semana de lançamento de GTA VI sem cair em golpe`,
  },
  description: {
    en: `Glitches, "unstealable cars", leaked builds and surprise patches: a simple way to sort official news from reports and rumors.`,
    'pt-br': `Bugs, "carros que não dá para roubar", builds vazadas e patches surpresa: um jeito simples de separar notícia oficial de relato e boato.`,
  },
  sections: [
    {
      h: { en: 'Three labels we use', 'pt-br': 'Três etiquetas que usamos' },
      p: {
        en: `Official means Rockstar or Take-Two said it on their own channels. Reported means a named outlet says it, and we link the source. Unconfirmed means nobody has proven it, even if it is everywhere on social media.`,
        'pt-br': `Oficial é o que a Rockstar ou a Take-Two disseram nos canais próprios. Relatado é o que um veículo identificado afirma, e linkamos a fonte. Não confirmado é o que ninguém provou, mesmo que esteja em toda parte nas redes.`,
      },
    },
    {
      h: { en: 'Examples from launch week', 'pt-br': 'Exemplos da semana de lançamento' },
      p: {
        en: `One live blog flags several items as unconfirmed: cars that supposedly cannot be stolen, a 60 FPS glitch on Xbox using Quick Resume, an uncapped frame rate with VRR on Xbox, and a rumored crash patch. The same blog says a leaked Xbox build exists, that one security group considers the files genuine, and that Rockstar has not commented. It advises against downloading them.`,
        'pt-br': `Um blog ao vivo marca vários itens como não confirmados: carros que supostamente não podem ser roubados, um bug de 60 FPS no Xbox usando Quick Resume, taxa de quadros sem limite com VRR no Xbox e um boato de patch de travamentos. O mesmo blog diz que existe uma build vazada para Xbox, que um grupo de segurança considera os arquivos genuínos e que a Rockstar não comentou. Ele recomenda não baixar.`,
      },
    },
    {
      h: { en: 'A five-step check', 'pt-br': 'Uma checagem em cinco passos' },
      p: { en: `Before you share or act:`, 'pt-br': `Antes de compartilhar ou agir:` },
      list: {
        en: [`Find the original source, not a screenshot of it.`, `Look for Rockstar Newswire or Rockstar Support wording.`, `Check the date: old claims get reposted as new.`, `Never download "leaked" files or log in on unknown pages.`, `If only one account says it, wait.`],
        'pt-br': [`Ache a fonte original, não a captura de tela dela.`, `Procure o texto no Newswire ou no Suporte da Rockstar.`, `Confira a data: boatos antigos voltam como novos.`, `Nunca baixe arquivos "vazados" nem faça login em páginas desconhecidas.`, `Se só uma conta diz isso, espere.`],
      },
    },
  ],
  sources: [
    { name: 'Happy Gamer: GTA 6 Day 4 Live Updates', url: 'https://happygamer.com/gta-6-day-4-live-updates-178460/', quote: 'the article advises against downloading them', checked: '2026-11-23' },
    { name: 'Rockstar Games Newswire', url: 'https://www.rockstargames.com/newswire', quote: 'official announcements', checked: '2026-11-23' },
  ],
  tags: ['rumor', 'security', 'news'],
  updated: '2026-11-23',
};
