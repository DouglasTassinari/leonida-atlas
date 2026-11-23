// Texts and data for the two shareable games: Leonida Daily (/daily/) and the Leonida Passport (/pass/).
// en is required; pt-br is complete. Other locales show English (like posts).
// Fan-made and spoiler-free. Region names are the ones Rockstar lists on its official site. No Rockstar art.

export const ui = {
  en: {
    daily: {
      title: 'Leonida Daily: 5 questions a day about GTA VI',
      desc: 'A new 5-question quiz every day about GTA VI, built only from official sources. No spoilers. Share your result and keep your streak.',
      h1: 'Leonida Daily', lead: 'Five questions a day, built from official sources, no spoilers. Everyone gets the same questions, so you can compare with friends.',
      today: 'Today: #{n}', streak: 'Streak', best: 'Best', play: 'Play today\'s quiz', q: 'Question {i} of {n}', next: 'Next', see: 'See result',
      right: 'Correct!', wrong: 'Not quite.', source: 'Source', score: 'You got {s} of {n}', share: 'Share result', copied: 'Copied! Paste it anywhere.',
      next_in: 'Next quiz in {t}', played: 'You already played today.', again: 'Come back tomorrow for a new one.', passCta: 'Now get your Leonida Passport',
      rules: 'Answers come from the sources linked after each question. Some figures are the companies\' own estimates.',
      shareText: 'Leonida Daily #{n} {s}/{t}', noscript: 'This quiz needs JavaScript.',
    },
    pass: {
      title: 'Leonida Passport: which kind of Leonida resident are you?',
      desc: 'Answer 8 quick questions and get your personal Leonida Passport card to share. Fan-made, no spoilers.',
      h1: 'Leonida Passport', lead: 'Eight quick questions. You get a passport card with your resident type and three region stamps, ready to post.',
      start: 'Start', q: 'Question {i} of {n}', nameLabel: 'Name on your passport', namePh: 'Resident', make: 'Make my passport', again: 'Start over',
      share: 'Share image', download: 'Download image', copy: 'Copy text', copied: 'Copied!', youAre: 'You are', stamps: 'Your stamps',
      shareText: 'My Leonida Passport: {a}. Get yours:', dailyCta: 'Play today\'s Leonida Daily', cardTitle: 'LEONIDA PASSPORT', cardNo: 'No.', cardNote: 'Fan-made. Not affiliated with Rockstar Games.',
      noscript: 'This quiz needs JavaScript.',
    },
  },
  'pt-br': {
    daily: {
      title: 'Leonida Daily: 5 perguntas por dia sobre GTA VI',
      desc: 'Um quiz novo todo dia, com 5 perguntas sobre GTA VI feitas só com fontes oficiais. Sem spoilers. Compartilhe o resultado e mantenha sua sequência.',
      h1: 'Leonida Daily', lead: 'Cinco perguntas por dia, feitas com fontes oficiais e sem spoilers. Todo mundo recebe as mesmas perguntas, então dá para comparar com os amigos.',
      today: 'Hoje: nº {n}', streak: 'Sequência', best: 'Melhor', play: 'Jogar o quiz de hoje', q: 'Pergunta {i} de {n}', next: 'Próxima', see: 'Ver resultado',
      right: 'Acertou!', wrong: 'Não foi dessa vez.', source: 'Fonte', score: 'Você acertou {s} de {n}', share: 'Compartilhar resultado', copied: 'Copiado! Cole onde quiser.',
      next_in: 'Próximo quiz em {t}', played: 'Você já jogou hoje.', again: 'Volte amanhã para um novo.', passCta: 'Agora faça seu Passaporte de Leonida',
      rules: 'As respostas vêm das fontes linkadas depois de cada pergunta. Alguns números são estimativas das próprias empresas.',
      shareText: 'Leonida Daily nº {n} {s}/{t}', noscript: 'Este quiz precisa de JavaScript.',
    },
    pass: {
      title: 'Passaporte de Leonida: que tipo de habitante de Leonida você é?',
      desc: 'Responda 8 perguntas rápidas e receba seu Passaporte de Leonida para compartilhar. Feito por fãs, sem spoilers.',
      h1: 'Passaporte de Leonida', lead: 'Oito perguntas rápidas. Você recebe um passaporte com seu tipo de habitante e três carimbos de região, pronto para postar.',
      start: 'Começar', q: 'Pergunta {i} de {n}', nameLabel: 'Nome no passaporte', namePh: 'Habitante', make: 'Fazer meu passaporte', again: 'Recomeçar',
      share: 'Compartilhar imagem', download: 'Baixar imagem', copy: 'Copiar texto', copied: 'Copiado!', youAre: 'Você é', stamps: 'Seus carimbos',
      shareText: 'Meu Passaporte de Leonida: {a}. Faça o seu:', dailyCta: 'Jogue o Leonida Daily de hoje', cardTitle: 'PASSAPORTE DE LEONIDA', cardNo: 'Nº', cardNote: 'Feito por fãs. Sem vínculo com a Rockstar Games.',
      noscript: 'Este quiz precisa de JavaScript.',
    },
  },
};

