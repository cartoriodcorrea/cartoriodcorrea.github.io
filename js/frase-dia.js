// Frase do dia ("Você sabia?") na página inicial.
// Uma frase por dia, pela data de Solânea (UTC-3 fixo, o mesmo relógio do selo
// aberto/fechado do main.js), em ordem fixa: índice = dias desde DATA_BASE,
// módulo o tamanho do banco. A fonte legal de cada frase está no FONTES.md do
// kit (não vai para o site). Sem prazo, sem valor, sem conselho individual.
var FRASES_DIA = [
  'Você sabia? Quem só tem a escritura ainda não é dono: a propriedade do imóvel passa com o registro no Registro de Imóveis.',
  'Você sabia? Em ato todo presencial, você escolhe o tabelião de notas, não importa onde fica o imóvel nem onde as partes moram.',
  'Você sabia? Protesto é o ato formal que prova o não pagamento de um título ou de outro documento de dívida.',
  'Você sabia? Cada imóvel tem uma matrícula própria no Registro de Imóveis, onde fica a sua história: donos, ônus e averbações.',
  'Você sabia? Qualquer pessoa pode pedir certidão de um registro, sem precisar explicar o motivo do pedido.',
  'Você sabia? Registrar um contrato particular em Títulos e Documentos dá a ele publicidade e efeitos perante terceiros.',
  'Você sabia? Uma associação só passa a existir legalmente quando seu ato constitutivo é inscrito no Registro Civil das Pessoas Jurídicas.',
  'Você sabia? Reconhecer firma é o ato em que o tabelião confirma de quem é a assinatura lançada num documento.',
  'Você sabia? Na autenticação, o tabelião confere a cópia com o documento original e declara que ela é idêntica a ele.',
  'Você sabia? Construiu ou demoliu? A construção ou a demolição deve ser averbada na matrícula do imóvel.',
  'Você sabia? Antes de o protesto ser lavrado, o tabelião envia intimação ao devedor, que ainda pode pagar no próprio tabelionato.',
  'Você sabia? A escritura pública, lavrada pelo tabelião em suas notas, é documento dotado de fé pública e faz prova plena.',
  'Você sabia? A ata notarial registra um fato presenciado pelo tabelião, como o conteúdo de um site ou de uma conversa, e pode servir de prova.',
  'Você sabia? No Registro de Imóveis, a ordem de chegada do título define a prioridade: quem protocola primeiro tem preferência.',
  'Você sabia? Qualquer documento pode ser registrado em Títulos e Documentos só para conservação, guardando o conteúdo e a data.',
  'Você sabia? Pela lei, a escritura pública é essencial nos negócios sobre imóveis de valor acima de 30 salários mínimos, salvo exceção legal.',
  'Você sabia? O credor pode desistir e retirar o título apresentado a protesto, desde que antes de o protesto ser lavrado.',
  'Você sabia? O testamento público é escrito pelo tabelião conforme a vontade de quem testa e lido em voz alta diante de duas testemunhas.',
  'Você sabia? O registro de um imóvel é feito no Registro de Imóveis da circunscrição onde o imóvel está situado.',
  'Você sabia? Em regra, sociedades simples são registradas no Registro Civil das Pessoas Jurídicas; as empresárias, na Junta Comercial.',
  'Você sabia? Em muitos casos, inventário e divórcio consensuais podem ser feitos por escritura pública, sempre com advogado ou defensor.',
  'Você sabia? A cópia autenticada por tabelião vale como prova, mas, se a autenticidade for contestada, o original pode ser exigido.',
  'Você sabia? Depois de paga a dívida, o cancelamento do protesto é pedido no tabelionato, com o título ou a carta de anuência do credor.',
  'Você sabia? Casou, divorciou ou mudou de nome? A mudança deve ser averbada na matrícula dos seus imóveis.',
  'Você sabia? Pelo Código Civil, os efeitos de um instrumento particular perante terceiros dependem do seu registro no registro público.',
  'Você sabia? Quem escolhe para o casamento um regime de bens diferente da comunhão parcial precisa fazer pacto antenupcial por escritura.',
  'Você sabia? O pacto antenupcial só tem efeito perante terceiros depois de registrado no Registro de Imóveis do domicílio do casal.',
  'Você sabia? Para protestar um cheque, em regra, ele precisa trazer a prova de que foi apresentado ao banco.',
  'Você sabia? A usucapião pode ser pedida diretamente no Registro de Imóveis, sem processo judicial, com o interessado representado por advogado.',
  'Você sabia? Tabeliães e registradores são profissionais do direito com fé pública, que exercem a atividade por delegação do poder público.',
  'Você sabia? As alterações do estatuto de uma associação ou fundação também devem ser averbadas no Registro Civil das Pessoas Jurídicas.',
  'Você sabia? Quem faz testamento pode mudá-lo a qualquer tempo: é um ato pessoal e revogável.',
  'Você sabia? Hipotecas e alienações fiduciárias aparecem na matrícula, por isso a certidão mostra se o imóvel garante alguma dívida.',
  'Você sabia? A certidão de protesto informa se há protestos em nome de uma pessoa ou empresa e abrange, no mínimo, os últimos cinco anos.',
  'Você sabia? Pelo Registro de Títulos e Documentos é possível fazer notificação extrajudicial, com a certidão do oficial sobre a diligência.',
  'Você sabia? A procuração segue a forma exigida para o ato: para assinar uma escritura pública, em regra, ela também deve ser pública.',
  'Você sabia? Erros na descrição ou na área de um imóvel podem, em muitos casos, ser corrigidos por retificação no próprio Registro de Imóveis.',
  'Você sabia? Além de cheques e duplicatas, outros documentos de dívida, como contratos, também podem ser levados a protesto.',
  'Você sabia? O usufruto de um imóvel, como na doação com reserva de usufruto, se constitui pelo registro no Registro de Imóveis.',
  'Você sabia? Organizações religiosas adquirem personalidade jurídica com a inscrição do ato constitutivo no Registro Civil das Pessoas Jurídicas.',
  'Você sabia? Em regra, a procuração termina com a morte de quem a deu ou de quem a recebeu, mas a lei prevê exceções.',
  'Você sabia? Penhoras, arrestos e sequestros de imóveis também são registrados na matrícula, à vista de quem a consultar.',
  'Você sabia? O tabelião de protesto examina a forma do título, mas a lei diz que não cabe a ele investigar se a dívida prescreveu.',
  'Você sabia? A certidão pode ser lavrada em inteiro teor, em resumo ou em relatório, conforme o que for pedido.',
  'Você sabia? Os cartórios são fiscalizados pelo Poder Judiciário, por meio do juiz competente e das corregedorias de justiça.',
  'Você sabia? A promessa de compra e venda sem cláusula de arrependimento, registrada no Registro de Imóveis, dá direito real à aquisição.',
  'Você sabia? Além do testamento público, existe o cerrado: escrito pelo testador, ele é aprovado pelo tabelião e entregue lacrado.',
  'Você sabia? Documentos estrangeiros, com tradução, são registrados em Títulos e Documentos para produzir efeitos em repartições públicas.',
  'Você sabia? A servidão de um imóvel em favor de outro se constitui por declaração dos proprietários ou testamento, seguida de registro.',
  'Você sabia? Quando a Justiça susta um protesto, o título fica no tabelionato, à disposição do juiz.',
  'Você sabia? Os valores cobrados pelos cartórios, os emolumentos, são fixados por lei estadual, e a tabela deve ficar à vista do público.',
  'Você sabia? A procuração pública fica lançada no livro do tabelião, de onde se podem tirar traslados e certidões com a mesma força de prova.',
  'Você sabia? O bem de família escolhido pelo proprietário, por escritura ou testamento, só se constitui com o registro no Registro de Imóveis.',
  'Você sabia? É proibido vender lote de loteamento ou desmembramento que não esteja registrado no Registro de Imóveis.',
  'Você sabia? Os tabelionatos de protesto fornecem às entidades de proteção ao crédito, quando pedida, a relação de protestos e cancelamentos.',
  'Você sabia? Na matrícula de um imóvel rural constam também o código do imóvel no INCRA e os dados do CCIR.',
  'Você sabia? Casais podem declarar a união estável por escritura pública no tabelionato de notas.',
  'Você sabia? Os livros do cartório ficam sob a guarda do titular, que responde por sua ordem, segurança e conservação.',
  'Você sabia? Para ser titular de cartório no Brasil é preciso ser aprovado em concurso público de provas e títulos.',
  'Você sabia? Em ato todo presencial, inventário, partilha e divórcio consensuais podem ser feitos em qualquer tabelionato de notas.'
];
var FRASE_DATA_BASE = Date.UTC(2026, 10, 1); // 01/11/2026 = frase 1
function fraseDoDia(agoraMs) { // agoraMs: Date.now(); devolve { i, texto }
  var s = new Date(agoraMs - 3 * 36e5); // relógio de Solânea
  var dias = Math.floor((Date.UTC(s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()) - FRASE_DATA_BASE) / 864e5);
  var n = FRASES_DIA.length, i = ((dias % n) + n) % n;
  return { i: i, texto: FRASES_DIA[i] };
}
(function () {
  if (typeof document === 'undefined') return; // bancada jsc
  var el = document.getElementById('fraseDia');
  if (!el) return;
  var f = fraseDoDia(Date.now()), t = f.texto.replace(/^Você sabia\?\s*/, '');
  el.querySelector('.frase-dia-texto').textContent = t;
  el.hidden = false;
})();
