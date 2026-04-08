const stages = [
  {
    title: '🧩 DESAFIO 1 — A Porta de Pedra',
    story: ' Você avança porum corredor estreito. Um estrondo. Rochas caem do teto e bloqueiam a saída. O Tablete vibra em suas mãos.',
    objective: 'Para remover as pedras, determine a pressão derivada do Tablete quando P(m) = m² + 3m.',
    graphFunc: '2*x + 3',
    main: {
      prompt: 'Calcule a pressão instântanea: P\'(m) para P(m) = m² + 3m.',
      answer: '2*x + 3',
      type: 'expression',
      hint: 'Use x ou m como variável; ^ ou ** funcionam para potências.'
    },
    secondary: {
      prompt: 'O Tablete perde controle. Resolva para estabilizar: P(m) = 2m².',
      answer: '4*x',
      type: 'expression',
      hint: 'Procure a derivada da função de pressão.'
    }
  },
  {
    title: '🌉 DESAFIO 2 — Ponte Viva',
    story: 'Você deixa as ruínas para trás e entra em uma floresta densa. Um precipício bloqueia sua passagem. O Tablete se ilumina novamente.',
    objective: 'Para reconstruir a ponte, calcule a integral indefinida: ∫ 2x · (x² + 1)³ dx.',
    graphFunc: '2*x * (x**2 + 1)**3',
    main: {
      prompt: 'Calcule ∫ 2x · (x² + 1)³ dx.',
      answer: '(x**2 + 1)**4 / 4',
      type: 'expression',
      hint: 'Responda com a função primitiva sem constante C.'
    },
    secondary: {
      prompt: 'A ponte se forma, mas colapsa. Resolva: ∫ 2x(x²) dx.',
      answer: 'x**4 / 2',
      type: 'expression',
      hint: 'Simplifique antes de integrar.'
    }
  },
  {
    title: '🌿 DESAFIO 3 — Jardim do Tempo',
    story: 'Do outro lado, você encontra um jardim antigo. As plantas crescem e bloqueiam o caminho. O Tablete reage.',
    objective: 'Controle o crescimento resolvendo: ∫ x e^x dx.',
    graphFunc: 'x * Math.exp(x)',
    main: {
      prompt: 'Calcule ∫ x e^x dx.',
      answer: 'x * (Math.E)**x - (Math.E)**x',
      type: 'expression',
      hint: 'Use integração por partes.'
    },
    secondary: {
      prompt: 'As plantas avançam. Resolva para estabilizar: ∫ x dx.',
      answer: 'x**2 / 2',
      type: 'expression',
      hint: 'A primitiva de x é x²/2.'
    }
  },
  {
    title: '🌀 DESAFIO 4 — O Portal dos Limites',
    story: 'O portal antigo é sustentado por pilares de energia. A energia flui apenas entre eles — contida, limitada.',
    objective: 'Ative o portal calculando: ∫₀² (2x + 1) dx.',
    graphFunc: '2*x + 1',
    main: {
      prompt: 'Calcule ∫₀² (2x + 1) dx.',
      answer: 6,
      type: 'number',
      hint: 'Use o teorema fundamental do cálculo para integrar em [0,2].'
    },
    secondary: {
      prompt: 'A energia dispersa o portal. Resolva: ∫₀¹ x dx.',
      answer: 0.5,
      type: 'number',
      hint: 'A área sob x de 0 a 1 vale 0,5.'
    }
  },
  {
    title: '🏛️ DESAFIO 5 — Câmara da Luz',
    story: 'O portal se abre. Você entra em um templo silencioso. Uma barreira de luz bloqueia o caminho final.',
    objective: 'Dissipe a barreira calculando a área sob f(x)=x² no intervalo [0,2].',
    graphFunc: 'x**2',
    main: {
      prompt: 'Calcule a área sob f(x)=x² em [0,2].',
      answer: 8 / 3,
      type: 'number',
      hint: 'Use a integral definida de x² entre 0 e 2.',
    },
    secondary: {
      prompt: 'A luz se fragmenta. Resolva para estabilizar: área sob f(x)=x em [0,2].',
      answer: 2,
      type: 'number',
      hint: 'A área de x de 0 a 2 é um triângulo de base 2 e altura 2.'
    }
  }
];

