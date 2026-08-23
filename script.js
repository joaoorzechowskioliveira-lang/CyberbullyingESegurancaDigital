document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. CONTROLE DE ACESSIBILIDADE (FONTE, ALTO CONTRASTE, MODO ESCURO)
       ========================================================================== */
    let currentFontSize = 16;
    const rootHtml = document.documentElement;

    const btnIncFont = document.getElementById('btn-inc-font');
    const btnDecFont = document.getElementById('btn-dec-font');
    const btnContrast = document.getElementById('btn-contrast');
    const btnDarkMode = document.getElementById('btn-dark-mode');

    // Mudar o logo entre claro e escuro
    const logoImg = document.getElementById('logo-img')
    if (document.body.classList.contains('dark-mode')) {
    logoImg.src = 'img/logoescuro.png';
} else {
    logoImg.src = 'img/logoclaro.png';
}

    // Aumentar fonte com validação restrita entre 12px e 24px
    btnIncFont.addEventListener('click', () => {
        let novaFonte = currentFontSize + 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            rootHtml.style.fontSize = `${currentFontSize}px`;
        }
    });

    // Diminuir fonte com validação restrita entre 12px e 24px
    btnDecFont.addEventListener('click', () => {
        let novaFonte = currentFontSize - 2;
        if (novaFonte >= 12 && novaFonte <= 24) {
            currentFontSize = novaFonte;
            rootHtml.style.fontSize = `${currentFontSize}px`;
        }
    });

    // Alternar Modo de Alto Contraste
    btnContrast.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        if (document.body.classList.contains('high-contrast')) {
            document.body.classList.remove('dark-mode');
        }
    });

    // Alternar Modo Escuro
    btnDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('high-contrast');
        }
    });

    /* ==========================================================================
       2. CARROSSEL DE CONSCIENTIZAÇÃO (ARRAY DE OBJETOS)
       ========================================================================== */
    const carouselData = [
        {
            icon: "fa-solid fa-brain",
            title: "Pense Antes de Compartilhar",
            description: "Informações, imagens ou conteúdos íntimos compartilhados sem autorização podem gerar impactos psicológicos devastadores e permanentes."
        },
        {
            icon: "fa-solid fa-lock",
            title: "Fortaleça suas Senhas e Privacidade",
            description: "Utilize autenticação em duas etapas (2FA) e configure o nível de privacidade das suas redes para apenas amigos próximos."
        },
        {
            icon: "fa-solid fa-hands-holding-child",
            title: "Pratique a Empatia Digital",
            description: "Atrás de cada perfil existe uma pessoa real com sentimentos. Não faça comentários de ódio ou sarcasmo destrutivo."
        },
        {
            icon: "fa-solid fa-gavel",
            title: "Cyberbullying é Crime",
            description: "A violência virtual configura crimes como calúnia, difamação, injúria, ameaça e perseguição (stalking), previstos no Código Penal Brasileiro."
        }
    ];

    const carouselTrack = document.getElementById('carousel-track');
    const carouselDots = document.getElementById('carousel-dots');
    const btnPrev = document.getElementById('carousel-prev');
    const btnNext = document.getElementById('carousel-next');
    let currentIndex = 0;

    // Renderizar Slides do Carrossel
    function renderCarousel() {
        carouselTrack.innerHTML = '';
        carouselDots.innerHTML = '';

        carouselData.forEach((item, index) => {
            // Slide
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.innerHTML = `
                <i class="${item.icon} carousel-icon"></i>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            `;
            carouselTrack.appendChild(slide);

            // Dot
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            carouselDots.appendChild(dot);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Atualizar Dots
        const dots = carouselDots.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % carouselData.length;
        goToSlide(currentIndex);
    });

    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + carouselData.length) % carouselData.length;
        goToSlide(currentIndex);
    });

    renderCarousel();

    /* ==========================================================================
       3. PORTAL DE ESCUTA (FORMULÁRIO & ACOLHIMENTO AUTOMÁTICO)
       ========================================================================== */
    const formEscuta = document.getElementById('form-escuta');
    const respostaDefault = document.getElementById('resposta-default');
    const respostaDinamica = document.getElementById('resposta-dinamica');

    const frasesMotivacionais = [
        "A sua dignidade não pode ser definida por palavras atiradas na internet.",
        "Pedir ajuda não é sinal de fraqueza; é o primeiro ato de coragem para mudar a situação.",
        "Você é muito maior do que qualquer agressão ou comentário maldoso.",
        "O ambiente virtual passa, mas sua integridade e seu valor permanecem intactos."
    ];

    formEscuta.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value.trim() || 'Amigo(a)';
        const situacao = document.getElementById('situacao').value;
        const mensagem = document.getElementById('mensagem').value.trim();

        const fraseAleatoria = frasesMotivacionais[Math.floor(Math.random() * frasesMotivacionais.length)];

        respostaDefault.classList.add('hidden');
        respostaDinamica.classList.remove('hidden');

        respostaDinamica.innerHTML = `
            <h4>Olá, ${nome}. Estamos com você.</h4>
            <p>Obrigado por ter a coragem de compartilhar seu relato conosco. Saiba que sua dor é válida e você não está sozinho nessa.</p>
            
            <div class="quote-box">
                <i class="fa-solid fa-quote-left"></i> ${fraseAleatoria}
            </div>

            <p><strong>Orientação de Ação Recomendada:</strong></p>
            <ul style="margin-left: 1.2rem; margin-bottom: 1rem; color: var(--text-muted);">
                <li>Guarde o link completo da página e faça capturas de tela (Print Screen).</li>
                <li>Não responda ao agressor nem busque vingança no ambiente virtual.</li>
                <li>Reporte a conta na própria plataforma e converse com alguém de sua confiança (familiares, professores ou psicólogos).</li>
                <li>Caso sinta necessidade, procure a Delegacia de Crimes Cibernéticos da sua região.</li>
            </ul>

            <button onclick="resetEscuta()" class="btn btn-secondary" style="margin-top: 1rem; font-size: 0.9rem;">
                <i class="fa-solid fa-rotate-left"></i> Enviar Novo Relato
            </button>
        `;
    });

    window.resetEscuta = function() {
        formEscuta.reset();
        respostaDinamica.classList.add('hidden');
        respostaDefault.classList.remove('hidden');
    };

    /* ==========================================================================
       4. QUIZ INTERATIVO (ARRAY DE OBJETOS & LÓGICA DE SCORE)
       ========================================================================== */
    const quizQuestions = [
        {
            question: "1. Alguém criou um perfil falso utilizando suas fotos e está publicando mensagens ofensivas. O que você deve fazer primeiro?",
            options: [
                "Criar outro perfil falso para se vingar e insultar a pessoa.",
                "Tirar prints do perfil falso com o link visível, denunciar o perfil na plataforma e avisar amigos de confiança.",
                "Apagar suas redes sociais imediatamente e fingir que nada aconteceu.",
                "Responder a todas as postagens públicas do perfil insultando o agressor."
            ],
            correct: 1,
            explanation: "Registrar as evidências (prints/links) e utilizar a ferramenta de denúncia oficial da plataforma é a atitude correta e juridicamente respaldada."
        },
        {
            question: "2. Um colega de grupo no WhatsApp envia uma foto constrangedora de outra pessoa. Qual é a conduta adequada?",
            options: [
                "Repassar a foto para outros grupos de amigos para rir junto.",
                "Salvar a imagem na galeria para ver mais tarde.",
                "Não repassar a imagem, conversar com quem enviou explicando que isso é uma violação e apoiar a pessoa exposta.",
                "Incentivar outros participantes a fazerem piadas."
            ],
            correct: 2,
            explanation: "Interromper a corrente de compartilhamento e praticar a empatia digital reduz o impacto do dano causado à vítima."
        },
        {
            question: "3. Você está sendo ameaçado(a) por alguém na internet que exige valores ou favores para não vazar conversas. Como proceder?",
            options: [
                "Ceder às exigências da pessoa para evitar que as conversas vazem.",
                "Excluir todo o histórico de conversas para esquecer o assunto.",
                "Preservar todas as conversas, não ceder à chantagem e procurar imediatamente a polícia e seus responsáveis.",
                "Ameaçar a pessoa de volta com agressão física."
            ],
            correct: 2,
            explanation: "Chantagem e extorsão são crimes graves. Nunca ceda, pois as exigências continuam. Salve provas, guarde o histórico e denuncie às autoridades."
        },
        {
            question: "4. Qual é a utilidade da 'Ata Notarial' feita em Cartório no contexto do cyberbullying?",
            options: [
                "Bloquear automaticamente o perfil do agressor nas redes.",
                "Atestar judicialmente que o conteúdo e as provas virtuais existiam e eram autênticos em determinada data.",
                "Deletar fotos da internet com autorização policial.",
                "Enviar uma multa automática para o endereço do agressor."
            ],
            correct: 1,
            explanation: "A Ata Notarial feita por um Tabelião serve como prova pública incontestável em processos judiciais de crimes virtuais."
        },
        {
            question: "5. Se você presenciar um amigo sofrendo ataques constantes e isolamento em redes sociais, qual o melhor acolhimento?",
            options: [
                "Aconselhar o amigo a ignorar e dizer que 'é só brincadeira de internet'.",
                "Oferecer apoio privado, escutar sem julgar, ajudar a registrar denúncias e incentivar o apoio familiar/profissional.",
                "Postar mensagens agressivas atacando os agressores em público.",
                "Afastar-se do amigo para não ser alvo dos agressores também."
            ],
            correct: 1,
            explanation: "O acolhimento empático e o auxílio prático no registro da denúncia são essenciais para preservar a saúde mental da vítima."
        }
    ];

    let currentQuizIndex = 0;
    let quizScore = 0;

    const quizProgress = document.getElementById('quiz-progress');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    const quizBody = document.getElementById('quiz-body');
    const quizFooter = document.getElementById('quiz-footer');
    const quizNextBtn = document.getElementById('quiz-next-btn');

    function loadQuizQuestion() {
        quizFooter.classList.add('hidden');
        const q = quizQuestions[currentQuizIndex];

        quizProgress.textContent = `Pergunta ${currentQuizIndex + 1} de ${quizQuestions.length}`;
        quizProgressFill.style.width = `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%`;

        let optionsHTML = q.options.map((opt, i) => `
            <button class="option-btn" onclick="selectQuizOption(${i})">${opt}</button>
        `).join('');

        quizBody.innerHTML = `
            <div class="quiz-question-title">${q.question}</div>
            <div class="options-container" id="options-container">
                ${optionsHTML}
            </div>
            <div id="quiz-feedback" class="quiz-feedback hidden"></div>
        `;
    }

    window.selectQuizOption = function(selectedIndex) {
        const q = quizQuestions[currentQuizIndex];
        const container = document.getElementById('options-container');
        const buttons = container.querySelectorAll('.option-btn');
        const feedback = document.getElementById('quiz-feedback');

        buttons.forEach((btn) => btn.setAttribute('disabled', 'true'));

        if (selectedIndex === q.correct) {
            buttons[selectedIndex].classList.add('correct');
            feedback.className = "quiz-feedback success";
            feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> <strong>Correto!</strong> ${q.explanation}`;
            quizScore++;
        } else {
            buttons[selectedIndex].classList.add('incorrect');
            buttons[q.correct].classList.add('correct');
            feedback.className = "quiz-feedback error";
            feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> <strong>Incorreto.</strong> ${q.explanation}`;
        }

        feedback.classList.remove('hidden');
        quizFooter.classList.remove('hidden');
    };

    quizNextBtn.addEventListener('click', () => {
        currentQuizIndex++;
        if (currentQuizIndex < quizQuestions.length) {
            loadQuizQuestion();
        } else {
            showQuizResult();
        }
    });

    function showQuizResult() {
        quizProgress.textContent = "Quiz Concluído!";
        quizProgressFill.style.width = "100%";
        quizFooter.classList.add('hidden');

        let percentage = Math.round((quizScore / quizQuestions.length) * 100);

        quizBody.innerHTML = `
            <div style="text-align: center; padding: 2rem 1rem;">
                <i class="fa-solid fa-award" style="font-size: 4rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h2>Sua Pontuação: ${quizScore} de ${quizQuestions.length} (${percentage}%)</h2>
                <p style="margin: 1rem 0 2rem; color: var(--text-muted);">
                    ${percentage >= 80 
                        ? 'Excelente! Você possui grande consciência sobre segurança digital e sabe exatamente como agir diante de situações de cyberbullying.' 
                        : 'Bom esforço! Continue explorando os recursos e orientações desta página para se proteger e apoiar quem precisa.'}
                </p>
                <button onclick="restartQuiz()" class="btn btn-primary"><i class="fa-solid fa-rotate-right"></i> Refazer Quiz</button>
            </div>
        `;
    }

    window.restartQuiz = function() {
        currentQuizIndex = 0;
        quizScore = 0;
        loadQuizQuestion();
    };

    loadQuizQuestion();

    /* ==========================================================================
       5. ACORDEÃO (FAQ / ORIENTAÇÕES JURÍDICAS - ARRAY DE OBJETOS)
       ========================================================================== */
    const accordionData = [
        {
            title: "Qual a diferença entre Bullying e Cyberbullying?",
            content: "O bullying tradicional ocorre presencialmente. O cyberbullying utiliza meios digitais (redes sociais, aplicativos de mensagem, jogos online), o que amplia a velocidade de propagação, o alcance do público e a sensação de permanência das agressões."
        },
        {
            title: "Quais leis brasileiras protegem as vítimas na internet?",
            content: "O Marco Civil da Internet (Lei 12.965/14), a Lei Carolina Dieckmann (Lei 12.737/12), a Lei de Combate ao Stalking (Lei 14.132/21) e o Código Penal Brasileiro (artigos sobre calúnia, injúria, difamação e chantagem)."
        },
        {
            title: "O que fazer se fotos íntimas forem vazadas sem consentimento?",
            content: "Não exclua as evidências. Guarde os links das URLs, faça capturas de tela e registe um Boletim de Ocorrência (inclusive online na Delegacia Eletrônica de seu estado). Solicite a remoção imediata nas próprias redes sociais e na busca do Google."
        },
        {
            title: "Como apoiar um amigo que está sofrendo ataques mentais online?",
            content: "Acolha sem julgar, ajude-o a documentar as provas, incentive o afastamento temporário das redes agressoras e encoraje o aviso a familiares, professores ou profissionais de psicologia."
        }
    ];

    const accordionContainer = document.getElementById('accordion-container');

    function renderAccordion() {
        accordionContainer.innerHTML = '';
        accordionData.forEach((item, index) => {
            const accItem = document.createElement('div');
            accItem.className = 'accordion-item';
            accItem.innerHTML = `
                <button class="accordion-header" id="acc-hdr-${index}" aria-expanded="false">
                    <span>${item.title}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </button>
                <div class="accordion-content">
                    <p>${item.content}</p>
                </div>
            `;
            accordionContainer.appendChild(accItem);

            const headerBtn = accItem.querySelector('.accordion-header');
            const contentDiv = accItem.querySelector('.accordion-content');

            headerBtn.addEventListener('click', () => {
                const isActive = accItem.classList.contains('active');
                
                // Fechar todos
                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                    i.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
                });

                // Abrir o atual se não estava ativo
                if (!isActive) {
                    accItem.classList.add('active');
                    contentDiv.style.maxHeight = contentDiv.scrollHeight + 'px';
                    headerBtn.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    renderAccordion();

    /* ==========================================================================
       6. BOTÃO VOLTAR AO TOPO
       ========================================================================== */
    const btnTop = document.getElementById('btn-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btnTop.classList.add('visible');
        } else {
            btnTop.classList.remove('visible');
        }
    });

    btnTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});