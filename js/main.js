// Menu mobile
const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    menuBtn.setAttribute('aria-expanded', aberto ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('aberto');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Ano automático no rodapé
const ano = document.getElementById('ano');
if (ano) ano.textContent = new Date().getFullYear();

// Anos de história (fundação em 26/11/1953, vira sozinho todo aniversário)
const anosEl = document.getElementById('anosCartorio');
if (anosEl) {
  const hoje = new Date();
  let anos = hoje.getFullYear() - 1953;
  const mes = hoje.getMonth(); // 10 = novembro
  if (mes < 10 || (mes === 10 && hoje.getDate() < 26)) anos--;
  anosEl.textContent = anos;
}

// Guia "O que levar?"
const DOCS = {
  firma: {
    msg: 'Olá! Vou reconhecer firma. Pode confirmar o que preciso levar?',
    itens: [
      'Documento de identificação oficial com foto (RG, CNH ou passaporte), original',
      'Se for sua primeira vez: você abre a ficha de firma na hora, assinando na presença da equipe',
      'O documento que será assinado, quando for reconhecer a assinatura nele'
    ]
  },
  autenticacao: {
    msg: 'Olá! Preciso autenticar documentos. Pode confirmar o que preciso levar?',
    itens: [
      'O documento original que será autenticado',
      'A autenticação é feita na hora, com fé pública e validade em todo o país'
    ]
  },
  procuracao: {
    msg: 'Olá! Preciso fazer uma procuração. Pode confirmar os documentos do meu caso?',
    itens: [
      'Documento de identificação com foto e CPF de quem vai dar os poderes (outorgante)',
      'Nome completo, CPF e endereço de quem vai receber os poderes (outorgado)',
      'Descrição do que a procuração deve autorizar (venda, banco, INSS, representação etc.)',
      'Para empresas: contrato social e documentos do representante'
    ]
  },
  escritura: {
    msg: 'Olá! Preciso de uma escritura. Pode confirmar os documentos do meu caso?',
    itens: [
      'Documentos de identificação e CPF de todas as partes',
      'Certidão de casamento ou nascimento atualizada das partes',
      'Documentação do imóvel ou bem (matrícula/certidão atualizada)',
      'Comprovantes fiscais exigidos pro ato (a equipe orienta caso a caso)',
      'Cada escritura tem sua lista própria: confirme pelo WhatsApp antes de vir'
    ]
  },
  certidao: {
    msg: 'Olá! Preciso de uma certidão. Pode me orientar?',
    itens: [
      'Nome completo das pessoas envolvidas no ato',
      'Se tiver: data aproximada, livro e folha do ato',
      'Para certidão de imóvel: número da matrícula ou endereço completo do imóvel',
      'Documento de identificação de quem solicita',
      'Muitas certidões também podem ser pedidas online: pergunte pela opção digital'
    ]
  },
  averbacao: {
    msg: 'Olá! Preciso averbar uma construção na matrícula do imóvel. Pode confirmar os documentos do meu caso?',
    itens: [
      'Certidão de matrícula atualizada do imóvel',
      'Documento de identificação e CPF do proprietário',
      'Habite-se ou documento equivalente emitido pela prefeitura',
      'Certidão negativa de débitos da obra, quando exigida',
      'Projeto aprovado e responsabilidade técnica da obra (ART ou RRT)',
      'Cada obra tem sua própria exigência: confirme pelo WhatsApp antes de vir'
    ]
  }
};
const docsLista = document.getElementById('docsLista');
const docsCta = document.getElementById('docsCta');
function mostraDoc(chave) {
  const d = DOCS[chave];
  if (!d || !docsLista) return;
  docsLista.innerHTML = d.itens.map(i => '<li><i class="ri-checkbox-circle-line"></i><span>' + i + '</span></li>').join('');
  docsCta.href = 'https://wa.me/5583993963957?text=' + encodeURIComponent(d.msg);
}
document.querySelectorAll('.docs-aba').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.docs-aba').forEach(b => { b.classList.remove('ativa'); b.setAttribute('aria-selected','false'); });
    btn.classList.add('ativa');
    btn.setAttribute('aria-selected','true');
    mostraDoc(btn.dataset.doc);
  });
});
mostraDoc('firma');