const introTitle = document.getElementById('introTitle');
const introLead = document.getElementById('introLead');
const introScene = document.getElementById('introScene');
const stageTitle = document.getElementById('stageTitle');
const stageStory = document.getElementById('stageStory');
const stageObjective = document.getElementById('stageObjective');
const questionElement = document.getElementById('question');
const answerInput = document.getElementById('answerInput');
const submitButton = document.getElementById('submitButton');
const statusElement = document.getElementById('status');
const scoreElement = document.getElementById('score');
const hintElement = document.getElementById('hint');
const graphCanvas = document.getElementById('graphCanvas');
const graphNote = document.getElementById('graphNote');
const answerContainer = document.getElementById('answerContainer');
const ctx = graphCanvas.getContext('2d');

// Variáveis globais
let currentStage = 0;
let inSecondary = false;
let isFinished = false;
let mainFailureCount = 0;
const MAX_MAIN_FAILURES = 2;

// Sistema de cheat pq ninguem merece
let keysPressed = {};
document.addEventListener('keydown', function(event) {
  keysPressed[event.key.toLowerCase()] = true;
  
  if (keysPressed['s'] && keysPressed['k'] && !isFinished) {
    skipToNextStage();
  }
});

document.addEventListener('keyup', function(event) {
  delete keysPressed[event.key.toLowerCase()];
});

function skipToNextStage() {
  if (isFinished) return;
  
  inSecondary = false;
  mainFailureCount = 0;
  
  currentStage += 1;
  
  statusElement.textContent = '🏆 Cheat ativado! Pulando para o próximo desafio...';
  setTimeout(() => {
    statusElement.textContent = '';
  }, 2000);
  
  renderStage();
}

document.addEventListener('DOMContentLoaded', function() {
  document.body.classList.add('intro-bg');
});

function startGame() {
  document.body.classList.remove('intro-bg');
  introScreen.classList.remove('game-over');
  introScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  answerContainer.classList.add('active');
  introTitle.textContent = 'Tablete da Criação';
  introLead.textContent = 'Você desperta entre as ruínas de uma civilização esquecida. O ar é denso, e o silêncio ecoa entre as pedras.';
  introScene.innerHTML = `
    <p>Em suas mãos, um artefato reage à sua presença: o Tablete da Criação. Um instrumento capaz de moldar o mundo… usando cálculo.</p>
    <p>Cada estrutura ao seu redor — pedra, energia, vida — obedece a funções. E o tablete permite que você as altere.</p>
    <p>Mas há um risco. Sempre que você falha, o tablete se torna instável. Você precisará estabilizá-lo antes de tentar novamente.</p>
    <p>Seu objetivo é claro: levar o Tablete de volta ao seu destino restaurando o equilíbrio do mundo.</p>
  `;
  startButton.textContent = '▶ Iniciar Jornada';
  currentStage = 0;
  inSecondary = false;
  isFinished = false;
  mainFailureCount = 0;
  renderStage();
}

function renderStage() {
  if (currentStage >= stages.length) {
    showEndScreen();
    return;
  }

  const stage = stages[currentStage];
  const challenge = inSecondary ? stage.secondary : stage.main;
  const stageLabel = inSecondary ? 'Desafio Secundário' : 'Desafio Principal';

  gameScreen.className = `stage-bg-${currentStage}`;

  stageTitle.textContent = `${stage.title}`;
  stageStory.textContent = stage.story;
  stageStory.classList.add('challenge-text');
  stageObjective.textContent = stage.objective;
  stageObjective.classList.add('challenge-text');
  questionElement.textContent = `${stageLabel}: ${challenge.prompt}`;
  questionElement.classList.add('challenge-text');
  answerInput.value = '';
  answerInput.disabled = false;
  submitButton.disabled = false;
  statusElement.textContent = '';
  scoreElement.textContent = `Fase ${currentStage + 1} de ${stages.length}`;
  hintElement.textContent = challenge.hint || '';
  answerInput.focus();
  plotGraph();
}

