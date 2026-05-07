// =============================================
// GERADOR DE SENSIBILIDADE - MORAIS STORE
// =============================================

// Tabela de sensibilidades base por perfil
const sensibilidades = {
  // [geral, pontoVermelho, mira2x, mira4x, miraAWM, cameraLivre]
  fraco: {
    agressivo: {
      ar:      [95,  165, 140, 110, 75,  180],
      smg:     [100, 170, 145, 115, 70,  185],
      sniper:  [80,  140, 120, 95,  85,  160],
      shotgun: [105, 175, 148, 118, 72,  190],
    },
    equilibrado: {
      ar:      [85,  150, 130, 100, 70,  165],
      smg:     [90,  155, 135, 105, 68,  170],
      sniper:  [70,  130, 110, 88,  80,  150],
      shotgun: [92,  158, 138, 108, 65,  172],
    },
    passivo: {
      ar:      [70,  130, 110, 88,  80,  150],
      smg:     [75,  135, 115, 92,  78,  155],
      sniper:  [60,  115, 98,  78,  88,  135],
      shotgun: [78,  138, 118, 95,  75,  158],
    },
  },
  medio: {
    agressivo: {
      ar:      [110, 178, 155, 125, 82,  190],
      smg:     [115, 182, 160, 130, 78,  195],
      sniper:  [92,  155, 132, 105, 92,  172],
      shotgun: [118, 185, 162, 132, 80,  198],
    },
    equilibrado: {
      ar:      [100, 165, 142, 112, 76,  178],
      smg:     [105, 170, 148, 118, 74,  182],
      sniper:  [82,  145, 122, 98,  86,  162],
      shotgun: [108, 172, 150, 120, 72,  185],
    },
    passivo: {
      ar:      [82,  145, 122, 98,  86,  162],
      smg:     [88,  150, 128, 102, 84,  168],
      sniper:  [68,  125, 105, 84,  95,  145],
      shotgun: [90,  152, 130, 104, 82,  170],
    },
  },
  top: {
    agressivo: {
      ar:      [125, 190, 168, 138, 88,  200],
      smg:     [130, 195, 172, 142, 85,  200],
      sniper:  [105, 168, 145, 118, 98,  185],
      shotgun: [132, 198, 175, 145, 86,  200],
    },
    equilibrado: {
      ar:      [115, 178, 155, 125, 82,  192],
      smg:     [120, 182, 160, 130, 80,  195],
      sniper:  [95,  158, 135, 108, 92,  175],
      shotgun: [122, 185, 162, 132, 78,  198],
    },
    passivo: {
      ar:      [95,  158, 135, 108, 92,  175],
      smg:     [100, 162, 140, 112, 90,  180],
      sniper:  [78,  138, 118, 95,  102, 158],
      shotgun: [102, 165, 142, 115, 88,  182],
    },
  },
  emulador: {
    agressivo: {
      ar:      [118, 185, 162, 132, 85,  195],
      smg:     [122, 188, 165, 135, 82,  198],
      sniper:  [98,  162, 140, 112, 95,  178],
      shotgun: [125, 190, 168, 138, 83,  200],
    },
    equilibrado: {
      ar:      [108, 172, 150, 120, 78,  185],
      smg:     [112, 175, 153, 123, 76,  188],
      sniper:  [88,  150, 128, 102, 88,  168],
      shotgun: [115, 178, 155, 125, 74,  190],
    },
    passivo: {
      ar:      [88,  150, 128, 102, 88,  168],
      smg:     [92,  155, 132, 105, 86,  172],
      sniper:  [72,  132, 112, 90,  98,  150],
      shotgun: [95,  158, 135, 108, 84,  175],
    },
  },
};

// Dicas por perfil
const dicas = {
  agressivo: "💡 Dica: Com esse perfil agressivo, use o Ponto Vermelho para rushes rápidos. Pratique no modo treinamento por 10 minutos antes de jogar ranked.",
  equilibrado: "💡 Dica: Perfil equilibrado é ideal para qualquer situação. Experimente a Mira 2x em médias distâncias para maximizar os acertos.",
  passivo: "💡 Dica: Perfil passivo otimizado para sniper. A Mira AWM está calibrada para tiros precisos de longa distância. Posicione-se em locais altos.",
};

// Variação aleatória pequena para cada geração ser única
function variar(valor, range) {
  const v = valor + Math.floor(Math.random() * (range * 2 + 1)) - range;
  return Math.min(200, Math.max(1, v));
}