// Status aberto/fechado: seg a sex, 8h às 17h, fechado nos feriados.
// A hora é a de Solânea (UTC-3, sem horário de verão), não a do aparelho de quem
// visita: os campos getUTC* de "agora - 3h" são o relógio da parede do cartório.
// Feriados: os nacionais de lei (Leis 662/1949, 6.802/1980 e 14.759/2023), fixos,
// mais a Sexta-feira da Paixão (Páscoa - 2), feriado religioso que a Lei 9.093/1995
// deixa para a lei municipal. FECHADO_EXTRA guarda as datas avulsas em que o
// cartório também não abre (data magna da Paraíba, feriado municipal de Solânea,
// dia sem expediente fixado pela Corregedoria), no formato 'AAAA-MM-DD'. Ponto
// facultativo não fecha cartório por si (Lei 662/1949, art. 3º).
const FERIADOS_FIXOS = {
  '01-01': 'Confraternização Universal', '04-21': 'Tiradentes', '05-01': 'Dia do Trabalho',
  '09-07': 'Independência do Brasil', '10-12': 'Nossa Senhora Aparecida', '11-02': 'Finados',
  '11-15': 'Proclamação da República', '11-20': 'Dia da Consciência Negra', '12-25': 'Natal'
};
const FECHADO_EXTRA = [];
function dois(n) { return (n < 10 ? '0' : '') + n; }
function pascoa(ano) { // algoritmo de Meeus/Jones/Butcher, calendário gregoriano
  const a = ano % 19, b = Math.floor(ano / 100), c = ano % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(ano, mes - 1, dia);
}
function ehFeriado(dt) { // dt: Date cujos campos UTC são a data de Solânea
  const ano = dt.getUTCFullYear(), md = dois(dt.getUTCMonth() + 1) + '-' + dois(dt.getUTCDate());
  if (FERIADOS_FIXOS[md] || FECHADO_EXTRA.indexOf(ano + '-' + md) !== -1) return true;
  return Date.UTC(ano, dt.getUTCMonth(), dt.getUTCDate()) === pascoa(ano) - 2 * 864e5;
}
function diaDeSemana(dt) { const s = dt.getUTCDay(); return s >= 1 && s <= 5; }
const statusEl = document.getElementById('statusFuncionamento');
if (statusEl) {
  const agora = new Date(Date.now() - 3 * 36e5);
  const hora = agora.getUTCHours() + agora.getUTCMinutes() / 60;
  const diaN = function (n) { // a data de Solânea daqui a n dias
    return new Date(Date.UTC(agora.getUTCFullYear(), agora.getUTCMonth(), agora.getUTCDate() + n));
  };
  const SEMANA = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
  const chama = function (n) { // como chamar o dia daqui a n dias
    if (n === 0) return 'hoje';
    if (n === 1) return 'amanhã';
    const dt = diaN(n);
    if (n <= 6) return SEMANA[dt.getUTCDay()];
    return 'dia ' + dois(dt.getUTCDate()) + '/' + dois(dt.getUTCMonth() + 1);
  };
  const hojeUtil = diaDeSemana(agora) && !ehFeriado(agora);
  if (hojeUtil && hora >= 8 && hora < 17) {
    statusEl.innerHTML = '<i class="ri-checkbox-blank-circle-fill"></i> Aberto agora · fecha às 17h';
    statusEl.classList.add('aberto');
  } else {
    // próximo dia útil (hoje mesmo, se ainda não deu 8h); o primeiro dia de semana
    // pulado por feriado vira aviso, para ninguém vir num dia que parece de expediente
    let n = (hojeUtil && hora < 8) ? 0 : 1, pulado = -1;
    while (n < 60 && !(diaDeSemana(diaN(n)) && !ehFeriado(diaN(n)))) {
      if (pulado < 0 && diaDeSemana(diaN(n))) pulado = n;
      n++;
    }
    let texto = 'Fechado agora · abre ' + chama(n) + ' às 8h';
    if (diaDeSemana(agora) && ehFeriado(agora)) texto = 'Feriado hoje · abre ' + chama(n) + ' às 8h';
    else if (pulado > 0) { // curto, para caber numa linha no celular; a bolinha vermelha já diz fechado
      const quem = chama(pulado);
      texto = quem.charAt(0).toUpperCase() + quem.slice(1) + ' é feriado · abre ' + chama(n) + ' às 8h';
    }
    statusEl.innerHTML = '<i class="ri-checkbox-blank-circle-fill"></i> ' + texto;
    statusEl.classList.add('fechado');
  }
}

// Altura real do cabecalho fixo, para as ancoras (#consciencia, #sobre...) nao
// pararem escondidas embaixo dele. Recalcula quando a janela muda de tamanho.
(function () {
  var topo = document.getElementById('topo');
  if (!topo) return;
  function mede() { document.documentElement.style.setProperty('--topo-h', topo.offsetHeight + 'px'); }
  mede();
  window.addEventListener('resize', mede);
  window.addEventListener('load', function () {
    mede();
    // pagina aberta ja com #ancora no endereco: o navegador rolou ANTES deste
    // script medir o cabecalho; reposiciona sem animacao, ja com a margem certa
    if (location.hash && location.hash.length > 1) {
      var alvo = document.getElementById(location.hash.slice(1));
      if (alvo) {
        var raiz = document.documentElement, antes = raiz.style.scrollBehavior;
        raiz.style.scrollBehavior = 'auto';
        alvo.scrollIntoView({ block: 'start' });
        raiz.style.scrollBehavior = antes;
      }
    }
  });
})();

