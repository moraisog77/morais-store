// =============================================
// PIX QR CODE - MORAIS STORE
// Chave: 77981287372
// Willian Morais de Jesus Santos
// =============================================

const PIX_CHAVE  = '77981287372';
const PIX_NOME   = 'Willian Morais';
const PIX_CIDADE = 'Barreiras';

// ── Gera o payload EMV/PIX ──────────────────
function pixPayload(valor) {
  const txid = 'MORAIS' + Date.now().toString().slice(-8);

  function f(id, v) {
    return id + String(v.length).padStart(2,'0') + v;
  }

  const mai = f('26',
    f('00','BR.GOV.BCB.PIX') +
    f('01', PIX_CHAVE)
  );

  const addi = f('62', f('05', txid));

  let str =
    f('00','01') +
    f('01','12') +
    mai +
    f('52','0000') +
    f('53','986') +
    f('54', valor.toFixed(2)) +
    f('58','BR') +
    f('59', PIX_NOME.substring(0,25).toUpperCase()) +
    f('60', PIX_CIDADE.substring(0,15).toUpperCase()) +
    addi +
    '6304';

  return str + crc16(str);
}

// ── CRC-16/CCITT-FALSE ──────────────────────
function crc16(s) {
  let c = 0xFFFF;
  for (let i = 0; i < s.length; i++) {
    c ^= s.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++)
      c = (c & 0x8000) ? (c << 1) ^ 0x1021 : c << 1;
  }
  return (c & 0xFFFF).toString(16).toUpperCase().padStart(4,'0');
}

// ── Abre o modal ────────────────────────────
function abrirPix(plano, valor) {
  const nomes = {
    starter: 'Starter — R$ 9,90',
    pro:     'Pro Player — R$ 19,90',
    elite:   'Booyah Elite — R$ 34,90'
  };

  document.getElementById('pixPlanoNome').textContent = 'MORAIS STORE · ' + nomes[plano];
  document.getElementById('pixValor').textContent = 'R$ ' + valor.toFixed(2).replace('.',',');
  document.getElementById('pixValorInfo').textContent = 'R$ ' + valor.toFixed(2).replace('.',',');

  // Gera payload e QR Code
  const payload = pixPayload(valor);
  window._pixPayload = payload;

  const box = document.getElementById('qrCodeContainer');
  box.innerHTML = '';

  try {
    new QRCode(box, {
      text: payload,
      width: 210,
      height: 210,
      colorDark: '#000000',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch(e) {
    box.innerHTML = '<p style="color:#888;font-size:.85rem;padding:20px;">Erro ao gerar QR Code.<br>Use a chave abaixo.</p>';
  }

  document.getElementById('pixModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  iniciarTimer();
}

// ── Fecha modal ─────────────────────────────
function fecharPix() {
  document.getElementById('pixModal').classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(window._pixTimer);
}

// ── Copia chave Pix ─────────────────────────
function copiarChave() {
  // Copia o payload completo (copia e cola Pix)
  const texto = window._pixPayload || PIX_CHAVE;
  navigator.clipboard.writeText(texto).then(() => {
    const btn = document.getElementById('btnCopiarPix');
    const orig = btn.textContent;
    btn.textContent = '✅ Copiado!';
    btn.style.background = '#4CAF50';
    setTimeout(() => {
      btn.textContent = orig;
      btn.style.background = '';
    }, 2500);
  });
}

// ── Timer 15 min ────────────────────────────
function iniciarTimer() {
  let s = 15 * 60;
  clearInterval(window._pixTimer);
  window._pixTimer = setInterval(() => {
    s--;
    const el = document.getElementById('pixTimer');
    if (!el) return;
    if (s <= 0) { clearInterval(window._pixTimer); el.textContent = 'EXPIRADO'; return; }
    el.textContent =
      String(Math.floor(s/60)).padStart(2,'0') + ':' +
      String(s % 60).padStart(2,'0');
  }, 1000);
}

// ── Fecha clicando fora ─────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const m = document.getElementById('pixModal');
  if (m) m.addEventListener('click', e => { if (e.target === m) fecharPix(); });
});