// Anima a barra de sensibilidade
function animarBarra(barId, valor) {
  const bar = document.getElementById(barId);
  bar.style.width = '0%';
  setTimeout(() => {
    bar.style.width = (valor / 200 * 100) + '%';
    // Cor baseada no valor
    if (valor <= 80) bar.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
    else if (valor <= 130) bar.style.background = 'linear-gradient(90deg, #FF9800, #FFB300)';
    else bar.style.background = 'linear-gradient(90deg, #FF6B00, #E63946)';
  }, 100);
}

// Função principal do gerador
function gerarSensibilidade() {
  const celular = document.getElementById('tipoCelular').value;
  const estilo = document.getElementById('estiloJogo').value;
  const arma = document.getElementById('armaFavorita').value;

  const base = sensibilidades[celular][estilo][arma];

  // Aplica variação pequena para personalização
  const vals = [
    variar(base[0], 5),
    variar(base[1], 4),
    variar(base[2], 4),
    variar(base[3], 4),
    variar(base[4], 3),
    variar(base[5], 5),
  ];

  // Mostra resultado
  document.getElementById('resultado').style.display = 'block';
  document.getElementById('geradorForm').style.marginBottom = '32px';

  // Preenche valores
  const ids = ['valGeral','valPonto','valMira2x','valMira4x','valAWM','valCamera'];
  const barIds = ['barGeral','barPonto','barMira2x','barMira4x','barAWM','barCamera'];

  ids.forEach((id, i) => {
    document.getElementById(id).textContent = vals[i];
  });

  barIds.forEach((id, i) => {
    animarBarra(id, vals[i]);
  });

  // Badge
  const celulaLabel = { fraco:'FRACO', medio:'MÉDIO', top:'TOP', emulador:'EMULADOR' };
  const estiloLabel = { agressivo:'AGRESSIVO', equilibrado:'EQUILIBRADO', passivo:'PASSIVO' };
  document.getElementById('resultadoBadge').textContent =
    celulaLabel[celular] + ' • ' + estiloLabel[estilo];

  // Dica
  document.getElementById('resultadoTip').textContent = dicas[estilo];

  // Scroll suave para o resultado
  setTimeout(() => {
    document.getElementById('resultado').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);

  // Salva os valores para copiar
  window._lastSens = vals;
}

// Copia as configurações
function copiarSens() {
  if (!window._lastSens) return;
  const v = window._lastSens;
  const texto =
`=== MORAIS STORE - Sensibilidade Free Fire ===
Geral:              ${v[0]}
Ponto Vermelho:     ${v[1]}
Mira 2x:            ${v[2]}
Mira 4x:            ${v[3]}
Mira AWM:           ${v[4]}
Câmera Livre:       ${v[5]}
===============================================
Gerado por MORAIS STORE 🔥`;

  navigator.clipboard.writeText(texto).then(() => {
    const toast = document.getElementById('copyToast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}

// Gera novamente
function gerarNovamente() {
  document.getElementById('resultado').style.display = 'none';
  document.getElementById('geradorForm').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Modo demo (desbloqueia sem login)
function demoMode() {
  document.getElementById('lockOverlay').style.display = 'none';
}

// =============================================
// FAQ Toggle
// =============================================
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const icon = btn.querySelector('.faq-icon');
  const isOpen = answer.classList.contains('open');

  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-icon').forEach(i => { i.textContent = '+'; });

  if (!isOpen) {
    answer.classList.add('open');
    icon.textContent = '−';
  }
}

// =============================================
// Navbar scroll
// =============================================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.style.boxShadow = window.scrollY > 50
    ? '0 4px 30px rgba(0,0,0,0.5)'
    : 'none';
});

// =============================================
// Animação de entrada nos cards/steps
// =============================================
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .card, .testimonial, .faq-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// =============================================
// GERADOR DE GRÁFICOS - MORAIS STORE
// =============================================

const configsGraficos = {
  fraco: {
    fps:         { qualidade: 'Baixo',  fps: 'Alto',    efeitos: 'Desligado', vegetacao: 'Desligado', render: 'Clássico' },
    equilibrado: { qualidade: 'Baixo',  fps: 'Alto',    efeitos: 'Ligado',    vegetacao: 'Desligado', render: 'Clássico' },
    visual:      { qualidade: 'Médio',  fps: 'Médio',   efeitos: 'Ligado',    vegetacao: 'Ligado',    render: 'Clássico' },
  },
  medio: {
    fps:         { qualidade: 'Médio',  fps: 'Ultra',   efeitos: 'Desligado', vegetacao: 'Desligado', render: 'Clássico' },
    equilibrado: { qualidade: 'Médio',  fps: 'Alto',    efeitos: 'Ligado',    vegetacao: 'Ligado',    render: 'Clássico' },
    visual:      { qualidade: 'Alto',   fps: 'Alto',    efeitos: 'Ligado',    vegetacao: 'Ligado',    render: 'Realista' },
  },
  top: {
    fps:         { qualidade: 'Alto',   fps: 'Extremo', efeitos: 'Desligado', vegetacao: 'Desligado', render: 'Clássico' },
    equilibrado: { qualidade: 'Alto',   fps: 'Ultra',   efeitos: 'Ligado',    vegetacao: 'Ligado',    render: 'Realista' },
    visual:      { qualidade: 'Ultra',  fps: 'Ultra',   efeitos: 'Ligado',    vegetacao: 'Ligado',    render: 'Realista' },
  },
  emulador: {
    fps:         { qualidade: 'Alto',   fps: 'Extremo', efeitos: 'Desligado', vegetacao: 'Desligado', render: 'Clássico' },
    equilibrado: { qualidade: 'Alto',   fps: 'Extremo', efeitos: 'Ligado',    vegetacao: 'Ligado',    render: 'Realista' },
    visual:      { qualidade: 'Ultra',  fps: 'Extremo', efeitos: 'Ligado',    vegetacao: 'Ligado',    render: 'Realista' },
  },
};

const dicasGraf = {
  fps:         '💡 Dica: Config focada em FPS máximo. Sombras desligadas para ganhar mais frames. Ideal para celulares que travam.',
  equilibrado: '💡 Dica: Config equilibrada entre visual e desempenho. Sombras desligadas para manter FPS estável.',
  visual:      '💡 Dica: Config com melhor visual possível. Sombras desligadas mesmo assim para não prejudicar o FPS.',
};

function gerarGraficos() {
  const celular = document.getElementById('grafCelular').value;
  const prioridade = document.getElementById('grafPrioridade').value;

  const config = configsGraficos[celular][prioridade];

  document.getElementById('resultadoGraf').style.display = 'block';

  document.getElementById('grafQualidade').textContent = config.qualidade;
  document.getElementById('grafFPS').textContent = config.fps;
  document.getElementById('grafEfeitos').textContent = config.efeitos;
  document.getElementById('grafVegetacao').textContent = config.vegetacao;
  document.getElementById('grafRender').textContent = config.render;

  // Cores dos valores
  ['grafQualidade','grafFPS','grafEfeitos','grafVegetacao','grafRender'].forEach(id => {
    const el = document.getElementById(id);
    const val = el.textContent;
    if (val === 'Desligado') {
      el.style.color = '#888';
    } else if (['Ultra','Extremo','Realista'].includes(val)) {
      el.style.color = '#FF6B00';
    } else {
      el.style.color = '#4CAF50';
    }
  });

  const celulaLabel = { fraco:'FRACO', medio:'MÉDIO', top:'TOP', emulador:'EMULADOR' };
  const priorLabel = { fps:'MAX FPS', equilibrado:'EQUILIBRADO', visual:'MELHOR VISUAL' };
  document.getElementById('resultadoBadgeGraf').textContent =
    celulaLabel[celular] + ' • ' + priorLabel[prioridade];

  document.getElementById('resultadoTipGraf').textContent = dicasGraf[prioridade];

  window._lastGraf = config;

  setTimeout(() => {
    document.getElementById('resultadoGraf').scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 200);
}

function copiarGraf() {
  if (!window._lastGraf) return;
  const g = window._lastGraf;
  const texto =
`=== MORAIS STORE - Config de Gráfico Free Fire ===
Qualidade Gráfica:     ${g.qualidade}
Taxa de Quadros:       ${g.fps}
Sombras:               DESLIGADO
Efeitos Especiais:     ${g.efeitos}
Vegetação:             ${g.vegetacao}
Estilo Renderização:   ${g.render}
==================================================
Gerado por MORAIS STORE 🔥`;

  navigator.clipboard.writeText(texto).then(() => {
    const toast = document.getElementById('copyToastGraf');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  });
}

function gerarNovamenteGraf() {
  document.getElementById('resultadoGraf').style.display = 'none';
  document.getElementById('geradorFormGraf').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function demoModeGraf() {
  document.getElementById('lockOverlayGraf').style.display = 'none';
}