/* ==========================================================================
   CALENDÁRIO DA CONSCIÊNCIA
   Quem vira o mês é o new Date() do navegador: não há robô, tarefa agendada
   nem manutenção mensal. O conteúdo de verdade é ESTÁTICO no HTML (sem JS a
   página fica inteira e o buscador lê); este bloco só DESTACA o mês corrente.
   Não editar o objeto abaixo à mão: ele é gerado por
   ferramenta de geração do calendário (fora do repositório), que
   escreve também os cards da página e os teasers da home. Editar aqui faz os
   três divergirem, que é exatamente o defeito que o gerador existe pra evitar.
   ========================================================================== */

var CAMPANHAS_MES = {
  1:  { nome: "Janeiro Branco",      cor: "#7a8b99",  corTxt: "#657684", 
       faixaFundo: "#7a8b99",  faixaTinta: "#1a1917",  icone: "ri-mental-health-line",  
       tema: "Saúde mental e cuidado com a própria cabeça.",
       apoio: { chip: "Precisa conversar? Ligue 188", titulo: "Precisa conversar? Ligue 188", texto: "O CVV atende de graça, em todo o Brasil. O telefone 188 funciona 24 horas por dia, todos os dias; o chat tem horário próprio, publicado no site do CVV, que também atende por e-mail." } },
  2:  { nome: "Fevereiro Roxo",      cor: "#6a3d9a",  corTxt: "#6a3d9a", 
       faixaFundo: "#6a3d9a",  faixaTinta: "#ffffff",  icone: "ri-empathize-line",      
       tema: "Lúpus, Alzheimer e fibromialgia." },
  3:  { nome: "Março Lilás",         cor: "#b046c4",  corTxt: "#b046c4", 
       faixaFundo: "#b046c4",  faixaTinta: "#ffffff",  icone: "ri-women-line",          
       tema: "Prevenção do câncer do colo do útero." },
  4:  { nome: "Abril Azul",          cor: "#1e9ad6",  corTxt: "#187bab", 
       faixaFundo: "#1e9ad6",  faixaTinta: "#1a1917",  icone: "ri-puzzle-line",         
       tema: "Autismo, inclusão e direito de ser atendido." },
  5:  { nome: "Maio Amarelo",        cor: "#d4a017",  corTxt: "#926e10", 
       faixaFundo: "#d4a017",  faixaTinta: "#1a1917",  icone: "ri-roadster-line",       
       tema: "Segurança no trânsito e redução de acidentes." },
  6:  { nome: "Junho Violeta",       cor: "#5b3fa8",  corTxt: "#5b3fa8", 
       faixaFundo: "#5b3fa8",  faixaTinta: "#ffffff",  icone: "ri-parent-line",         
       tema: "Enfrentamento da violência contra a pessoa idosa.",
       apoio: { chip: "Violência contra a pessoa idosa? Disque 100", titulo: "Violência contra a pessoa idosa: Disque 100", texto: "A denúncia é gratuita, funciona 24 horas todos os dias, pode ser anônima e recebe número de protocolo. Também atende por WhatsApp e pelo site da Ouvidoria Nacional de Direitos Humanos." } },
  7:  { nome: "Julho Amarelo",       cor: "#b8860b",  corTxt: "#976e09", 
       faixaFundo: "#b8860b",  faixaTinta: "#1a1917",  icone: "ri-syringe-line",        
       tema: "Luta contra as hepatites virais." },
  8:  { nome: "Agosto Lilás",        cor: "#9b5de5",  corTxt: "#924fe3", 
       faixaFundo: "#a065e6",  faixaTinta: "#1a1917",  icone: "ri-shield-user-line",    
       tema: "Proteção à mulher e fim da violência doméstica.",
       apoio: { chip: "Violência contra a mulher? Ligue 180", titulo: "Violência contra a mulher: Ligue 180", texto: "A Central de Atendimento à Mulher é gratuita e funciona 24 horas por dia, todos os dias da semana. Atende por telefone, por WhatsApp e por e-mail." } },
  9:  { nome: "Setembro Amarelo",    cor: "#e6a700",  corTxt: "#966d00", 
       faixaFundo: "#e6a700",  faixaTinta: "#1a1917",  icone: "ri-heart-pulse-line",    
       tema: "Valorização da vida e prevenção do suicídio.",
       apoio: { chip: "Precisa conversar? Ligue 188", titulo: "Precisa conversar? Ligue 188", texto: "O CVV atende de graça, em todo o Brasil. O telefone 188 funciona 24 horas por dia, todos os dias; o chat tem horário próprio, publicado no site do CVV, que também atende por e-mail." } },
  10: { nome: "Outubro Rosa",        cor: "#d63384",  corTxt: "#d52f81", 
       faixaFundo: "#d52f81",  faixaTinta: "#ffffff",  icone: "ri-hand-heart-line",     
       tema: "Prevenção e diagnóstico precoce do câncer de mama." },
  11: { nome: "Novembro Azul",       cor: "#1565c0",  corTxt: "#1565c0", 
       faixaFundo: "#1565c0",  faixaTinta: "#ffffff",  icone: "ri-men-line",            
       tema: "Saúde do homem e câncer de próstata." },
  12: { nome: "Dezembro Vermelho",   cor: "#c62828",  corTxt: "#c62828", 
       faixaFundo: "#c62828",  faixaTinta: "#ffffff",  icone: "ri-test-tube-line",      
       tema: "Prevenção do HIV, da aids e de outras infecções sexualmente transmissíveis." }
};