function showEndScreen() {
  document.body.classList.add('intro-bg');
  gameScreen.classList.remove('stage-bg-0', 'stage-bg-1', 'stage-bg-2', 'stage-bg-3', 'stage-bg-4');
  stageTitle.textContent = '✦ Jornada Concluída ✦';
  stageStory.textContent = 'O Tablete foi restaurado e o mundo reacende sua ordem. Você chegou ao destino final.';
  stageStory.classList.remove('challenge-text');
  stageObjective.textContent = '';
  stageObjective.classList.remove('challenge-text');
  questionElement.textContent = 'Parabéns! Você concluiu todos os desafios.';
  questionElement.classList.remove('challenge-text');
  answerInput.disabled = true;
  submitButton.disabled = true;
  statusElement.textContent = 'O equilíbrio foi restaurado. Fim da jornada.';
  scoreElement.textContent = '';
  hintElement.textContent = '';
  graphNote.textContent = 'A história terminou. Você pode recarregar a página para jogar novamente.';
  ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
}

function endGame(message) {
  isFinished = true;
  document.body.classList.add('intro-bg');
  gameScreen.classList.add('hidden');
  answerContainer.classList.remove('active');
  introScreen.classList.remove('hidden');
  introScreen.classList.add('game-over');
  introTitle.textContent = '✦ Fim de Jogo ✦';
  introLead.textContent = message;
  introScene.innerHTML = '<p>O Tablete falhou definitivamente e não há mais chances. Recarregue a página para tentar novamente.</p>';
  startButton.textContent = '🔄 Tentar Novamente';
}

