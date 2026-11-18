// Faixa de data comemorativa na página inicial, pela data de Solânea (UTC-3 fixo,
// o mesmo relógio do selo e da frase do dia). Só aparece no dia; nos outros dias fica escondida.
var DATAS_COMEMORATIVAS = {
  '11-18': {
    titulo: '18 de novembro · Dia Nacional do Notário e do Registrador',
    texto: 'Nossa homenagem aos tabeliães, registradores e a toda a equipe que, com dedicação, ajuda a dar segurança jurídica aos atos importantes da vida de cada cidadão.'
  }
};
function dataComemorativa(agoraMs) {
  var s = new Date(agoraMs - 3 * 3600e3);
  var mm = ('0' + (s.getUTCMonth() + 1)).slice(-2), dd = ('0' + s.getUTCDate()).slice(-2);
  return DATAS_COMEMORATIVAS[mm + '-' + dd] || null;
}
(function () {
  if (typeof document === 'undefined') return;
  var el = document.getElementById('dataComemorativa');
  if (!el) return;
  var d = dataComemorativa(Date.now());
  if (!d) return;
  el.querySelector('.dc-titulo').textContent = d.titulo;
  el.querySelector('.dc-texto').textContent = d.texto;
  el.hidden = false;
})();
