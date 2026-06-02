/* ============================================================
   Content model — single source of truth for the report.
   Edit copy here without touching components.

   Narrative strings may contain inline HTML (<strong>, <em>, <a>).
   This is rendered via dangerouslySetInnerHTML in the section
   components. SAFE because all content here is static and
   author-authored — there is no user input on this page.

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
      theme: string;
      paragraphs: string[];
      author: { name: string; club: string };
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
  badge: 'Relatório de Trimestre',
  titleAccent: 'Instrução',
  titleMain: 'Leoística',
  subtitle:
    'Três propostas que transformaram a instrução em conexão, memória e alegria neste trimestre — sob a proposta <strong>Unir para Instruir</strong>.',
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
      'A proposta distrital <strong>“Faça Acontecer – Escrevendo Nossa História”</strong> valoriza o poder do relato, do testemunho e da memória como formas de fortalecer a identidade e o compromisso com o movimento LEO, sempre em alusão ao lema do Distrito: <em>Faça Acontecer</em>.',
      'Na nossa realidade, adaptamos essa proposta para uma série de <strong>entrevistas com os diretores do clube</strong>. Cada companheiro foi convidado a contar, com suas próprias palavras, o que o move a fazer acontecer — transformando a instrução em um espaço de escuta, testemunho e inspiração.',
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
      poster: '/mais-que-cargos/capa-todos-diretores-entrevistando.jpg',
      caption: 'Vídeo com as entrevistas dos diretores do clube',
      pending: true,
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
      'Inspirada na proposta <strong>“Relatos de Afeto: Memórias do Servir”</strong>, esta dinâmica convida cada companheiro a trazer uma fotografia que represente uma memória marcante vivida dentro do movimento LEO — um momento de superação, alegria, amizade ou qualquer experiência de impacto positivo.',
      'A partir das imagens, os companheiros compartilham suas histórias, sentimentos e aprendizados, fortalecendo vínculos, resgatando memórias e inspirando uns aos outros.',
      'Na nossa adaptação, em vez do Padlet, construímos um <strong>mural digital próprio</strong>: um site onde cada companheiro publicou suas fotos como memória e pôde interagir com as memórias dos outros através de <strong>curtidas e comentários</strong> — transformando o mural coletivo em um espaço vivo de afeto e conexão.',
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
        title: 'A Instrução Leoística',
        subtitle: 'Texto apresentado na reunião pela companheira escolhida na votação',
        theme: 'O que me move a fazer acontecer',
        paragraphs: [
          'Refletir sobre o que nos move é entender nosso propósito dentro do movimento leoístico. Ao longo de um Ano Leoístico, é natural que, em meio aos desafios, essa clareza se perca.',
          'A música <em>Aquarela</em>, de Toquinho, nos lembra que “vamos todos numa linda passarela de uma aquarela que um dia, enfim, descolorirá”, mostrando que os ciclos são passageiros, assim como nossas gestões, projetos e momentos no movimento.',
          'Diante disso, fica a reflexão: <strong>o que nos move, sabendo que tudo passa?</strong>',
          'Se os ciclos acabam, o propósito deve permanecer. O verdadeiro fazer acontecer está na intenção, no impacto que geramos e nas marcas que deixamos nas pessoas e em nós mesmos.',
          'Ao nos aproximarmos do fim de mais um ciclo, ainda há tempo: tempo para se dedicar mais, fortalecer relações e concluir com excelência.',
          'Que possamos seguir com propósito e responsabilidade, conscientes de que, mesmo sendo passageiro, o que fazemos pode transformar.',
        ],
        author: { name: 'C.LEO Carolina Cecatto', club: 'LEO Clube Ômega Pinhalzinho' },
      },
      acknowledgments: {
        title: 'Agradecimentos',
        subtitle: 'Palavras do Diretor de Instrução Leoística',
        text: `Agradeço às companheiras Eloá Goularte, Carolina Cecatto e Júlia Gaboardi por aceitarem participar do paredão e pela disposição em contribuir com o protocolo da reunião.

Agradeço também à Presidência pela parceria na proposta "Unir para Instruir", que permitiu tornar esse momento mais leve e divertido para todo o clube.

O engajamento dos companheiros na votação foi incrível, ver todo mundo se divertindo e participando ativamente mostrou que a instrução pode ser muito mais do que uma formalidade. Ela pode ser um momento de conexão e alegria.`,
        collaborators: [
          { name: 'Eloá Goularte', role: 'Emparedada - 2º lugar (Invocação a Deus)' },
          { name: 'Carolina Cecatto', role: 'Emparedada - 1º lugar (Instrução Leoística)' },
          { name: 'Júlia Gaboardi', role: 'Emparedada' },
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