function normalizeExpression(text) {
  return text
    .trim()
    .replace(/\be\b/g, 'Math.E')
    .replace(/\^/g, '**')
    .replace(/\be\s*\^\s*([a-zA-Z0-9_()]+)/gi, 'Math.exp($1)')
    .replace(/\bexp\s*\(/gi, 'Math.exp(')
    .replace(/\bm\b/g, 'x')
    .replace(/[\s]+/g, ' ');
}

function createFunction(expr) {
  const normalized = normalizeExpression(expr);
  return new Function('x', `with (Math) { return ${normalized}; }`);
}

function compareExpression(userExpr, expectedExpr) {
  try {
    const userFn = createFunction(userExpr);
    const expectedFn = createFunction(expectedExpr);
    const testPoints = [-2, -1, 0, 1, 2, 3];

    for (const x of testPoints) {
      const a = Number(userFn(x));
      const b = Number(expectedFn(x));
      if (!Number.isFinite(a) || !Number.isFinite(b)) {
        return false;
      }
      if (Math.abs(a - b) > 1e-4) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

function parseNumber(text) {
  const normalized = text.trim().replace(',', '.');
  if (/^[\d\s\.\+\-\*\/\(\)]+$/.test(normalized)) {
    try {
      const result = eval(normalized.replace(/\s+/g, ''));
      if (Number.isFinite(result)) {
        return result;
      }
    } catch (error) {
      // Ignora 
    }
  }
  return parseFloat(normalized);
}

function compareNumber(userText, expectedValue) {
  const value = parseNumber(userText);
  return Number.isFinite(value) && Math.abs(value - expectedValue) < 1e-6;
}

function handleAnswer() {
  if (isFinished) {
    return;
  }

  const stage = stages[currentStage];
  const challenge = inSecondary ? stage.secondary : stage.main;
  const answerText = answerInput.value.trim();

  if (!answerText) {
    statusElement.textContent = 'Digite uma resposta antes de enviar.';
    return;
  }

  const isCorrect =
    challenge.type === 'expression'
      ? compareExpression(answerText, challenge.answer)
      : compareNumber(answerText, challenge.answer);

  if (isCorrect) {
    if (inSecondary) {
      inSecondary = false;
      statusElement.textContent = 'Desafio secundário resolvido. Você ganhou o direito de tentar novamente a questão principal.';
      answerInput.value = '';
      renderStage();
      return;
    }

    mainFailureCount = 0;
    statusElement.textContent = 'Resposta correta! Avançando para o próximo desafio...';
    currentStage += 1;
    answerInput.value = '';
    renderStage();
    return;
  }

  if (!inSecondary) {
    mainFailureCount += 1;
    if (mainFailureCount >= MAX_MAIN_FAILURES) {
      endGame('Você errou a questão principal duas vezes. O jogo acabou.');
      return;
    }
    inSecondary = true;
    statusElement.textContent = 'Resposta incorreta. O Tablete ficou instável. Resolva o desafio secundário para estabilizá-lo e tentar novamente.';
    answerInput.value = '';
    renderStage();
    return;
  }

  statusElement.textContent = 'Ainda não está certo. Continue tentando estabilizar o Tablete.';
  plotGraph();
}

function plotGraph() {
  const stage = stages[currentStage];
  const challenge = inSecondary ? stage.secondary : stage.main;
  const width = graphCanvas.width;
  const height = graphCanvas.height;
  const padding = 40;
  const plotWidth = width - 40;
  const plotHeight = height - 40;
  const minX = 0;
  const maxX = 2;

  ctx.clearRect(0, 0, width, height);

  ctx.strokeStyle = '#475d7f';
  ctx.lineWidth = 1;
  for (let gridX = 0; gridX <= 4; gridX += 1) {
    const xPos = padding + (plotWidth * gridX) / 4;
    ctx.beginPath();
    ctx.moveTo(xPos, padding);
    ctx.lineTo(xPos, height - padding);
    ctx.stroke();
  }
  for (let gridY = 0; gridY <= 4; gridY += 1) {
    const yPos = padding + (plotHeight * gridY) / 4;
    ctx.beginPath();
    ctx.moveTo(padding, yPos);
    ctx.lineTo(width - padding, yPos);
    ctx.stroke();
  }

  let func = null;
  try {
    func = createFunction(stage.graphFunc);
  } catch (error) {
    func = null;
  }

  if (func) {
    const samplePoints = 120;
    const values = [];
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (let i = 0; i <= samplePoints; i += 1) {
      const x = minX + ((maxX - minX) * i) / samplePoints;
      const y = Number(func(x));
      if (!Number.isFinite(y)) {
        continue;
      }
      values.push({ x, y });
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    }

    if (minY === maxY) {
      minY -= 1;
      maxY += 1;
    }

    const scaleX = plotWidth / (maxX - minX);
    const scaleY = plotHeight / (maxY - minY);

    ctx.strokeStyle = '#82c7ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    values.forEach((point, index) => {
      const xCanvas = padding + (point.x - minX) * scaleX;
      const yCanvas = height - padding - (point.y - minY) * scaleY;
      if (index === 0) ctx.moveTo(xCanvas, yCanvas);
      else ctx.lineTo(xCanvas, yCanvas);
    });
    ctx.stroke();

    if (challenge.type === 'expression') {
      try {
        const playerFn = createFunction(answerInput.value || challenge.answer);
        const playerValues = [];
        for (let i = 0; i <= samplePoints; i += 1) {
          const x = minX + ((maxX - minX) * i) / samplePoints;
          const y = Number(playerFn(x));
          if (Number.isFinite(y)) {
            playerValues.push({ x, y });
          }
        }
        ctx.strokeStyle = '#ffa05b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        playerValues.forEach((point, index) => {
          const xCanvas = padding + (point.x - minX) * scaleX;
          const yCanvas = height - padding - (point.y - minY) * scaleY;
          if (index === 0) ctx.moveTo(xCanvas, yCanvas);
          else ctx.lineTo(xCanvas, yCanvas);
        });
        ctx.stroke();
      } catch (error) {
        // Nao faca nada.
      }
    }

    ctx.fillStyle = '#d8e0ff';
    ctx.font = '12px sans-serif';
    ctx.fillText(`x ∈ [${minX}, ${maxX}]`, padding, height - 14);
    ctx.fillText(`y ∈ [${minY.toFixed(2)}, ${maxY.toFixed(2)}]`, padding + 120, height - 14);
  } else {
    ctx.fillStyle = '#ffa05b';
    ctx.font = '16px sans-serif';
    ctx.fillText('Nenhuma função disponível para o gráfico.', padding, height / 2);
  }
}

startButton.addEventListener('click', startGame);
submitButton.addEventListener('click', handleAnswer);
answerInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleAnswer();
  }
});
