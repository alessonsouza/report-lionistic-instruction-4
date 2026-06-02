/* ============================================================
   Content model - single source of truth for the report.
   Edit copy here without touching components.

   Narrative strings may contain inline HTML (<strong>, <em>, <a>).
   This is rendered via dangerouslySetInnerHTML in the section
   components. SAFE because all content here is static and
   author-authored - there is no user input on this page.

   TODO(content): items marked below await Alesson's final adapted
   wording and the live-mural URL. Drafts are placeholders, safe to ship.
   ============================================================ */

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  caption: string;
};

export type TimelineItem = {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
};

export type NumberItem = {
  value: number;
  label: string;
  description: string;
};

export type ProposalId = 'mais-que-cargos' | 'relatos-de-afeto' | 'bbb-instrucao';

export type Proposal = {
  id: ProposalId;
  navLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  narrative: string[];
  gallery?: GalleryItem[];
  galleryTitle?: string;
  gallerySubtitle?: string;

  /* Proposal-specific blocks (only the relevant one is set per proposal). */
  video?: {
    src: string;
    poster: string;
    caption: string;
    /** True until the MP4 is produced from the .MOV via ffmpeg (see README). */
    pending?: boolean;
  };
  mural?: {
    liveUrl: string;
    official: GalleryItem;
    comments: GalleryItem[];
    stories: GalleryItem[];
  };
  bbb?: {
    partnership: { title: string; items: string[] };
    votingUrl: string;
    timeline: { title: string; subtitle: string; items: TimelineItem[] };
    numbers: { title: string; items: NumberItem[] };
    instruction: {
      title: string;
      subtitle: string;
      items: {
        theme: string;
        paragraphs: string[];
        author: { name: string; club: string };
      }[];
    };
    acknowledgments: {
      title: string;
      subtitle: string;
      text: string;
      collaborators: { name: string; role: string }[];
    };
  };
};

export const reportMeta = {
  badge: 'Relatório de 4° Trimestre',
  titleAccent: 'Instrução',
  titleMain: 'Leoística',
  subtitle:
    'Três propostas que transformaram a instrução em conexão, memória e alegria neste trimestre - sob a proposta <strong>Unir para Instruir</strong>.',
  club: 'LEO Clube Ômega Pinhalzinho-SC',
  district: 'Distrito LD-8',
  year: '2026',
  author: {
    name: 'Alesson Henrique de Souza',
    role: 'Diretor de Instrução Leoística',
  },
};

