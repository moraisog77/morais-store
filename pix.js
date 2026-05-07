// =============================================
// GERADOR DE PIX QR CODE - MORAIS STORE
// Willian Morais de Jesus Santos
// Chave: 77981287372
// =============================================

function gerarPixPayload(valor, descricao) {
  const chave = '77981287372';
  const nome = 'Willian Morais';
  const cidade = 'BRASIL';
  const txid = 'MORAISSTORE' + Date.now().toString().slice(-6);

  function campo(id, val) {
    const tam = val.length.toString().padStart(2, '0');
    return id + tam + val;
  }

  function merchantAccountInfo() {
    const gui = campo('00', 'BR.GOV.BCB.PIX');
    const chaveField = campo('01', chave);
    return campo('26', gui + chaveField);
  }

  let payload =
    campo('00', '01') +
    campo('01', '12') +
    merchantAccountInfo() +
    campo('52', '0000') +
    campo('53', '986') +
    campo('54', valor.toFixed(2)) +
    campo('58', 'BR') +
    campo('59', nome.substring(0, 25).toUpperCase()) +
    campo('60', cidade.substring(0, 15).toUpperCase()) +
    campo('62', campo('05', txid)) +
    '6304';

  payload += crc16(payload);
  return payload;
}

function crc16(str) {
  let crc = 0xFFFF;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = (crc & 0x8000) ? (crc << 1) ^ 0x1021 : crc << 1;
    }
  }
  return ((crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0'));
}

function abrirPix(plano, valor) {
  const descricoes = {
    starter: 'MORAIS STORE - Starter',
    pro:     'MORAIS STORE - Pro Player',
    elite:   'MORAIS STORE - Booyah Elite'
  };

  const payload = gerarPixPayload(valor, descricoes[plano]);

  document.getElementById('pixPlanoNome').textContent = descricoes[plano];
  document.getElementById('pixValor').textContent = 'R$ ' + valor.toFixed(2).replace('.', ',');
  document.getElementById('pixCopiaECola').value = payload;
  document.getElementById('pixChave').textContent = '77981287372';
  document.getElementById('pixNome').textContent = 'Willian Morais de Jesus Santos';

  // Gera QR Code
  const qrContainer = document.getElementById('qrCodeContainer');
  qrContainer.innerHTML = '';
  new QRCode(qrContainer, {
    text: payload,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.M
  });

  document.getElementById('pixModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  iniciarTimer();
}

function fecharPix() {
  document.getElementById('pixModal').classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(window._pixTimer);
}

function copiarPix() {
  const texto = document.getElementById('pixCopiaECola').value;
  navigator.clipboard.writeText(texto).then(() => {
    const btn = document.getElementById('btnCopiarPix');
    btn.textContent = '✅ Copiado!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.textContent = '📋 Copiar Código Pix';
      btn.style.background = '';
    }, 2500);
  });
}

function iniciarTimer() {
  let segundos = 15 * 60;
  clearInterval(window._pixTimer);
  window._pixTimer = setInterval(() => {
    segundos--;
    const min = Math.floor(segundos / 60).toString().padStart(2, '0');
    const sec = (segundos % 60).toString().padStart(2, '0');
    const el = document.getElementById('pixTimer');
    if (el) el.textContent = min + ':' + sec;
    if (segundos <= 0) {
      clearInterval(window._pixTimer);
      if (el) el.textContent = 'EXPIRADO';
    }
  }, 1000);
}

// Fecha modal clicando fora
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('pixModal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) fecharPix();
    });
  }
});