// Archetypes: id -> text and the region stamp each one earns (all six regions Rockstar lists on its "Only in Leonida" page).
export const archetypes = {
  radio: { stamp: 'Vice City', en: ['Radio Royalty', 'The dial is your compass.'], 'pt-br': ['Realeza do Rádio', 'O dial é a sua bússola.'] },
  night: { stamp: 'Port Gellhorn', en: ['Neon Night Owl', 'The city wakes up when you do.'], 'pt-br': ['Coruja de Neon', 'A cidade acorda quando você acorda.'] },
  swamp: { stamp: 'Grassrivers', en: ['Swamp Scout', 'You trust your eyes more than a map.'], 'pt-br': ['Explorador do Pântano', 'Você confia mais nos olhos do que no mapa.'] },
  keys: { stamp: 'Leonida Keys', en: ['Island Cruiser', 'Slow lane, ocean view.'], 'pt-br': ['Navegante das Ilhas', 'Pista lenta, vista para o mar.'] },
  planner: { stamp: 'Mount Kalaga', en: ['Master Planner', 'Plan A, B and C, all in your head.'], 'pt-br': ['Mente Estrategista', 'Plano A, B e C, tudo na cabeça.'] },
  collector: { stamp: 'Ambrosia', en: ['Secret Collector', 'If it is hidden, you will find it.'], 'pt-br': ['Colecionador de Segredos', 'Se está escondido, você acha.'] },
};

// 8 questions, 4 options each; every option adds a point to one archetype.
const P = [
  [['It is 9 pm in Leonida. What do you do?', ['Turn the radio up and drive', 'Head downtown where the neon is', 'Take a boat out on the water', 'Check the plan for tomorrow']], ['São 21h em Leonida. O que você faz?', ['Aumento o rádio e saio dirigindo', 'Vou ao centro, onde está o neon', 'Pego um barco e vou para a água', 'Confiro o plano de amanhã']], ['radio', 'night', 'keys', 'planner']],
  [['Your ideal co-pilot is someone who…', ['Knows every song by heart', 'Keeps a map covered in notes', 'Always brings a bag of weird finds', 'Carries binoculars']], ['O copiloto ideal é alguém que…', ['Sabe todas as músicas de cor', 'Tem um mapa cheio de anotações', 'Sempre traz uma sacola de achados estranhos', 'Anda com binóculos']], ['radio', 'planner', 'collector', 'swamp']],
  [['Pick a kind of weather.', ['A thunderstorm over the swamp', 'Sunset on the water', 'A clear night with city lights', 'Overcast, perfect for hunting secrets']], ['Escolha um tipo de clima.', ['Tempestade sobre o pântano', 'Pôr do sol na água', 'Noite limpa com luzes da cidade', 'Nublado, perfeito para caçar segredos']], ['swamp', 'keys', 'night', 'collector']],
  [['Choose a superpower.', ['Never forgetting a song', 'Always finding the shortcut', 'Spotting what others miss', 'Staying calm under pressure']], ['Escolha um superpoder.', ['Nunca esquecer uma música', 'Sempre achar o atalho', 'Perceber o que os outros não veem', 'Manter a calma sob pressão']], ['radio', 'planner', 'collector', 'keys']],
  [['What would you drive?', ['A boat', 'An airboat', 'A loud convertible', 'A van full of speakers']], ['O que você dirigiria?', ['Um barco', 'Um aerobarco', 'Um conversível barulhento', 'Uma van cheia de caixas de som']], ['keys', 'swamp', 'night', 'radio']],
  [['Saturday morning, you are…', ['Having coffee with a to-do list', 'Sleeping until noon', 'Walking on the beach', 'Hunting treasure at a flea market']], ['Sábado de manhã, você está…', ['Tomando café com uma lista de tarefas', 'Dormindo até o meio-dia', 'Caminhando na praia', 'Caçando tesouros numa feira de antiguidades']], ['planner', 'night', 'keys', 'collector']],
  [['Pick a soundtrack.', ['Anything with a big chorus', 'Slow, ambient waves', 'Heavy riffs', 'Club beats']], ['Escolha uma trilha.', ['Qualquer coisa com refrão grudento', 'Ondas lentas e ambientes', 'Riffs pesados', 'Batidas de balada']], ['radio', 'keys', 'swamp', 'night']],
  [['What matters most on a trip?', ['The itinerary', 'The stories you collect', 'Meeting people and the vibe', 'The wildlife']], ['O que mais importa numa viagem?', ['O roteiro', 'As histórias que você junta', 'Conhecer gente e o clima', 'A vida selvagem']], ['planner', 'collector', 'night', 'swamp']],
];
export const passQuestions = P.map(([en, pt, map]) => ({ en: { q: en[0], o: en[1] }, 'pt-br': { q: pt[0], o: pt[1] }, map }));
