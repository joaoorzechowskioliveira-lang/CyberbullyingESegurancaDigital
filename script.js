// --- 1. Acessibilidade (Fonte, Contraste, Modo Escuro) ---
let currentFontSize = 100;

document.getElementById('btn-increase-font').addEventListener('click', () => {
  if (currentFontSize < 130) {
    currentFontSize += 10;
    document.documentElement.style.fontSize = `${currentFontSize}%`;
  }
});

document.getElementById('btn-decrease-font').addEventListener('click', () => {
  if (currentFontSize > 80) {
    currentFontSize -= 10;
    document.documentElement.style.fontSize = `${currentFontSize}%`;
  }
});

document.getElementById('btn-dark-mode').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.remove('high-contrast');
});

document.getElementById('btn-contrast').addEventListener('click', () => {
  document.body.classList.toggle('high-contrast');
  document.body.classList.remove('dark-mode');
});

// --- 2. Carrossel de Imagens ---
let slideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');

function showSlide(index) {
  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slides.forEach(slide => slide.classList.remove('active'));
  slides[slideIndex].classList.add('active');
}

function moveSlide(step) {
  slideIndex += step;
  showSlide(slideIndex);
}

// Troca automática a cada 5 segundos
setInterval(() => moveSlide(1), 5000);

// --- 3. Portal de Escuta ---
const listeningForm = document.getElementById('listening-form');
const responseBox = document.getElementById('response-box');

const motivationalQuotes = [
  "Você é mais forte do que imagina e não precisa passar por isso sozinho(a).",
  "Sua voz importa. Obrigado por compartilhar e buscar um ambiente mais seguro.",
  "Nada do que dizem injustamente sobre você diminui o seu verdadeiro valor.",
  "Buscar ajuda é um ato de coragem. Estamos do seu lado!"
];

listeningForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim() || 'Amigo(a)';
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  responseBox.innerHTML = `
    <strong>Olá, ${name}!</strong>
    <p>Sua mensagem foi recebida. Lembre-se: <em>"${randomQuote}"</em></p>
    <p>Se você estiver em perigo ou sofrendo ataques intensos, procure imediatamente um adulto de confiança ou os canais do CVV (188) e SaferNet.</p>
  `;
  responseBox.classList.remove('hidden');
  listeningForm.reset();
});

// --- 4. Quiz Interativo de 5 Perguntas ---
const quizData = [
  {
    question: "1. Você vê fotos constrangedoras de um colega sendo espalhadas no grupo da sala. O que fazer?",
    options: [
      "Compartilhar com outros amigos para verem também.",
      "Ignorar e fingir que não viu nada.",
      "Não repassar, acolher o colega e denunciar o conteúdo ao moderador ou adulto."
    ],
    correct: 2,
    explanation: "Correto! Não repassar o conteúdo é essencial para parar o ciclo de agressão."
  },
  {
    question: "2. Alguém começou a enviar mensagens ofensivas e ameaçadoras no seu perfil privado. Qual a melhor atitude?",
    options: [
      "Responder na mesma moeda com ofensas pesadas.",
      "Tirar prints das mensagens, bloquear o perfil e contar a um responsável.",
      "Apagar a conta imediatamente sem guardar nenhuma prova."
    ],
    correct: 1,
    explanation: "Exato! Guardar prints como provas e bloquear o agressor são passos cruciais."
  },
  {
    question: "3. Um perfil fake foi criado usando seu nome e fotos para postar coisas ofensivas. Como agir?",
    options: [
      "Denunciar o perfil na própria rede social por personificação/falso perfil e avisar amigos.",
      "Criar outro perfil fake para atacar o suspeito.",
      "Deixar para lá, pois o perfil vai sumir sozinho."
    ],
    correct: 0,
    explanation: "Perfeito! A denúncia na plataforma ajuda a remover a conta o mais rápido possível."
  },
  {
    question: "4. Seu amigo confidenciou que está sofrendo ataques diários na internet e está muito triste. O que fazer?",
    options: [
      "Dizer para ele deixar de ser dramático.",
      "Ouvir com empatia, dar apoio e incentivá-lo a conversar com os pais ou professores.",
      "Postar nas redes sociais expondo quem são os agressores sem autorização dele."
    ],
    correct: 1,
    explanation: "Excelente! O acolhimento com empatia e o direcionamento para adultos de confiança salvam vidas."
  },
  {
    question: "5. Qual destas atitudes contribui para a Segurança Digital e combate ao Cyberbullying?",
    options: [
      "Usar senhas simples e compartilhá-las com amigos próximos.",
      "Pensar criticamente antes de publicar algo e respeitar a diversidade na rede.",
      "Comentar em publicações com ofensas desde que seja em perfil anônimo."
    ],
    correct: 1,
    explanation: "Correto! Respeito mútuo e empatia tornam a internet um lugar seguro para todos."
  }
];

let currentQuestion = 0;
let score = 0;

const quizQuestionEl = document.getElementById('quiz-question');
const quizProgressEl = document.getElementById('quiz-progress');
const quizOptionsEl = document.getElementById('quiz-options');
const quizFeedbackEl = document.getElementById('quiz-feedback');
const btnNextQuestion = document.getElementById('btn-next-question');

function loadQuestion() {
  const q = quizData[currentQuestion];
  quizProgressEl.textContent = `Pergunta ${currentQuestion + 1} de ${quizData.length}`;
  quizQuestionEl.textContent = q.question;
  quizOptionsEl.innerHTML = '';
  quizFeedbackEl.classList.add('hidden');
  btnNextQuestion.classList.add('hidden');

  q.options.forEach((opt, index) => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = opt;
    btn.onclick = () => selectOption(index);
    quizOptionsEl.appendChild(btn);
  });
}

function selectOption(selectedIndex) {
  const q = quizData[currentQuestion];
  const buttons = quizOptionsEl.querySelectorAll('.option-btn');
  
  buttons.forEach(btn => btn.disabled = true);

  if (selectedIndex === q.correct) {
    score++;
    quizFeedbackEl.textContent = "✅ " + q.explanation;
    quizFeedbackEl.className = "feedback-box correct";
  } else {
    quizFeedbackEl.textContent = "❌ Opção incorreta. " + q.explanation;
    quizFeedbackEl.className = "feedback-box incorrect";
  }

  quizFeedbackEl.classList.remove('hidden');

  if (currentQuestion < quizData.length - 1) {
    btnNextQuestion.textContent = "Próxima Pergunta";
  } else {
    btnNextQuestion.textContent = "Ver Resultado Final";
  }
  btnNextQuestion.classList.remove('hidden');
}

btnNextQuestion.addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
});

function showFinalResult() {
  quizProgressEl.textContent = "Quiz Concluído!";
  quizQuestionEl.textContent = `Você acertou ${score} de ${quizData.length} perguntas!`;
  quizOptionsEl.innerHTML = score >= 3 
    ? "<p>🎉 Parabéns! Você sabe como se proteger e manter a internet um lugar seguro.</p>"
    : "<p>💡 Continue estudando nossas orientações para saber como lidar melhor com essas situações!</p>";
  quizFeedbackEl.classList.add('hidden');
  btnNextQuestion.classList.add('hidden');
}

// Inicializa o quiz
loadQuestion();

// --- 5. Botão Voltar ao Topo ---
const btnBackToTop = document.getElementById('btn-back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    btnBackToTop.style.display = 'block';
  } else {
    btnBackToTop.style.display = 'none';
  }
});

btnBackToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});