(function () {
  var mes = new Date().getMonth() + 1;
  var dados = CAMPANHAS_MES[mes];
  if (!dados) return;

  function poeTxt(id, txt) {
    var el = document.getElementById(id);
    if (el && txt) el.textContent = txt;
  }

  // (a) consciencia.html: marca o card do mês e leva ele pro topo da grade
  var grade = document.getElementById('calGrid');
  if (grade) {
    var card = grade.querySelector('[data-mes="' + mes + '"]');
    if (card && !card.querySelector('.mes-selo')) {
      card.classList.add('atual');
      // o selo nasce aqui, e não nos 12 cards do HTML: sem JS não há "mês
      // corrente" nenhum, então não faz sentido 12 selos escondidos no fonte
      var selo = document.createElement('span');
      selo.className = 'mes-selo';
      selo.textContent = 'Estamos aqui';
      card.insertBefore(selo, card.firstChild);
      grade.insertBefore(card, grade.firstChild);
    }
  }

  // (b) home: a faixa do topo, antes do hero. Não depende dos teasers: usa
  // nome e tema, que vêm do mesmo gerador dos cards, então não há o que divergir.
  var fx = document.getElementById('faixaMes');
  if (fx) {
    fx.style.setProperty('--fm-fundo', dados.faixaFundo || dados.cor);
    fx.style.setProperty('--fm-tinta', dados.faixaTinta || '#ffffff');
    poeTxt('fmNome', dados.nome);
    poeTxt('fmTxt', dados.tema);
    var fi = document.getElementById('fmIcone');
    if (fi) fi.className = dados.icone;
    // atribuição, nunca só "desesconder": assim o estado fica certo mesmo se
    // este bloco rodar duas vezes na mesma página
    var canal = document.getElementById('fmCanal');
    if (canal) {
      canal.hidden = !dados.apoio;
      if (dados.apoio) poeTxt('fmCanalTxt', dados.apoio.chip);
    }
  }

  // (b2) a faixa leva ao card desta pagina: rola ate ele respeitando a margem do
  // cabecalho fixo (scroll-margin-top). O href="#consciencia" fica como reserva
  // para quem estiver sem JS.
  if (fx) {
    fx.addEventListener('click', function (e) {
      var alvo = document.getElementById('consciencia');
      if (!alvo) return;
      e.preventDefault();
      alvo.scrollIntoView({ block: 'start' });   // suavidade vem do css (html{scroll-behavior})
      if (history.replaceState) history.replaceState(null, '', '#consciencia');
    });
  }

  // (c) home: troca o bloco neutro pelo destaque do mês corrente
  var dm = document.getElementById('dmCard');
  if (!dm) return;
  var teaser = dm.querySelector('#dmTeaser');
  if (!teaser) return;                       // sem os teasers no HTML, fica o neutro
  var meu = teaser.querySelector('[data-mes="' + mes + '"]');
  if (!meu) return;                          // mês sem teaser escrito: fica o neutro

  dm.style.setProperty('--cor-mes', dados.cor);
  dm.style.setProperty('--cor-mes-txt', dados.corTxt || dados.cor);
  poeTxt('dmRotulo', 'Campanha deste mês');
  poeTxt('dmTitulo', dados.nome);
  poeTxt('dmTexto', meu.textContent.trim());
  var ic = document.getElementById('dmIcone');
  if (ic) ic.className = dados.icone;

  var apoio = document.getElementById('dmApoio');
  if (apoio) {
    apoio.hidden = !dados.apoio;
    if (dados.apoio) {
      poeTxt('dmApoioTitulo', dados.apoio.titulo);
      poeTxt('dmApoioTexto', dados.apoio.texto);
    }
  }
})();