export const proposals: Proposal[] = [
  /* ── 1. Faça Acontecer / Mais que cargos, somos causas ──────────────── */
  {
    id: 'mais-que-cargos',
    navLabel: 'Faça Acontecer',
    eyebrow: 'Proposta 1 · Mais que cargos, somos causas',
    title: 'Faça Acontecer',
    subtitle:
      'Escrevendo nossa história: instrução, identidade e compromisso através do relato dos diretores do clube.',
    // TODO(content): revisar redação final com Alesson.
    narrative: [
      'A proposta distrital <strong>“Faça Acontecer - Escrevendo Nossa História”</strong> valoriza o poder do relato, do testemunho e da memória como formas de fortalecer a identidade e o compromisso com o movimento LEO, sempre em alusão ao lema do Distrito: <em>Faça Acontecer</em>.',
      'Na nossa realidade, adaptamos essa proposta para uma série de <strong>entrevistas com os diretores do clube</strong>. Cada companheiro foi convidado a contar, com suas próprias palavras, o que o move a fazer acontecer - transformando a instrução em um espaço de escuta, testemunho e inspiração.',
      'Das conversas nasceu uma certeza que dá nome a esta atividade: <strong>mais que cargos, somos causas</strong>. As entrevistas mostraram que por trás de cada pasta existe uma pessoa movida por propósito, e que registrar essas vozes é também escrever a história do nosso clube.',
    ],
    galleryTitle: 'Registros das Entrevistas',
    gallerySubtitle: 'Os diretores do clube compartilhando o que os move a fazer acontecer',
    gallery: [
      {
        id: 1,
        src: '/mais-que-cargos/capa-todos-diretores-entrevistando.jpg',
        alt: 'Todos os diretores reunidos durante as entrevistas',
        caption: 'Os diretores reunidos para as entrevistas',
      },
      {
        id: 2,
        src: '/mais-que-cargos/diretor-instrucao-entrevistando.jpg',
        alt: 'Diretor de Instrução durante a entrevista',
        caption: 'Diretoria de Instrução Leoística',
      },
      {
        id: 3,
        src: '/mais-que-cargos/diretora-lideranca-entrevistando.jpg',
        alt: 'Diretora de Liderança durante a entrevista',
        caption: 'Diretoria de Liderança',
      },
      {
        id: 4,
        src: '/mais-que-cargos/diretora-novos-associados-entrevistando.jpg',
        alt: 'Diretora de Novos Associados durante a entrevista',
        caption: 'Diretoria de Novos Associados',
      },
      {
        id: 5,
        src: '/mais-que-cargos/entrevista-registro-1.jpg',
        alt: 'Registro de uma das entrevistas',
        caption: 'Um dos momentos de entrevista',
      },
    ],
    video: {
      src: '/mais-que-cargos/video-entrevistas.mp4',
      poster: '/mais-que-cargos/video-poster.jpg',
      caption: 'Vídeo com as entrevistas dos diretores do clube',
      pending: false,
    },
  },

  /* ── 2. Relatos de Afeto: Memórias do Servir ────────────────────────── */
  {
    id: 'relatos-de-afeto',
    navLabel: 'Relatos de Afeto',
    eyebrow: 'Proposta 2 · Mural coletivo de experiências',
    title: 'Relatos de Afeto',
    subtitle:
      'Memórias do servir: um mural digital onde cada fotografia se torna ponte entre vivências.',
    // TODO(content): revisar redação final e confirmar a URL do mural ao vivo.
    narrative: [
      'Inspirada na proposta <strong>“Relatos de Afeto: Memórias do Servir”</strong>, esta dinâmica convida cada companheiro a trazer uma fotografia que represente uma memória marcante vivida dentro do movimento LEO - um momento de superação, alegria, amizade ou qualquer experiência de impacto positivo.',
      'A partir das imagens, os companheiros compartilham suas histórias, sentimentos e aprendizados, fortalecendo vínculos, resgatando memórias e inspirando uns aos outros.',
      'Na nossa adaptação, em vez do Padlet, construímos um <strong>mural digital próprio</strong>: um site onde cada companheiro publicou suas fotos como memória e pôde interagir com as memórias dos outros através de <strong>curtidas e comentários</strong> - transformando o mural coletivo em um espaço vivo de afeto e conexão.',
    ],
    mural: {
      liveUrl: 'https://muralomegapzo.ascorp.app/',
      official: {
        id: 1,
        src: '/relatos-de-afeto/foto-oficial-site-mural.jpg',
        alt: 'Página oficial do mural digital de relatos de afeto',
        caption: 'O mural digital construído para a proposta',
      },
      comments: [
        {
          id: 1,
          src: '/relatos-de-afeto/mural-comentario-1.png',
          alt: 'Memória do mural com comentário de um companheiro',
          caption: 'Interação através de comentários',
        },
        {
          id: 2,
          src: '/relatos-de-afeto/mural-comentario-2.png',
          alt: 'Memórias divertidas do mural com comentários',
          caption: 'Risadas e afeto nos comentários',
        },
      ],
      stories: [
        { id: 1, src: '/relatos-de-afeto/stories/story-1.jpg', alt: 'Story compartilhado no Instagram', caption: 'Compartilhado nos stories' },
        { id: 2, src: '/relatos-de-afeto/stories/story-2.jpg', alt: 'Story compartilhado no Instagram', caption: 'Compartilhado nos stories' },
        { id: 3, src: '/relatos-de-afeto/stories/story-3.jpg', alt: 'Story compartilhado no Instagram', caption: 'Compartilhado nos stories' },
        { id: 4, src: '/relatos-de-afeto/stories/story-4.jpg', alt: 'Story compartilhado no Instagram', caption: 'Compartilhado nos stories' },
      ],
    },
    galleryTitle: 'Memórias no Mural',
    gallerySubtitle: 'Fotografias publicadas pelos companheiros como memórias do servir',
    gallery: [
      { id: 1, src: '/relatos-de-afeto/mural-overview.png', alt: 'Visão geral do mural com várias memórias', caption: 'Visão geral do mural' },
      { id: 2, src: '/relatos-de-afeto/mural-1.png', alt: 'Memórias publicadas no mural', caption: 'Memórias dos companheiros' },
      { id: 3, src: '/relatos-de-afeto/mural-2.png', alt: 'Mais memórias publicadas no mural', caption: 'Histórias que fortalecem laços' },
      { id: 4, src: '/relatos-de-afeto/mural-3.png', alt: 'Memórias e relatos no mural', caption: 'Afeto registrado em imagens' },
    ],
  },

  /* ── 3. BBB da Instrução (formato do report-3, atualizado) ──────────── */
  {
    id: 'bbb-instrucao',
    navLabel: 'BBB da Instrução',
    eyebrow: 'Proposta 3 · Unir para Instruir',
    title: 'BBB da Instrução',
    subtitle:
      'Uma dinâmica inspirada no Big Brother Brasil para escolher quem faria a instrução leoística e a invocação a Deus na reunião do clube.',
    narrative: [
      'A proposta <strong>Unir para Instruir</strong> promove ações conjuntas entre a pasta de Instrução Leoística e outras diretorias do clube, para tornar a instrução mais presente, criativa, leve e conectada à realidade do clube.',
      'Nesta edição, a parceria foi entre <strong>Instrução Leoística e Presidência</strong>. A ideia: transformar a escolha de quem faria a instrução leoística e a invocação a Deus em uma dinâmica divertida de votação, inspirada no Big Brother Brasil.',
      'O <strong>BBB da Instrução</strong> engajou o clube em uma votação online onde os companheiros escolheram entre três “emparedados”. O resultado definiu quem faria a instrução e quem faria a invocação a Deus.',
    ],
    galleryTitle: 'Registros',
    gallerySubtitle: 'Capturas da página de votação e do engajamento no grupo',
    gallery: [
      { id: 1, src: '/votacao-bbb-protocolo/companheiros-emparedados.png', alt: 'Os companheiros emparedados com cards de votação', caption: 'Os companheiros no paredão' },
      { id: 2, src: '/votacao-bbb-protocolo/regras-paredao-e-temas-sugeridos.png', alt: 'Regras do paredão e temas sugeridos para a instrução', caption: 'Regras do paredão e temas sugeridos' },
      { id: 3, src: '/votacao-bbb-protocolo/resultado-final.png', alt: 'Resultado final da votação', caption: 'Resultado final da votação' },
      { id: 4, src: '/votacao-bbb-protocolo/engajamento-clube-1.png', alt: 'Reações dos companheiros no grupo de WhatsApp', caption: 'Engajamento no grupo do WhatsApp' },
      { id: 5, src: '/votacao-bbb-protocolo/engajamento-clube-2.png', alt: 'Mais reações e interações no WhatsApp', caption: 'Risadas e interações no grupo' },
      { id: 6, src: '/votacao-bbb-protocolo/engajamento-clube-geral.png', alt: 'Engajamento geral do clube na votação', caption: 'O clube acompanhando a votação' },
    ],
    bbb: {
      partnership: { title: 'Parceria', items: ['Instrução Leoística', 'Presidência'] },
      votingUrl: 'https://bbbdainstrucao.ascorp.app/',
      timeline: {
        title: 'Nossa Execução',
        subtitle: 'O caminho percorrido para transformar a escolha do protocolo em uma dinâmica engajadora',
        items: [
          { id: 1, date: 'Planejamento', title: 'Idealização e Desenvolvimento', description: 'Criação da página web de votação inspirada no visual do BBB, com sistema de votação validado por CPF.', icon: 'code' },
          { id: 2, date: 'Divulgação', title: 'Compartilhamento no Grupo', description: 'Envio do link da votação e apresentação dos companheiros emparedados no grupo de WhatsApp do clube, gerando engajamento imediato.', icon: 'share' },
          { id: 3, date: 'Período de Votação', title: 'Votação Aberta', description: '27 votos foram registrados com validação por CPF para garantir a legitimidade. O clube se divertiu acompanhando o resultado parcial.', icon: 'vote' },
          { id: 4, date: 'Apuração', title: 'Resultado da Votação', description: 'Carolina Cecatto ficou em 1º lugar (faria a instrução leoística) e Eloá Goularte em 2º (faria a invocação a Deus).', icon: 'trophy' },
          { id: 5, date: '28/03/2026', title: 'Execução na Reunião', description: 'As companheiras escolhidas realizaram a instrução leoística e a invocação a Deus na reunião do clube, com temas sugeridos disponíveis na página.', icon: 'star' },
        ],
      },
      numbers: {
        title: 'Impacto',
        items: [
          { value: 27, label: 'Votos Registrados', description: 'com validação por CPF' },
          { value: 3, label: 'Companheiros Emparedados', description: 'no paredão leoístico' },
          { value: 3, label: 'Temas Sugeridos', description: 'para a instrução leoística' },
          { value: 2, label: 'Pastas Unidas', description: 'instrução + presidência' },
        ],
      },
      instruction: {
        title: 'As Instruções Leoísticas',
        subtitle: 'Textos apresentados na reunião do clube',
        items: [
          {
            theme: 'Fazer acontecer: do silêncio à ação',
            paragraphs: [
              'Nem tudo o que sustenta o movimento é visto diante dos olhos de todos.',
              'As campanhas ganham vida, as atividades são realizadas, os resultados aparecem e os sorrisos ficam registrados nas fotos. Mas, antes de tudo isso, existiram pensamentos, dedicação e inúmeros momentos silenciosos nos bastidores.',
              'O silêncio das ideias sendo construídas.<br />Das conversas tentando alinhar uma comissão.<br />Das noites pensando em como cada detalhe vai funcionar.<br />Da preocupação para que tudo dê certo.',
              'Porque fazer acontecer nunca começa no momento em que tudo aparece pronto.',
              'Começa na intenção.<br />Na disposição de ajudar mesmo quando a rotina aperta.<br />Na presença de quem permanece, mesmo atravessando seus próprios desafios.<br />Na dedicação colocada até nas menores tarefas, ainda que ninguém perceba.',
              'É justamente nesse silêncio que mora a essência do servir.',
              'Nem sempre é simples. Existem períodos de desânimo, inseguranças, frustrações e pensamentos silenciosos sobre se afastar. Há momentos em que continuar exige uma força que ninguém consegue enxergar de fora.',
              'Mas, ainda assim, existe algo que faz muitos permanecerem: <strong>o amor por servir</strong>.',
              'Porque ser LEO vai muito além de campanhas e reuniões.<br />Ser LEO é encontrar pessoas que se tornam abrigo.<br />É descobrir companheiros que permanecem presentes nos dias difíceis.<br />É perceber que ninguém precisa carregar tudo sozinho.',
              'No silêncio, muitos entendem o quanto pertencem ao movimento. Entendem que ainda existe propósito em continuar, porque servir transforma não apenas quem recebe, mas também quem escolhe permanecer.',
              'A força do movimento está exatamente nisso: pessoas comuns, vivendo suas próprias batalhas, encontrando umas nas outras motivos para seguir semeando sonhos e transformando realidades.',
              'E no meio de tudo isso, nascem líderes singulares.<br />Líderes que não precisam aparecer o tempo todo para serem importantes.<br />Líderes que acolhem com empatia, servem com verdade e carregam coragem para liderar e amor em servir.<br />Líderes que encontraram asas para voar, sem esquecer da importância de permanecer próximos daqueles que caminham ao seu lado.',
              'Porque toda grande ação nasceu primeiro dentro do coração de alguém.',
              'Por trás de cada atividade, existe entrega.<br />Por trás de cada campanha, existe cuidado.<br />Por trás de cada resultado, existe alguém que não desistiu.',
              'E é exatamente isso que torna o movimento tão especial.',
              'A capacidade de transformar silêncio em força, intenção em ação, sonhos em realidade, pessoas em lar umas para as outras.',
              'Porque, no fim, viver o extraordinário nunca foi sobre grandes feitos vistos por todos, mas sim sobre <strong>fazer acontecer mesmo quando ninguém está olhando</strong>.',
            ],
            author: { name: 'C.LEO Mariana Battisti', club: 'LEO Clube Ômega Pinhalzinho' },
          },
          {
            theme: 'Singularidade que Faz Acontecer',
            paragraphs: [
              'Em um mundo onde quase tudo parece ter apenas valor material, o voluntariado surge como algo que vai além das trocas comuns. Ele representa a capacidade humana de se doar e de agir pelo outro sem esperar nada em troca.',
              'Na prática, pertencer a um movimento de serviço voluntário é muito mais do que isso: em meio a uma rotina corrida, intensa e cheia de demandas, onde o nosso tempo é cada vez mais precioso, o voluntariado se torna um verdadeiro investimento. E é assim que percebemos que o movimento LEO vai muito além do servir: é entrega, é tempo, é coração e, acima de tudo, amor.',
              'Ser companheiro LEO é se doar por inteiro, é oferecer tempo, atenção e cuidado de forma genuína, mesmo quando não é fácil. Ser companheiro LEO é estar presente, é se importar, é transformar pequenas ações em grandes impactos. Ser companheiro LEO é mudar vidas, é transformar casas em lares e mudar realidades, mas acima de tudo, é permitir que essas experiências também transformem a gente.',
              'Cada pessoa que chega carrega consigo um universo de sonhos, histórias, talentos, medos e desafios. E, dentro de um clube, esses universos se entrelaçam. A gente se reconhece no outro, se apoia, cresce junto e descobre que não precisa caminhar sozinho. É ali que nascem laços verdadeiros, daqueles que a gente leva pra vida.',
              'A verdade é que no LEO Clube nada é feito sozinho. A gente sonha junto, constrói junto e faz acontecer junto. Cada um com seu jeito, com sua essência, com sua singularidade. E é exatamente isso que torna tudo tão especial: a soma de diferentes histórias criando algo maior do que qualquer um conseguiria sozinho.',
              'Todos estamos aqui por um motivo, e cada pessoa tem um papel importante naquilo que somos. Cada jeito e cada forma de se expressar ajuda a construir a nossa identidade como clube, e é isso que torna cada clube singular.',
              'Quando unimos nossas forças, percebemos que a entrega genuína faz parte de quem somos. O que nos move é a força de vontade, o amor em liderar e o desejo de viver o extraordinário. Juntos, semeamos sonhos, transformamos realidades e aprendemos a liderar de forma singular, enquanto fazemos acontecer com amor e tornamos os nossos maiores desafios em realidade. Crescemos, evoluímos e nos tornamos melhores a cada campanha, atividade e ação realizada.',
              'O legado que construímos não está só nas ações realizadas, mas nas marcas que deixamos nas pessoas e, consequentemente, em nós mesmos. Pertencer a um clube unido, forte e estruturado traz um sentimento enorme de gratidão: gratidão a quem escolhe ficar, a quem se entrega, a quem se importa, a quem se dedica e a quem não mede esforços para fazer a diferença todos os dias, mesmo quando é difícil conciliar a rotina.',
              'Que o LEO Clube continue nos ensinando na prática o verdadeiro sentido do servir, e que sigamos servindo motivados e felizes por fazer parte de algo que nos ensina, na prática, que liderança e pertencimento vão muito além das palavras.',
              'LEO Clube é investir amor ao próximo e receber, em forma de sorrisos, aquilo que palavras não podem expressar. <strong>LEO Clube é sentimento, é entrega e singularidade!</strong>',
              'Que a gente nunca perca essa essência. Que a gente continue acreditando, sentindo e fazendo acontecer juntos. Porque fazer parte disso é mais do que participar de um movimento: é viver algo que transforma, que marca e que fica.',
            ],
            author: { name: 'C.LEO Letícia Simon', club: 'LEO Clube Ômega Pinhalzinho' },
          },
          {
            theme: 'Propósito',
            paragraphs: [
              'A liderança e o trabalho voluntário estão em sinergia quando o assunto é servir. Quem serve com propósito, lidera com sentido. Muitos de nós somos questionados, e muitas vezes nos indagamos também, sobre o motivo de fazer parte de um movimento como o Lions e LEO Clube, visto que demanda tempo, energia e dedicação. Porém, com o passar das atividades, campanhas e reuniões, o servir começa a fazer sentido quando está alinhado com o desenvolvimento pessoal de cada um de nós. Em cada planejamento e ação, temos a oportunidade de nos transformarmos, amadurecermos e aprendermos conosco, com a comunidade e com os nossos companheiros. Além disso, a cada dia do voluntariado, preenchemos nosso coração e nossa história com alma, propósito e amor, trazendo sentido para o servir.',
              'Ter a experiência de servir através do voluntariado faz o companheiro desenvolver a empatia, a visão coletiva e a responsabilidade, sendo capaz de transformar realidades por meio das ações realizadas. <strong>Quem serve para liderar transforma a si mesmo. Quem lidera para servir transforma vidas.</strong>',
            ],
            author: { name: 'C.LEO Maria Laura Rolim', club: 'LEO Clube Ômega Pinhalzinho · Lions Clube Pinhalzinho' },
          },
        ],
      },
      acknowledgments: {
        title: 'Agradecimentos',
        subtitle: 'Palavras do Diretor de Instrução Leoística',
        text: `Agradeço de coração às companheiras Mariana Battisti, Letícia Simon e Maria Laura Rolim por escreverem e compartilharem suas instruções leoísticas, transformando palavras em reflexão, propósito e afeto para todo o clube.

Agradeço também à Presidência pela parceria na proposta "Unir para Instruir", que permitiu tornar a instrução um momento mais leve, criativo e conectado à realidade do clube.

Ver cada uma colocar a sua singularidade no que escreveu mostrou que a instrução pode ser muito mais do que uma formalidade. Ela pode ser um momento de conexão, identidade e alegria.`,
        collaborators: [
          { name: 'Mariana Battisti', role: 'Instrução: do silêncio à ação' },
          { name: 'Letícia Simon', role: 'Instrução: singularidade que faz acontecer' },
          { name: 'Maria Laura Rolim', role: 'Instrução: propósito' },
        ],
      },
    },
  },
];

export const footerContent = {
  club: 'LEO Clube Ômega Pinhalzinho-SC',
  district: 'Distrito LD-8',
  year: '2026',
  proposal: 'Unir para Instruir',
  muralUrl: 'https://muralomegapzo.ascorp.app/',
};
