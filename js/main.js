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
      'Documento de identificação de quem solicita',
      'Muitas certidões também podem ser pedidas online: pergunte pela opção digital'
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

// Status aberto/fechado (seg a sex, 8h às 17h, horário local)
const statusEl = document.getElementById('statusFuncionamento');
if (statusEl) {
  const agora = new Date();
  const dia = agora.getDay(); // 0 dom ... 6 sáb
  const hora = agora.getHours() + agora.getMinutes() / 60;
  const abertoAgora = dia >= 1 && dia <= 5 && hora >= 8 && hora < 17;
  if (abertoAgora) {
    statusEl.innerHTML = '<i class="ri-checkbox-blank-circle-fill"></i> Aberto agora · fecha às 17h';
    statusEl.classList.add('aberto');
  } else {
    let quando = 'segunda às 8h';
    if (dia >= 1 && dia <= 5 && hora < 8) quando = 'hoje às 8h';
    else if (dia >= 1 && dia <= 4 && hora >= 17) quando = 'amanhã às 8h';
    statusEl.innerHTML = '<i class="ri-checkbox-blank-circle-fill"></i> Fechado agora · abre ' + quando;
    statusEl.classList.add('fechado');
  }
}
